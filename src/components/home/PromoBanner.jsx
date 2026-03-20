import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/5 opacity-40"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-600/20 to-transparent"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500 opacity-20 rounded-full blur-[100px]"></div>

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="text-center lg:text-left max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest mb-6"
              >
                <Tag size={14} />
                Season Launch Offer
              </motion.div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                Redefine Your <span className="text-brand-500">Limits.</span>
              </h2>
              
              <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed mb-8">
                Get up to <span className="text-white font-bold">25% OFF</span> on our collection of professional carbon frames and smart trainers. Elevate your performance today.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                   <span className="text-white/80 text-sm font-bold">In Stock</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                   <div className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                   <span className="text-white/80 text-sm font-bold">Free Shipping</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button className="group relative px-12 py-5 bg-white text-slate-900 font-black rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3">
                Claim Offer
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}