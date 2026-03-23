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
    <div className="bg-white min-h-screen">
      <PageHeader title="Service Center" icon={MapPin} />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Detailed Info */}
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">Your Performance Experts</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-12">
              Our factory-trained technicians use precision tools and original parts to keep your CycleCore machine performing at its absolute peak. 
              From routine maintenance to complex suspension tuning, we've got you covered.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-900 font-bold">
                  <Clock className="text-brand-500" />
                  Workshop Hours
                </div>
                <div className="text-slate-600 font-medium text-sm space-y-1">
                  <p>Mon - Fri: 09:00 - 19:00</p>
                  <p>Saturday: 10:00 - 17:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-900 font-bold">
                  <MapPin className="text-brand-500" />
                  Find Us
                </div>
                <div className="text-slate-600 font-medium text-sm space-y-1">
                  <p>123 Performance Way</p>
                  <p>Gear City, GC 90210</p>
                  <p>United States</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-slate-50 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
              <h3 className="text-xl font-black mb-6">Contact The Workshop</h3>
              <div className="space-y-6">
                <a href="tel:+18002925326" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Direct Line</p>
                    <p className="text-lg font-bold">+1 (800) CYCLE-COR</p>
                  </div>
                </a>
                <a href="mailto:service@cyclecore.io" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Email</p>
                    <p className="text-lg font-bold">service@cyclecore.io</p>
                  </div>
                </a>
              </div>
              <button className="w-full mt-10 bg-brand-500 hover:bg-brand-600 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-brand-500/20">
                Book A Service Now
              </button>
            </div>
          </div>

          {/* Pricing & Services List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-widest text-sm">Service Packages</h3>
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    <service.icon size={28} />
                  </div>
                  <span className="text-2xl font-black text-slate-900">{service.price}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{service.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10">{service.description}</p>
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500 text-slate-900 pointer-events-none">
                  <service.icon size={120} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
