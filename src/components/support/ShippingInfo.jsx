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
    <div className="bg-white min-h-screen">
      <PageHeader title="Shipping Info" icon={Truck} />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Global Delivery Status */}
        <div className="bg-slate-900 rounded-[40px] p-10 mb-24 relative overflow-hidden group border border-slate-800 shadow-2xl shadow-slate-200">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.15)_0%,_transparent_40%)] pointer-events-none" />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Countries Served", value: "50+", icon: Globe },
                { label: "Delivery Success", value: "99.9%", icon: PackageCheck },
                { label: "Orders Shipped", value: "24.5k", icon: Box },
                { label: "Partner couriers", value: "8", icon: Truck }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform">
                     <stat.icon size={24} />
                  </div>
                  <div className="text-3xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>

        {/* Shipping Methods Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Choose Your Speed</h2>
           <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <button className="px-6 py-2 bg-white rounded-xl shadow-sm text-sm font-black text-slate-900">Domestic</button>
              <button className="px-6 py-2 text-sm font-black text-slate-400 hover:text-slate-600">International</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
           {methods.map((method, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="p-10 rounded-[40px] bg-white border border-slate-100 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 transition-all text-center group flex flex-col items-center"
             >
               <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-brand-500 mb-8 group-hover:bg-brand-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                  <method.icon size={36} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">{method.title}</h3>
               <div className="text-brand-600 font-extrabold text-sm uppercase tracking-widest mb-6">{method.time}</div>
               <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm">{method.description}</p>
               <div className="mt-auto w-full pt-8 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                  <span className="text-2xl font-black text-slate-900">{method.price}</span>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <section className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 shadow-xl shadow-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Repeat size={120} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                 <Repeat className="text-orange-500" />
                 Hassle-Free Returns
              </h3>
              <ul className="space-y-6">
                {[
                  "30-day change of mind returns for unused items.",
                  "Free collection for all bicycles within first 14 days.",
                  "Full refund including original shipping costs for faulty goods.",
                  "Easy online return portal to track your status."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 font-medium leading-relaxed">
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                     {item}
                  </li>
                ))}
              </ul>
              <button className="mt-10 w-full py-4 rounded-2xl border-2 border-slate-900 font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                 Read Full Return Policy
              </button>
           </section>

           <section className="p-10 rounded-[40px] bg-brand-50 border border-brand-100 shadow-xl shadow-brand-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <ShieldCheck size={120} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                 <ShieldCheck className="text-brand-500" />
                 Safe Delivery Guarantee
              </h3>
              <ul className="space-y-6">
                {[
                  "Full transit insurance included on every order.",
                  "Photographic proof of delivery sent to your email.",
                  "Specialized bike-specific packaging for maximum protection.",
                  "SMS notifications with real-time driver tracking."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 font-medium leading-relaxed">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                     {item}
                  </li>
                ))}
              </ul>
              <button className="mt-10 w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black shadow-xl shadow-brand-500/10 transition-all">
                 Track My Order
              </button>
           </section>
        </div>

      </div>
    </div>
  );
}
