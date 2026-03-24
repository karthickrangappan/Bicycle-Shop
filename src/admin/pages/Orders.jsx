import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const statusColors = {
  Delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Shipped: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Assembling: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Processing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  'Refund Requested': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Collect: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Refund: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

// Perfectly synced with MyOrders.jsx live tracking flow
const statusFlow = ['Pending', 'Processing', 'Assembling', 'Shipped', 'Delivered'];
const refundFlow = ['Refund Requested', 'Collect', 'Refund'];

function InvoiceModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[80] p-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-[2rem] p-10 max-w-xl w-full text-gray-900 shadow-2xl relative overflow-hidden">
        {/* Subtle watermark or pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full -translate-y-20 translate-x-20 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-10 relative">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
               <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <path d="M15 17.5L8.5 17.5" />
                  <path d="M15 17.5L13 10L10 10L8.5 17.5" />
                  <path d="M13 10L11 4" />
               </svg>
             </div>
             <div>
                <h2 className="text-xl font-black tracking-tighter uppercase">CycleCore</h2>
                <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest leading-none">Official Receipt</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 transition-all">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-y-6 mb-10">
          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Invoice ID</p><p className="font-bold text-sm">#{order.id?.slice(-8) || 'N/A'}</p></div>
          <div className="text-right"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p><p className="font-bold text-sm">{order.date ? new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}</p></div>
          
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Billed To</p>
            <p className="font-bold text-sm">{order.customer || order.customerName || 'Guest'}</p>
            <p className="text-xs text-slate-500 font-medium">{order.email || order.customerEmail || ''}</p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{order.address || 'Address Not Provided'}</p>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Method</p>
            <p className="font-bold text-sm uppercase tracking-tight">{order.payment || order.paymentMethod || 'N/A'}</p>
            <span className={`text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-lg border inline-block mt-1 ${order.paymentStatus === 'Paid' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 'border-amber-200 text-amber-600 bg-amber-50'}`}>
              {order.paymentStatus || 'Awaiting Payment'}
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-xl">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</span>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</span>
          </div>
          <div className="space-y-3">
            {(order.items || []).map((item, i) => (
              <div key={i} className="flex justify-between items-center px-4">
                <div>
                  <p className="text-sm font-black text-slate-900">{item.name}</p>
                  <p className="text-[10px] font-bold text-slate-400">{item.qty || item.quantity || 1} Unit • {item.category || 'Cycle'}</p>
                </div>
                <span className="font-bold text-sm">₹{((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-2">
          <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">Total Tax (GST 18%)</span><span className="text-sm font-bold">₹{Math.round((order.total || 0) * 0.18 / 1.18).toLocaleString()}</span></div>
          <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-900">
             <span className="text-base font-black uppercase tracking-tighter">Grand Total</span>
             <span className="text-2xl font-black text-brand-600 tracking-tighter">₹{(order.total || 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-10 flex gap-3 no-print">
          <button onClick={() => window.print()} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95">Print Bill</button>
          <button onClick={onClose} className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-all">Dismiss</button>
        </div>
        
        <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] mt-10 invoice-footer">
          Thank you for choosing CycleCore Premium
        </p>
      </div>
    </div>
  );
}

function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  const nextStatus = statusFlow[statusFlow.indexOf(order.status) + 1];
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-lg w-full text-white">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="font-black text-lg">{order.id}</h2>
            <p className="text-gray-500 text-sm">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
        </div>
        
        {/* Status Progress */}
        <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-2">
          {statusFlow.map((s, i) => {
            const current = statusFlow.indexOf(order.status);
            const done = i <= current;
            return (
              <React.Fragment key={s}>
                <div className={`flex flex-col items-center flex-shrink-0`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-amber-500 text-gray-900' : 'bg-gray-700 text-gray-500'}`}>{done ? '✓' : i+1}</div>
                  <span className={`text-xs mt-1 ${done ? 'text-amber-400' : 'text-gray-600'}`}>{s}</span>
                </div>
                {i < 3 && <div className={`flex-1 h-0.5 ${i < current ? 'bg-amber-500' : 'bg-gray-700'} mt-[-0.75rem]`}></div>}
              </React.Fragment>
            );
          })}
        </div>

        <div className="space-y-3 mb-5">
          <div className="bg-gray-800/50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Buyer Details</p>
            <p className="font-semibold">{order.customer || order.customerName || 'Guest'}</p>
            <p className="text-sm text-gray-400">{order.email || order.customerEmail || ''}</p>
            <p className="text-xs text-gray-500 mt-1">{order.address || ''}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-2">Cycles Bought</p>
            {(order.items || []).map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span className="text-gray-300">{item.name} × {item.qty || item.quantity || 1}</span>
                <span className="font-bold">₹{((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-black">
              <span>Total</span><span className="text-amber-400">₹{(order.total || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {order.status !== 'Cancelled' && order.status !== 'Delivered' && order.status !== 'Refund' && (
            <div className="grid grid-cols-1 gap-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Next Possible Step</p>
              <div className="flex flex-wrap gap-2">
                {/* Standard Flow Logic */}
                {statusFlow.includes(order.status) && statusFlow.indexOf(order.status) < statusFlow.length - 1 && (
                  statusFlow.slice(statusFlow.indexOf(order.status) + 1, statusFlow.indexOf(order.status) + 2).map(s => (
                    <button 
                      key={s}
                      onClick={() => { onUpdateStatus(order.id, s, order.userRefPath); }} 
                      className="flex-1 bg-amber-500 text-gray-900 border border-amber-500/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                    >
                      Process: {s}
                    </button>
                  ))
                )}
                
                {/* Refund Flow Logic */}
                {refundFlow.includes(order.status) && refundFlow.indexOf(order.status) < refundFlow.length - 1 && (
                   refundFlow.slice(refundFlow.indexOf(order.status) + 1).map(s => (
                    <button 
                      key={s}
                      onClick={() => { onUpdateStatus(order.id, s, order.userRefPath); }} 
                      className="flex-1 bg-rose-500 text-white border border-rose-500/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                    >
                      {s === 'Refund' ? 'Issue Refund' : `Internal: ${s}`}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            {order.status !== 'Cancelled' && order.status !== 'Delivered' && !refundFlow.includes(order.status) && (
                <button onClick={() => { onUpdateStatus(order.id, 'Cancelled', order.userRefPath); }} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest border border-red-500/20 transition-all">
                    Stop Order
                </button>
            )}
            <button onClick={onClose} className="flex-1 bg-gray-800 text-gray-400 font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest hover:bg-gray-700 transition-all">
                Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Orders() {
  const { orders, updateOrderStatus, categories: dynamicCategories, customers } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const enrichedOrders = orders.map(order => {
    // The userRefPath is like "users/USER_ID". We extract USER_ID.
    const userId = order.userRefPath ? order.userRefPath.split('/')[1] : null;
    const customer = userId ? customers.find(c => c.id === userId) : null;
    return {
      ...order,
      // If a customer is found, use their name. Fallback to existing data.
      customerName: customer ? customer.name : (order.customer || order.customerName),
    };
  });

  const orderCategories = ['All Categories', ...new Set(enrichedOrders.flatMap(o => (o.items || []).map(i => i.category)).filter(Boolean))];

  let filtered = enrichedOrders.filter(o => {
    const orderId = o.id || '';
    const customer = o.customer || o.customerName || '';
    const matchSearch = orderId.toLowerCase().includes(search.toLowerCase()) || customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || statusFilter === 'All Status' || o.status === statusFilter;
    const matchCat = categoryFilter === 'All' || categoryFilter === 'All Categories' || (o.items || []).some(item => item.category === categoryFilter);
    const matchPayment = paymentFilter === 'All' || (o.paymentMethod || o.payment || '').toLowerCase() === paymentFilter.toLowerCase();
    
    return matchSearch && matchStatus && matchCat && matchPayment;
  });

  if (sortOrder === 'Newest First') filtered = [...filtered].sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));
  if (sortOrder === 'Oldest First') filtered = [...filtered].sort((a,b) => new Date(a.date || 0) - new Date(b.date || 0));
  if (sortOrder === 'Highest Amount') filtered = [...filtered].sort((a,b) => (b.total || 0) - (a.total || 0));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">All Sales</h1>
          <p className="text-gray-500 text-sm">{enrichedOrders.length} total sales • {filtered.length} shown</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statusFlow.map(s => (
          <button key={s} onClick={() => setStatusFilter(statusFilter === s ? 'All' : s)} className={`bg-gray-900 border rounded-xl p-3 text-left transition-all ${statusFilter === s ? 'border-amber-500/50' : 'border-gray-800 hover:border-gray-700'}`}>
            <p className={`text-xl font-black ${statusColors[s]?.includes('emerald') ? 'text-emerald-400' : statusColors[s]?.includes('blue') ? 'text-blue-400' : statusColors[s]?.includes('purple') ? 'text-purple-400' : 'text-amber-400'}`}>{enrichedOrders.filter(o => o.status === s).length}</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{s}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <input type="text" placeholder="Search Order No, Buyer..." value={search} onChange={e => setSearch(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 col-span-1 md:col-span-2 lg:col-span-2" />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          {orderCategories.map(c => <option key={c} value={c}>{c === 'All Categories' ? 'All Types' : c}</option>)}
        </select>
        <select value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option value="All">All Pay Types</option>
          <option value="COD">Pay at Home</option>
          <option value="Razorpay">Pay Online</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option value="All">All Steps</option>
          {statusFlow.map(s => <option key={s} value={s}>{s}</option>)}
          <option value="Cancelled">Cancelled</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option>Newer First</option>
          <option>Older First</option>
          <option>Big Bills First</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Sale Info</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Buyer</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Cycles</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Total Amount</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">How Paid</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Step</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((order, idx) => (
                <tr key={`${order.id}-${idx}`} className="hover:bg-gray-800/30 transition-all">
                  <td className="px-5 py-3">
                    <p className="text-xs font-mono text-amber-400">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-white">{order.customer || order.customerName || 'Guest'}</p>
                    <p className="text-xs text-gray-500">{order.email || order.customerEmail || ''}</p>
                  </td>
                  <td className="px-5 py-3"><p className="text-xs text-gray-400 max-w-32 truncate">{(order.items || []).map(i=>i.name).join(', ') || 'No items'}</p></td>
                  <td className="px-5 py-3"><p className="text-sm font-bold text-white">₹{(order.total || 0).toLocaleString()}</p></td>
                  <td className="px-5 py-3">
                    <p className="text-xs text-gray-300">{order.payment || order.paymentMethod || 'N/A'}</p>
                    <span className={`text-xs font-medium ${order.paymentStatus === 'Paid' ? 'text-emerald-400' : order.paymentStatus === 'Failed' ? 'text-red-400' : 'text-amber-400'}`}>{order.paymentStatus || 'Pending'}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${statusColors[order.status] || 'bg-gray-700 text-gray-400 border-gray-600'}`}>{order.status || 'Unknown'}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedOrderId(order.id)} className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg">Open</button>
                      <button onClick={() => setInvoiceOrder(order)} className="text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 px-2.5 py-1 rounded-lg">Bill</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No orders found</div>}
        </div>
      </div>

      {selectedOrderId && enrichedOrders.find(o => o.id === selectedOrderId) && (
        <OrderDetailModal 
          order={enrichedOrders.find(o => o.id === selectedOrderId)} 
          onClose={() => setSelectedOrderId(null)} 
          onUpdateStatus={updateOrderStatus} 
        />
      )}
      {invoiceOrder && <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />}
    </div>
  );
}
