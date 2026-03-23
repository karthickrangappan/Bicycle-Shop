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
    <div className="bg-white min-h-screen">
      <PageHeader title="Sizing Guide" icon={Ruler} />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">
              Perfect Fit. <br />
              <span className="text-brand-500">Unleash Your Potential.</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Choosing the right frame size is the most critical step in your performance journey. A perfect fit maximizes power transfer, improves handling, and prevents long-term discomfort or injury.
            </p>
            <div className="space-y-4">
              {[
                "Enhanced stability and control",
                "Reduced joint and back strain",
                "Maximum aerodynamic efficiency",
                "Optimal power distribution"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-900 font-bold">
                  <div className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <CheckCircle size={14} />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black hover:bg-brand-500 transition-all flex items-center gap-2">
              Calculate My Size <Maximize size={18} />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-50 rounded-[60px] border border-slate-100 p-8 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]" />
               <motion.div 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                 className="w-4/5 h-4/5 bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 flex items-center justify-center relative z-10"
               >
                 <Ruler size={120} className="text-brand-500 opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-brand-400 absolute top-1/4 left-1/4" />
                    <UserCheck className="text-brand-600 w-24 h-24" />
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Size Chart Table */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Info className="text-brand-500" />
              General Size Recommendations
            </h3>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              Units: Metric (cm)
            </span>
          </div>

          <div className="overflow-x-auto rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-900 text-white text-xs font-black uppercase tracking-widest">
                  <th className="px-10 py-6">Your Size</th>
                  <th className="px-10 py-6">Rider Height</th>
                  <th className="px-10 py-6">Inner Leg (Inseam)</th>
                  <th className="px-10 py-6">Ideal Frame</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sizingData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-8 text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors">{row.size}</td>
                    <td className="px-10 py-8 text-slate-600 font-bold">{row.height}</td>
                    <td className="px-10 py-8 text-slate-600 font-bold">{row.inseam}</td>
                    <td className="px-10 py-8">
                       <span className="bg-brand-500/10 text-brand-600 px-4 py-2 rounded-lg font-black text-lg">
                          {row.frame}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Measuring Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Inner Leg Length", icon: Scissors, desc: "Measure from the floor up to your groin while standing with bare feet." },
             { title: "Arm Reach", icon: Maximize, desc: "Measure from your shoulder bone to the center of your palm for stem sizing." },
             { title: "Torso Length", icon: Ruler, desc: "Measure from your collarbone to your hip bone to find the right top tube length." }
           ].map((tip, i) => (
             <div key={i} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:border-brand-500/30 transition-all text-center group">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-500 mx-auto mb-8 shadow-xl shadow-slate-200 group-hover:rotate-12 transition-transform">
                  <tip.icon size={28} />
               </div>
               <h4 className="text-xl font-black text-slate-900 mb-4">{tip.title}</h4>
               <p className="text-slate-500 font-medium leading-relaxed text-sm">{tip.desc}</p>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
