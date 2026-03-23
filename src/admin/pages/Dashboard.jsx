import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Admin Context hook for dashboard operations
import { useAdmin } from '../context/AdminContext';
import { salesData, categoryData } from '../data/mockData';
import { 
  PlusCircle, 
  ShoppingBag, 
  Archive, 
  Tags, 
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  ShoppingBasket,
  Users,
  Bike
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, sub, color, trend }) => (
  <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-[2rem] p-6 hover:border-amber-500/30 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
        <Icon size={120} />
    </div>
    <div className="flex items-start justify-between mb-4 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${color} shadow-inner`}>
        <Icon size={22} className="text-white" strokeWidth={2.5} />
      </div>
      {trend && (
        <span className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full border ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
          {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="relative z-10">
        <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1 group-hover:text-amber-500 transition-colors uppercase">{label}</p>
        {sub && <p className="text-gray-600 text-xs mt-2 font-medium">{sub}</p>}
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, path, color }) => (
    <Link 
        to={path} 
        className="group flex flex-col items-center justify-center p-6 bg-gray-900/20 border border-gray-800 rounded-[2rem] hover:bg-amber-500 hover:border-amber-500 transition-all duration-300"
    >
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all shadow-lg shadow-black/20`}>
            <Icon size={28} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors text-center">{label}</span>
    </Link>
);

export default function Dashboard() {
  const { totalRevenue, totalOrders, pendingOrders, orders, products, customers, lowStockProducts } = useAdmin();
  const [period, setPeriod] = useState('monthly');
  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products].sort((a,b) => b.sold - a.sold).slice(0,4);

  return (
    <div className="space-y-10">
      {/* Header Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Welcome & Quick Info */}
        <div className="xl:col-span-2 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Admin Executive</h1>
                    <p className="text-amber-500/60 font-black uppercase tracking-[0.2em] text-[10px] mt-1">Real-time Operations Pulse</p>
                </div>
                <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800 shadow-xl">
                    {['daily','monthly','yearly'].map(p => (
                        <button 
                            key={p} 
                            onClick={() => setPeriod(p)} 
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${period === p ? 'bg-amber-500 text-gray-900 shadow-lg' : 'text-gray-500 hover:text-white'}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickAction icon={PlusCircle} label="Add Product" path="/admin/products/add" color="bg-blue-500" />
                <QuickAction icon={ShoppingBag} label="View Orders" path="/admin/orders" color="bg-emerald-500" />
                <QuickAction icon={Tags} label="Categories" path="/admin/categories" color="bg-purple-500" />
                <QuickAction icon={Archive} label="Audit Stock" path="/admin/inventory" color="bg-amber-500" />
            </div>
        </div>

        {/* System Health / Status */}
        <div className="bg-amber-500 p-8 rounded-[2.5rem] shadow-2xl shadow-amber-500/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
                <Zap size={220} strokeWidth={3} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">System Live</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 leading-none tracking-tighter">Performance Peak</h3>
                <p className="text-gray-900/60 text-xs font-bold mt-2">All global systems and payment gateways operating at optimal velocity.</p>
            </div>
            <div className="mt-8 flex items-end justify-between relative z-10">
                <div>
                    <p className="text-4xl font-black text-gray-900 tracking-tighter">98.4%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-900/40">Efficiency Score</p>
                </div>
                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-amber-500 shadow-2xl shadow-black/20">
                    <TrendingUp size={24} />
                </div>
            </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={IndianRupee} label="Revenue" value={`₹${(totalRevenue/100000).toFixed(1)}L`} sub="Total settlements" color="bg-blue-600" trend={12.4} />
        <StatCard icon={ShoppingBasket} label="Orders" value={totalOrders} sub={`${pendingOrders} to authorize`} color="bg-emerald-600" trend={8.2} />
        <StatCard icon={Users} label="Clients" value={customers.length} sub="Lifetime members" color="bg-purple-600" trend={5.7} />
        <StatCard icon={Bike} label="Inventory" value={products.length} sub={`${lowStockProducts.length} low priority targets`} color="bg-amber-600" trend={-2.1} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-xl font-black text-white tracking-tight">Revenue Overview</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Growth progression last 6 months</p>
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-amber-500">
                <TrendingUp size={20} />
            </div>
          </div>
          <BarChart data={salesData} />
        </div>

        {/* Category Donut */}
        <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-white tracking-tight">Segmentation</h2>
          </div>
          <DonutChart data={categoryData} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-white tracking-tight">Recent Activity</h2>
            <Link to="/admin/orders" className="text-amber-500 text-[10px] font-black uppercase tracking-widest hover:text-amber-400 flex items-center gap-2">
                Audit All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-4 p-5 bg-gray-800/30 rounded-2xl border border-gray-800/50 hover:border-amber-500/20 transition-all group">
                <div className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center text-lg font-black text-amber-500 group-hover:scale-110 transition-transform">
                    {order.name?.[0] || 'G'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">{order.id}</span>
                    <span className="text-sm font-bold text-white truncate">{order.name || order.customer || 'Guest'}</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-600 mt-1 line-clamp-1">{order.items?.map(i=>i.name).join(', ') || 'No items listed'}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-white">₹{(order.total || 0).toLocaleString()}</p>
                  <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest mt-1 inline-block ${statusColors[order.status] || 'bg-gray-700 text-gray-400'}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products + Low Stock */}
        <div className="space-y-8">
          <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-xl">
            <h2 className="text-xl font-black text-white tracking-tight mb-6">Top Assets</h2>
            <div className="space-y-5">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 group">
                  <span className="text-2xl font-black text-gray-800 group-hover:text-amber-500/20 transition-colors duration-500 italic">0{i+1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{p.name}</p>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{p.sold} Units Sold</p>
                  </div>
                  <span className="text-xs font-black text-emerald-400">₹{(p.price/1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-red-500/10 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-150 transition-transform duration-1000">
                <Box size={80} />
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
                  <Archive size={16} />
              </div>
              <h2 className="text-lg font-black text-white tracking-tight">Depletion Alerts</h2>
            </div>
            <div className="space-y-4 relative z-10">
              {lowStockProducts.slice(0,3).map(p => (
                <div key={p.id} className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-300 truncate flex-1">{p.name}</p>
                  <span className={`text-[10px] font-black uppercase tracking-widest ml-4 px-2 py-0.5 rounded-full ${p.stock === 0 ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {p.stock === 0 ? 'Exhausted' : `${p.stock} units`}
                  </span>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                  <div className="py-4 text-center">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest uppercase">Inventory Optimal</p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const statusColors = {
  Delivered: 'bg-emerald-500/10 text-emerald-400',
  Shipped: 'bg-blue-500/10 text-blue-400',
  Confirmed: 'bg-purple-500/10 text-purple-400',
  Pending: 'bg-amber-500/10 text-amber-400',
  Cancelled: 'bg-red-500/10 text-red-400',
};

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
          <g key={d.month} className="group/bar">
            <rect x={x} y={y} width={barW} height={barH} rx="12" fill={i === data.length - 1 ? '#f59e0b' : '#1f2937'} className="transition-all duration-300 group-hover/bar:fill-amber-500/50"/>
            <text x={x + barW / 2} y={h + 30} textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="bold" className="uppercase tracking-widest">{d.month}</text>
            <text x={x + barW / 2} y={y - 12} textAnchor="middle" fill={i === data.length - 1 ? '#f59e0b' : '#9ca3af'} fontSize="11" fontWeight="black">₹{(d.revenue/1000).toFixed(0)}k</text>
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
  const cx = 80, cy = 80, r = 60, innerR = 40;
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
    <div className="flex flex-col items-center gap-8">
      <svg viewBox="0 0 160 160" className="w-48 h-48 flex-shrink-0 drop-shadow-2xl">
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} className="hover:opacity-80 transition-opacity cursor-pointer" />)}
        <text x="80" y="78" textAnchor="middle" fill="white" fontSize="10" fontWeight="black" className="uppercase tracking-widest">Growth</text>
        <text x="80" y="92" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold" className="uppercase tracking-widest">Trajectory</text>
      </svg>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-3 group">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-lg" style={{background: colors[i]}}></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{d.name}</span>
            <span className="text-xs font-black text-white ml-auto">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function ArrowRight(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
}
