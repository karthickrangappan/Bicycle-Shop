import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { 
  LayoutDashboard, 
  Bike, 
  ShoppingBag, 
  Users, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  PlusCircle, 
  Archive, 
  Tags, 
  Menu, 
  X, 
  Bell, 
  LogOut, 
  Search,
  Box,
  Home,
  ChevronLeft
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Products', icon: Bike, path: '/admin/products', children: [
    { label: 'All Products', icon: List, path: '/admin/products' },
    { label: 'Add Product', icon: PlusCircle, path: '/admin/products/add' },
    { label: 'Categories', icon: Tags, path: '/admin/categories' },
    { label: 'Inventory', icon: Archive, path: '/admin/inventory' },
  ]},
  { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
  { label: 'Customers', icon: Users, path: '/admin/customers' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

function List(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/></svg>;
}

export default function AdminLayout({ children }) {
  const { sidebarOpen, setSidebarOpen, adminUser, logout, notifications, lowStockProducts, pendingOrders } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState('Products');
  const [showNotif, setShowNotif] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  // Generate breadcrumbs from path
  const pathSegments = location.pathname.split('/').filter(p => p && p !== 'admin');
  
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 font-sans overflow-hidden" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>
      {/* Sidebar Overlay for Mobile */}
      <div className={`fixed inset-0 bg-black/60 z-[60] lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-[70] h-full ${sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'} bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 flex-shrink-0 overflow-hidden`}>
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800 h-20">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-gray-900 font-black shadow-lg shadow-amber-500/20 flex-shrink-0">
             <Bike size={24} strokeWidth={3} />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
                <span className="font-black text-white tracking-tighter text-xl">CYCLE<span className="text-amber-500">CORE</span></span>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest -mt-1">Admin Panel</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 space-y-1 scrollbar-thin hover:scrollbar-thumb-gray-700">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.children && item.children.some(c => location.pathname === c.path));
            const isExpanded = expandedMenu === item.label;
            const Icon = item.icon;

            return (
              <div key={item.label} className="px-3">
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-[1.2rem] cursor-pointer transition-all duration-200 group ${isActive ? 'bg-amber-500 text-gray-900 shadow-xl shadow-amber-500/10' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`}
                  onClick={() => {
                    if (item.children) { 
                        setExpandedMenu(isExpanded ? null : item.label); 
                        if (sidebarOpen) return; 
                    }
                    navigate(item.path);
                  }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="text-sm font-bold flex-1">{item.label}</span>
                      {item.children && <ChevronRight size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />}
                      {item.label === 'Orders' && pendingOrders > 0 && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-gray-900 text-amber-400' : 'bg-amber-500 text-gray-900'}`}>
                            {pendingOrders}
                        </span>
                      )}
                    </>
                  )}
                </div>
                
                {sidebarOpen && item.children && isExpanded && (
                  <div className="mt-1 ml-4 border-l-2 border-gray-800/50 space-y-1 py-1">
                    {item.children.map(child => {
                        const ChildIcon = child.icon;
                        const isChildActive = location.pathname === child.path;
                        return (
                          <Link 
                            key={child.path} 
                            to={child.path} 
                            className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-xl text-xs font-bold transition-all ${isChildActive ? 'text-amber-400 bg-amber-500/5' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'}`}
                          >
                            <ChildIcon size={14} />
                            {child.label}
                          </Link>
                        );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-md">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 font-black text-sm flex-shrink-0 shadow-inner">
                {adminUser?.name?.[0] || 'A'}
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-white truncate">{adminUser?.name || 'Admin'}</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest truncate">{adminUser?.role || 'Manager'}</p>
                </div>
              )}
              {sidebarOpen && (
                <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Logout">
                  <LogOut size={16} />
                </button>
              )}
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar Header */}
        <header className="h-20 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-6 lg:px-10 flex-shrink-0 z-50">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2.5 bg-gray-900 rounded-xl text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 transition-all shadow-lg active:scale-95"
            >
              <Menu size={20} />
            </button>
            
            {/* Breadcrumbs Navigation */}
            <div className="hidden md:flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
                <Link to="/admin" className="text-gray-500 hover:text-amber-500 transition-colors flex items-center gap-2">
                    <Home size={12} /> Dashboard
                </Link>
                {pathSegments.map((segment, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight size={12} className="text-gray-700" />
                        <span className={index === pathSegments.length - 1 ? "text-amber-500" : "text-gray-500"}>
                            {segment.replace(/-/g, ' ')}
                        </span>
                    </React.Fragment>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {/* Search Toggle */}
            <div className="hidden sm:flex items-center bg-gray-900 border border-gray-800 rounded-2xl px-4 py-2 group focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500/50 transition-all w-64 lg:w-80">
                <Search size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search panel..." 
                    className="bg-transparent border-none focus:ring-0 text-xs font-bold text-gray-200 placeholder:text-gray-600 w-full ml-2"
                />
            </div>

            {/* Notifications Center */}
            <div className="relative group">
              <button 
                onClick={() => setShowNotif(!showNotif)} 
                className={`relative p-3 rounded-2xl transition-all border ${showNotif ? 'bg-amber-500 border-amber-500 text-gray-900 shadow-xl shadow-amber-500/20' : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'}`}
              >
                <Bell size={18} />
                {unread > 0 && (
                    <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black animate-bounce shadow-lg ${showNotif ? 'bg-gray-900 text-amber-500' : 'bg-amber-500 text-gray-900'}`}>{unread}</span>
                )}
              </button>
              
              {showNotif && (
                <div className="absolute right-0 top-14 w-80 lg:w-96 bg-gray-900 border border-gray-800 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] z-[100] overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <h4 className="font-black text-sm uppercase tracking-widest text-white">System Notifications</h4>
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">{unread} New</span>
                  </div>
                  <div className="max-h-[70vh] overflow-y-auto p-2 scrollbar-thin">
                    {notifications.length > 0 ? notifications.map(n => (
                      <div key={n.id} className={`p-4 mx-2 my-1 rounded-2xl transition-all ${!n.read ? 'bg-amber-500/5 border border-amber-500/10' : 'opacity-60 hover:opacity-100 hover:bg-gray-800/40'}`}>
                        <div className="flex gap-4">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-amber-500' : 'bg-gray-700'}`} />
                            <div>
                                <p className="text-xs font-bold text-gray-100 leading-relaxed">{n.msg}</p>
                                <p className="text-[9px] font-black text-gray-600 uppercase mt-2 tracking-widest">{n.time}</p>
                            </div>
                        </div>
                      </div>
                    )) : (
                        <div className="py-12 text-center">
                            <Bell className="mx-auto text-gray-800 mb-4" size={40} />
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Clear Horizons</p>
                        </div>
                    )}
                  </div>
                  <div className="p-4 bg-gray-950/50 border-t border-gray-800 text-center">
                     <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions / Link to Store */}
            <Link 
                to="/" 
                target="_blank"
                className="hidden lg:flex items-center gap-3 px-5 py-3 bg-gray-900 border border-gray-800 rounded-2xl hover:border-amber-500 transition-all text-xs font-black uppercase tracking-widest group"
            >
                <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:animate-pulse" />
                Live Store
            </Link>
          </div>
        </header>

        {/* Global Action Header for better UX */}
        <div className="bg-gray-950 px-6 lg:px-10 py-6 border-b border-gray-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                {pathSegments.length > 0 && (
                    <button onClick={() => navigate(-1)} className="p-3 bg-gray-900 border border-gray-800 rounded-2xl text-gray-500 hover:text-white hover:border-gray-700 transition-all active:scale-95 shadow-md">
                        <ChevronLeft size={16} />
                    </button>
                )}
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight capitalize">
                        {pathSegments[pathSegments.length - 1]?.replace(/-/g, ' ') || 'Admin Ecosystem'}
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 mt-0.5">VeloCore Operations Hub</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                {location.pathname.includes('/products') && !location.pathname.includes('/add') && (
                    <Link to="/admin/products/add" className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-500 text-gray-900 rounded-[1.2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:bg-amber-600 active:scale-95 transition-all">
                        <PlusCircle size={16} /> New Asset
                    </Link>
                )}
                {location.pathname === '/admin' && (
                    <Link to="/admin/orders" className="flex items-center gap-2.5 px-6 py-3.5 bg-gray-900 border border-gray-800 text-white rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:border-gray-600 active:scale-95 transition-all">
                        <ShoppingBag size={16} /> Audit Orders
                    </Link>
                )}
            </div>
        </div>

        {/* Dynamic Viewport Content */}
        <main className="flex-1 overflow-y-auto bg-gray-950 p-6 lg:p-10 scrollbar-thin hover:scrollbar-thumb-gray-800">
           {children}
        </main>
      </div>
    </div>
  );
}
