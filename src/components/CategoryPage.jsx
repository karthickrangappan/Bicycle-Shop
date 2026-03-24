import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import PageHeader from '../layout/PageHeader';

export default function CategoryPage() {
  const { name } = useParams();
  const { products, categories, loading } = useShop();

  const decodedName = decodeURIComponent(name);
  
  const categoryData = useMemo(() => {
    return categories.find(c => c.name.toLowerCase() === decodedName.toLowerCase()) || {
      name: decodedName,
      description: `Explore our premium collection of ${decodedName} bikes.`
    };
  }, [categories, decodedName]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category?.toLowerCase() === decodedName.toLowerCase());
  }, [products, decodedName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
          className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full" 
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <PageHeader 
        title={categoryData.name}
        subtitle={categoryData.description}
        icon={Bike}
        badge="Elite Series"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <Link 
            to="/shop" 
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-500 transition-all"
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-brand-500 group-hover:text-white transition-all">
              <ArrowLeft size={14} />
            </div>
            Back to All Bikes
          </Link>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase">Results:</span>
              <span className="text-xs font-black text-slate-900">{filteredProducts.length} Bikes</span>
            </div>
            <button className="p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-brand-600 transition-all shadow-slate-900/10">
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Bike size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">No Bikes Found</h2>
            <p className="text-slate-400 font-bold mb-8">We don't have any items in this category at the moment.</p>
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/20"
            >
              Browse Full Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
