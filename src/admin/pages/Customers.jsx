import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Customers() {
  const { customers, toggleCustomerStatus, orders } = useAdmin();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getCustomerOrders = (email) => orders.filter(o => o.email === email);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Customers</h1>
          <p className="text-gray-500 text-sm">{customers.length} registered customers</p>
        </div>
        <div className="flex gap-2">
          {['All','active','blocked'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${statusFilter === s ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{s}</button>
          ))}
        </div>
      </div>

      <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 w-full max-w-md" />

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Customer</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Contact</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Orders</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Total Spent</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Joined</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-800/30 transition-all">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">{(c.name || 'U')[0]}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.name || 'Unknown User'}</p>
                      <p className="text-xs text-gray-500">{c.city || 'No City'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="text-sm text-gray-300">{c.email}</p>
                  <p className="text-xs text-gray-500">{c.phone || 'No Phone'}</p>
                </td>
                <td className="px-5 py-3"><span className="text-sm font-bold text-white">{c.orders || 0}</span></td>
                <td className="px-5 py-3"><span className="text-sm font-bold text-emerald-400">₹{(c.totalSpent || 0).toLocaleString()}</span></td>
                <td className="px-5 py-3"><span className="text-xs text-gray-400">{c.joined}</span></td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{c.status}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(c)} className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg">Profile</button>
                    <button onClick={() => toggleCustomerStatus(c.id)} className={`text-xs px-2.5 py-1 rounded-lg transition-all ${c.status === 'active' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
                      {c.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between mb-5">
              <h2 className="font-black text-white text-lg">Customer Profile</h2>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-black text-2xl">{(selected.name || 'U')[0]}</div>
              <div>
                <h3 className="font-bold text-white text-lg">{selected.name || 'Unknown User'}</h3>
                <p className="text-gray-400 text-sm">{selected.email}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${selected.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{selected.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-xl font-black text-white">{selected.orders || 0}</p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-xl font-black text-emerald-400">₹{((selected.totalSpent || 0)/1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">Spent</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-xl font-black text-blue-400">{selected.city || '--'}</p>
                <p className="text-xs text-gray-500">City</p>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2">Order History</p>
              {getCustomerOrders(selected.email).length > 0 ? (
                getCustomerOrders(selected.email).map(o => (
                  <div key={o.id} className="flex justify-between py-1.5 border-b border-gray-700 last:border-0 text-sm">
                    <span className="font-mono text-amber-400 text-xs">{o.id}</span>
                    <span className="text-gray-300">₹{(o.total || 0).toLocaleString()}</span>
                    <span className={`text-xs ${o.status === 'Delivered' ? 'text-emerald-400' : 'text-gray-400'}`}>{o.status}</span>
                  </div>
                ))
              ) : <p className="text-xs text-gray-500">No orders found</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
