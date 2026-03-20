import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return acc + (price * item.quantity);
  }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <PageHeader 
          title="Your Bag"
          subtitle="Review your selection of elite bicycles."
          icon={ShoppingCart}
          badge="Checkout Ready"
        />
        <div className="flex-grow flex items-center justify-center p-4 py-20 bg-white shadow-inner">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-500 shadow-xl shadow-brand-500/10">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Your cart is empty</h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">
              Looks like you haven't added any premium cycles to your collection yet. Start browsing our elite catalog today.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-white rounded-2xl font-black shadow-xl shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95"
            >
              Start Shopping <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Your Bag"
        subtitle={`You have ${cart.length} elite items ready for checkout.`}
        icon={ShoppingCart}
        badge="Proceed to Checkout"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode='popLayout'>
              {cart.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col sm:flex-row items-center gap-8 group"
                >
                  {/* Product Image */}
                  <div className="w-40 h-40 rounded-[2rem] overflow-hidden bg-slate-50 flex-shrink-0 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow text-center sm:text-left">
                    <div className="mb-4">
                      <span className="text-[10px] uppercase font-black tracking-widest text-brand-500 mb-1 block">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                       <p className="text-lg font-black text-slate-900 font-space">{item.price}</p>
                       <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                       <p className="text-sm font-bold text-slate-400">In Stock</p>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col items-center sm:items-end gap-6 flex-shrink-0">
                    <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-slate-400 hover:text-brand-600 transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-12 text-center font-black text-slate-900">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                         className="p-2 text-slate-400 hover:text-brand-600 transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors group/del"
                    >
                      <Trash2 size={16} className="group-hover/del:scale-110 transition-transform" />
                      <span>Remove</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-32"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="text-slate-500 font-bold">Subtotal</span>
                  <span className="text-lg font-black text-slate-900 font-space">{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="text-slate-500 font-bold">Shipping</span>
                  <span className="text-brand-600 font-black text-sm uppercase tracking-widest">Calculated at Checkout</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">Grand Total</span>
                  <span className="text-3xl font-black text-brand-600 font-space tracking-tighter">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 hover:bg-brand-500 transition-all hover:translate-y-[-2px] active:scale-95 active:translate-y-0"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </button>
              
              <p className="mt-8 text-center text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                 Secure Checkout Guaranteed
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
