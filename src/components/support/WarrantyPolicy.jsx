import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { ShieldCheck, FileText, CheckCircle, XCircle, ShoppingBag, Truck, Calendar, Cog, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const warrantyTerms = [
  {
    title: "Frame Warranty",
    period: "Lifetime",
    description: "Covers manufacturer defects in the frame and fork for the original owner.",
    icon: ShieldCheck
  },
  {
    title: "Components",
    period: "2 Years",
    description: "Suspension, drivetrain, and other major non-wear parts are covered for 24 months.",
    icon: ShoppingBag
  },
  {
    title: "Consumables",
    period: "30 Days",
    description: "Tires, tubes, brake pads, and cables are covered for manufacturing defects only.",
    icon: Cog
  }
];

const steps = [
  {
    title: "Identify the problem",
    description: "Contact us via help center with clear photos and video of the issue.",
    icon: FileText
  },
  {
    title: "Case Review",
    description: "Our engineers review the claim within 24-48 business hours.",
    icon: Calendar
  },
  {
    title: "Resolution",
    description: "If approved, we'll provide parts or arrange for local repair/replacement.",
    icon: CheckCircle
  }
];

export default function WarrantyPolicy() {
  return (
    <div className="bg-[#fafbff] min-h-screen pb-32 relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] -z-10 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[110px] -z-10 translate-x-1/2" />
      
      <PageHeader 
        title="Warranty Policy" 
        subtitle="A lifetime commitment to elite quality."
        icon={ShieldCheck} 
        badge="Quality Assurance"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <section className="text-center mb-24 max-w-3xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6 px-6 py-2 bg-emerald-50 inline-block rounded-full border border-emerald-100">The CyclesCore Standard</h3>
              <h2 className="text-5xl font-black text-slate-950 mb-8 tracking-tighter leading-tight">Your Peace Of Mind, <br /> <span className="text-emerald-500">Guaranteed.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                We engineere our bicycles to survive the most grueling conditions on Earth. We stand behind every machine we build, ensuring you ride with absolute confidence.
              </p>
           </motion.div>
        </section>

        {/* Coverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {warrantyTerms.map((term, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-12 rounded-[3.5rem] bg-white border border-slate-100/50 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-all duration-1000 text-slate-900 pointer-events-none">
                 <term.icon size={160} />
              </div>

              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100 mx-auto mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <term.icon size={36} />
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">{term.title}</h3>
              <div className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-8 inline-block shadow-lg">{term.period}</div>
              <p className="text-slate-500 font-medium leading-relaxed text-sm opacity-80">{term.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Claim Process Step-By-Step */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-slate-950 rounded-[5rem] px-10 py-24 text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(16,185,129,0.1)_0%,_transparent_40%)] pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-20">
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-6">Service Protocol</h3>
               <h2 className="text-4xl font-black mb-12 flex items-center justify-center gap-4 tracking-tight">
                  The Claims Journey
               </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[44px] left-[150px] right-[150px] h-[2px] bg-white/5 border-b border-white/10" />
              
              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center group/item px-4">
                  <div className="w-20 h-20 bg-white/5 group-hover/item:bg-emerald-500 group-hover/item:text-white rounded-3xl flex items-center justify-center text-emerald-400 mb-10 shadow-inner border border-white/10 ring-8 ring-slate-950 transition-all duration-500">
                    <step.icon size={32} />
                  </div>
                  <h4 className="text-2xl font-black mb-4 tracking-tight">{step.title}</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-24 text-center">
              <Link to="/warranty-claim" className="inline-flex items-center gap-3 bg-emerald-500 text-white px-12 py-6 rounded-3xl font-black hover:bg-emerald-600 shadow-2xl shadow-emerald-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs">
                Start Claim Process <ArrowRight size={20} />
              </Link>
              <p className="mt-10 text-[10px] font-black uppercase tracking-widest text-slate-600">
                Please have your proof of purchase & serial number ready.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Not Covered Exceptions */}
        <section className="mt-32 p-16 bg-white border border-slate-50 rounded-[4rem] relative overflow-hidden shadow-2xl shadow-slate-200/40">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400 mb-6">Policy Limitations</h3>
                 <h2 className="text-3xl font-black text-slate-950 mb-8 flex items-center gap-4 tracking-tight">
                    <XCircle className="text-red-500" size={32} />
                    What is Not Covered?
                 </h2>
                 <p className="text-slate-500 font-medium leading-relaxed">
                    While we stand behind our engineering, certain situations resulting from normal wear or external forces are excluded from our policy.
                 </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
                 {[ 
                   "Normal wear & tear", 
                   "Improper assembly", 
                   "Corrosion/oxidation", 
                   "Crash damage", 
                   "Commercial usage",
                   "Unauthorized mods",
                   "Theft/Loss",
                   "Poor maintenance"
                 ].map((item, i) => (
                   <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 text-slate-900 font-black text-sm tracking-tight"
                   >
                     <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                        <XCircle size={16} />
                     </div>
                     {item}
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
