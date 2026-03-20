import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Mountain Bikes",
    subtitle: "Conquer rugged terrain with precision.",
    image: "/images/cat_mountain_*.png", 
    link: "/shop",
    color: "from-blue-600/80"
  },
  {
    id: 2,
    title: "Road Performance",
    subtitle: "Engineered for speed and endurance.",
    image: "/images/cat_road_*.png",
    link: "/shop",
    color: "from-yellow-600/80"
  },
  {
    id: 3,
    title: "Urban Commuters",
    subtitle: "The ultimate city riding experience.",
    image: "/images/hero/hero_city.png",
    link: "/shop",
    color: "from-cyan-600/80"
  },
  {
    id: 4,
    title: "Elite Gear",
    subtitle: "Professional accessories and apparel.",
    image: "/images/hero/hero_mtb.png",
    link: "/shop",
    color: "from-indigo-600/80"
  }
];

categories[0].image = "/images/cat_mountain.png";
categories[1].image = "/images/cat_road.png";

export default function Categories() {
  const navigate = useNavigate();
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
          {categories.map((category, idx) => (
            <motion.div 
              key={category.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={category.link}
                className="group relative h-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl block"
              >
                {/* Background Image */}
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90`}></div>
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <div className="mb-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                     <p className="text-white/80 text-sm font-medium leading-tight">
                      {category.subtitle}
                     </p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight leading-none">{category.title}</h3>
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
