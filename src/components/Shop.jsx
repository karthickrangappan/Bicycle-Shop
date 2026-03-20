import React, { useState, useMemo } from 'react';
import ProductCard, { MOCK_PRODUCTS } from './ProductCard';
import { motion } from 'framer-motion';
import { Filter, ShoppingBag, Star, RefreshCcw } from 'lucide-react';
import PageHeader from '../layout/PageHeader';

const CATEGORIES = ["All", "Mountain", "Road", "City", "E-Bikes", "Gravel"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1200000);
  const [minRating, setMinRating] = useState(0);

  // Parse price string to number for filtering
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^\d]/g, ''));

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const price = parsePrice(product.price);
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const priceMatch = price <= priceRange;
      const ratingMatch = product.rating >= minRating;
      return categoryMatch && priceMatch && ratingMatch;
    });
  }, [activeCategory, priceRange, minRating]);

  const resetFilters = () => {
    setActiveCategory("All");
    setPriceRange(1200000);
    setMinRating(0);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader 
        title="Premium Collection"
        subtitle="Engineered for performance. Discover our curated selection of world-class bicycles for every terrain."
        icon={ShoppingBag}
        badge="Catalog 2026"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Filters */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 sticky top-24 border border-slate-100 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2 text-slate-900">
                    <Filter size={20} className="text-brand-500" />
                    <h3 className="font-black text-xl tracking-tight uppercase">Filters</h3>
                 </div>
                 <button 
                  onClick={resetFilters}
                  className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all"
                  title="Reset Filters"
                 >
                   <RefreshCcw size={18} />
                 </button>
              </div>
              
              <div className="space-y-10">
                {/* CATEGORIES */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Categories</h4>
                  <ul className="space-y-1.5">
                    {CATEGORIES.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setActiveCategory(category)}
                          className={`w-full text-left px-5 py-3 rounded-2xl font-bold transition-all duration-300 group flex items-center justify-between text-sm ${
                            activeCategory === category 
                              ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30" 
                              : "text-slate-500 hover:bg-slate-50 hover:text-brand-600"
                          }`}
                        >
                          {category}
                          {activeCategory === category && (
                            <motion.div layoutId="activeCat" className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRICE RANGE */}
                <div>
                  <div className="flex justify-between items-end mb-5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price Range</h4>
                    <span className="text-sm font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-lg">Up to ₹{priceRange.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="1200000" 
                    step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    <span>₹10k</span>
                    <span>₹12L</span>
                  </div>
                </div>

                {/* RATING */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Minimum Rating</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[4, 3, 2, 0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex items-center justify-center gap-1.5 py-3 rounded-2xl font-bold transition-all text-sm border ${
                          minRating === rating
                            ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                            : "bg-white border-slate-100 text-slate-500 hover:border-brand-200 hover:text-brand-600"
                        }`}
                      >
                        {rating === 0 ? "Any" : (
                          <>
                            {rating}+ 
                            <Star size={12} className={minRating === rating ? "fill-brand-400 text-brand-400" : "text-brand-500"} />
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 px-2">
               <p className="text-sm font-bold text-slate-400">
                 Showing <span className="text-slate-950 font-black">{filteredProducts.length}</span> Premium Bicycles
               </p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-xl shadow-slate-200/50"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                   <RefreshCcw size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No Match Found</h3>
                <p className="text-slate-400 font-medium mb-8">Try adjusting your filters to find your perfect ride.</p>
                <button 
                  onClick={resetFilters}
                  className="px-8 py-4 bg-brand-500 text-white rounded-2xl font-black shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-all active:scale-95"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}