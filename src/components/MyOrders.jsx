import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ChevronRight, 
  Package, 
  Box, 
  ChevronDown, 
  ExternalLink,
  MapPin,
  CreditCard,
  Truck,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';

function OrderCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { cancelOrder, requestReturn } = useShop();
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnDetails, setReturnDetails] = useState({ reason: '', isOpened: false });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(amount);
  };

  const isCancellable = ['Pending', 'Processing'].includes(order.status);
  const isReturnable = order.status === 'Delivered';

  const handleReturn = () => {
    requestReturn(order.id, returnDetails.reason, returnDetails.isOpened);
    setShowReturnModal(false);
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:border-brand-300 transition-all duration-500"
    >
      <div className="px-8 py-10 bg-brand-50/30 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 blur-[50px] rounded-full"></div>
        <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-xl shadow-brand-500/10">
            <Box size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Order Ref</p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{order.id}</h3>
            <p className="text-sm font-bold text-slate-500 italic">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 relative z-10 w-full md:w-auto">
          <div className="flex items-center gap-4 w-full justify-between md:justify-end">
            <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ring-2 ring-white transition-all duration-500 ${
              order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
            }`}>
               {order.status}
            </span>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-3 bg-white text-slate-400 hover:text-brand-500 rounded-xl shadow-sm border border-slate-100 transition-all"
            >
                <ChevronDown size={20} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
             <span className="text-xs font-bold text-slate-400">Total Selection:</span>
             <p className="text-2xl font-black text-brand-600 tracking-tighter">{formatCurrency(order.total)}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-8 md:p-12 space-y-12">
               
               {/* Items List */}
               <div className="space-y-6">
                  {order.items.map(item => (
                     <div key={item.id} className="flex items-center gap-6 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                           <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-grow">
                           <h5 className="font-black text-slate-900 tracking-tight">{item.name}</h5>
                           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.selectedSize} × {item.quantity}</p>
                        </div>
                        <p className="text-sm font-black text-slate-900">{item.price}</p>
                     </div>
                  ))}
               </div>

               {/* Logistics & Payment */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative group/info">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Dispatch Details</h4>
                     <p className="text-lg font-black text-slate-900 mb-2">{order.name}</p>
                     <p className="text-sm font-bold text-slate-500 leading-relaxed mb-4">{order.address}, {order.city} - {order.zip}</p>
                  </div>
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden shadow-2xl">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Accountability</h4>
                     <p className="text-sm font-black mb-4">Method: {order.paymentMethod} • Status: <span className="text-brand-500">{order.paymentStatus}</span></p>
                     {order.refundStatus && <p className="text-xs font-bold text-blue-400">Refund: {order.refundStatus}</p>}
                     <div className="mt-8">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Grand Total Investment</p>
                        <p className="text-3xl font-black text-white tracking-tighter">{formatCurrency(order.total)}</p>
                     </div>
                  </div>
               </div>

               {/* Action Center */}
               <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="flex gap-4">
                    {isCancellable && (
                      <button 
                        onClick={() => cancelOrder(order.id)}
                        className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-black tracking-widest text-[10px] uppercase hover:bg-red-600 hover:text-white transition-all"
                      >
                         Cancel Order
                      </button>
                    )}
                    {isReturnable && (
                       <button 
                        onClick={() => setShowReturnModal(true)}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black tracking-widest text-[10px] uppercase hover:bg-slate-800 transition-all"
                      >
                         Request Refund/Return
                      </button>
                    )}
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-brand-600 uppercase tracking-widest hover:gap-4 transition-all">
                    Download Digital Invoice <ArrowRight size={16} />
                  </button>
               </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Return Modal */}
      <AnimatePresence>
        {showReturnModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl">
                <h3 className="text-2xl font-black text-slate-900 mb-4">Request Portfolio Return</h3>
                <p className="text-slate-500 text-sm font-medium mb-8 italic">Policy: 30-day return window. Items must be in original condition.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Reason for Return</label>
                    <textarea 
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-brand-500 h-24 mt-2"
                      placeholder="e.g. Fit issues, Performance variant mismatch..."
                      value={returnDetails.reason}
                      onChange={e => setReturnDetails({...returnDetails, reason: e.target.value})}
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md border-slate-200 text-brand-500 focus:ring-brand-500" 
                      checked={returnDetails.isOpened}
                      onChange={e => setReturnDetails({...returnDetails, isOpened: e.target.checked})}
                    />
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">Box has been opened (15% Restocking Fee Applies)</span>
                  </label>
                  
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setShowReturnModal(false)} className="flex-grow py-4 rounded-2xl font-black text-slate-400 uppercase tracking-widest text-xs border border-slate-100 hover:bg-slate-50">Cancel</button>
                    <button onClick={handleReturn} className="flex-grow py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-500 transition-colors">Submit Request</button>
                  </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default function MyOrders() {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2" />
        <PageHeader 
          title="Order History"
          subtitle="Track your elite rides and luxury acquisitions."
          icon={Package}
          badge="Order Status"
        />
        <div className="flex-grow flex items-center justify-center p-4 py-20 bg-white shadow-inner">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-500 shadow-xl shadow-brand-500/10">
              <Package size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No orders found</h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">
              Your premium ride history is empty. Time to start your first elite journey with CycleCore.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-white rounded-2xl font-black shadow-xl shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95"
            >
              Browse Premium Catalogs <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -z-10 -translate-x-1/2" />
      <PageHeader 
        title="Your Orders"
        subtitle={`Viewing ${orders.length} successful elite purchases.`}
        icon={ShoppingBag}
        badge="Live Tracking Available"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 relative z-20 pb-20">
        <div className="space-y-12">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
      </div>
    </div>
  );
}
