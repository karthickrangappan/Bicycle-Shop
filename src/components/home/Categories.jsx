import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export default function Categories() {
  const { categories: dynamicCategories } = useShop();
  const navigate = useNavigate();
  
  const activeCategories = useMemo(() => 
    dynamicCategories.filter(c => c.active).sort((a,b) => (a.priority || 0) - (b.priority || 0)),
    [dynamicCategories]
  );
  return (
    <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cyan-500/5 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3 block"
            >
              Our Collections
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight"
            >
              Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500">Category</span>
            </motion.h2>
          </div>
          <button 
            onClick={() => navigate('/shop')} 
            className="flex items-center gap-2 text-slate-900 font-bold hover:text-brand-600 transition-colors group"
          >
            View All Categories
            <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activeCategories.slice(0, 4).map((category, idx) => (
            <motion.div 
              key={category.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative h-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl block"
              >
                {/* Background Image */}
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90`} style={{backgroundImage: `linear-gradient(to top, ${category.color || '#000'}cc, transparent)`}}></div>
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <div className="mb-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                     <p className="text-white/80 text-sm font-medium leading-tight">
                      {category.description || "Explore our premium selection."}
                     </p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight leading-none uppercase">{category.name}</h3>
                  <div className="flex items-center gap-2 font-bold text-sm tracking-tighter uppercase">
                    <span>Explore Now</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
