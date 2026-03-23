import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export function Settings() {
  const [tab, setTab] = useState('general');
  const { categorizeAllProducts, resetToDefaultCategories } = useAdmin();
  const tabs = ['general', 'payment', 'tax', 'notifications', 'maintenance'];

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
        {tab === 'maintenance' && (
          <div className="space-y-6">
            <h2 className="font-bold text-white text-xl">Data Maintenance</h2>
            
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
              <h3 className="font-bold text-red-500 mb-2">Full Category Wipe & Re-seed</h3>
              <p className="text-gray-400 text-sm mb-4">This will delete ALL existing categories and create a new set of highly organized, industry-standard categories for a premium bicycle shop.</p>
              <button 
                type="button"
                onClick={() => { if(confirm('IRREVERSIBLE: Wipe all current categories and reset to defaults?')) resetToDefaultCategories() }}
                className="bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                Reset Infrastructure
              </button>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6">
              <h3 className="font-bold text-amber-500 mb-2">Categorize All Products</h3>
              <p className="text-gray-400 text-sm mb-4">Automatically assign categories to products based on their names. This will only affect products that are missing a category or have an invalid one.</p>
              <button 
                type="button"
                onClick={categorizeAllProducts}
                className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                Categorize All Products
              </button>
            </div>
          </div>
        )}
        {tab !== 'maintenance' && <button className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm transition-all">Save Settings</button>}
      </div>
    </div>
  );
}



export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useAdmin();
  const [showAdd, setShowAdd] = useState(false);
  const [editCat, setEditCat] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '', image: '', description: '', color: '#f59e0b', priority: 0 });

  const getCount = (name) => products.filter(p => p.category === name).length;

  const generateSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, priority: parseInt(formData.priority) };
    if (editCat) {
      updateCategory(editCat.id, data);
      setEditCat(null);
    } else {
      addCategory(data);
    }
    setFormData({ name: '', slug: '', image: '', description: '', color: '#f59e0b', priority: 0 });
    setShowAdd(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white px-2">Categories</h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] px-2 mt-1">Classification Infrastructure</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-2">
            <span className="text-lg">+</span> Create Segment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.sort((a,b) => (a.priority || 0) - (b.priority || 0)).map(c => (
          <div key={c.id} className={`group relative bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-[2.5rem] p-8 hover:border-amber-500/30 transition-all ${!c.active ? 'opacity-40 grayscale' : 'shadow-2xl shadow-black/40'}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] rounded-bl-full transition-all group-hover:scale-110`} style={{backgroundColor: c.color || '#f59e0b'}} />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-16 h-16 bg-gray-800/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner border border-gray-700/50">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => { setEditCat(c); setFormData({...c}); setShowAdd(true); }} className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </button>
                <button onClick={() => { if(confirm('Purge Category Segment?')) deleteCategory(c.id)}} className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
              </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full" style={{backgroundColor: c.color || '#f59e0b'}} />
                    <h3 className="font-black text-white text-xl tracking-tighter uppercase">{c.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest opacity-60">/{c.slug}</p>
                    <span className="text-[8px] font-black px-1.5 py-0.5 bg-gray-800 text-gray-500 rounded-md border border-gray-700 uppercase tracking-widest">P-{c.priority || 0}</span>
                </div>
                <p className="text-gray-500 text-[10px] font-medium mt-4 line-clamp-2 min-h-[2.5rem] leading-relaxed italic">
                    {c.description || "Segment lacks strategy overview. Update required."}
                </p>
                
                <div className="mt-8 flex items-center justify-between border-t border-gray-800/50 pt-5">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] leading-none mb-1">Asset Load</span>
                    <span className="text-base font-black text-white tracking-tighter">{getCount(c.name)} Units</span>
                  </div>
                  <button onClick={() => updateCategory(c.id, { active: !c.active })} className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${c.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                    {c.active ? 'Operational' : 'Deactivated'}
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {(showAdd || editCat) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-[3rem] p-10 max-w-lg w-full space-y-8 shadow-[0_0_100px_-20px_rgba(245,158,11,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.05] rounded-bl-full" style={{backgroundColor: formData.color}} />
            
            <div className="relative z-10">
                <h2 className="font-black text-white text-3xl tracking-tighter uppercase">{editCat ? 'Modify Segment' : 'New Classification'}</h2>
                <p className="text-amber-500/60 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Infrastructure Configuration</p>
            </div>

            <div className="grid grid-cols-2 gap-5 relative z-10">
              <div className="col-span-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Internal Title <span className="text-amber-500">*</span></label>
                <input 
                    required 
                    value={formData.name} 
                    onChange={e => {
                        const name = e.target.value;
                        setFormData({...formData, name: name, slug: generateSlug(name)});
                    }} 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-black tracking-tight" 
                    placeholder="e.g. PERFORMANCE ROAD"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Identifier Slug</label>
                <input 
                    required 
                    value={formData.slug} 
                    onChange={e => setFormData({...formData, slug: e.target.value})} 
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-amber-500/80 text-xs focus:outline-none focus:border-amber-500 font-black tracking-widest uppercase" 
                    placeholder="road-performance"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Strategic Weight</label>
                <input 
                    type="number"
                    value={formData.priority} 
                    onChange={e => setFormData({...formData, priority: e.target.value})} 
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-amber-500 font-black" 
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Asset Image URL</label>
                <input 
                    required 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})} 
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-white text-xs focus:outline-none focus:border-amber-500 font-bold" 
                    placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Brand Accent</label>
                <div className="flex gap-2">
                    <input 
                        type="color"
                        value={formData.color} 
                        onChange={e => setFormData({...formData, color: e.target.value})} 
                        className="w-14 h-14 bg-gray-950 border border-gray-800 p-1.5 rounded-2xl cursor-pointer" 
                    />
                    <input 
                        value={formData.color} 
                        onChange={e => setFormData({...formData, color: e.target.value})} 
                        className="flex-1 bg-gray-950 border border-gray-800 rounded-2xl px-4 py-4 text-white text-[10px] font-black uppercase tracking-widest focus:outline-none" 
                    />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Executive Summary</label>
                <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    rows={3}
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-white text-xs font-medium focus:outline-none focus:border-amber-500 resize-none leading-relaxed italic" 
                    placeholder="Define the core purpose and target audience for this segment..."
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 relative z-10">
              <button type="button" onClick={() => { setShowAdd(false); setEditCat(null); setFormData({ name:'', slug:'', image:'', description:'', color:'#f59e0b', priority:0 }); }} className="flex-1 bg-gray-800 text-gray-400 py-4.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-700 hover:text-white transition-all active:scale-95">Discard</button>
              <button type="submit" className="flex-1 bg-amber-500 text-gray-900 py-4.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-400 shadow-2xl shadow-amber-500/20 transition-all active:scale-95">
                  {editCat ? 'Authorize Update' : 'Initialize Segment'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
