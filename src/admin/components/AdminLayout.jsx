import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const navItems = [
  { label: 'Dashboard', icon: '📊', path: '/admin' },
  { label: 'Products', icon: '🚲', path: '/admin/products', children: [
    { label: 'All Products', path: '/admin/products' },
    { label: 'Add Product', path: '/admin/products/add' },
    { label: 'Categories', path: '/admin/categories' },
    { label: 'Inventory', path: '/admin/inventory' },
  ]},
  { label: 'Orders', icon: '📦', path: '/admin/orders' },
  { label: 'Customers', icon: '👤', path: '/admin/customers' },
  { label: 'Settings', icon: '⚙️', path: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const { sidebarOpen, setSidebarOpen, adminUser, logout, notifications, lowStockProducts, pendingOrders } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState('Products');
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 font-sans overflow-hidden" style={{fontFamily:"'DM Sans', system-ui, sans-serif"}}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 flex-shrink-0 overflow-hidden`}>
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800 h-16">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-gray-900 font-black text-sm flex-shrink-0">🚲</div>
          {sidebarOpen && <span className="font-black text-amber-400 tracking-tight text-lg whitespace-nowrap">VeloAdmin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.children && item.children.some(c => location.pathname === c.path));
            const isExpanded = expandedMenu === item.label;
            return (
              <div key={item.label}>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
                  onClick={() => {
                    if (item.children) { setExpandedMenu(isExpanded ? null : item.label); if (sidebarOpen) return; }
                    navigate(item.path);
                  }}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <>
                      <span className="text-sm font-medium flex-1">{item.label}</span>
                      {item.children && <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>}
                      {item.label === 'Orders' && pendingOrders > 0 && <span className="bg-amber-500 text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded-full">{pendingOrders}</span>}
                      {item.label === 'Products' && lowStockProducts.length > 0 && <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{lowStockProducts.length}</span>}
                    </>
                  )}
                </div>
                {sidebarOpen && item.children && isExpanded && (
                  <div className="ml-4 mb-1">
                    {item.children.map(child => (
                      <Link key={child.path} to={child.path} className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-sm transition-all ${location.pathname === child.path ? 'text-amber-400 bg-amber-500/10' : 'text-gray-500 hover:text-gray-300'}`}>
                        <span className="w-1 h-1 bg-current rounded-full"></span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">{adminUser?.name?.[0] || 'A'}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{adminUser?.name}</p>
                <p className="text-xs text-gray-500 truncate">{adminUser?.role}</p>
              </div>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 text-sm" title="Logout">⏻</button>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white text-xl">☰</button>
          <div className="flex items-center gap-4">
            {/* Low stock chip */}
            {lowStockProducts.length > 0 && (
              <Link to="/admin/inventory" className="flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-medium">
                ⚠️ {lowStockProducts.length} low stock
              </Link>
            )}
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative text-gray-400 hover:text-white">
                🔔
                {unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-gray-900 text-xs flex items-center justify-center font-bold">{unread}</span>}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-8 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50">
                  <div className="p-3 border-b border-gray-700 font-semibold text-sm">Notifications</div>
                  {notifications.map(n => (
                    <div key={n.id} className={`p-3 border-b border-gray-700/50 text-sm ${!n.read ? 'bg-amber-500/5' : ''}`}>
                      <p className={!n.read ? 'text-white' : 'text-gray-400'}>{n.msg}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">{adminUser?.name?.[0] || 'A'}</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
