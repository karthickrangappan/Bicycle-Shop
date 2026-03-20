import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
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
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, cart, wishlist } = useShop();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const navbarBg = isHome
    ? (scrolled
        ? "bg-slate-900 backdrop-blur-xl border-b border-slate-800 shadow-xl shadow-black/20"
        : "bg-transparent")
    : "bg-slate-900 backdrop-blur-xl border-b border-slate-800 shadow-xl shadow-black/20";

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
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                  location.pathname === item.href
                    ? "text-brand-500 bg-white/5"
                    : "text-white hover:text-brand-400 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Pages Dropdown on Hover */}
            <div 
              className="relative"
              onMouseEnter={() => setPagesDropdown(true)}
              onMouseLeave={() => setPagesDropdown(false)}
            >
              <button className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                pagesDropdown ? "text-brand-500 bg-white/5" : "text-white hover:text-brand-400"
              }`}>
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
            <button className="hidden md:flex p-2 text-white hover:bg-white/10 rounded-lg transition-all group">
              <Search size={18} className="group-hover:scale-110" />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-all group">
              <Heart size={18} className={`group-hover:scale-110 ${wishlist.length > 0 ? "fill-brand-500 text-brand-500" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 text-[8px] bg-red-500 text-white flex items-center justify-center rounded-full shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-all group">
              <ShoppingCart size={18} className="group-hover:scale-110" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 text-[8px] bg-brand-500 text-white flex items-center justify-center rounded-full shadow-lg">
                  {cart.reduce((a, c) => a + (c.quantity || 1), 0)}
                </span>
              )}
            </Link>

            {/* Profile Dropdown Header */}
            <div 
              className="relative hidden sm:block"
              onMouseEnter={() => setUserDropdown(true)}
              onMouseLeave={() => setUserDropdown(false)}
            >
              <button
                onClick={() => !user && navigate("/login")}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-all relative group"
              >
                <User size={18} className="group-hover:scale-110" />
                {user && <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-green-400 rounded-full border border-slate-900" />}
              </button>

              <AnimatePresence>
                {user && userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-100 p-2 overflow-hidden z-20"
                  >
                    <div className="p-4 bg-slate-50 rounded-xl mb-2 flex items-center gap-3">
                       <div className="w-10 h-10 bg-brand-500 text-white rounded-xl flex items-center justify-center font-black">
                          {user.name[0].toUpperCase()}
                       </div>
                       <div className="overflow-hidden">
                          <p className="font-black text-sm text-slate-900 truncate">{user.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 truncate">{user.email}</p>
                       </div>
                    </div>

                    <div className="space-y-1">
                      <Link to="/profile" className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group">
                        <div className="flex items-center gap-3">
                           <User size={16} className="text-slate-400 group-hover:text-brand-500" />
                           My Profile
                        </div>
                        <ChevronRight size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>

                      <Link to="/my-orders" className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group">
                         <div className="flex items-center gap-3">
                            <Package size={16} className="text-slate-400 group-hover:text-brand-500" />
                            My Orders
                         </div>
                         <ChevronRight size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>

                      <Link to="/profile?tab=address" className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group">
                        <div className="flex items-center gap-3">
                           <MapPin size={16} className="text-slate-400 group-hover:text-brand-500" />
                           My Address
                        </div>
                        <ChevronRight size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    </div>

                    <div className="h-px bg-slate-50 my-2 mx-2" />

                    <button
                      onClick={() => logout()}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all group"
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
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white p-8 z-[80] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="18.5" cy="17.5" r="3.5" />
                      <circle cx="5.5" cy="17.5" r="3.5" />
                      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11V9a2 2 0 0 0-2-2H4" />
                    </svg>
                  </div>
                  <span className="font-black text-slate-950 uppercase tracking-tight">CycleCore</span>
                </div>
                <button 
                  onClick={() => setOpen(false)}
                  className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-950 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2 flex-grow">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex justify-between items-center p-4 rounded-2xl transition-all ${
                      location.pathname === item.href
                        ? "bg-brand-500 text-white font-black"
                        : "hover:bg-slate-50 text-slate-600 font-bold"
                    }`}
                  >
                    {item.label}
                    <ArrowRight size={18} />
                  </Link>
                ))}

                <div className="pt-4 pb-2">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-4 mb-2">Explore</p>
                </div>
                
                {pageItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all"
                  >
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                       <item.icon size={18} />
                    </div>
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100">
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-brand-500 text-white rounded-2xl font-black shadow-lg shadow-brand-500/20"
                  >
                    Continue to Login <ArrowRight size={18} />
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-500 shadow-sm font-black">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-black text-slate-950 truncate">{user.name}</p>
                      <button onClick={logout} className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Sign Out</button>
                    </div>
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