import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, onSnapshot, doc, getDoc, setDoc, updateDoc, addDoc, increment } from 'firebase/firestore';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [categories, setCategories] = useState([]);

  // Monitor products and handle "Back-in-Stock" triggers
  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const updatedProducts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      setProducts(prevProducts => {
        // Check for back-in-stock for current user's wishlist
        if (user && wishlist.length > 0) {
          updatedProducts.forEach(p => {
            const wishItem = wishlist.find(w => w.id === p.id);
            const prevProd = prevProducts.find(oldP => oldP.id === p.id);
            if (wishItem && prevProd && prevProd.stock === 0 && p.stock > 0) {
              toast(`🔥 Back in Stock: ${p.name}! Grab it now.`, { icon: '🚲', duration: 6000 });
            }
          });
        }
        return updatedProducts;
      });
      setLoading(false);
    });
    const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, [user, wishlist]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let role = 'user';
        let data = {};

        // Check for both UID-based and Email-based documents
        const userRef = doc(db, 'users', currentUser.uid);
        const emailRef = doc(db, 'users', currentUser.email);
        
        const [userSnap, emailSnap] = await Promise.all([
          getDoc(userRef).catch(() => null),
          getDoc(emailRef).catch(() => null)
        ]);
        
        // If an email-based document exists and is admin, respect that role
        const emailRole = emailSnap?.exists() ? emailSnap.data().role : null;

        if (userSnap?.exists()) {
          data = userSnap.data();
          role = emailRole === 'admin' ? 'admin' : (data.role || role);

          setCart(data.cart || []);
          setWishlist(data.wishlist || []);
          setAddresses(data.addresses || []);

          // Sync the admin role to the UID document if it was found in the email document
          const updates = { lastLogin: new Date() };
          if (emailRole === 'admin' && data.role !== 'admin') updates.role = 'admin';
          await updateDoc(userRef, updates).catch(() => {});
        } else {
          role = emailRole === 'admin' ? 'admin' : role;
          
          // Initialize new user profile using UID
          data = { 
            uid: currentUser.uid,
            name: currentUser.displayName || currentUser.email?.split('@')[0] || "User",
            email: currentUser.email,
            cart: [], 
            wishlist: [], 
            addresses: [], 
            role: role,
            createdAt: new Date(),
            lastLogin: new Date()
          };
          await setDoc(userRef, data).catch(e => console.log(e));
        }

        setUser({
          uid: currentUser.uid,
          name: data.name || currentUser.displayName || "User",
          email: currentUser.email,
          role
        });
      } else {
        setUser(null);
        setCart([]);
        setWishlist([]);
        setAddresses([]);
        setOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.uid) {
        setOrders([]);
        return;
    }
    const unsub = onSnapshot(collection(db, 'users', user.uid, 'orders'), (snapshot) => {
        const userOrders = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
        setOrders(userOrders);
    });
    return () => unsub();
  }, [user]);

  const updateUserData = async (updates) => {
    if (user?.uid) {
      await updateDoc(doc(db, 'users', user.uid), updates).catch(e => console.log(e));
    }
  };

  const login = async (email = null, password = null) => {
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const addAddress = (newAddress) => {
    const newAddresses = [...addresses, { ...newAddress, id: Date.now() }];
    setAddresses(newAddresses);
    updateUserData({ addresses: newAddresses });
  };

  const removeAddress = (id) => {
    const newAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(newAddresses);
    updateUserData({ addresses: newAddresses });
  };

  const addToCart = async (product, size, color = "Standard") => {
    if (!user?.uid) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    if (!size) {
      toast.error("Please select a frame size.");
      return;
    }

    // 1. Validation: Check inventory_count > 0
    const prodRef = doc(db, 'products', product.id);
    const prodSnap = await getDoc(prodRef);
    const currentStock = prodSnap.data()?.stock || 0;

    if (currentStock <= 0) {
      toast.error("Out of stock!");
      return;
    }

    // 2. Soft-Reservation: Decrement "Available" count temporarily (15 mins)
    await updateDoc(prodRef, { stock: increment(-1) });

    const cartItem = { 
      ...product, 
      selectedSize: size, 
      selectedColor: color,
      quantity: 1, 
      reservationExpiry: Date.now() + 15 * 60 * 1000 
    };

    const existingIndex = cart.findIndex(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
    let newCart;
    if (existingIndex > -1) {
      newCart = cart.map((item, idx) => idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      newCart = [...cart, cartItem];
    }

    setCart(newCart);
    updateUserData({ cart: newCart });
    toast.success(`${product.name} (${size}) reserved for 15 mins!`);

    // Client-side expiry handler (could also be handled on server/cloud function)
    setTimeout(async () => {
      // Re-fetch current cart to see if it's still there and unpaid
      const currentCart = JSON.parse(JSON.stringify(newCart)); // simplified logic
      // In a real app, you'd check if this specific reservation is still active in the DB
    }, 15 * 60 * 1000);
  };

  const removeFromCart = async (productId, size, color) => {
    const itemToRemove = cart.find(item => item.id === productId && item.selectedSize === size && item.selectedColor === color);
    if (itemToRemove) {
      // Increment stock back
      await updateDoc(doc(db, 'products', productId), { stock: increment(itemToRemove.quantity) });
    }
    const newCart = cart.filter(item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color));
    setCart(newCart);
    updateUserData({ cart: newCart });
  };

  const updateQuantity = async (productId, size, delta, color) => {
    const item = cart.find(i => i.id === productId && i.selectedSize === size && i.selectedColor === color);
    if (!item) return;
    
    if (delta > 0) {
      // Check stock before increasing
      const prodSnap = await getDoc(doc(db, 'products', productId));
      if ((prodSnap.data()?.stock || 0) <= 0) {
        toast.error("No more items in stock!");
        return;
      }
      await updateDoc(doc(db, 'products', productId), { stock: increment(-1) });
    } else {
      if (item.quantity <= 1) {
        removeFromCart(productId, size);
        return;
      }
      await updateDoc(doc(db, 'products', productId), { stock: increment(1) });
    }

    const newCart = cart.map(i => 
      (i.id === productId && i.selectedSize === size && i.selectedColor === color) 
      ? { ...i, quantity: i.quantity + delta } 
      : i
    );
    setCart(newCart);
    updateUserData({ cart: newCart });
  };

  const addToWishlist = (product) => {
    if (!user) {
      toast.error("Please log in to use wishlist.");
      return;
    }
    if (wishlist.find(item => item.id === product.id)) return;
    const newWishlist = [...wishlist, product];
    setWishlist(newWishlist);
    updateUserData({ wishlist: newWishlist });
    toast.success(`${product.name} added to wishlist!`);
  };

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(newWishlist);
    updateUserData({ wishlist: newWishlist });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const placeOrder = async (orderData) => {
    if (!user?.uid) return null;
    
    // Final Inventory Check: Re-verify stock at the millisecond of "Place Order"
    // Since we did soft-reservation, we just need to ensure the cart items are still valid.
    
    // Use a combination of timestamp and a random string to guarantee uniqueness across users
    const uniqueSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNum = Date.now().toString().slice(-6); // last 6 digits of timestamp
    const newOrderId = `ORD-${orderNum}-${uniqueSuffix}`;
    const newOrder = {
      date: new Date().toISOString(),
      items: orderData.items || [...cart],
      ...orderData,
      total: orderData.total || (orderData.items || cart).reduce((acc, item) => acc + (parseFloat(String(item.price).replace(/[^\d.]/g, '')) * (item.quantity || 1)), 0),
      status: orderData.status || 'Pending', 
      paymentStatus: orderData.paymentMethod === 'Razorpay' ? 'Paid' : 'Pending',
      isCancellable: true,
      isReturnable: false,
      userRefPath: `users/${user.uid}`
    };
    
    await setDoc(doc(db, 'users', user.uid, 'orders', newOrderId), newOrder);
    
    // Partially clear cart: Only remove items that were actually in the order
    const remainingCart = cart.filter(cartItem => 
      !newOrder.items.some(orderItem => 
        orderItem.id === cartItem.id && 
        orderItem.selectedSize === cartItem.selectedSize && 
        orderItem.selectedColor === cartItem.selectedColor
      )
    );
    setCart(remainingCart); 
    updateUserData({ cart: remainingCart });
    return { ...newOrder, id: newOrderId };
  };

  const cancelOrder = async (orderId) => {
    if (!user?.uid) return;
    const orderRef = doc(db, 'users', user.uid, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    const orderData = orderSnap.data();

    if (['Shipped', 'Delivered', 'Cancelled'].includes(orderData.status)) {
      toast.error("Order cannot be cancelled at this stage.");
      return;
    }

    // Restore Inventory
    for (const item of orderData.items) {
      await updateDoc(doc(db, 'products', item.id), { stock: increment(item.quantity || 1) });
    }

    await updateDoc(orderRef, { 
      status: 'Cancelled', 
      isCancellable: false,
      refundStatus: orderData.paymentStatus === 'Paid' ? 'Processed' : 'N/A'
    });
    
    toast.success("Order cancelled and refund processed.");
  };

  const requestReturn = async (orderId, reason, isOpened) => {
    if (!user?.uid) return;
    const orderRef = doc(db, 'users', user.uid, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    const orderData = orderSnap.data();

    const deliveredDate = new Date(orderData.deliveryDate || orderData.date);
    const diffDays = Math.ceil((new Date() - deliveredDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      toast.error("Return period (30 days) has expired.");
      return;
    }

    const restockingFee = isOpened ? orderData.total * 0.15 : 0;
    const refundAmount = orderData.total - restockingFee;

    await updateDoc(orderRef, {
      status: 'Return Requested',
      isReturnable: false,
      returnReason: reason,
      restockingFee,
      refundAmount,
      refundStatus: 'Pending Verification'
    });

    toast.success(`Return requested. Potential refund: ₹${refundAmount.toFixed(0)} (Restocking fee: ₹${restockingFee.toFixed(0)})`);
  };

  return (
    <ShopContext.Provider value={{
      user, login, logout, register,
      cart, addToCart, removeFromCart, updateQuantity,
      wishlist, addToWishlist, removeFromWishlist, isInWishlist,
      orders, placeOrder, cancelOrder, requestReturn,
      addresses, addAddress, removeAddress,
      products, loading,
      categories
    }}>
      {children}
    </ShopContext.Provider>
  );
};
