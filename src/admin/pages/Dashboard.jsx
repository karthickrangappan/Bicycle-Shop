import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { salesData, categoryData } from '../data/mockData';

const StatCard = ({ icon, label, value, sub, color, trend }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all`}>
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${color}`}>{icon}</div>
      {trend && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>}
    </div>
    <p className="text-2xl font-black text-white mt-1">{value}</p>
    <p className="text-gray-400 text-sm mt-0.5">{label}</p>
    {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
  </div>
);

// Simple bar chart using SVG
const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.revenue));
  const w = 700, h = 200, barW = 70, gap = 30;
  return (
    <svg viewBox={`0 0 ${w} ${h + 40}`} className="w-full">
      {data.map((d, i) => {
        const x = i * (barW + gap) + 30;
        const barH = (d.revenue / max) * h;
        const y = h - barH;
        return (
          <g key={d.month}>
            <rect x={x} y={y} width={barW} height={barH} rx="6" fill={i === data.length - 1 ? '#f59e0b' : '#374151'} className="transition-all"/>
            <text x={x + barW / 2} y={h + 20} textAnchor="middle" fill="#6b7280" fontSize="12">{d.month}</text>
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fill="#e5e7eb" fontSize="10">{(d.revenue/1000).toFixed(0)}k</text>
          </g>
        );
      })}
    </svg>
  );
};

// Donut chart
const DonutChart = ({ data }) => {
  const colors = ['#f59e0b','#3b82f6','#8b5cf6','#10b981','#ef4444'];
  const total = data.reduce((a, b) => a + b.value, 0);
  let cumulative = 0;
  const cx = 80, cy = 80, r = 60, innerR = 35;
  const slices = data.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle), y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(endAngle), iy1 = cy + innerR * Math.sin(endAngle);
    const ix2 = cx + innerR * Math.cos(startAngle), iy2 = cy + innerR * Math.sin(startAngle);
    const large = (endAngle - startAngle) > Math.PI ? 1 : 0;
    return { path: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`, color: colors[i], ...d };
  });
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 160 160" className="w-36 h-36 flex-shrink-0">
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
        <text x="80" y="76" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Sales</text>
        <text x="80" y="90" textAnchor="middle" fill="#9ca3af" fontSize="9">by category</text>
      </svg>
      <div className="space-y-1.5">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background: colors[i]}}></div>
            <span className="text-gray-400">{d.name}</span>
            <span className="text-white font-bold ml-auto">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const statusColors = {
  Delivered: 'bg-emerald-500/10 text-emerald-400',
  Shipped: 'bg-blue-500/10 text-blue-400',
  Confirmed: 'bg-purple-500/10 text-purple-400',
  Pending: 'bg-amber-500/10 text-amber-400',
  Cancelled: 'bg-red-500/10 text-red-400',
};

export default function Dashboard() {
  const { totalRevenue, totalOrders, pendingOrders, orders, products, customers, lowStockProducts } = useAdmin();
  const [period, setPeriod] = useState('monthly');
  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products].sort((a,b) => b.sold - a.sold).slice(0,4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, Super Admin! Here's what's happening.</p>
        </div>
        <div className="flex gap-2">
          {['daily','monthly','yearly'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${period === p ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="💰" label="Total Revenue" value={`₹${(totalRevenue/100000).toFixed(1)}L`} sub="All paid orders" color="bg-amber-500/10" trend={12.4} />
        <StatCard icon="📦" label="Total Orders" value={totalOrders} sub={`${pendingOrders} pending`} color="bg-blue-500/10" trend={8.2} />
        <StatCard icon="👤" label="Customers" value={customers.length} sub="Registered users" color="bg-purple-500/10" trend={5.7} />
        <StatCard icon="🚲" label="Products" value={products.length} sub={`${lowStockProducts.length} low stock`} color="bg-emerald-500/10" trend={-2.1} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Revenue Overview</h2>
            <span className="text-xs text-gray-500">Last 6 months</span>
          </div>
          <BarChart data={salesData} />
        </div>

        {/* Category Donut */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4">Sales by Category</h2>
          <DonutChart data={categoryData} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-amber-400 text-xs hover:text-amber-300">View all →</Link>
          </div>
          <div className="space-y-2">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400">{order.id}</span>
                    <span className="text-sm font-medium text-white truncate">{order.customer}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{order.items.map(i=>i.name).join(', ')}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">₹{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products + Low Stock */}
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h2 className="font-bold text-white mb-3">Top Selling</h2>
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-lg font-black text-gray-700">#{i+1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.sold} sold</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">₹{(p.price/1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-red-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400">⚠️</span>
              <h2 className="font-bold text-white">Low Stock Alerts</h2>
            </div>
            <div className="space-y-2">
              {lowStockProducts.slice(0,3).map(p => (
                <div key={p.id} className="flex items-center justify-between">
                  <p className="text-sm text-gray-300 truncate flex-1">{p.name}</p>
                  <span className={`text-xs font-bold ml-2 ${p.stock === 0 ? 'text-red-400' : 'text-amber-400'}`}>{p.stock === 0 ? 'Out' : `${p.stock} left`}</span>
                </div>
              ))}
              {lowStockProducts.length === 0 && <p className="text-xs text-gray-500">All products well-stocked ✓</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
