import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { collection, collectionGroup, onSnapshot, doc, deleteDoc, updateDoc, setDoc, addDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [logs, setLogs] = useState([]);
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubOrders = onSnapshot(collectionGroup(db, "orders"), (snapshot) => {
      const allOrders = snapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id,
        userRefPath: doc.ref.parent.parent ? doc.ref.parent.parent.path : null
      }));
      setOrders(allOrders);
    });
    const unsubCustomers = onSnapshot(collection(db, "users"), (snapshot) => {
      setCustomers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubCoupons = onSnapshot(collection(db, "coupons"), (snapshot) => {
      setCoupons(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubReviews = onSnapshot(collection(db, "reviews"), (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubServices = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubLogs = onSnapshot(collection(db, "logs"), (snapshot) => {
      const allLogs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      allLogs.sort((a, b) => new Date(b.time) - new Date(a.time));
      setLogs(allLogs);
    });
    const unsubBanners = onSnapshot(collection(db, "heroBanners"), (snapshot) => {
      setBanners(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubNotifications = onSnapshot(collection(db, "notifications"), (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email === "admin@bicycleshop.com") {
          setAdminUser({ name: "Super Admin", email: user.email, role: "super_admin" });
        } else {
          const userSnap = await getDoc(doc(db, "users", user.email));
          if (userSnap.exists() && userSnap.data().role === 'admin') {
            setAdminUser({ name: userSnap.data().name || "Admin", email: user.email, role: "manager" });
          }
        }
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubProducts();
      unsubOrders();
      unsubCustomers();
      unsubCoupons();
      unsubReviews();
      unsubServices();
      unsubLogs();
      unsubBanners();
      unsubNotifications();
      unsubCategories();
      unsubAuth();
    };
  }, []);

  const addLog = async (action, target) => {
    const newLog = { admin: adminUser?.name || "Super Admin", action, target, time: new Date().toISOString(), ip: "192.168.1.1" };
    await addDoc(collection(db, "logs"), newLog).catch(e => console.error(e));
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (order && order.userRefPath) {
        await updateDoc(doc(db, order.userRefPath, 'orders', orderId), { status });
      } else {
        await updateDoc(doc(db, "orders", orderId), { status });
      }
      addLog("Order status updated", `${orderId} → ${status}`);
    } catch(e) {
      console.error(e);
      toast.error('Failed to update order status');
    }
  };

  const toggleCustomerStatus = async (id) => {
    try {
      const customer = customers.find(c => c.id === id);
      if (customer) {
        const newStatus = customer.status === 'active' ? 'blocked' : 'active';
        await updateDoc(doc(db, "users", id), { status: newStatus });
      }
    } catch(e) { console.error(e); }
  };

  const updateReviewStatus = async (id, status) => {
    await updateDoc(doc(db, "reviews", id), { status }).catch(e => console.error(e));
  };

  const deleteProduct = async (id) => {
    try {
      let docId = id.toString();
      await deleteDoc(doc(db, "products", docId));
      addLog("Product deleted", `Product ID: ${id}`);
    } catch(e) { console.error(e); }
  };

  const addProduct = async (product) => {
    const newProd = { ...product, sold: 0, rating: 0 };
    await addDoc(collection(db, "products"), newProd).catch(e => console.error(e));
    addLog("Product added", product.name);
  };

  const updateProduct = async (id, data) => {
    try {
      let docId = id.toString();
      await updateDoc(doc(db, "products", docId), data);
      addLog("Product updated", data.name || `ID: ${id}`);
    } catch(e) { console.error(e); }
  };

  const addCategory = async (cat) => {
    await addDoc(collection(db, "categories"), { ...cat, active: true }).catch(console.error);
    addLog("Category added", cat.name);
  };

  const updateCategory = async (id, data) => {
    await updateDoc(doc(db, "categories", id), data).catch(console.error);
    addLog("Category updated", data.name || id);
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id)).catch(console.error);
    addLog("Category deleted", id);
  };

  const addCoupon = async (coupon) => {
    const newCoupon = { ...coupon, used: 0, status: 'active' };
    await addDoc(collection(db, "coupons"), newCoupon).catch(e => console.error(e));
    addLog("Coupon created", coupon.code);
  };

  const deleteCoupon = async (id) => {
    await deleteDoc(doc(db, "coupons", id)).catch(e => console.error(e));
  };

  const updateServiceStatus = async (id, status) => {
    await updateDoc(doc(db, "services", id), { status }).catch(e => console.error(e));
  };

  const login = async (email, password) => {
    try {
      if (email === "admin@bicycleshop.com" && password === "admin123") {
        setAdminUser({ name: "Super Admin", email, role: "super_admin" });
        return { success: true };
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAdminUser({ name: userCredential.user.displayName || "Admin", email, role: "manager" });
      toast.success('Admin login successful');
      return { success: true };
    } catch(e) {
      return { success: false, message: e.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setAdminUser(null);
  };

  // Safe aggregations
  const safeOrders = orders || [];
  const safeProducts = products || [];
  
  const lowStockProducts = safeProducts.filter(p => p.stock <= 3);
  const totalRevenue = safeOrders.filter(o => o.paymentStatus === "Paid").reduce((a, b) => a + (parseFloat(String(b.total).replace(/[^\d.]/g, '')) || 0), 0);
  const totalOrders = safeOrders.length;
  const pendingOrders = safeOrders.filter(o => o.status === "Pending").length;

  return (
    <AdminContext.Provider value={{
      adminUser, login, logout,
      products, addProduct, updateProduct, deleteProduct,
      orders, updateOrderStatus,
      customers, toggleCustomerStatus,
      coupons, addCoupon, deleteCoupon,
      reviews, updateReviewStatus,
      categories, addCategory, updateCategory, deleteCategory,
      admins, setAdmins,
      logs, addLog,
      services, updateServiceStatus,
      banners, setBanners,
      spareParts, setSpareParts,
      sidebarOpen, setSidebarOpen,
      notifications,
      lowStockProducts, totalRevenue, totalOrders, pendingOrders, loading
    }}>
      {children}
    </AdminContext.Provider>
  );
};
