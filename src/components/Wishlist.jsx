import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <PageHeader 
          title="Dream Ride"
          subtitle="Your personal collection of elite bicycles."
          icon={Heart}
          badge="Favorites"
        />
        <div className="flex-grow flex items-center justify-center p-4 py-20 bg-white shadow-inner">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-500 shadow-xl shadow-brand-500/10">
              <Heart size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Your wishlist is empty</h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">
              Keep track of your favorite premium cycles and elite gear here. Build your dream ride today.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-white rounded-2xl font-black shadow-xl shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95"
            >
              Explore Catalog <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Wishlist Heaven"
        subtitle={`You have ${wishlist.length} premium items saved for future journeys.`}
        icon={Heart}
        badge="Saved for later"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           <AnimatePresence mode='popLayout'>
            {wishlist.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Product Image - Shorter Aspect */}
                <div className="relative aspect-[3/2] overflow-hidden bg-slate-50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm">
                       {item.category}
                     </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-10 h-10 rounded-xl bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Move to Cart */}
                  <div className="absolute inset-x-4 bottom-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item.id);
                      }}
                      className="w-full py-4 bg-brand-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-brand-500/30 hover:bg-brand-600 active:scale-95 transition-all"
                    >
                      <ShoppingCart size={18} />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight group-hover:text-brand-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xl font-black text-slate-950 font-space tracking-tight">
                    {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
