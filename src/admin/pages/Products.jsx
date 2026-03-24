import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const statusColors = { active: 'bg-emerald-500/10 text-emerald-400', inactive: 'bg-gray-700 text-gray-400' };

export default function Products() {
  const { products, deleteProduct, updateProduct, categories: dynamicCategories } = useAdmin();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const categories = ['All', ...new Set(dynamicCategories.map(c => c.name))];
  const filtered = products.filter(p => {
    const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || (p.sku || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmDelete(null);
  };

  const toggleStatus = (p) => {
    updateProduct(p.id, { ...p, status: p.status === 'active' ? 'inactive' : 'active' });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Products</h1>
          <p className="text-gray-500 text-sm">{products.length} total products</p>
        </div>
        <Link to="/admin/products/add" className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm transition-all">+ Add Product</Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 flex-1 min-w-48"
        />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option>All</option><option>active</option><option>inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Product</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">SKU</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Price</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Stock</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-800/30 transition-all">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><span className="font-mono text-xs text-gray-400">{product.sku}</span></td>
                  <td className="px-5 py-3"><span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg">{product.category}</span></td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-bold text-white">₹{(product.price || 0).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 line-through">₹{(product.mrp || 0).toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-bold ${product.stock === 0 ? 'text-red-400' : product.stock <= 3 ? 'text-amber-400' : 'text-emerald-400'}`}>{product.stock === 0 ? 'Out of Stock' : product.stock}</span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleStatus(product)} className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${statusColors[product.status]}`}>{product.status}</button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg transition-all">Edit</button>
                      <button onClick={() => setConfirmDelete(product.id)} className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition-all">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No products found</div>}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="font-bold text-white text-lg mb-2">Delete Product?</h3>
            <p className="text-gray-400 text-sm mb-5">This action cannot be undone. The product will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-xl text-sm font-semibold transition-all">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 rounded-xl text-sm font-semibold transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
