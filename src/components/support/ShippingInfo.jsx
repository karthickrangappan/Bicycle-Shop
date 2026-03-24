import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { Truck, MapPin, Globe, CreditCard, Repeat, ShieldCheck, Box, PackageCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const methods = [
  {
    title: "Standard Home Delivery",
    time: "3-5 Business Days",
    price: "Free",
    description: "Our standard reliable service for bikes and components.",
    icon: Truck
  },
  {
    title: "Express Priority",
    time: "1-2 Business Days",
    price: "₹999",
    description: "Get your gear faster with our priority shipping network.",
    icon: Globe
  },
  {
    title: "Ready-To-Ride Delivery",
    time: "5-7 Business Days",
    price: "₹1,499",
    description: "Our specialist courier delivers your bike fully assembled and tuned.",
    icon: Box
  }
];

export default function ShippingInfo() {
  return (
    <div className="bg-[#fafbff] min-h-screen pb-24 relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -z-10 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2" />
      
      <PageHeader 
        title="Shipping Info" 
        subtitle="Global delivery for elite machinery."
        icon={Truck} 
        badge="Logistics Center"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Global Delivery Status Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950 rounded-[4rem] p-12 mb-24 relative overflow-hidden shadow-2xl shadow-slate-950/20"
        >
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.1)_0%,_transparent_40%)] pointer-events-none" />
           <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Countries Served", value: "50+", icon: Globe, color: 'blue' },
                { label: "Delivery Success", value: "99.9%", icon: PackageCheck, color: 'emerald' },
                { label: "Orders Shipped", value: "24.5k", icon: Box, color: 'brand' },
                { label: "Partner couriers", value: "8", icon: Truck, color: 'rose' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500 group shadow-inner">
                  <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-400 mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                     <stat.icon size={28} />
                  </div>
                  <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                </div>
              ))}
           </div>
        </motion.div>

        {/* Shipping Methods Grid */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
           <div className="max-w-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Delivery Speed</h3>
              <h2 className="text-4xl font-black text-slate-950 tracking-tighter">Choose Your <span className="text-blue-500">Velocity</span></h2>
           </div>
           <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
              <button className="px-8 py-3 bg-slate-950 rounded-xl shadow-lg text-xs font-black uppercase tracking-widest text-white">Domestic</button>
              <button className="px-8 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">International</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
           {methods.map((method, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="p-10 rounded-[3.5rem] bg-white border border-slate-100/50 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 text-center group flex flex-col items-center relative overflow-hidden"
             >
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-all duration-1000 text-slate-900 pointer-events-none">
                  <method.icon size={160} />
               </div>
               
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-blue-500 mb-10 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-sm shadow-blue-500/10">
                  <method.icon size={42} />
               </div>
               <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">{method.title}</h3>
               <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-black text-[10px] uppercase tracking-widest mb-8 border border-blue-100">{method.time}</div>
               <p className="text-slate-500 font-medium leading-relaxed mb-10 text-sm">{method.description}</p>
               
               <div className="mt-auto w-full pt-8 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Rate</span>
                  <span className="text-3xl font-black text-slate-950 tracking-tighter">{method.price}</span>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Detailed Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <motion.section 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-12 rounded-[4rem] bg-amber-50/40 border border-amber-100 shadow-[0_30px_60px_-15px_rgba(245,158,11,0.05)] relative overflow-hidden"
           >
              <div className="absolute -bottom-10 -right-10 p-8 opacity-[0.08] rotate-12">
                 <Repeat size={200} />
              </div>
              <h3 className="text-3xl font-black text-slate-950 mb-10 flex items-center gap-4 tracking-tight">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                    <Repeat size={24} />
                 </div>
                 Elite Returns
              </h3>
              <ul className="space-y-8 mb-12">
                {[
                  "30-day change of mind returns for factory-sealed bikes.",
                  "Free concierge collection for all bicycles within 7 days.",
                  "Transparent online portal to track your refund trajectory."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-500 font-medium leading-relaxed text-lg">
                     <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
                     {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl bg-white border border-amber-200 font-black text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 uppercase tracking-widest text-xs">
                 Full Policy Review
              </button>
           </motion.section>

           <motion.section 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-12 rounded-[4rem] bg-emerald-50/40 border border-emerald-100 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.05)] relative overflow-hidden"
           >
              <div className="absolute -bottom-10 -right-10 p-8 opacity-[0.08] -rotate-12">
                 <ShieldCheck size={200} />
              </div>
              <h3 className="text-3xl font-black text-slate-950 mb-10 flex items-center gap-4 tracking-tight">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
                    <ShieldCheck size={24} />
                 </div>
                 Secure Transit
              </h3>
              <ul className="space-y-8 mb-12">
                {[
                  "Full comprehensive transit insurance on every machine.",
                  "Bespoke shock-resistant packaging systems.",
                  "Photographic proof of delivery sent directly to your phone."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-500 font-medium leading-relaxed text-lg">
                     <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2.5 flex-shrink-0" />
                     {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl bg-slate-950 text-white font-black shadow-2xl hover:bg-emerald-500 transition-all active:scale-95 uppercase tracking-widest text-xs">
                 Live Order Tracking
              </button>
           </motion.section>
        </div>

      </div>
    </div>
  );
}
