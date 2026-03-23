import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../layout/PageHeader';
import { 
  Info, 
  Target, 
  Users, 
  Zap, 
  ShieldCheck, 
  Award, 
  Bike, 
  History,
  Heart,
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function About() {
  const values = [
    {
      title: "Obsessive Precision",
      desc: "We don't just fix bikes; we calibrate them to factory-spec perfection. Every bolt receives exact torque.",
      icon: Target,
      color: "blue"
    },
    {
      title: "Rider First",
      desc: "Our community is built on trust. Whether you're a pro or a beginner, we treat your journey with respect.",
      icon: Heart,
      color: "red"
    },
    {
      title: "Future Ready",
      desc: "From carbon-fiber frames to high-voltage e-bike systems, we master the cutting edge of cycling tech.",
      icon: Zap,
      color: "brand"
    }
  ];

  const milestones = [
    { year: "2010", label: "Foundation", desc: "Started as a small custom tuning shop in a local garage." },
    { year: "2015", label: "Expansion", desc: "Opened our flagship store with a dedicated master service lab." },
    { year: "2020", label: "Innovation", desc: "Launched our first signature line of custom-built performance machines." },
    { year: "2026", label: "Legacy", desc: "Now the premier destination for elite cyclists across the continent." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2" />
      
      <PageHeader 
        title="Our Cycling Legacy"
        subtitle="Passionate about riding. Committed to perfection. Since 2010, we've been crafting elite journeys for every cyclist."
        icon={Info}
        badge="Elite Bicycle Boutique"
      />

      {/* STORY SECTION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6 text-brand-500 font-black uppercase tracking-widest text-[10px]">
               <div className="w-10 h-[2px] bg-brand-500" />
               Our Heritage
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 mb-8 leading-tight">
              Engineering the <span className="text-brand-500">Perfect Ride</span> Since 2010.
            </h2>
            <div className="space-y-6 text-slate-500 font-medium leading-relaxed text-lg">
              <p>
                Founded in 2010, <span className="text-slate-900 font-black">CycleCore</span> started with a single bench and a passion for speed. We didn't want to be just another bike shop; we wanted to be a service sanctuary for those who demand the absolute best from their machines.
              </p>
              <p>
                Over a decade later, we've evolved into a premier destination for world-class cyclists. Our facility combines old-world craftsmanship with aerospace-grade tools, ensuring every bicycle that leaves our floor is a masterpiece of efficiency and safety.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
               <motion.div 
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 transition-all hover:shadow-brand-500/10 hover:border-brand-200"
               >
                  <p className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">15+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years Experience</p>
               </motion.div>
               <motion.div 
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 transition-all hover:shadow-brand-500/10 hover:border-brand-200"
               >
                  <p className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">12K+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Custom Builds</p>
               </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-500/10 rounded-[3rem] blur-3xl -z-10" />
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-500/20 aspect-[4/5]">
               <img 
                 src="https://images.unsplash.com/photo-1571188654248-7a89213915f7?auto=format&fit=crop&q=80&w=800" 
                 alt="Workshop Perfection" 
                 className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 flex items-center gap-4 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20">
                  <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-white">
                      <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-white font-black tracking-tight">Certified Excellence</p>
                    <p className="text-white/60 text-xs font-bold">Approved Master Mechanics</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-slate-900 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">The CycleCore Standards</h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">Our values define every revolution of the pedal. We don't settle for "good enough."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 300 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 group hover:bg-white/10 hover:border-brand-500/30 transition-all shadow-2xl shadow-black/20"
              >
                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center mb-8 bg-slate-800 text-slate-300 group-hover:bg-brand-500 group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-lg shadow-black/20`}>
                  <item.icon size={30} />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-brand-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tighter mb-20">Our Journey</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {milestones.map((ms, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 group hover:border-brand-500 hover:shadow-brand-500/10 transition-all"
              >
                <div className="text-brand-500 font-black text-4xl mb-2 tracking-tighter opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                   {ms.year}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{ms.label}</h4>
                <p className="text-xs font-bold text-slate-400 leading-relaxed group-hover:text-slate-500">{ms.desc}</p>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 bg-slate-50 border border-slate-100 rounded-full z-10 -translate-y-1/2 transition-colors group-hover:bg-brand-500 group-hover:border-brand-500" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-[3rem] p-12 sm:p-20 text-center text-white relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-grid-white opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6">Ready to Experience Perfection?</h2>
               <p className="text-lg font-medium text-white/80 mb-10">Join the thousands of riders who have discovered their true potential at CycleCore.</p>
               <button className="px-10 py-5 bg-white text-brand-600 rounded-2xl font-black shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">
                  Visit Our Store
               </button>
            </div>
         </motion.div>
      </div>

    </div>
  );
}