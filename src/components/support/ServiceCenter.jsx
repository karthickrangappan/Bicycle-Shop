import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { Settings, MapPin, Phone, Mail, Clock, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const serviceCenters = [
  {
    city: "Mumbai",
    address: "Velocity Tower, BKC Area, Mumbai 400051",
    phone: "+91 22 4500 8900",
    hours: "10:00 AM - 8:00 PM",
    specialty: "High-Performance Carbon Repair"
  },
  {
    city: "Bangalore",
    address: "Indiranagar 100ft Road, Bangalore 560038",
    phone: "+91 80 2233 4455",
    hours: "9:00 AM - 7:00 PM",
    specialty: "Drivetrain & Electronic Tuning"
  },
  {
    city: "Delhi",
    address: "Aerocity Techno Park, New Delhi 110037",
    phone: "+91 11 9988 7766",
    hours: "11:00 AM - 9:00 PM",
    specialty: "Suspension & Fork Servicing"
  }
];

const servicePackages = [
  {
    name: "Precision Tune",
    price: "₹1,499",
    features: ["Brake Adjustment", "Gear Indexing", "Chain Lubrication", "Safety Check"],
    icon: Wrench
  },
  {
    name: "Elite Overhaul",
    price: "₹3,999",
    features: ["Full Dismantle", "Drivetrain Degrease", "Wheel Truing", "Bearing Service"],
    icon: Settings
  },
  {
    name: "Pro Restoration",
    price: "₹8,499",
    features: ["Cable Replacement", "New Bar Tape", "Hydraulic Bleeding", "Pro Detailing"],
    icon: ShieldCheck
  }
];

export default function ServiceCenter() {
  return (
    <div className="bg-[#fafbff] min-h-screen pb-32 relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[140px] -z-10 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[110px] -z-10 translate-x-1/2" />
      
      <PageHeader 
        title="Service Center" 
        subtitle="Precision maintenance by certified engineers."
        icon={Wrench} 
        badge="Elite Support"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <section className="text-center mb-24 max-w-3xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-600 mb-6 px-6 py-2 bg-brand-50 inline-block rounded-full border border-brand-100 italic">Engineering Excellence</h3>
              <h2 className="text-5xl font-black text-slate-950 mb-8 tracking-tighter leading-tight italic">Keep Your Machine <br /> At <span className="text-brand-500 underline decoration-brand-200">Peak Performance.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                CycleCore certified service centers utilize aerospace-grade tools and genuine components to ensure your ride never compromises on speed or safety.
              </p>
           </motion.div>
        </section>

        {/* Global Stats or Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {servicePackages.map((pkg, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-12 rounded-[3.5rem] bg-white border border-slate-100/50 hover:border-brand-500/20 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-500 text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-all duration-1000 text-slate-950 pointer-events-none">
                 <pkg.icon size={160} />
              </div>

              <div className="w-20 h-20 bg-brand-50 rounded-[2rem] flex items-center justify-center text-brand-500 shadow-sm border border-brand-100 mx-auto mb-10 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500">
                <pkg.icon size={36} />
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">{pkg.name}</h3>
              <div className="text-3xl font-black text-brand-600 mb-8 font-space bg-brand-50 py-2 inline-block px-6 rounded-2xl">{pkg.price}</div>
              
              <ul className="space-y-4 mb-4">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                    <CheckCircle2 size={16} className="text-brand-500" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Location Grid */}
        <div className="bg-slate-950 rounded-[5rem] overflow-hidden relative group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
           <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-24 bg-slate-900/50 relative z-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-500 mb-6">Service Hubs</h3>
                 <h2 className="text-4xl font-black text-white mb-12 tracking-tight">CycleCore Global <br /><span className="text-brand-500 italic underline decoration-white/20">Service Grid</span></h2>
                 
                 <div className="space-y-8">
                    {serviceCenters.map((loc, i) => (
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group/item"
                      >
                         <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-500/20 group-hover/item:scale-110 transition-transform">
                            <MapPin size={24} />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-white mb-2">{loc.city} Center</h4>
                            <p className="text-slate-400 font-medium text-sm mb-4">{loc.address}</p>
                            <div className="flex flex-wrap gap-6">
                               <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                  <Phone size={14} className="text-brand-500" /> {loc.phone}
                               </span>
                               <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                  <Clock size={14} className="text-brand-500" /> {loc.hours}
                               </span>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>

              <div className="relative h-[400px] lg:h-auto overflow-hidden">
                 <img 
                    src="https://images.unsplash.com/photo-1541625602330-2277a1cd1f59?auto=format&fit=crop&q=80&w=1200" 
                    alt="Service Workshop" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-[2000ms]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
                 <div className="absolute inset-0 bg-gradient-to-l from-slate-950/40 via-transparent to-transparent hidden lg:block" />
                 
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] text-center max-w-sm">
                       <ShieldCheck size={80} className="text-brand-500 mx-auto mb-6 opacity-80" />
                       <h4 className="text-2xl font-black text-white mb-4">Certified Precision</h4>
                       <p className="text-slate-400 font-medium text-sm leading-relaxed">
                          Every technician is trained for 500+ hours at our global HQ to master the CycleCore engineering protocol.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
