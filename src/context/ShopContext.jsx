import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bicycle_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const getInitialStorage = (key, defaultVal = []) => {
    const savedUser = localStorage.getItem('bicycle_user');
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (!user) return defaultVal;
    
    const storageKey = `${key}_${user.email}`;
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : defaultVal;
  };

  const [cart, setCart] = useState(() => getInitialStorage('cart'));
  const [wishlist, setWishlist] = useState(() => getInitialStorage('wishlist'));
  const [orders, setOrders] = useState(() => getInitialStorage('orders'));

  // Sync with localStorage whenever cart, wishlist, or orders change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  //  Auth Functions with Persistence
  const login = (userData) => {
    // 1. Get user's existing data from storage
    const userCart = JSON.parse(localStorage.getItem(`cart_${userData.email}`)) || [];
    const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userData.email}`)) || [];
    const userOrders = JSON.parse(localStorage.getItem(`orders_${userData.email}`)) || [];

    // 2. Update state and localStorage
    setUser(userData);
    setCart(userCart);
    setWishlist(userWishlist);
    setOrders(userOrders);

    localStorage.setItem('bicycle_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setAddresses([]);
    localStorage.removeItem('bicycle_user');
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
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
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
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }
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
    setCart([]); 
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
