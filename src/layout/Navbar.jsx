import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  ShoppingBag,
  ArrowRight,
  Settings,
  Mail,
  Info,
  Package,
  MapPin,
  ChevronRight,
  Mountain,
  Compass,
  Bike,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

// navbar edit 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, cart, categories: dynamicCategories, products: shopProducts } = useShop();

  const categoriesDropdownRef = useRef(null);
  const pagesDropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const filteredItems = searchQuery.trim() === "" 
    ? [] 
    : shopProducts.filter(product => 
        product.status !== 'inactive' && (
        (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (product.category || '').toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setCategoriesDropdown(false);
      }
      if (pagesDropdownRef.current && !pagesDropdownRef.current.contains(event.target)) {
        setPagesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ];

  const pageItems = [
    { label: "About Us", href: "/about", icon: Info, desc: "Our journey and core values" },
    { label: "Our Services", href: "/services", icon: Settings, desc: "Elite bike maintenance & care" },
    { label: "Contact Us", href: "/contact", icon: Mail, desc: "Get in touch with our experts" },
  ];

  // Build dynamic category navigation items from Firestore categories
  const categoryItems = useMemo(() => {
    return dynamicCategories
      .filter(c => c.active)
      .sort((a, b) => (a.priority || 0) - (b.priority || 0))
      .slice(0, 8)
      .map(c => ({
        label: c.name,
        href: `/category/${encodeURIComponent(c.name)}`,
        image: c.image,
        color: c.color || '#CBD5E1'
      }));
  }, [dynamicCategories]);

  const navbarBg = isHome
    ? (scrolled
      ? "bg-slate-900 shadow-xl shadow-black/20"
      : "bg-transparent md:bg-transparent bg-slate-900 shadow-xl md:shadow-none")
    : "bg-slate-900 shadow-xl shadow-black/20";

  return (
    <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${navbarBg} ${scrolled ? 'py-1' : 'py-2'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30 transition-transform group-hover:rotate-[15deg] group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="18.5" cy="17.5" r="3.5" />
                <circle cx="5.5" cy="17.5" r="3.5" />
                <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11V9a2 2 0 0 0-2-2H4" />
              </svg>
            </div>
            <span className="text-lg font-black text-white tracking-tighter">
              CYCLE<span className="text-brand-500">CORE</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${location.pathname === item.href
                  ? "text-brand-500 bg-white/5"
                  : "text-white hover:text-brand-400 hover:bg-white/5"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Categories Dropdown on Click */}
            <div className="relative" ref={categoriesDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCategoriesDropdown(!categoriesDropdown);
                  setPagesDropdown(false);
                }}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${categoriesDropdown ? "text-brand-500 bg-white/5" : "text-white hover:text-brand-400"
                  }`}
              >
                Categories <ChevronDown size={14} className={`transition-transform duration-300 ${categoriesDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {categoriesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-[480px] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-100 p-4 z-20"
                  >
                    <div className="px-2 pb-4 border-b border-slate-50 mb-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shop by Category</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {categoryItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setCategoriesDropdown(false)}
                          className="flex items-center gap-4 p-3 rounded-2xl transition-all group border border-transparent hover:border-slate-100"
                          style={{ backgroundColor: `${item.color}08` }}
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-500 border border-slate-50">
                            {item.image ? <img src={item.image} alt={item.label} className="w-full h-full object-cover" /> : <Bike size={20} className="text-slate-400" />}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{item.label}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pages Dropdown on Click */}
            <div className="relative" ref={pagesDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPagesDropdown(!pagesDropdown);
                  setCategoriesDropdown(false);
                }}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${pagesDropdown ? "text-brand-500 bg-white/5" : "text-white hover:text-brand-400"
                  }`}
              >
                Pages <ChevronDown size={14} className={`transition-transform duration-300 ${pagesDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {pagesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-100 p-2 overflow-hidden z-20"
                  >
                    <div className="p-3 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Overview</p>
                    </div>
                    {pageItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setPagesDropdown(false)}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all group"
                      >
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-500 transition-all">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 group-hover:text-brand-600">{item.label}</p>
                          <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-500">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-full mr-2"
                  >
                    <form onSubmit={handleSearch}>
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search bikes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all shadow-2xl"
                      />
                    </form>

                    {/* Live Results Dropdown */}
                    <AnimatePresence>
                      {searchQuery.trim() !== "" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-100 p-2 overflow-hidden z-20"
                        >
                          <div className="p-2 border-b border-slate-50 mb-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Results</p>
                          </div>
                          {filteredItems.length > 0 ? (
                            <>
                              {filteredItems.map((product) => (
                                <Link
                                  key={product.id}
                                  to={`/product/${product.id}`}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all group"
                                >
                                  <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-slate-900 group-hover:text-brand-600 truncate">{product.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400">{product.price}</p>
                                  </div>
                                  <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-500 transition-colors" />
                                </Link>
                              ))}
                              <button
                                onClick={handleSearch}
                                className="w-full mt-2 py-2 text-[10px] font-black uppercase tracking-widest text-brand-500 hover:bg-brand-50 rounded-lg transition-all"
                              >
                                View all results
                              </button>
                            </>
                          ) : (
                            <div className="p-8 text-center bg-slate-50/50 rounded-xl">
                              <Search size={24} className="mx-auto text-slate-200 mb-2" />
                              <p className="text-xs font-bold text-slate-400">No bikes found for "{searchQuery}"</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-lg transition-all group ${isSearchOpen ? 'bg-brand-500 text-white' : 'text-white hover:bg-white/10'}`}
              >
                {isSearchOpen ? <X size={18} /> : <Search size={18} className="group-hover:scale-110" />}
              </button>
            </div>



            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-all group">
              <ShoppingCart size={18} className="group-hover:scale-110" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 text-[8px] bg-brand-500 text-white flex items-center justify-center rounded-full shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown Header */}
            <div
              className={`relative hidden sm:block h-full flex items-center`}
              onMouseEnter={() => setUserDropdown(true)}
              onMouseLeave={() => setUserDropdown(false)}
            >
              <button
                onClick={() => !user && navigate("/login")}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-all relative group flex items-center justify-center min-w-[40px]"
              >
                <User size={18} className="group-hover:scale-110" />
                {user && (
                  <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-green-400 rounded-full border border-slate-900 shadow-sm" />
                )}
              </button>

              <AnimatePresence>
                {user && userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-100 p-2 overflow-hidden z-[70]"
                  >
                    {/* User Info Header */}
                    <div className="p-4 bg-slate-50/50 rounded-xl mb-2 flex items-center gap-3 border border-slate-100/50">
                      <div className="w-10 h-10 bg-brand-500 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-brand-500/20">
                        {(user.name || 'U')[0].toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-black text-sm text-slate-900 truncate">{user.name || 'Unknown User'}</p>
                        <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link 
                        to="/profile" 
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <User size={16} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                          My Profile
                        </div>
                        <ChevronRight size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all translate-x--2 group-hover:translate-x-0" />
                      </Link>

                      <Link 
                        to="/my-orders" 
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Package size={16} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                          My Orders
                        </div>
                        <ChevronRight size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all translate-x--2 group-hover:translate-x-0" />
                      </Link>

                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          onClick={() => setUserDropdown(false)}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 text-[11px] font-black text-brand-600 bg-brand-50/50 border border-brand-100 hover:bg-brand-50 rounded-xl transition-all group mt-2 uppercase tracking-tight"
                        >
                          <div className="flex items-center gap-3">
                            <Zap size={16} className="text-brand-500 fill-brand-500/20" />
                            Admin Dashboard
                          </div>
                          <ArrowRight size={14} className="text-brand-500" />
                        </Link>
                      )}
                    </div>

                    <div className="h-px bg-slate-50 my-2 mx-1" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-black text-red-500 hover:bg-red-50 rounded-xl transition-all group uppercase tracking-widest"
                    >
                      <LogOut size={16} className="text-red-400 group-hover:text-red-500" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70]"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-slate-900 p-8 z-[80] flex flex-col shadow-2xl border-l border-slate-800"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="18.5" cy="17.5" r="3.5" />
                      <circle cx="5.5" cy="17.5" r="3.5" />
                      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11V9a2 2 0 0 0-2-2H4" />
                    </svg>
                  </div>
                  <span className="font-black text-white uppercase tracking-tight">CycleCore</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-2">
                <div className="pb-4 mb-4 border-b border-slate-800/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-4">Main Menu</p>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex justify-between items-center px-4 py-3.5 rounded-2xl transition-all mb-1 ${location.pathname === item.href
                        ? "bg-brand-500 text-white font-black shadow-lg shadow-brand-500/20"
                        : "hover:bg-slate-800 text-slate-300 font-bold"
                        }`}
                    >
                      {item.label}
                      <ArrowRight size={18} className={location.pathname === item.href ? "opacity-100" : "opacity-30"} />
                    </Link>
                  ))}
                </div>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex justify-between items-center p-4 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-2xl font-black mb-6 hover:bg-brand-500 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                      Admin Dashboard
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                )}

                <div className="pt-2 pb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-4">Explore</p>
                </div>

                <div className="grid grid-cols-1 gap-1 pb-6 mb-6 border-b border-slate-800/50">
                  {pageItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 p-3.5 rounded-2xl text-slate-300 font-bold hover:bg-slate-800 transition-all group"
                    >
                      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-all border border-slate-700/50">
                        <item.icon size={18} />
                      </div>
                      <span className="text-sm font-bold">{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 pb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-4">Categories</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-4">
                  {categoryItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-3 p-4 rounded-2xl text-slate-300 font-bold transition-all border border-slate-800 hover:border-slate-700 bg-slate-800/20"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 shadow-sm flex-shrink-0">
                        {item.image ? <img src={item.image} alt={item.label} className="w-full h-full object-cover" /> : <Bike size={20} className="text-slate-500" />}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-tight truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-auto">
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-brand-500 text-white rounded-2xl font-black shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all"
                  >
                    Continue to Login <ArrowRight size={18} />
                  </Link>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-slate-800 border border-slate-700/50 rounded-2xl group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 bg-brand-500 text-white rounded-xl flex items-center justify-center shadow-md font-black flex-shrink-0">
                        {(user.name || 'U')[0].toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-black text-white truncate">{user.name || 'User'}</p>
                        <button onClick={logout} className="text-[10px] font-bold text-red-400 hover:text-red-500 uppercase tracking-widest transition-colors">Sign Out</button>
                      </div>
                    </div>
                    <Link to="/profile" onClick={() => setOpen(false)} className="p-2 rounded-lg bg-slate-700 text-slate-400 hover:text-white transition-all">
                      <User size={18} />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}