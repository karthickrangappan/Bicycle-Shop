import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Cog, Truck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Performance Tune-Up",
    price: "₹1,499",
    description: "Complete drivetrain cleaning, precision indexing, brake calibration, and safety inspection.",
    icon: Cog
  },
  {
    title: "Express Repair",
    price: "₹499",
    description: "Flat tire repairs, chain replacement, or small component adjustments while you wait.",
    icon: Zap
  },
  {
    title: "Suspension Pro Service",
    price: "₹2,999",
    description: "Full damper overhaul, seal replacement, and dynamic sag setup for ultimate control.",
    icon: ShieldCheck
  },
  {
    title: "Mobile Mechanic",
    price: "₹1,999+",
    description: "We bring our fully equipped mobile workshop to your doorstep for on-site servicing.",
    icon: Truck
  }
];

export default function ServiceCenter() {
  return (
    <div className="bg-[#fafbff] min-h-screen pb-24 relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[120px] -z-10 -translate-x-1/2" />
      
      <PageHeader 
        title="Service Center" 
        subtitle="Concierge restoration for your elite machine."
        icon={MapPin} 
        badge="Elite Maintenance"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Detailed Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-black text-slate-950 mb-8 tracking-tighter leading-tight">Precision Care for <span className="text-emerald-500 underline decoration-4 underline-offset-8 decoration-emerald-100">Peak Performance</span></h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16 max-w-xl">
              From routine maintenance to complex suspension tuning, our factory-trained technicians use precision tools to keep your ride performing at an elite level.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-20">
              <div className="space-y-5 p-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-50 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tight mb-3">Workshop Hours</h4>
                  <div className="text-slate-500 font-bold text-xs space-y-2 uppercase tracking-widest opacity-70">
                    <p>Mon - Fri: 09:00 - 19:00</p>
                    <p>Saturday: 10:00 - 17:00</p>
                    <p className="text-red-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="space-y-5 p-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-blue-50 group-hover:scale-110 transition-transform">
                   <MapPin size={24} />
                </div>
                <div>
                   <h4 className="font-black text-lg tracking-tight mb-3">Location HQ</h4>
                   <div className="text-slate-500 font-bold text-xs space-y-2 uppercase tracking-widest opacity-70">
                      <p>123 Performance Way</p>
                      <p>Gear City, GC 90210</p>
                      <p>United States</p>
                   </div>
                </div>
              </div>
            </div>

            <motion.div 
               whileHover={{ y: -5 }}
               className="p-12 bg-slate-950 text-white rounded-[4rem] border border-white/5 shadow-2xl shadow-slate-950/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:scale-125 transition-all duration-1000">
                 <Zap size={220} />
              </div>
              <h3 className="text-3xl font-black mb-10 tracking-tight relative z-10">Direct Workshop Link</h3>
              <div className="space-y-8 relative z-10">
                <a href="tel:+18002925326" className="flex items-center gap-6 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all shadow-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black mb-1">Direct Line</p>
                    <p className="text-2xl font-black tracking-tight">+1 (800) CYCLE-COR</p>
                  </div>
                </a>
                <a href="mailto:service@cyclecore.io" className="flex items-center gap-6 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all shadow-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black mb-1">Expert Support</p>
                    <p className="text-2xl font-black tracking-tight">service@cyclecore.io</p>
                  </div>
                </a>
              </div>
              <button className="w-full mt-12 bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-3xl font-black transition-all shadow-2xl shadow-emerald-500/20 uppercase tracking-[0.2em] text-xs">
                Book Expert Service
              </button>
            </motion.div>
          </motion.div>

          {/* Pricing & Services List */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Elite Service Packages</h3>
               <span className="w-12 h-px bg-slate-200 hidden sm:block"></span>
            </div>
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="w-16 h-16 bg-slate-50 group-hover:bg-emerald-500 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:text-white transition-all duration-500 shadow-sm shadow-emerald-500/5">
                    <service.icon size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-emerald-500 transition-colors mb-1">Starting At</p>
                    <span className="text-3xl font-black text-slate-950 tracking-tighter">{service.price}</span>
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4 relative z-10 tracking-tight">{service.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10 text-sm">{service.description}</p>
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-125 transition-all duration-1000 text-slate-900 pointer-events-none">
                  <service.icon size={160} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
