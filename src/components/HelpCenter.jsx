import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Cpu,
  Clock,
  Globe,
  Star
} from 'lucide-react';
import PageHeader from '../layout/PageHeader';

const HELP_CONTENT = {
  '/technical-help': {
    title: 'Technical Help',
    subtitle: 'Precision engineering at your fingertips.',
    icon: Wrench,
    theme: 'blue',
    content: (
      <div className="space-y-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="p-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100 rounded-[2.5rem] shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Cpu size={80} className="text-blue-600" />
          </div>
          <p className="text-blue-900/70 leading-relaxed font-bold italic relative z-10">
            "Engineered for the elite. Our technicians provide real-time calibration support for your electronic drivetrain and performance telemetry."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Drivetrain Calibration', desc: 'Step-by-step electronic shifting optimization guides.', icon: Cpu, color: 'blue' },
            { title: 'Hydraulic Optimization', desc: 'Brake bleed procedures and pad lifecycle tracking.', icon: Wrench, color: 'indigo' }
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 bg-${card.color}-50/40 border border-${card.color}-100 rounded-[3rem] group cursor-default transition-all hover:bg-white hover:shadow-2xl hover:shadow-${card.color}-500/10`}
            >
              <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-${card.color}-500 mb-6 shadow-sm border border-${card.color}-50 group-hover:scale-110 transition-transform`}>
                <card.icon size={24} />
              </div>
              <h4 className={`text-xl font-black text-${card.color}-900 mb-3 tracking-tight`}>{card.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
  '/service-center': {
    title: 'Service Center',
    subtitle: 'Concierge restoration for your machine.',
    icon: Clock,
    theme: 'emerald',
    content: (
      <div className="space-y-12">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="p-12 bg-slate-950 text-white rounded-[4rem] shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <Clock size={40} className="text-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Luxury Maintenance Concierge</h3>
              <p className="text-slate-400 font-medium max-w-lg">Every bolt, ogni linkage, and each bearing is inspected and optimized by our elite mechanics. We collect and deliver your bike anywhere in the city.</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 relative z-10">
             {['Elite Inspection', 'Sonic Cleaning', 'Ceramic Bearing Prep'].map(tag => (
               <span key={tag} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400">{tag}</span>
             ))}
          </div>
        </motion.div>
      </div>
    )
  },
  '/warranty-policy': {
    title: 'Warranty Policy',
    subtitle: 'A lifetime promise of elite quality.',
    icon: ShieldCheck,
    theme: 'amber',
    content: (
      <div className="space-y-10">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 border border-amber-100 p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden"
        >
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <ShieldCheck size={200} className="text-amber-500" />
          </div>
          <h4 className="text-2xl font-black text-amber-900 mb-4 tracking-tighter">The Lifetime Shield</h4>
          <p className="text-amber-900/60 text-lg font-medium leading-relaxed max-w-2xl relative z-10">
            Our carbon engineering is a masterclass in durability. We provide a lifetime structural guarantee on all frames for the original owner, ensuring your investment is permanent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Components', dur: '24 Months', icon: Cpu, col: 'blue' },
            { label: 'Paint & Finish', dur: '12 Months', icon: Star, col: 'pink' },
            { label: 'Accessories', dur: '6 Months', icon: Globe, col: 'indigo' }
          ].map((spec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white border border-slate-100 rounded-[2.5rem] text-center hover:shadow-xl hover:border-amber-100 transition-all group"
            >
              <div className={`w-12 h-12 bg-${spec.col}-50 rounded-2xl flex items-center justify-center text-${spec.col}-500 mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <spec.icon size={20} />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{spec.label}</p>
              <h5 className="text-lg font-black text-slate-900">{spec.dur}</h5>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
  '/sizing-guide': {
    title: 'Sizing Guide',
    subtitle: 'The ergonomics of speed.',
    icon: Ruler,
    theme: 'indigo',
    content: (
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-10 bg-indigo-50/30 border border-indigo-100 rounded-[3rem] backdrop-blur-md"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-100 text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] px-4">
                <th className="pb-6 text-left">Your Elevation (Height)</th>
                <th className="pb-6 text-right">Optimized Geometry</th>
              </tr>
            </thead>
            <tbody className="text-sm font-black text-slate-800">
              {[
                { h: '150cm — 165cm', s: 'XS (Extra Small)' },
                { h: '165cm — 175cm', s: 'S / M (Small-Medium)' },
                { h: '175cm — 185cm', s: 'L (Large)' },
                { h: '185cm — 195cm+', s: 'XL (Extra Large)' }
              ].map((row, i) => (
                <motion.tr 
                  key={i} 
                  whileHover={{ x: 10, color: '#6366f1' }}
                  className="border-b border-slate-50 transition-all cursor-default"
                >
                  <td className="py-6 font-medium text-slate-500">{row.h}</td>
                  <td className="py-6 text-right font-black tracking-tight">{row.s}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    )
  },
  '/shipping-info': {
    title: 'Shipping Info',
    subtitle: 'Global logistics for premium machinery.',
    icon: Globe,
    theme: 'rose',
    content: (
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Priority Freight', desc: 'Secure delivery in 3-5 business days across the globe.', icon: Truck, color: 'rose' },
            { title: 'Insured Transit', desc: 'Every shipment is 100% value-protected by elite insurance.', icon: ShieldCheck, color: 'emerald' }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`p-10 bg-${card.color}-50/40 border border-${card.color}-100 rounded-[3rem] text-center hover:bg-${card.color}-100/40 transition-all duration-500`}
            >
              <div className={`w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-${card.color}-500 mx-auto mb-6 shadow-sm`}>
                <card.icon size={28} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">{card.title}</h4>
              <p className="text-xs text-slate-500 font-bold max-w-xs mx-auto">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
};

export default function HelpCenter() {
  const { pathname } = useLocation();
  const page = HELP_CONTENT[pathname] || HELP_CONTENT['/technical-help'];

  return (
    <div className="min-h-screen bg-[#fafbff] pb-32 relative overflow-hidden">
      {/* Dynamic Background decor */}
      <AnimatePresence mode='wait'>
        <motion.div 
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[150px] -z-10 translate-x-1/2" 
        />
      </AnimatePresence>
      
      <PageHeader 
        title={page.title}
        subtitle={page.subtitle}
        icon={page.icon}
        badge="CyclesCore Support"
      />

      <div className="max-w-5xl mx-auto px-4 mt-16 sm:mt-24">
        <motion.div 
          key={pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[4rem] p-8 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          {page.content}

          <div className="mt-24 pt-16 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-10">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-2">Still Unsure?</p>
              <h4 className="text-2xl font-black text-slate-950 tracking-tight">Speak with our engineers</h4>
            </div>
            <Link to="/contact" className="flex items-center gap-3 px-10 py-5 bg-slate-950 text-white rounded-2xl font-black shadow-2xl hover:bg-brand-500 transition-all active:scale-95 group">
              Contact Center <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Dynamic Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          {Object.entries(HELP_CONTENT).map(([path, data]) => (
            <Link 
              key={path} 
              to={path}
              className={`p-6 rounded-[2rem] border transition-all text-center group relative overflow-hidden ${
                pathname === path 
                ? 'bg-slate-950 border-slate-950 text-white shadow-2xl scale-105 z-10' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-brand-200 hover:text-brand-500'
              }`}
            >
              <data.icon size={20} className="mx-auto mb-3" />
              <span className="text-[9px] font-black uppercase tracking-widest block">{data.title}</span>
              {pathname === path && (
                <motion.div 
                   layoutId="active-pill"
                   className="absolute inset-0 bg-brand-500 opacity-10 -z-10"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
