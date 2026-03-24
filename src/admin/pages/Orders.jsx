import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const statusColors = {
  Delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Shipped: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Assembling: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Processing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

// Perfectly synced with MyOrders.jsx live tracking flow
const statusFlow = ['Pending', 'Processing', 'Assembling', 'Shipped', 'Delivered'];

function InvoiceModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-gray-900">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-black">🚲 VeloCycle Shop</h2>
            <p className="text-gray-500 text-sm">Tax Invoice</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div><p className="text-gray-500">Invoice No</p><p className="font-bold">{order.id}</p></div>
            <div><p className="text-gray-500">Date</p><p className="font-bold">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p></div>
            <div><p className="text-gray-500">Customer</p><p className="font-bold">{order.customer || order.customerName || 'Guest'}</p></div>
            <div><p className="text-gray-500">Payment</p><p className="font-bold">{order.payment || order.paymentMethod || 'N/A'}</p></div>
          </div>
        <div className="border-t border-gray-200 pt-4 mb-4">
          {(order.items || []).map((item, i) => (
            <div key={i} className="flex justify-between py-2 text-sm">
              <span>{item.name} × {item.qty || item.quantity || 1}</span>
              <span className="font-bold">₹{((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-4 space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{(order.total || 0).toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">GST (18%)</span><span>₹{Math.round((order.total || 0) * 0.18 / 1.18).toLocaleString()}</span></div>
          <div className="flex justify-between font-black text-lg pt-2 border-t border-gray-200"><span>Total</span><span>₹{(order.total || 0).toLocaleString()}</span></div>
        </div>
        <button onClick={() => window.print()} className="mt-5 w-full bg-gray-900 text-white py-2.5 rounded-xl font-semibold text-sm">Print Invoice</button>
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
            <p className="text-xs text-gray-400 mb-1">Customer</p>
            <p className="font-semibold">{order.customer || order.customerName || 'Guest'}</p>
            <p className="text-sm text-gray-400">{order.email || order.customerEmail || ''}</p>
            <p className="text-xs text-gray-500 mt-1">{order.address || ''}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-2">Items</p>
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
          {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
            <div className="grid grid-cols-1 gap-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Promote Status</p>
                <div className="flex flex-wrap gap-2">
                    {statusFlow.slice(statusFlow.indexOf(order.status) + 1).map(s => (
                        <button 
                            key={s}
                            onClick={() => { onUpdateStatus(order.id, s, order.userRefPath); onClose(); }} 
                            className="flex-1 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-gray-900 border border-amber-500/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                <button onClick={() => { onUpdateStatus(order.id, 'Cancelled', order.userRefPath); onClose(); }} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest border border-red-500/20 transition-all">
                    Void Order
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
  const { orders, updateOrderStatus, categories: dynamicCategories } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const filtered = orders.filter(o => {
    const orderId = o.id || '';
    const customer = o.customer || o.customerName || '';
    const matchSearch = orderId.toLowerCase().includes(search.toLowerCase()) || customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || statusFilter === 'All Status' || o.status === statusFilter;
    const matchCat = categoryFilter === 'All' || categoryFilter === 'All Categories' || (o.items || []).some(item => item.category === categoryFilter);
    return matchSearch && matchStatus && matchCat;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Orders</h1>
          <p className="text-gray-500 text-sm">{orders.length} total orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {statusFlow.map(s => (
          <button key={s} onClick={() => setStatusFilter(statusFilter === s ? 'All' : s)} className={`bg-gray-900 border rounded-xl p-3 text-left transition-all ${statusFilter === s ? 'border-amber-500/50' : 'border-gray-800 hover:border-gray-700'}`}>
            <p className={`text-xl font-black ${statusColors[s]?.includes('emerald') ? 'text-emerald-400' : statusColors[s]?.includes('blue') ? 'text-blue-400' : statusColors[s]?.includes('purple') ? 'text-purple-400' : 'text-amber-400'}`}>{orders.filter(o => o.status === s).length}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <input type="text" placeholder="Search by order ID or customer..." value={search} onChange={e => setSearch(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 flex-1" />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option value="All">All Categories</option>
          {dynamicCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
          <option>All Status</option>
          {statusFlow.map(s => <option key={s}>{s}</option>)}
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Order</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Customer</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Items</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Total</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Payment</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
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
                      <button onClick={() => setSelectedOrder(order)} className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg">View</button>
                      <button onClick={() => setInvoiceOrder(order)} className="text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 px-2.5 py-1 rounded-lg">Invoice</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No orders found</div>}
        </div>
      </div>

      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={updateOrderStatus} />}
      {invoiceOrder && <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />}
    </div>
  );
}
