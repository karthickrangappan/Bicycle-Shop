import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Mountain Bikes",
    subtitle: "Conquer rugged terrain with precision-engineered handling.",
    image: "/images/cat_mountain.png", 
    link: "/shop?category=Mountain",
    color: "from-blue-600/90"
  },
  {
    id: 2,
    title: "Road Performance",
    subtitle: "Engineered for pure speed and relentless endurance.",
    image: "/images/cat_road.png",
    link: "/shop?category=Road",
    color: "from-emerald-600/90"
  },
  {
    id: 3,
    title: "Urban Commuters",
    subtitle: "The ultimate city riding experience for modern life.",
    image: "/images/hero/hero_city.png",
    link: "/shop?category=City",
    color: "from-cyan-600/90"
  },
  {
    id: 4,
    title: "Elite Gear",
    subtitle: "Professional grade accessories for every journey.",
    image: "/images/hero/hero_mtb.png",
    link: "/shop?category=Accessories",
    color: "from-indigo-600/90"
  }
];

export default function Categories() {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 sm:py-32 bg-[#fafbff] relative overflow-hidden">
      {/* Premium Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-brand-500/[0.08] blur-[140px] rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-cyan-500/[0.05] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-brand-600"></div>
              <span className="text-brand-600 font-black tracking-[0.4em] uppercase text-[10px] sm:text-xs">
                Premium Collections
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none"
            >
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500">Categories</span>
            </motion.h2>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={() => navigate('/shop')} 
            className="flex items-center gap-4 text-slate-900 font-bold hover:text-brand-600 transition-all group lg:mb-2"
          >
            <span className="uppercase tracking-[0.2em] text-[10px] sm:text-xs">All Categories</span>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all group-hover:bg-brand-500 group-hover:text-white group-hover:translate-x-2 group-hover:shadow-brand-200">
              <ArrowRight size={22} strokeWidth={2.5} />
            </div>
          </motion.button>
        </div>

        {/* Categories Grid - Responsive 1 to 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, idx) => (
            <motion.div 
              key={category.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: idx * 0.1, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <Link 
                to={category.link}
                className="group relative h-[340px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] block bg-slate-100"
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[2s] ease-out group-hover:scale-110"
                  />
                </div>
                
                {/* Dynamic Gradient Overlay - Fixed intensity for cleaner look */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-slate-900/60 to-transparent opacity-85 transition-all duration-500`}></div>
                
                {/* Thin Inner Border */}
                <div className="absolute inset-4 border border-white/10 rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Card Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                  {/* Decorative Index */}
                  <div className="mb-3 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-white/50"></span>
                    <span className="font-black text-[9px] tracking-widest text-white/60">0{idx + 1}</span>
                  </div>

                  {/* Subtitle Hidden/Reveal */}
                  <div className="mb-4 h-0 overflow-hidden transform translate-y-6 opacity-0 transition-all duration-500 group-hover:h-auto group-hover:translate-y-0 group-hover:opacity-100">
                     <p className="text-white/80 text-[10px] sm:text-xs font-medium leading-relaxed max-w-[200px]">
                      {category.subtitle}
                     </p>
                  </div>
                  
                  {/* Title - Responsive Sizing */}
                  <h3 className="text-2xl sm:text-3xl font-black mb-6 tracking-tighter leading-none transition-transform duration-500 group-hover:-translate-y-1">
                    {category.title.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h3>
                  
                  {/* Action Link */}
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                    <div className="flex items-center gap-3 font-black text-[10px] tracking-[0.2em] uppercase shrink-0">
                      <span>Explore</span>
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-brand-500/40 group-hover:rotate-12">
                        <ChevronRight size={18} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Highlight */}
                <div className="absolute top-0 right-0 p-6">
                   <div className="w-2 h-2 rounded-full bg-white opacity-20 animate-pulse"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Optional Visual Footer Element */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-8 overflow-hidden py-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {/* These would normally be brand logos or similar decorative icons */}
            <div className="h-px w-24 bg-slate-300"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Authentic Excellence</span>
            <div className="h-px w-24 bg-slate-300"></div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
