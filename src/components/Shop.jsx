import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingBag, Star, RefreshCcw, Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import { useShop } from '../context/ShopContext';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');
  
  const { products: shopProducts, categories } = useShop();

  // Dynamic category list from active categories in DB
  const dynamicCategories = useMemo(() => {
    const activeCats = categories.filter(c => c.active).sort((a,b) => (a.priority || 0) - (b.priority || 0)).map(c => c.name);
    return ["All", ...activeCats];
  }, [categories]);
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || "All");
  const [priceRange, setPriceRange] = useState(1200000);
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState(searchFromUrl || "");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [stockStatus, setStockStatus] = useState("all");

  // Update state if URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      // Find category name by slug first
      const categoryObj = categories.find(c => c.slug === categoryFromUrl);
      if (categoryObj) {
        setActiveCategory(categoryObj.name);
      } else {
        // Fallback or case where the name itself was passed (legacy/direct)
        setActiveCategory(categoryFromUrl);
      }
    } else {
      setActiveCategory("All");
    }

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [categoryFromUrl, searchFromUrl, categories]);

  // Parse price string to number for filtering
  const parsePrice = (priceStr) => {
    if (typeof priceStr !== 'string') return parseFloat(priceStr) || 0;
    return parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
  };

  const filteredProducts = useMemo(() => {
    let result = shopProducts.filter(product => {
      const price = parsePrice(product.price);
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const priceMatch = price <= priceRange;
      const ratingMatch = (product.rating || 0) >= minRating;
      const searchMatch = (product.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.category || "").toLowerCase().includes(searchTerm.toLowerCase());
      
      const stockMatch = stockStatus === "all" || (stockStatus === "in-stock" && (product.stock || 0) > 0);
      
      return categoryMatch && priceMatch && ratingMatch && searchMatch && stockMatch;
    });

    // Apply Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-high":
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, priceRange, minRating, searchTerm, shopProducts, sortBy, stockStatus]);

  const resetFilters = () => {
    setActiveCategory("All");
    setPriceRange(1200000);
    setMinRating(0);
    setSearchTerm("");
    setSortBy("default");
    setStockStatus("all");
  };

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <PageHeader 
        title={activeCategory === "All" ? "Premium Collection" : activeCategory}
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
              
              <div className="relative">
                <button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3.5 rounded-[1.5rem] font-black transition-all ${
                    sortBy !== "default" ? "text-brand-600 bg-brand-50" : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                  }`}
                >
                  <ChevronDown size={18} className={`transition-transform duration-300 ${showSortDropdown ? "rotate-180" : ""}`} />
                  <span className="text-xs sm:text-sm">
                    {sortBy === "default" ? "Sort By" : {
                      "price-low": "Price: L-H",
                      "price-high": "Price: H-L",
                      "rating": "Top Rated",
                      "newest": "Newest"
                    }[sortBy]}
                  </span>
                </button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <>
                      {/* Mobile Backdrop */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSortDropdown(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] md:hidden"
                      />
                      
                      {/* Dropdown / Bottom Sheet */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="fixed bottom-0 inset-x-0 h-auto bg-white rounded-t-[2.5rem] shadow-2xl border-t border-slate-100 p-6 z-[60] md:absolute md:top-full md:bottom-auto md:right-0 md:left-auto md:w-64 md:rounded-2xl md:border md:mt-2 md:p-2"
                      >
                         <div className="md:hidden flex items-center justify-between mb-6">
                            <h3 className="font-black text-xl text-slate-900">Sort By</h3>
                            <button onClick={() => setShowSortDropdown(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400">
                               <X size={20} />
                            </button>
                         </div>

                        <div className="space-y-2 md:space-y-1">
                          {[
                            { label: "Default", value: "default" },
                            { label: "Newest Arrivals", value: "newest" },
                            { label: "Price: Low to High", value: "price-low" },
                            { label: "Price: High to Low", value: "price-high" },
                            { label: "Customer Rating", value: "rating" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value);
                                setShowSortDropdown(false);
                              }}
                              className={`w-full text-left px-5 py-4 md:py-3 rounded-2xl md:rounded-xl text-base md:text-sm font-bold transition-all ${
                                sortBy === option.value 
                                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                                : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-5 py-3.5 bg-brand-50 rounded-3xl border border-brand-100">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              <span className="text-xs font-black text-brand-700 uppercase tracking-wider whitespace-nowrap">
                {filteredProducts.length} results
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12" 
             onClick={() => showSortDropdown && setShowSortDropdown(false)}>
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
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-10">
                    {/* CATEGORIES */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Categories</h4>
                      <ul className="space-y-1.5">
                        {[...new Set(dynamicCategories)].map((category) => (
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

                    {/* AVAILABILITY */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Availability</h4>
                      <div className="space-y-3">
                         {[
                           { label: "Show All", value: "all" },
                           { label: "In Stock Only", value: "in-stock" }
                         ].map((opt) => (
                           <label key={opt.value} className="flex items-center gap-3 group cursor-pointer">
                              <div className="relative flex items-center justify-center">
                                <input 
                                  type="radio"
                                  name="stockStatus"
                                  checked={stockStatus === opt.value}
                                  onChange={() => setStockStatus(opt.value)}
                                  className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-200 checked:border-brand-500 transition-all cursor-pointer"
                                />
                                <div className="absolute w-2.5 h-2.5 rounded-full bg-brand-500 scale-0 peer-checked:scale-100 transition-transform duration-200" />
                              </div>
                              <span className={`text-sm font-bold transition-colors ${stockStatus === opt.value ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                                {opt.label}
                              </span>
                           </label>
                         ))}
                      </div>
                    </div>
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
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
                   showFilters 
                   ? "lg:grid-cols-3 xl:grid-cols-4" 
                   : "lg:grid-cols-4 xl:grid-cols-5"
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