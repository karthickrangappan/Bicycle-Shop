import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard, { MOCK_PRODUCTS } from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingBag, Star, RefreshCcw, Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import PageHeader from '../layout/PageHeader';

const CATEGORIES = ["All", "Mountain", "Road", "City", "E-Bikes", "Gravel"];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');
  
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || "All");
  const [priceRange, setPriceRange] = useState(1200000);
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState(searchFromUrl || "");
  const [showFilters, setShowFilters] = useState(false);

  // Update state if URL changes
  useEffect(() => {
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else if (!categoryFromUrl) {
      setActiveCategory("All");
    }

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [categoryFromUrl, searchFromUrl]);

  // Parse price string to number for filtering
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^\d]/g, ''));

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const price = parsePrice(product.price);
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const priceMatch = price <= priceRange;
      const ratingMatch = product.rating >= minRating;
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      return categoryMatch && priceMatch && ratingMatch && searchMatch;
    });
  }, [activeCategory, priceRange, minRating, searchTerm]);

  const resetFilters = () => {
    setActiveCategory("All");
    setPriceRange(1200000);
    setMinRating(0);
    setSearchTerm("");
  };

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <PageHeader 
        title="Premium Collection"
        icon={ShoppingBag}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        
        {/* Search and Action Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          {/* Left Side: Search */}
          <div className="relative w-full md:max-w-lg group">
            <div className="absolute inset-0 bg-brand-500/5 blur-xl group-focus-within:bg-brand-500/10 transition-all rounded-[2rem]" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search premium bicycles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all shadow-sm font-medium text-slate-700"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-50 p-1.5 rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex bg-white p-1.5 rounded-[1.8rem] border border-slate-100 shadow-sm">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-[1.5rem] font-black transition-all ${
                  showFilters 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                  : "bg-transparent text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
              
              <div className="w-[1px] h-8 bg-slate-100 self-center mx-1"></div>
              
              <button className="flex items-center gap-2 px-6 py-3.5 rounded-[1.5rem] font-black text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-all">
                <ChevronDown size={18} />
                <span className="hidden sm:inline">Sort By</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-5 py-3.5 bg-brand-50 rounded-3xl border border-brand-100">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              <span className="text-xs font-black text-brand-700 uppercase tracking-wider whitespace-nowrap">
                {filteredProducts.length} results
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, x: -30, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -30, width: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-80 flex-shrink-0 overflow-hidden lg:block"
              >
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 sticky top-24 border border-slate-100 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Filter size={20} className="text-brand-500" />
                        <h3 className="font-black text-xl tracking-tight uppercase">Filters</h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={resetFilters}
                        className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all"
                        title="Reset Filters"
                      >
                        <RefreshCcw size={18} />
                      </button>
                      <button 
                        onClick={() => setShowFilters(false)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Close Filters"
                      >
                        <X size={20} />
                      </button>
                    </div>
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

                    {/* Apply Filters (Mobile only usually, but good for all) */}
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg shadow-slate-900/10 hover:bg-brand-500 transition-all active:scale-95"
                    >
                      Show Results
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className={`grid grid-cols-2 ${
                   showFilters 
                   ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                   : "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                } gap-6 sm:gap-8`}
              >
                {filteredProducts.map((product) => (
                   <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
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