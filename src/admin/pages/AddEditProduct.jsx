import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Orange', 'Yellow', 'Pink', 'Grey'];
const gears = ['Single', '3-speed', '7-speed', '16-speed', '21-speed', '24-speed', '27-speed'];

export default function AddEditProduct() {
  const { id } = useParams();
  const { products, categories: dynamicCategories, addProduct, updateProduct } = useAdmin();
  const navigate = useNavigate();

  const categories = dynamicCategories.filter(c => c.active).map(c => c.name);
  const isEdit = !!id;
  const existing = products.find(p => p.id === parseInt(id));

  const [form, setForm] = useState({
    name: '', brand: '', category: 'Mountain Bikes', sku: '', price: '', mrp: '',
    stock: '', status: 'active', description: '',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
    variants: [], rating: 4.5, sold: 0
  });
  const [variant, setVariant] = useState({ size: 'M', color: 'Black', gear: '21-speed', stock: 0 });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isEdit && existing) setForm({ ...existing });
  }, [id]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addVariant = () => {
    if (form.variants.find(v => v.size === variant.size && v.color === variant.color)) return;
    set('variants', [...form.variants, { ...variant }]);
  };

  const removeVariant = (i) => set('variants', form.variants.filter((_, idx) => idx !== i));

  const handleSave = (e) => {
    e.preventDefault();
    const data = { ...form, price: parseInt(form.price), mrp: parseInt(form.mrp), stock: parseInt(form.stock) };
    if (isEdit) updateProduct(parseInt(id), data);
    else addProduct(data);
    setSaved(true);
    setTimeout(() => navigate('/admin/products'), 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/products')} className="text-gray-400 hover:text-white">←</button>
        <h1 className="text-2xl font-black text-white">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      </div>

      {saved && <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-400 text-sm">✓ Product saved successfully! Redirecting...</div>}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Basic Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider text-gray-400">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Product Name *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="e.g. Trek Marlin 7" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Brand *</label>
              <input required value={form.brand} onChange={e => set('brand', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="e.g. Trek" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">SKU *</label>
              <input required value={form.sku} onChange={e => set('sku', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 font-mono" placeholder="TRK-MAR-7-BL" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 resize-none" placeholder="Product description..." />
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400">Pricing & Stock</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">MRP (₹) *</label>
              <input required type="number" value={form.mrp} onChange={e => set('mrp', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="99999" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Selling Price (₹) *</label>
              <input required type="number" value={form.price} onChange={e => set('price', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="89999" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Stock Qty *</label>
              <input required type="number" value={form.stock} onChange={e => set('stock', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="10" />
            </div>
          </div>
          {form.price && form.mrp && <p className="text-xs text-emerald-400">Discount: {Math.round(((form.mrp - form.price) / form.mrp) * 100)}% off</p>}
        </div>

        {/* Images */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400">Product Image</h2>
          <div className="flex gap-4 items-start">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
              <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Image URL</label>
              <input value={form.image} onChange={e => set('image', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" placeholder="https://..." />
              <p className="text-xs text-gray-500 mt-1.5">Paste an image URL or use Unsplash links</p>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400">Product Variants</h2>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Size</label>
              <select value={variant.size} onChange={e => setVariant(v => ({...v, size: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
                {sizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Color</label>
              <select value={variant.color} onChange={e => setVariant(v => ({...v, color: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
                {colors.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Gear Type</label>
              <select value={variant.gear} onChange={e => setVariant(v => ({...v, gear: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
                {gears.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Stock</label>
              <input type="number" value={variant.stock} onChange={e => setVariant(v => ({...v, stock: parseInt(e.target.value)}))} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500" />
            </div>
          </div>
          <button type="button" onClick={addVariant} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">+ Add Variant</button>
          {form.variants.length > 0 && (
            <div className="space-y-2">
              {form.variants.map((v, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3">
                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{v.size}</span>
                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{v.color}</span>
                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{v.gear}</span>
                  <span className="text-xs text-gray-400 flex-1">Stock: {v.stock}</span>
                  <button type="button" onClick={() => removeVariant(i)} className="text-red-400 hover:text-red-300 text-xs">✕ Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-3">Product Status</h2>
          <div className="flex gap-3">
            {['active', 'inactive'].map(s => (
              <button key={s} type="button" onClick={() => set('status', s)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${form.status === s ? (s === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-700 text-gray-300') : 'bg-gray-800 text-gray-500 hover:bg-gray-700'}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/admin/products')} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all">Cancel</button>
          <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-400 text-gray-900 py-3 rounded-xl font-bold transition-all">{isEdit ? 'Update Product' : 'Save Product'}</button>
        </div>
      </form>
    </div>
  );
}
