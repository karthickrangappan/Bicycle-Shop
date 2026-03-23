import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Categories() {
  const navigate = useNavigate();
  const { categories } = useShop();

  if (categories.length === 0) return null;

  const categoryThemes = {
    Mountain: { color: "from-blue-600/90", accent: "bg-blue-600", secondary: "text-blue-400" },
    Road: { color: "from-emerald-600/90", accent: "bg-emerald-600", secondary: "text-emerald-400" },
    City: { color: "from-cyan-600/90", accent: "bg-cyan-600", secondary: "text-cyan-400" },
    "E-Bikes": { color: "from-yellow-600/90", accent: "bg-yellow-600", secondary: "text-yellow-400" },
    Gravel: { color: "from-orange-600/90", accent: "bg-orange-600", secondary: "text-orange-400" },
    Hybrid: { color: "from-indigo-600/90", accent: "bg-indigo-600", secondary: "text-indigo-400" },
    Kids: { color: "from-pink-600/90", accent: "bg-pink-600", secondary: "text-pink-400" },
    Accessories: { color: "from-yellow-600/90", accent: "bg-yellow-600", secondary: "text-yellow-400" }
  };

  const fallbackThemes = [
    { color: "from-brand-600/90", accent: "bg-brand-600", secondary: "text-brand-400" },
    { color: "from-purple-600/90", accent: "bg-purple-600", secondary: "text-purple-400" },
    { color: "from-rose-600/90", accent: "bg-rose-600", secondary: "text-rose-400" },
    { color: "from-teal-600/90", accent: "bg-teal-600", secondary: "text-teal-400" }
  ];

  const displayCategories = categories.map((cat, idx) => {
    const title = cat.title || cat.name || cat.label;
    return {
      ...cat,
      id: cat.id,
      title: title,
      subtitle: cat.subtitle || cat.desc || "Explore our premium collection",
      image: cat.image || "/images/hero/bg-img (6).jpg",
      link: cat.link || `/shop?category=${title}`,
      theme: categoryThemes[title] || fallbackThemes[idx % fallbackThemes.length]
    };
  });

  return (
    <section className="py-24 sm:py-32 bg-[#fafbff] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/3 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-600 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block"
            >
              Master The Terrain
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none"
            >
              Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500">Collections</span>
            </motion.h2>
          </div>
          <button 
            onClick={() => navigate('/shop')} 
            className="flex items-center gap-4 text-slate-900 font-black hover:text-brand-600 transition-all group uppercase tracking-widest text-xs"
          >
            View All Series
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center transition-all group-hover:bg-brand-500 group-hover:text-white group-hover:translate-x-2">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={16}
          slidesPerView={1.2}
          freeMode={true}
          grabCursor={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1440: { slidesPerView: 5 }
          }}
          className="categories-swiper !pb-12 !px-1"
        >
          {displayCategories.map((category, idx) => (
            <SwiperSlide key={category.id}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <Link 
                  to={category.link}
                  className="group relative h-[280px] rounded-[2rem] overflow-hidden shadow-xl block bg-slate-100 border border-slate-200/50"
                >
                  {/* Category Wise Half Div Styles - Simplified for cover look */}
                  <div className={`absolute inset-0 w-1 ${category.theme.accent} z-20 group-hover:w-full transition-all duration-700 ease-in-out opacity-20`} />
                  
                  {/* Background Image - Now FULL COVER */}
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay for Text Visibility - CATEGORY SPECIFIC */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.theme.color} via-slate-900/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-30">
                    <div className="flex items-center gap-2 mb-2">
                       <div className={`w-2 h-2 rounded-full ${category.theme.accent}`} />
                       <h3 className="text-xl font-black tracking-tighter text-white drop-shadow-md">
                        {category.title}
                       </h3>
                    </div>

                    <div className="flex items-center gap-2 font-black text-[9px] tracking-widest uppercase text-white/50 group-hover:text-brand-400 transition-colors">
                      <span>Explore Collection</span>
                      <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Top-Right Decorative Element */}
                  <div className={`absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                     <div className={`w-8 h-8 rounded-xl ${category.theme.accent} flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform`}>
                        <ChevronRight size={14} strokeWidth={3} />
                     </div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </section>
  );
}
