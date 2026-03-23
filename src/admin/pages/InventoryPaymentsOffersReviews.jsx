import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export function Inventory() {
  const { products, updateProduct } = useAdmin();
  const [editStock, setEditStock] = useState({});
  const lowStock = products.filter(p => p.stock <= 5);

  const handleStockUpdate = (id, newStock) => {
    updateProduct(id, { stock: parseInt(newStock) });
    setEditStock(prev => { const n = {...prev}; delete n[id]; return n; });
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Inventory Management</h1>
      {lowStock.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <p className="text-red-400 font-bold text-sm mb-2">⚠️ {lowStock.length} products need restocking</p>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(p => (
              <span key={p.id} className="text-xs bg-red-500/10 text-red-300 px-2 py-1 rounded-lg">{p.name} ({p.stock} left)</span>
            ))}
          </div>
        </div>
      )}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Product</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">SKU</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Category</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Stock</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Alert</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {products.map(p => (
              <tr key={p.id} className={`hover:bg-gray-800/30 transition-all ${p.stock <= 3 ? 'bg-red-500/5' : ''}`}>
                <td className="px-5 py-3"><p className="text-sm font-semibold text-white">{p.name}</p><p className="text-xs text-gray-500">{p.brand}</p></td>
                <td className="px-5 py-3"><span className="font-mono text-xs text-gray-400">{p.sku}</span></td>
                <td className="px-5 py-3"><span className="text-xs text-gray-400">{p.category}</span></td>
                <td className="px-5 py-3">
                  <span className={`text-sm font-bold ${p.stock === 0 ? 'text-red-400' : p.stock <= 3 ? 'text-amber-400' : 'text-emerald-400'}`}>{p.stock}</span>
                </td>
                <td className="px-5 py-3">
                  {p.stock === 0 && <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">Out of Stock</span>}
                  {p.stock > 0 && p.stock <= 3 && <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">Low Stock</span>}
                  {p.stock > 3 && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">OK</span>}
                </td>
                <td className="px-5 py-3">
                  {editStock[p.id] !== undefined ? (
                    <div className="flex gap-2">
                      <input type="number" value={editStock[p.id]} onChange={e => setEditStock(prev => ({...prev, [p.id]: e.target.value}))} className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-amber-500" />
                      <button onClick={() => handleStockUpdate(p.id, editStock[p.id])} className="text-xs bg-amber-500 text-gray-900 font-bold px-2 py-1 rounded-lg">Save</button>
                      <button onClick={() => setEditStock(prev => { const n = {...prev}; delete n[p.id]; return n; })} className="text-xs text-gray-500 hover:text-white">✕</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditStock(prev => ({...prev, [p.id]: p.stock}))} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2.5 py-1 rounded-lg transition-all">Edit Stock</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Payments() {
  const { orders } = useAdmin();
  const paid = orders.filter(o => o.paymentStatus === 'Paid');
  const failed = orders.filter(o => o.paymentStatus === 'Failed');
  const pending = orders.filter(o => o.paymentStatus === 'Pending');
  const totalRevenue = paid.reduce((a, b) => a + b.total, 0);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Payments</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-2xl font-black text-emerald-400">₹{(totalRevenue/1000).toFixed(0)}k</p>
          <p className="text-gray-400 text-sm mt-1">Total Revenue</p>
          <p className="text-xs text-gray-600">{paid.length} transactions</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-2xl font-black text-red-400">{failed.length}</p>
          <p className="text-gray-400 text-sm mt-1">Failed Payments</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-2xl font-black text-amber-400">{pending.length}</p>
          <p className="text-gray-400 text-sm mt-1">Pending (COD)</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white">Transaction History</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Order ID</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Customer</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Amount</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Method</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-800/30 transition-all">
                <td className="px-5 py-3"><span className="font-mono text-xs text-amber-400">{o.id}</span></td>
                <td className="px-5 py-3"><span className="text-sm text-white">{o.customer}</span></td>
                <td className="px-5 py-3"><span className="text-sm font-bold text-white">₹{o.total.toLocaleString()}</span></td>
                <td className="px-5 py-3"><span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg">{o.payment}</span></td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${o.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : o.paymentStatus === 'Failed' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>{o.paymentStatus}</span>
                </td>
                <td className="px-5 py-3"><span className="text-xs text-gray-500">{o.date}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Offers() {
  const { coupons, addCoupon, deleteCoupon } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'percentage', value: '', minOrder: '', maxUses: '', expiry: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    addCoupon({ ...form, value: parseInt(form.value), minOrder: parseInt(form.minOrder), maxUses: parseInt(form.maxUses) });
    setForm({ code: '', type: 'percentage', value: '', minOrder: '', maxUses: '', expiry: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Offers & Coupons</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm transition-all">+ Create Coupon</button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4">New Coupon</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Coupon Code *</label><input required value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 font-mono" placeholder="BIKE20" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Discount Type</label><select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"><option value="percentage">Percentage (%)</option><option value="fixed">Fixed Amount (₹)</option></select></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Value *</label><input required type="number" value={form.value} onChange={e => setForm(f => ({...f, value: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder={form.type === 'percentage' ? '20' : '500'} /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Min Order (₹)</label><input type="number" value={form.minOrder} onChange={e => setForm(f => ({...f, minOrder: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="1000" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Max Uses</label><input type="number" value={form.maxUses} onChange={e => setForm(f => ({...f, maxUses: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="100" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 mb-1.5">Expiry Date</label><input type="date" value={form.expiry} onChange={e => setForm(f => ({...f, expiry: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" /></div>
            <div className="col-span-2 flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl font-semibold text-sm">Cancel</button>
              <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-400 text-gray-900 py-2.5 rounded-xl font-bold text-sm">Create Coupon</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map(c => (
          <div key={c.id} className={`bg-gray-900 border rounded-2xl p-5 ${c.status === 'active' ? 'border-gray-800' : 'border-gray-700/30 opacity-60'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-black text-amber-400 text-xl font-mono">{c.code}</p>
                <p className="text-xs text-gray-500 mt-0.5">Expires: {c.expiry}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-500'}`}>{c.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-gray-800 rounded-xl p-2"><p className="text-base font-black text-white">{c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}</p><p className="text-xs text-gray-500">Discount</p></div>
              <div className="bg-gray-800 rounded-xl p-2"><p className="text-base font-black text-white">{c.used}/{c.maxUses}</p><p className="text-xs text-gray-500">Used</p></div>
              <div className="bg-gray-800 rounded-xl p-2"><p className="text-base font-black text-white">₹{(c.minOrder/1000).toFixed(0)}k</p><p className="text-xs text-gray-500">Min Order</p></div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{width:`${Math.min((c.used/c.maxUses)*100,100)}%`}}></div>
            </div>
            <button onClick={() => deleteCoupon(c.id)} className="w-full text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 py-1.5 rounded-lg transition-all">Delete Coupon</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  const { reviews, updateReviewStatus } = useAdmin();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? reviews : reviews.filter(r => r.status === filter);
  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5-n);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Reviews & Ratings</h1>
        <div className="flex gap-2">
          {['All','pending','approved','spam'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{f}</button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map(r => (
          <div key={r.id} className={`bg-gray-900 border rounded-2xl p-5 ${r.status === 'spam' ? 'border-red-500/20' : r.status === 'pending' ? 'border-amber-500/20' : 'border-gray-800'}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-400 text-sm">{stars(r.rating)}</span>
                  <span className="text-xs text-gray-500">({r.rating}/5)</span>
                </div>
                <p className="font-semibold text-white">{r.customer}</p>
                <p className="text-xs text-gray-500">on {r.product} · {r.date}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : r.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>{r.status}</span>
            </div>
            <p className="text-gray-300 text-sm mt-3 bg-gray-800/50 rounded-xl p-3">{r.comment}</p>
            <div className="flex gap-2 mt-3">
              {r.status !== 'approved' && <button onClick={() => updateReviewStatus(r.id, 'approved')} className="text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-all">✓ Approve</button>}
              {r.status !== 'spam' && <button onClick={() => updateReviewStatus(r.id, 'spam')} className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all">🚫 Mark Spam</button>}
              {r.status !== 'pending' && <button onClick={() => updateReviewStatus(r.id, 'pending')} className="text-xs bg-gray-800 text-gray-400 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-all">Reset</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
