import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  // ✅ Immediate initialization from localStorage to avoid flickering
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bicycle_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const getInitialStorage = (key, defaultVal = []) => {
    const savedUser = localStorage.getItem('bicycle_user');
    const user = savedUser ? JSON.parse(savedUser) : null;
    const storageKey = user ? `${key}_${user.email}` : `guest_${key}`;
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : defaultVal;
  };

  const [cart, setCart] = useState(() => getInitialStorage('cart'));
  const [wishlist, setWishlist] = useState(() => getInitialStorage('wishlist'));
  const [orders, setOrders] = useState(() => getInitialStorage('orders'));

  // ✅ Sync with localStorage whenever cart, wishlist, or orders change
  useEffect(() => {
    const key = user ? `cart_${user.email}` : 'guest_cart';
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user]);

  useEffect(() => {
    const key = user ? `wishlist_${user.email}` : 'guest_wishlist';
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  // ✅ Auth Functions with Persistence & Merging
  const login = (userData) => {
    // 1. Get current guest data
    const guestCart = JSON.parse(localStorage.getItem('guest_cart')) || [];
    const guestWishlist = JSON.parse(localStorage.getItem('guest_wishlist')) || [];

    // 2. Get user's existing data from storage
    const userCart = JSON.parse(localStorage.getItem(`cart_${userData.email}`)) || [];
    const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userData.email}`)) || [];
    const userOrders = JSON.parse(localStorage.getItem(`orders_${userData.email}`)) || [];

    // 3. Merge Guest Cart into User Cart
    const mergedCart = [...userCart];
    guestCart.forEach(gItem => {
      const existing = mergedCart.find(uItem => uItem.id === gItem.id);
      if (existing) {
        existing.quantity += gItem.quantity;
      } else {
        mergedCart.push(gItem);
      }
    });

    // 4. Merge Guest Wishlist
    const mergedWishlist = [...userWishlist];
    guestWishlist.forEach(gItem => {
      if (!mergedWishlist.find(uItem => uItem.id === gItem.id)) {
        mergedWishlist.push(gItem);
      }
    });

    // 5. Update state and localStorage
    setUser(userData);
    setCart(mergedCart);
    setWishlist(mergedWishlist);
    setOrders(userOrders);

    localStorage.setItem('bicycle_user', JSON.stringify(userData));
    localStorage.setItem(`cart_${userData.email}`, JSON.stringify(mergedCart));
    localStorage.setItem(`wishlist_${userData.email}`, JSON.stringify(mergedWishlist));
    
    // 6. Clear guest data
    localStorage.removeItem('guest_cart');
    localStorage.removeItem('guest_wishlist');
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setAddresses([]);
    localStorage.removeItem('bicycle_user');
    localStorage.removeItem('guest_cart');
    localStorage.removeItem('guest_wishlist');
  };

  const [addresses, setAddresses] = useState(() => getInitialStorage('addresses'));

  useEffect(() => {
    if (user) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(addresses));
    }
  }, [addresses, user]);

  const addAddress = (newAddress) => {
    setAddresses(prev => [...prev, { ...newAddress, id: Date.now() }]);
  };

  const removeAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('bicycle_users')) || [];
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists' };
    }
    users.push(userData);
    localStorage.setItem('bicycle_users', JSON.stringify(users));
    return { success: true };
  };

  // ✅ Cart Functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  };

  // ✅ Wishlist Functions
  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // ✅ Order Functions
  const placeOrder = (orderData) => {
    const orderNum = (orders.length + 1).toString().padStart(5, '0');
    const newOrder = {
      id: `ORD${orderNum}`,
      date: new Date().toISOString(),
      ...orderData,
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity), 0)
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // ✅ Clear cart after order
    return newOrder;
  };

  return (
    <ShopContext.Provider value={{
      user, login, logout, register,
      cart, addToCart, removeFromCart, updateQuantity,
      wishlist, addToWishlist, removeFromWishlist, isInWishlist,
      orders, placeOrder,
      addresses, addAddress, removeAddress
    }}>
      {children}
    </ShopContext.Provider>
  );
};

