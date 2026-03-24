import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { Ruler, CheckCircle, Info, Maximize, Scissors, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const sizingData = [
  { size: "S", height: "155cm - 165cm", inseam: "70cm - 75cm", frame: "48cm - 51cm" },
  { size: "M", height: "166cm - 177cm", inseam: "76cm - 81cm", frame: "52cm - 55cm" },
  { size: "L", height: "178cm - 188cm", inseam: "82cm - 87cm", frame: "56cm - 59cm" },
  { size: "XL", height: "189cm - 200cm", inseam: "88cm - 94cm", frame: "60cm - 63cm" }
];

export default function SizingGuide() {
  return (
    <div className="bg-[#fafbff] min-h-screen pb-24 relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2" />
      
      <PageHeader 
        title="Sizing Guide" 
        subtitle="The ergonomics of peak performance."
        icon={Ruler} 
        badge="Biometric Support"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl font-black text-slate-950 tracking-tighter leading-[1.1]">
              Engineered <br />
              <span className="text-indigo-500 underline decoration-indigo-100 decoration-8 underline-offset-8">For Your Anatomy.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              Choosing the right frame size is the most critical step in your performance journey. A perfect fit maximizes power transfer and prevents long-term discomfort.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Stability & Control",
                "Reduced Strain",
                "Aero Efficiency",
                "Power Optimization"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-900 font-black text-sm tracking-tight p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-sm">
                    <CheckCircle size={16} />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
            <button className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-3 uppercase tracking-widest text-xs">
              Calculate My Size <Maximize size={20} />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-[5rem] border border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-12 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.05)_0%,_transparent_50%)]" />
               <motion.div 
                 animate={{ rotate: [0, 5, -5, 0] }}
                 transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                 className="w-full h-full bg-[#fdfdff] rounded-[4rem] shadow-inner border border-slate-50 flex items-center justify-center relative z-10"
               >
                 <Ruler size={140} className="text-indigo-500 opacity-5 group-hover:opacity-10 transition-opacity" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <Sparkles className="text-indigo-400 absolute top-1/4 left-1/4 animate-pulse" />
                    <UserCheck className="text-indigo-600 w-32 h-32" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Biometric Analysis</p>
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Size Chart Table */}
        <section className="mb-32">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-12 gap-6">
            <div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Geometry Metrics</h3>
               <h2 className="text-3xl font-black text-slate-950 flex items-center gap-4 tracking-tight">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-100">
                     <Info size={20} />
                  </div>
                  Recommended Specifications
               </h2>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm uppercase">
               Metric (CM) — ISO STANDARDS
            </span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="overflow-x-auto rounded-[4rem] border border-white shadow-2xl shadow-slate-200/50"
          >
            <table className="w-full text-left border-collapse bg-white/40 backdrop-blur-xl">
              <thead>
                <tr className="bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em]">
                  <th className="px-12 py-8">Optimized Size</th>
                  <th className="px-12 py-8">Rider Height Range</th>
                  <th className="px-12 py-8">Center to Top (Inseam)</th>
                  <th className="px-12 py-8 text-right">Ideal Stack / Reach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sizingData.map((row, i) => (
                  <tr key={i} className="hover:bg-white transition-all duration-300 group cursor-default">
                    <td className="px-12 py-10">
                       <span className="text-3xl font-black text-slate-950 group-hover:text-indigo-500 transition-colors tracking-tighter">{row.size}</span>
                    </td>
                    <td className="px-12 py-10 text-slate-500 font-bold text-lg tracking-tight">{row.height}</td>
                    <td className="px-12 py-10 text-slate-500 font-bold text-lg tracking-tight">{row.inseam}</td>
                    <td className="px-12 py-10 text-right">
                       <span className="bg-indigo-50 group-hover:bg-indigo-500 group-hover:text-white text-indigo-600 px-6 py-3 rounded-2xl font-black text-lg transition-all shadow-sm">
                          {row.frame}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>

        {/* Measuring Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: "Inseam Measurement", icon: Scissors, desc: "Measure from the floor to your groin while standing with bare feet and straight posture.", color: 'blue' },
             { title: "The Reach Factor", icon: Maximize, desc: "Measure from your shoulder bone to the center of your palm for stem and reach optimization.", color: 'indigo' },
             { title: "Torso Evaluation", icon: Ruler, desc: "Measure from your collarbone to your hip bone to find the right top tube dynamics.", color: 'emerald' }
           ].map((tip, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -10 }}
               className="p-12 rounded-[3.5rem] bg-white border border-slate-100 hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 text-center group"
             >
               <div className={`w-16 h-16 bg-${tip.color}-50 rounded-2xl flex items-center justify-center text-${tip.color}-500 mx-auto mb-10 shadow-sm border border-${tip.color}-100 group-hover:scale-110 group-hover:rotate-12 transition-all`}>
                  <tip.icon size={28} />
               </div>
               <h4 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">{tip.title}</h4>
               <p className="text-slate-500 font-medium leading-relaxed text-sm opacity-80">{tip.desc}</p>
             </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
}
