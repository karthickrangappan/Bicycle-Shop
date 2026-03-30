import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

export default function PromoBanner() {
  const navigate = useNavigate();
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl min-h-[450px] sm:min-h-[500px] lg:min-h-[600px] flex items-center">
          
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 text-center">
            <img 
              src="/images/hero/bg-img (8).jpg" 
              alt="Visit our store" 
              className="w-full h-full object-cover scale-105 active:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"></div>
          </div>

          <div className="relative z-10 px-6 py-16 sm:px-16 sm:py-24 max-w-4xl">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-brand-500/30"
            >
               <Store size={14} /> Official Storefront
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[1] mb-8"
            >
              Ready to Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">Perfection?</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-base sm:text-xl lg:text-2xl font-medium leading-relaxed mb-12 max-w-2xl"
            >
              Join the thousands of riders who have discovered their true potential at CycleCore. Our elite showroom is ready for your next adventure.
            </motion.p>
            
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
            >
              <button
              onClick={() => navigate('/shop')} 
              className="group relative px-10 py-5 bg-brand-500 text-white font-black rounded-2xl shadow-2xl transition-all duration-300 hover:bg-brand-600 hover:shadow-brand-500/40 active:scale-95 flex items-center gap-3">
                Visit Our Store
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Side Accent */}
          <div className="hidden lg:block absolute right-12 bottom-12 z-10">
             <div className="flex flex-col items-end gap-1">
                <span className="text-white/20 font-black text-8xl leading-none select-none italic">2024</span>
                <span className="text-brand-500/40 font-black text-3xl leading-none select-none tracking-widest uppercase italic">Elite Edition</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

