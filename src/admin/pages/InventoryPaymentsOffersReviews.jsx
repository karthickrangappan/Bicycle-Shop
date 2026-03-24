import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export function Inventory() {
  const { products, updateProduct, categories } = useAdmin();
  const [editStock, setEditStock] = useState({});
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  
  const lowStock = products.filter(p => p.stock <= 5);

  const filtered = products.filter(p => {
    const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || (p.sku || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || catFilter === 'All Categories' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleStockUpdate = (id, newStock) => {
    updateProduct(id, { stock: parseInt(newStock) });
    setEditStock(prev => { const n = {...prev}; delete n[id]; return n; });
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Inventory Management</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 flex-1 min-w-48"
        />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option>All Categories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

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
        <div className="overflow-x-auto">
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
              {filtered.map(p => (
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
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No products found</div>}
        </div>
      </div>
    </div>
  );
}

