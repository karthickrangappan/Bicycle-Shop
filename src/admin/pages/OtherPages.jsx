import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { salesData } from '../data/mockData';

// Simple bar SVG
const MiniBar = ({ data, key_x, key_y, color = '#f59e0b' }) => {
  const max = Math.max(...data.map(d => d[key_y]));
  return (
    <svg viewBox="0 0 420 120" className="w-full h-24">
      {data.map((d, i) => {
        const x = i * 60 + 10;
        const barH = (d[key_y] / max) * 90;
        return (
          <g key={i}>
            <rect x={x} y={120 - barH - 20} width={40} height={barH} rx="4" fill={i === data.length-1 ? color : '#374151'}/>
            <text x={x+20} y={115} textAnchor="middle" fill="#6b7280" fontSize="10">{d[key_x]}</text>
          </g>
        );
      })}
    </svg>
  );
};

export function Reports() {
  const { orders, products, customers } = useAdmin();
  const totalRevenue = orders.filter(o => o.paymentStatus === 'Paid').reduce((a,b) => a+b.total, 0);
  const topProducts = [...products].sort((a,b) => b.sold - a.sold).slice(0,5);
  
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Reports & Analytics</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue/100000).toFixed(1)}L`, icon: '💰', color: 'text-amber-400' },
          { label: 'Orders Placed', value: orders.length, icon: '📦', color: 'text-blue-400' },
          { label: 'Customers', value: customers.length, icon: '👤', color: 'text-purple-400' },
          { label: 'Products Listed', value: products.length, icon: '🚲', color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-2xl">{s.icon}</p>
            <p className={`text-2xl font-black mt-2 ${s.color}`}>{s.value}</p>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4">Monthly Revenue</h2>
          <MiniBar data={salesData} key_x="month" key_y="revenue" />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4">Monthly Orders</h2>
          <MiniBar data={salesData} key_x="month" key_y="orders" color="#3b82f6" />
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h2 className="font-bold text-white mb-4">Top Performing Products</h2>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4">
              <span className="text-gray-600 font-black w-6 text-right">#{i+1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white">{p.name}</span>
                  <span className="text-xs text-gray-400">{p.sold} sold · ₹{(p.price*p.sold/100000).toFixed(1)}L revenue</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full">
                  <div className="h-1.5 bg-amber-500 rounded-full" style={{width:`${(p.sold/145)*100}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const { services, updateServiceStatus } = useAdmin();
  const statusColors = { Pending: 'bg-amber-500/10 text-amber-400', 'In Progress': 'bg-blue-500/10 text-blue-400', Completed: 'bg-emerald-500/10 text-emerald-400' };
  
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white">Service Bookings 🔧</h1>
        <div className="flex gap-3">
          {['Pending','In Progress','Completed'].map(s => (
            <div key={s} className="text-center">
              <p className={`text-xl font-black ${s === 'Pending' ? 'text-amber-400' : s === 'In Progress' ? 'text-blue-400' : 'text-emerald-400'}`}>{services.filter(sv => sv.status === s).length}</p>
              <p className="text-xs text-gray-500">{s}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              {['Customer','Bike','Issue','Date','Technician','Status','Action'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {services.map(s => (
              <tr key={s.id} className="hover:bg-gray-800/30">
                <td className="px-5 py-3"><p className="text-sm text-white">{s.customer}</p><p className="text-xs text-gray-500">{s.phone}</p></td>
                <td className="px-5 py-3"><p className="text-sm text-gray-300">{s.bike}</p></td>
                <td className="px-5 py-3"><p className="text-xs text-gray-400 max-w-32 truncate">{s.issue}</p></td>
                <td className="px-5 py-3"><span className="text-xs text-gray-500">{s.date}</span></td>
                <td className="px-5 py-3"><span className="text-sm text-gray-300">{s.technician}</span></td>
                <td className="px-5 py-3"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[s.status]}`}>{s.status}</span></td>
                <td className="px-5 py-3">
                  <select value={s.status} onChange={e => updateServiceStatus(s.id, e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-amber-500">
                    <option>Pending</option><option>In Progress</option><option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CMS() {
  const { banners, setBanners } = useAdmin();
  const [editBanner, setEditBanner] = useState(null);

  const toggleBanner = (id) => setBanners(prev => prev.map(b => b.id === id ? {...b, status: b.status === 'active' ? 'inactive' : 'active'} : b));

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white">Content Management (CMS)</h1>
        <button className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm">+ Add Banner</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {banners.map(b => (
          <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="relative h-40">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-bold text-sm">{b.title}</p>
                <p className="text-gray-300 text-xs">{b.subtitle}</p>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${b.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>{b.status}</span>
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-xl text-xs font-semibold transition-all">Edit</button>
              <button onClick={() => toggleBanner(b.id)} className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${b.status === 'active' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
                {b.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h2 className="font-bold text-white mb-4">Static Pages</h2>
        <div className="grid grid-cols-2 gap-3">
          {['About Us', 'Contact Page', 'Privacy Policy', 'Terms & Conditions', 'Shipping Policy', 'Return Policy'].map(page => (
            <div key={page} className="flex items-center justify-between bg-gray-800/50 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-300">{page}</span>
              <button className="text-xs text-amber-400 hover:text-amber-300">Edit →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Shipping() {
  const zones = [
    { id: 1, name: 'Local (Madurai)', states: 'Tamil Nadu', charge: 0, days: '1-2', free_above: 2000 },
    { id: 2, name: 'South India', states: 'TN, KL, AP, KA, TS', charge: 150, days: '2-4', free_above: 5000 },
    { id: 3, name: 'North India', states: 'DL, MH, GJ, RJ, UP', charge: 250, days: '4-6', free_above: 8000 },
    { id: 4, name: 'North East & Islands', states: 'NE states, A&N, Lakshadweep', charge: 500, days: '7-10', free_above: 15000 },
  ];
  
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Shipping Management 🚚</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h2 className="font-bold text-white mb-4">Delivery Zones</h2>
        <div className="space-y-3">
          {zones.map(z => (
            <div key={z.id} className="flex items-center gap-4 bg-gray-800/50 rounded-xl p-4">
              <div className="flex-1">
                <p className="font-semibold text-white">{z.name}</p>
                <p className="text-xs text-gray-500">{z.states}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">{z.charge === 0 ? 'Free' : `₹${z.charge}`}</p>
                <p className="text-xs text-gray-500">Shipping</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-emerald-400">{z.days} days</p>
                <p className="text-xs text-gray-500">Delivery</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-amber-400">₹{z.free_above.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Free above</p>
              </div>
              <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-all">Edit</button>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Same Day Delivery', note:'Available in Madurai only', icon:'⚡'}, {label:'Express Delivery (2-day)', note:'South India cities', icon:'🚀'}, {label:'Free Shipping Threshold', note:'Currently: ₹2,000 and above', icon:'🎁'}].map(s => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-2xl mb-2">{s.icon}</p>
            <p className="font-bold text-white text-sm">{s.label}</p>
            <p className="text-xs text-gray-500 mt-1">{s.note}</p>
            <button className="mt-3 text-xs text-amber-400 hover:text-amber-300">Configure →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Settings() {
  const [tab, setTab] = useState('general');
  const tabs = ['general', 'payment', 'tax', 'notifications'];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Settings ⚙️</h1>
      <div className="flex gap-2 border-b border-gray-800 pb-0">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 capitalize text-sm font-semibold border-b-2 transition-all -mb-px ${tab === t ? 'border-amber-500 text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>{t}</button>
        ))}
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        {tab === 'general' && (
          <>
            <h2 className="font-bold text-white">General Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Store Name', 'VeloCycle Bicycle Shop'], ['Tagline', 'Ride Your Dream'], ['Support Email', 'support@velocycle.in'], ['Phone', '+91 98765 43210'], ['Address', '12 Bike Street, Madurai - 625001'], ['Currency', 'INR (₹)']].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">{label}</label>
                  <input defaultValue={placeholder} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" />
                </div>
              ))}
            </div>
          </>
        )}
        {tab === 'payment' && (
          <>
            <h2 className="font-bold text-white">Payment Gateway Settings</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-3"><p className="font-semibold text-white">Razorpay</p><span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">Connected</span></div>
                {[['API Key', 'rzp_live_XXXXXXXXXX'],['API Secret', '••••••••••••••••']].map(([l,p]) => (
                  <div key={l} className="mb-3"><label className="block text-xs text-gray-400 mb-1">{l}</label><input defaultValue={p} type={l.includes('Secret') ? 'password' : 'text'} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" /></div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-xl p-4"><span className="text-white font-semibold">Cash on Delivery (COD)</span><div className="w-12 h-6 bg-amber-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-xl p-4"><span className="text-white font-semibold">UPI Payments</span><div className="w-12 h-6 bg-amber-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
            </div>
          </>
        )}
        {tab === 'tax' && (
          <>
            <h2 className="font-bold text-white">Tax (GST) Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['GSTIN', '33AABCP1234A1Z5'],['Business Name','VeloCycle Pvt Ltd'],['State','Tamil Nadu'],['GST Rate (Bicycles)','12%'],['GST Rate (Accessories)','18%']].map(([l,p]) => (
                <div key={l}><label className="block text-xs font-semibold text-gray-400 mb-1.5">{l}</label><input defaultValue={p} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" /></div>
              ))}
            </div>
          </>
        )}
        {tab === 'notifications' && (
          <>
            <h2 className="font-bold text-white">Notification Settings</h2>
            <div className="space-y-3">
              {['New order placed','Order status changed','Low stock alert','New customer registered','Review submitted','Coupon used'].map(n => (
                <div key={n} className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-sm text-gray-300">{n}</span>
                  <div className="flex gap-4">
                    {['Email','SMS','Push'].map(ch => (
                      <label key={ch} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked={ch === 'Email'} className="accent-amber-500 w-3.5 h-3.5" />
                        <span className="text-xs text-gray-500">{ch}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <button className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm transition-all">Save Settings</button>
      </div>
    </div>
  );
}

export function AdminUsers() {
  const { admins, setAdmins } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'manager' });
  const roles = { super_admin: 'Super Admin', manager: 'Manager', support: 'Support' };
  const roleColors = { super_admin: 'text-amber-400 bg-amber-500/10', manager: 'text-blue-400 bg-blue-500/10', support: 'text-purple-400 bg-purple-500/10' };
  const permissions = {
    super_admin: ['All modules', 'Delete records', 'User management', 'Settings access'],
    manager: ['Products', 'Orders', 'Inventory', 'Reports'],
    support: ['Orders view', 'Customer support', 'Reviews'],
  };

  const addAdmin = (e) => {
    e.preventDefault();
    setAdmins(prev => [...prev, { ...form, id: Date.now(), status: 'active', lastLogin: 'Never' }]);
    setForm({ name: '', email: '', role: 'manager' });
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white">Admin Users 🔑</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm transition-all">+ Add Admin</button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4">New Admin User</h2>
          <form onSubmit={addAdmin} className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Name</label><input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Email</label><input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Role</label><select value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"><option value="manager">Manager</option><option value="support">Support</option><option value="super_admin">Super Admin</option></select></div>
            <div className="col-span-3 flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-800 text-white py-2.5 rounded-xl text-sm font-semibold">Cancel</button>
              <button type="submit" className="flex-1 bg-amber-500 text-gray-900 py-2.5 rounded-xl text-sm font-bold">Add Admin</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {admins.map(a => (
          <div key={a.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-start gap-5">
            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 font-black text-xl flex-shrink-0">{a.name[0]}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-bold text-white">{a.name}</p>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${roleColors[a.role]}`}>{roles[a.role]}</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">{a.status}</span>
              </div>
              <p className="text-gray-500 text-sm">{a.email}</p>
              <p className="text-xs text-gray-600 mt-0.5">Last login: {a.lastLogin}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(permissions[a.role] || []).map(p => <span key={p} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-lg">{p}</span>)}
              </div>
            </div>
            {a.role !== 'super_admin' && (
              <button onClick={() => setAdmins(prev => prev.filter(ad => ad.id !== a.id))} className="text-xs text-red-400 hover:text-red-300">Remove</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Logs() {
  const { logs } = useAdmin();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Activity Logs 📜</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex justify-between items-center">
          <p className="font-bold text-white">{logs.length} activities logged</p>
          <button className="text-xs text-gray-500 hover:text-white bg-gray-800 px-3 py-1.5 rounded-lg">Export CSV</button>
        </div>
        <div className="divide-y divide-gray-800">
          {logs.map((l, i) => (
            <div key={l.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-800/30 transition-all">
              <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">{l.admin[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white"><span className="text-amber-400">{l.admin}</span> {l.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">→ {l.target}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-400">{l.time}</p>
                <p className="text-xs text-gray-600">{l.ip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Categories() {
  const [categories] = useState([
    { id: 1, name: 'Mountain Bikes', icon: '⛰️', count: 3, active: true },
    { id: 2, name: 'Road Bikes', icon: '🛣️', count: 2, active: true },
    { id: 3, name: 'Hybrid Bikes', icon: '🔀', count: 2, active: true },
    { id: 4, name: 'Kids Bikes', icon: '👶', count: 1, active: true },
    { id: 5, name: 'Helmets', icon: '⛑️', count: 3, active: true },
    { id: 6, name: 'Lights', icon: '💡', count: 2, active: true },
    { id: 7, name: 'Pumps', icon: '🔧', count: 2, active: true },
    { id: 8, name: 'Spare Parts', icon: '⚙️', count: 4, active: false },
  ]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white">Categories</h1>
        <button className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm">+ Add Category</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(c => (
          <div key={c.id} className={`bg-gray-900 border rounded-2xl p-5 hover:border-gray-700 transition-all ${c.active ? 'border-gray-800' : 'border-gray-800 opacity-60'}`}>
            <p className="text-3xl mb-3">{c.icon}</p>
            <p className="font-bold text-white">{c.name}</p>
            <p className="text-xs text-gray-500 mt-1">{c.count} products</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-white py-1.5 rounded-lg">Edit</button>
              <button className={`flex-1 text-xs py-1.5 rounded-lg ${c.active ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{c.active ? 'Hide' : 'Show'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SpareParts() {
  const { spareParts } = useAdmin();
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white">Spare Parts Catalog ⚙️</h1>
        <button className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm">+ Add Part</button>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              {['Part Name','Category','SKU','Price','Stock','Compatible With','Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {spareParts.map(p => (
              <tr key={p.id} className="hover:bg-gray-800/30">
                <td className="px-5 py-3"><p className="text-sm font-semibold text-white">{p.name}</p></td>
                <td className="px-5 py-3"><span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg">{p.category}</span></td>
                <td className="px-5 py-3"><span className="font-mono text-xs text-gray-400">{p.sku}</span></td>
                <td className="px-5 py-3"><span className="text-sm font-bold text-white">₹{p.price}</span></td>
                <td className="px-5 py-3"><span className={`text-sm font-bold ${p.stock <= 3 ? 'text-amber-400' : 'text-emerald-400'}`}>{p.stock}</span></td>
                <td className="px-5 py-3"><div className="flex flex-wrap gap-1">{p.compatible.map(c => <span key={c} className="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">{c}</span>)}</div></td>
                <td className="px-5 py-3"><button className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
