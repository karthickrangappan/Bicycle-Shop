import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { collection, collectionGroup, onSnapshot, doc, deleteDoc, updateDoc, setDoc, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { generateRealCatalog } from '../../data/seedCatalog';

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
      const cats = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCategories(cats);
    });

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const [userSnap, emailSnap] = await Promise.all([
          getDoc(doc(db, "users", user.uid)).catch(() => null),
          getDoc(doc(db, "users", user.email)).catch(() => null)
        ]);
        
        const isUidAdmin = userSnap?.exists() && userSnap.data().role === 'admin';
        const isEmailAdmin = emailSnap?.exists() && emailSnap.data().role === 'admin';

        if (isUidAdmin || isEmailAdmin) {
          const data = userSnap?.exists() ? userSnap.data() : (emailSnap?.exists() ? emailSnap.data() : {});
          setAdminUser({ 
            name: data?.name || "Admin", 
            email: user.email, 
            role: 'admin',
            uid: user.uid 
          });
        } else {
          setAdminUser(null);
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

  const updateOrderStatus = async (orderId, status, userRefPath) => {
    try {
      if (userRefPath) {
        await updateDoc(doc(db, userRefPath, 'orders', orderId), { status });
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

  const resetToDefaultCategories = async () => {
    try {
      // 1. Delete all existing categories
      const catSnapshot = await getDocs(collection(db, "categories"));
      for (const d of catSnapshot.docs) {
        await deleteDoc(doc(db, "categories", d.id));
      }

      // 2. Add well-organized defaults
      const defaults = [
        { name: 'Mountain Bikes', image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=400', slug: 'mountain-bikes', description: 'Hardtail, Trail, and Full-Suspension performance machines.', color: '#ef4444', priority: 1, active: true },
        { name: 'Road Bikes', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400', slug: 'road-bikes', description: 'Aerodynamic velocity for endurance and competitive racing.', color: '#3b82f6', priority: 2, active: true },
        { name: 'Urban & City', image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=400', slug: 'urban-bikes', description: 'Elegant commuters, hybirds, and vintage leisure cycles.', color: '#10b981', priority: 3, active: true },
        { name: 'Gravel & Adventure', image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?auto=format&fit=crop&q=80&w=400', slug: 'gravel-bikes', description: 'Versatile all-terrain explorers for any surface.', color: '#8b5cf6', priority: 4, active: true },
        { name: 'Kids Bicycles', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=400', slug: 'kids-bikes', description: 'The perfect start for young riders on their cycling journey.', color: '#ec4899', priority: 5, active: true },
        { name: 'Spare Parts', image: 'https://images.unsplash.com/photo-1603565457134-8b64e6268807?auto=format&fit=crop&q=80&w=400', slug: 'spare-parts', description: 'Tires, tubes, chains, and precision components.', color: '#64748b', priority: 6, active: true },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1541625602330-2277a1cd13a1?auto=format&fit=crop&q=80&w=400', slug: 'accessories', description: 'Helmets, lights, locks, and essential cycling gear.', color: '#f59e0b', priority: 7, active: true },
        { name: 'Performance Apparel', image: 'https://images.unsplash.com/photo-1521124610112-9c9ef47347a5?auto=format&fit=crop&q=80&w=400', slug: 'apparel', description: 'Techncial jerseys, bibs, and gloves for optimal comfort.', color: '#d946ef', priority: 8, active: true },
      ];

      for (const c of defaults) {
        await addDoc(collection(db, "categories"), c);
      }
      toast.success("Categories reset to defaults!");
      addLog("Reset Infrastructure", "Bulk category reset performed");
    } catch (e) {
      toast.error("Wipe failed: " + e.message);
    }
  };

  const resetAllStocks = async () => {
    try {
      let count = 0;
      for (const prod of products) {
        await updateDoc(doc(db, "products", prod.id), { stock: 50 });
        count++;
      }
      toast.success(`Successfully reset stock ${count} products to 50!`);
      addLog("Stock Reset", `Updated ${count} products`);
    } catch (e) {
      toast.error("Stock reset failed: " + e.message);
    }
  };

  const categorizeAllProducts = async () => {
    let updatedCount = 0;
    for (const prod of products) {
      // Re-categorize if no category, Uncategorized, or the category isn't a familiar one
      if (!prod.category || prod.category === 'Uncategorized' || !categories.some(c => c.name === prod.category)) {
        let newCat = 'Accessories'; // Default fallback
        const name = (prod.name || '').toLowerCase();
        const oldCat = (prod.category || '').toLowerCase();
        
        // Logical matching by OLD category first
        if (oldCat.includes('mountain')) newCat = 'Mountain Bikes';
        else if (oldCat.includes('road')) newCat = 'Road Bikes';
        else if (oldCat.includes('city') || oldCat.includes('commuter') || oldCat.includes('urban') || oldCat.includes('e-bike')) newCat = 'Urban & City';
        else if (oldCat.includes('gravel')) newCat = 'Gravel & Adventure';
        else if (oldCat.includes('kids')) newCat = 'Kids Bicycles';
        else if (oldCat.includes('component') || oldCat.includes('part')) newCat = 'Spare Parts';
        else if (oldCat.includes('apparel') || oldCat.includes('clothing')) newCat = 'Performance Apparel';
        else if (oldCat.includes('accessories')) newCat = 'Accessories';
        // Logical matching by product name if old category didn't help
        else if (name.includes('mountain') || name.includes('mtb') || name.includes('trail') || name.includes('spectral')) newCat = 'Mountain Bikes';
        else if (name.includes('road') || name.includes('race') || name.includes('dogma') || name.includes('roubaix') || name.includes('tarmac')) newCat = 'Road Bikes';
        else if (name.includes('city') || name.includes('urban') || name.includes('commute') || name.includes('hybrid') || name.includes('mariner')) newCat = 'Urban & City';
        else if (name.includes('gravel') || name.includes('adventure') || name.includes('path') || name.includes('grappler')) newCat = 'Gravel & Adventure';
        else if (name.includes('kids') || name.includes('child') || name.includes('junior') || name.includes('wahoo')) newCat = 'Kids Bicycles';
        else if (name.includes('tire') || name.includes('chain') || name.includes('pedal') || name.includes('brake') || name.includes('derailleur')) newCat = 'Spare Parts';
        else if (name.includes('jersey') || name.includes('short') || name.includes('glove')) newCat = 'Performance Apparel';
        else if (name.includes('helmet') || name.includes('light') || name.includes('lock') || name.includes('pump')) newCat = 'Accessories';
        
        // Avoid writing if it's already somehow correct (shouldn't happen due to the first if, but just in case)
        if (prod.category !== newCat) {
          await updateDoc(doc(db, "products", prod.id), { category: newCat });
          updatedCount++;
        }
      }
    }
    toast.success(`Successfully categorized ${updatedCount} products!`);
    addLog("Bulk Categorization", `Updated ${updatedCount} products`);
  };

  const resetAndSeedProducts = async () => {
    try {
      setLoading(true);
      toast.loading("Purging existing catalog...");
      
      // Delete existing products
      for (const prod of products) {
        await deleteDoc(doc(db, "products", prod.id.toString()));
      }
      
      const seedProducts = generateRealCatalog();

      toast.loading("Deploying 50 hyper-clean catalog models...");
      let seeded = 0;
      for (const p of seedProducts) {
        const generatedSku = `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        await addDoc(collection(db, "products"), { ...p, sku: generatedSku, id: generatedSku });
        seeded++;
      }
      
      toast.dismiss();
      toast.success(`Successfully uploaded ${seeded} pristine models with generated SKUs!`);
      addLog("Catalog Reset", `Factory reset with ${seeded} models.`);
    } catch (e) {
      toast.dismiss();
      toast.error("Process failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{
      adminUser, logout,
      products, addProduct, updateProduct, deleteProduct, categorizeAllProducts, resetAllStocks, resetAndSeedProducts,
      orders, updateOrderStatus,
      customers, toggleCustomerStatus,
      coupons, addCoupon, deleteCoupon,
      reviews, updateReviewStatus,
      categories, addCategory, updateCategory, deleteCategory, resetToDefaultCategories,
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
