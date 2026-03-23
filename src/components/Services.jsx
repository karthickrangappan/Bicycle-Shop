import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../layout/PageHeader';
import { 
  Settings, 
  Wrench, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  Bike,
  Activity,
  Droplets,
  Gauge
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const servicePackages = [
    {
      title: "Silver Tune-up",
      price: "₹1,999",
      description: "Essential maintenance for your regular commuter or weekend ride.",
      icon: Settings,
      color: "blue",
      features: [
        "Full Safety Inspection",
        "Gear & Brake Adjustment",
        "Chain Cleaning & Lube",
        "Tire Pressure Check",
        "Minor Wheel Truing"
      ],
      recommended: false
    },
    {
      title: "Gold Overhaul",
      price: "₹4,499",
      description: "Our most popular comprehensive service for performance restoration.",
      icon: Award,
      color: "brand",
      features: [
        "Silver Tune-up Included",
        "Drivetrain Deep Clean",
        "Bottom Bracket Service",
        "Full Bike Polish",
        "Precision Wheel Truing",
        "Hydraulic Brake Bleed"
      ],
      recommended: true
    },
    {
      title: "Platinum Rebuild",
      price: "₹8,999",
      description: "The ultimate factory-spec complete strip-down and master rebuild.",
      icon: Zap,
      color: "indigo",
      features: [
        "Gold Overhaul Included",
        "Complete Disassembly",
        "Full Bearing Replacement",
        "Suspension Servicing",
        "Cable & Housing Update",
        "Lifetime Labor Warranty"
      ],
      recommended: false
    }
  ];

  const alaCarte = [
    { name: "Puncture Repair", price: "₹249", icon: Droplets },
    { name: "Gear Tuning", price: "₹499", icon: Settings },
    { name: "Hydraulic Bleed", price: "₹899", icon: Activity },
    { name: "Wheel Truing", price: "₹599", icon: Gauge },
    { name: "Chain Replace", price: "₹299", icon: Wrench },
    { name: "Fork Service", price: "₹2,499", icon: Bike },
    { name: "Bearing Swap", price: "₹699", icon: Activity },
    { name: "General Wash", price: "₹399", icon: Droplets },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[150px] -z-10 translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 -translate-x-1/2" />
      <PageHeader 
        title="CycleCore Mastercare"
        subtitle="Precision engineering meets master craft. Our world-class mechanics ensure your ride performs as a masterpiece of mechanical perfection."
        icon={Wrench}
        badge="Pro Service Lab"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 relative z-20">
        
        {/* TRUST STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 sm:mb-24">
          {[
            { label: "Bikes Served", val: "5K+", icon: Bike },
            { label: "Master Techs", val: "12", icon: User },
            { label: "Warranty", val: "Life", icon: ShieldCheck },
            { label: "Turnaround", val: "24h", icon: Clock },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:bg-white transition-all hover:shadow-brand-500/10 hover:border-brand-200"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-4 group-hover:bg-brand-50 group-hover:text-brand-500 transition-all group-hover:rotate-[15deg]">
                <stat.icon size={22} />
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-brand-600 transition-colors">{stat.val}</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SERVICE PACKAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 sm:mb-32">
          {servicePackages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className={`relative group bg-white p-10 rounded-[3rem] border-2 transition-all duration-500 ${
                pkg.recommended 
                  ? "border-brand-500 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.3)] scale-105 z-10" 
                  : "border-slate-100 hover:border-brand-200 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-2"
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-brand-500/30">
                  Master Choice
                </div>
              )}

              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[12deg] group-hover:shadow-lg ${
                pkg.color === 'blue' ? "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white" :
                pkg.color === 'indigo' ? "bg-indigo-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white" :
                "bg-brand-50 text-brand-500 group-hover:bg-brand-500 group-hover:text-white"
              }`}>
                <pkg.icon size={30} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{pkg.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">{pkg.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-black text-slate-950 tracking-tighter">{pkg.price}</span>
                <span className="text-sm font-bold text-slate-300 ml-2">/ per service</span>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <CheckCircle2 size={18} className="text-brand-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact"
                className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
                  pkg.recommended 
                    ? "bg-brand-500 text-white shadow-xl shadow-brand-500/30 hover:bg-brand-600" 
                    : "bg-slate-50 text-slate-950 hover:bg-slate-900 hover:text-white"
                }`}
              >
                Schedule Service <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* A LA CARTE */}
        <div className="bg-slate-900 rounded-[4rem] p-8 sm:p-16 relative overflow-hidden mb-24">
          {/* Bg Pattern */}
          <div className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} 
          />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">Express Repair Menu</h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">Specific problems require surgical solutions. Quick fixes while you wait.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {alaCarte.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] flex justify-between items-center transition-all hover:bg-white/10 hover:border-brand-500/50 group"
              >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-brand-400 group-hover:rotate-[10deg] transition-all">
                      <item.icon size={18} />
                   </div>
                   <span className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">{item.name}</span>
                </div>
                <span className="text-brand-400 font-black text-xs bg-brand-400/10 px-3 py-1 rounded-lg border border-brand-400/20 group-hover:bg-brand-500 group-hover:text-white transition-all">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CUSTOM SHOP BANNER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-[3rem] p-12 sm:p-20 overflow-hidden text-center text-white min-h-[500px] flex items-center shadow-2xl"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 group">
             <img 
               src="/images/hero/bg-img (10).jpg" 
               alt="Custom Build Workshop" 
               className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-[10s] ease-linear"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-indigo-950/80 to-brand-900/40" />
             <div className="absolute inset-0 opacity-10 bg-grid-white" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.span 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[10px] font-black uppercase tracking-widest mb-8"
            >
               Master Lab Services
            </motion.span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 leading-tight">Need a Signature <span className="text-brand-400">Build?</span></h2>
            <p className="text-lg sm:text-xl font-medium text-white/70 mb-10 leading-relaxed italic">
              From custom frame painting to world-class part matching, our Master Lab builds your dream machine from the ground up.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/contact" className="relative overflow-hidden inline-flex items-center justify-center px-12 py-5 bg-brand-500 text-white rounded-2xl font-black shadow-2xl shadow-brand-500/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] active:scale-95 transition-all duration-300 text-lg group/btn">
                <span className="relative z-10 flex items-center gap-3">
                  Consult With a Builder
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link to="/shop" className="px-12 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/20 transition-all text-lg">
                Explore Components
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Reusing some component icons for stats
function User(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
}