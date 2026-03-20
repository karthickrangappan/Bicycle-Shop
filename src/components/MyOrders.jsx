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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden group"
    >
      {/* Basic Order Info (Visible) */}
      <div className="px-8 py-10 bg-brand-200 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 blur-[50px] rounded-full"></div>
        
        <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-xl shadow-brand-500/10 transition-transform group-hover:scale-110">
            <Box size={28} />
          </div>
          <div className="flex-grow">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Order Ref</p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{order.id}</h3>
            <p className="text-sm font-bold text-slate-500 italic">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 relative z-10 w-full md:w-auto">
          <div className="flex items-center gap-4 w-full justify-between md:justify-end">
            <span className="px-6 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 ring-2 ring-white">
               Confirmed & Processing
            </span>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-3 bg-white text-slate-400 hover:text-brand-500 rounded-xl shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-95"
            >
                <ChevronDown size={20} className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
             <span className="text-xs font-bold text-slate-400">Total:</span>
             <p className="text-2xl font-black text-brand-600 tracking-tighter">{formatCurrency(order.total)}</p>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="overflow-hidden"
          >
            <div className="p-8 md:p-12 space-y-12">
               
               {/* Order Progress */}
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-l-4 border-brand-500 pl-4">Real-time Progress</h4>
                  <div className="grid grid-cols-4 gap-2">
                     {[
                       { label: 'Placed', active: true, done: true },
                       { label: 'Packed', active: true, done: false },
                       { label: 'Shipped', active: false, done: false },
                       { label: 'Arrived', active: false, done: false },
                     ].map((step, i) => (
                       <div key={i} className="space-y-3">
                          <div className={`h-2 rounded-full transition-all duration-1000 ${step.done ? 'bg-brand-500' : step.active ? 'bg-brand-200 animate-pulse' : 'bg-slate-100'}`} />
                          <p className={`text-[10px] font-black uppercase tracking-widest text-center ${step.active ? 'text-brand-500' : 'text-slate-300'}`}>{step.label}</p>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Items List */}
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-l-4 border-brand-500 pl-4">Premium Components ({order.items.length})</h4>
                  <div className="grid grid-cols-1 gap-6">
                    {order.items.map(item => (
                       <div key={item.id} className="flex items-center gap-6 p-4 rounded-3xl bg-slate-50 border border-slate-100 group/item">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-grow">
                             <p className="text-[10px] font-black uppercase text-brand-500 tracking-widest">{item.category}</p>
                             <h5 className="font-black text-slate-900 tracking-tight">{item.name}</h5>
                             <p className="text-xs font-bold text-slate-400 mt-0.5 italic">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-black text-slate-900">{item.price}</p>
                             <Link to={`/product/${item.id}`} className="text-[10px] font-black text-brand-500 uppercase tracking-widest flex items-center gap-1 justify-end mt-1 opacity-0 group-hover/item:opacity-100 transition-all">
                                View <ExternalLink size={10} />
                             </Link>
                          </div>
                       </div>
                    ))}
                  </div>
               </div>

               {/* Logistics & Payment */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative group/info">
                     <div className="absolute top-4 right-4 text-slate-200 group-hover/info:text-brand-500 transiton-colors">
                        <Truck size={24} />
                     </div>
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Master Dispatch Address</h4>
                     <p className="text-lg font-black text-slate-900 mb-2 leading-tight">{order.addressName || 'Karthick'}</p>
                     <p className="text-sm font-bold text-slate-500 leading-relaxed mb-4">
                        {order.addressStreet || order.address},<br />
                        {order.addressCityState || order.city} - {order.addressPincode || order.zip}
                     </p>
                     <div className="flex items-center gap-2 text-xs font-black text-slate-900 bg-white inline-flex px-3 py-1.5 rounded-lg border border-slate-100">
                        <MapPin size={12} className="text-brand-500" /> Ph: {order.addressPhone || order.phone}
                     </div>
                  </div>

                  <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative flex flex-col justify-between overflow-hidden shadow-2xl">
                     <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 blur-[50px] rounded-full" />
                     <div className="relative z-10 flex justify-between items-start mb-10">
                        <div>
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Secure Payment</h4>
                           <div className="flex items-center gap-3">
                              <CreditCard size={20} className="text-brand-500" />
                              <span className="font-black text-sm uppercase">{order.paymentMethod || 'Online Transaction'}</span>
                           </div>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-500/30">
                           {order.paymentStatus || 'FULLY PAID'}
                        </span>
                     </div>
                     <div className="relative z-10">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Transaction Value</p>
                        <p className="text-3xl font-black text-white tracking-tighter">{formatCurrency(order.total)}</p>
                     </div>
                  </div>
               </div>

               {/* Footer Button */}
               <div className="pt-8 border-t border-slate-50 flex justify-center">
                  <button className="flex items-center gap-2 text-xs font-black text-brand-600 uppercase tracking-widest hover:gap-4 transition-all">
                    Download Official Invoice <ArrowRight size={16} />
                  </button>
               </div>

            </div>
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
      <div className="min-h-screen bg-slate-50 flex flex-col">
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
    <div className="min-h-screen bg-slate-50 pb-20">
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
