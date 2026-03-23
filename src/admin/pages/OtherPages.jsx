import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

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

export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useAdmin();
  const [showAdd, setShowAdd] = useState(false);
  const [editCat, setEditCat] = useState(null);
  const [formData, setFormData] = useState({ name: '', icon: '🚲' });

  const getCount = (name) => products.filter(p => p.category === name).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCat) {
      updateCategory(editCat.id, formData);
      setEditCat(null);
    } else {
      addCategory(formData);
    }
    setFormData({ name: '', icon: '🚲' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white">Categories</h1>
        <button onClick={() => setShowAdd(true)} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm">+ Add Category</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(c => (
          <div key={c.id} className={`bg-gray-900 border rounded-2xl p-5 hover:border-gray-700 transition-all ${c.active ? 'border-gray-800' : 'border-gray-800 opacity-60'}`}>
            <div className="flex justify-between items-start mb-3">
              <p className="text-3xl">{c.icon}</p>
              <button onClick={() => deleteCategory(c.id)} className="text-gray-600 hover:text-red-400">✕</button>
            </div>
            <p className="font-bold text-white">{c.name}</p>
            <p className="text-xs text-gray-500 mt-1">{getCount(c.name)} products</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => { setEditCat(c); setFormData({name:c.name, icon:c.icon}); setShowAdd(true); }} className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-white py-1.5 rounded-lg">Edit</button>
              <button onClick={() => updateCategory(c.id, { active: !c.active })} className={`flex-1 text-xs py-1.5 rounded-lg ${c.active ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{c.active ? 'Hide' : 'Show'}</button>
            </div>
          </div>
        ))}
      </div>

      {(showAdd || editCat) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h2 className="font-bold text-white text-lg">{editCat ? 'Edit Category' : 'Add New Category'}</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Icon (Emoji)</label>
              <input required value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setShowAdd(false); setEditCat(null); }} className="flex-1 bg-gray-800 text-white py-2.5 rounded-xl text-sm font-semibold">Cancel</button>
              <button type="submit" className="flex-1 bg-amber-500 text-gray-900 py-2.5 rounded-xl text-sm font-bold">{editCat ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
