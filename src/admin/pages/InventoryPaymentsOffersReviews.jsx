import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export function Inventory() {
  const { products, updateProduct } = useAdmin();
  const dynamicCategoryOptions = ['All Types', ...new Set(products.map(p => p.category).filter(Boolean))];
  const [editStock, setEditStock] = useState({});
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('In Shop');
  
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const filtered = products.filter(p => {
    const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || (p.sku || '').toLowerCase().includes(search.toLowerCase()) || (p.brand || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || catFilter === 'All Types' || p.category === catFilter;
    
    let matchStock = true;
    if (stockFilter === 'Available') matchStock = p.stock > 3;
    if (stockFilter === 'Almost Gone') matchStock = p.stock > 0 && p.stock <= 3;
    if (stockFilter === 'Sold Out') matchStock = p.stock === 0;

    return matchSearch && matchCat && matchStock;
  });

  const handleStockUpdate = (id, newStock) => {
    updateProduct(id, typeof newStock === 'string' ? { stock: parseInt(newStock) } : { stock: newStock });
    setEditStock(prev => { const n = {...prev}; delete n[id]; return n; });
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-white">Items in Shop</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search by name, company, or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 w-full"
        />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option value="All">All Types</option>
          {dynamicCategoryOptions.filter(c => c !== 'All Types').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={stockFilter} onChange={e => setStockFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option>In Shop</option>
          <option>Available</option>
          <option>Almost Gone</option>
          <option>Sold Out</option>
        </select>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <p className="text-red-400 font-bold text-sm mb-2">⚠️ {lowStockProducts.length} items almost empty</p>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.slice(0, 10).map(p => (
              <span key={p.id} className="text-xs bg-red-500/10 text-red-300 px-2 py-1 rounded-lg">{p.name} ({p.stock})</span>
            ))}
            {lowStockProducts.length > 10 && <span className="text-xs text-gray-500">+{lowStockProducts.length - 10} more...</span>}
          </div>
        </div>
      )}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Cycle Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">ID Number</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Count</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Change</th>
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
                    {p.stock === 0 && <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">Sold Out</span>}
                    {p.stock > 0 && p.stock <= 3 && <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">Almost Gone</span>}
                    {p.stock > 3 && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">OK</span>}
                  </td>
                  <td className="px-5 py-3">
                    {editStock[p.id] !== undefined ? (
                      <div className="flex gap-2">
                        <input type="number" value={editStock[p.id]} onChange={e => setEditStock(prev => ({...prev, [p.id]: e.target.value}))} className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-amber-500" />
                        <button onClick={() => handleStockUpdate(p.id, editStock[p.id])} className="text-xs bg-amber-500 text-gray-900 font-bold px-2 py-1 rounded-lg">Confirm</button>
                        <button onClick={() => setEditStock(prev => { const n = {...prev}; delete n[p.id]; return n; })} className="text-xs text-gray-500 hover:text-white">✕</button>
                      </div>
                    ) : (
                      <button onClick={() => setEditStock(prev => ({...prev, [p.id]: p.stock}))} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2.5 py-1 rounded-lg transition-all">Change Count</button>
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

