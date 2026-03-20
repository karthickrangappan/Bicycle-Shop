import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../layout/PageHeader';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Globe, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  User,
  MessageSquare
} from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    { 
      label: "Support Email", 
      val: "hello@cyclecore.com", 
      icon: Mail, 
      color: "brand" 
    },
    { 
      label: "Phone Hotline", 
      val: "+91 98765 43210", 
      icon: Phone, 
      color: "blue" 
    },
    { 
      label: "Main HQ Office", 
      val: "Spoke City, CA 90210", 
      icon: MapPin, 
      color: "indigo" 
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      <PageHeader 
        title="Get In Touch"
        subtitle="Have a question about a bike, need a repair, or just want to say hi? We'd love to hear from you."
        icon={Mail}
        badge="24/7 Support"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 relative z-20">
        
        {/* TOP CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:bg-white transition-all"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <info.icon size={80} />
              </div>
              <div className="relative z-10">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${
                   info.color === 'brand' ? 'bg-brand-50 text-brand-500' :
                   info.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                   'bg-indigo-50 text-indigo-500'
                 }`}>
                    <info.icon size={22} />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{info.label}</p>
                 <p className="text-xl font-black text-slate-900 tracking-tight">{info.val}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* CONTACT INFO PANE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
             <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-950 mb-8 leading-[1.1]">
                Let's <span className="text-brand-500">Connect</span> Your Journey.
             </h2>
             <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12 max-w-lg">
                Whether you're looking for a signature build, mechanical advice, or just want to join a community ride, our doors are always open.
             </p>

             <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:border-brand-500 transition-all border-l-4 border-l-transparent hover:border-l-brand-500">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <Clock size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900">Service Hours</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:border-brand-500 transition-all border-l-4 border-l-transparent hover:border-l-brand-500">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                      <ShieldCheck size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900">Safe Deliveries</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">White Glove shipping across India</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:border-brand-500 transition-all border-l-4 border-l-transparent hover:border-l-brand-500">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Globe size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-900">Global Community</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Visit the rider hub anytime</p>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-10 sm:p-14 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(59,130,246,0.15)] border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-2 bg-brand-500" />
               
               <form className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-3 block">Full Name</label>
                       <div className="relative group/field">
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-12 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white focus:border-brand-500 transition-all" 
                            placeholder="John Doe"
                          />
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover/field:text-brand-500 transition-colors" />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-3 block">Email Address</label>
                       <div className="relative group/field">
                          <input 
                            type="email" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-12 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white focus:border-brand-500 transition-all" 
                            placeholder="john@example.com"
                          />
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover/field:text-brand-500 transition-colors" />
                       </div>
                    </div>
                  </div>

                  <div>
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-3 block">Subject</label>
                     <div className="relative group/field">
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-12 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white focus:border-brand-500 transition-all appearance-none cursor-pointer">
                           <option>General Inquiry</option>
                           <option>Custom Build Consultation</option>
                           <option>Service & Repairs</option>
                           <option>Warranty Claim</option>
                        </select>
                        <MessageSquare size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover/field:text-brand-500 transition-colors" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                           <ArrowRight size={14} className="rotate-90 text-slate-400" />
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-3 block">Your Message</label>
                     <textarea 
                        rows="4" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4 px-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white focus:border-brand-500 transition-all resize-none" 
                        placeholder="Tell us about your machine or journey..."
                     ></textarea>
                  </div>

                  <button className="w-full bg-brand-500 text-white rounded-2xl py-5 font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-brand-500/30 hover:bg-brand-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                     Send Message <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
               </form>

               {/* Design decoration */}
               <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-slate-50 rounded-full blur-[80px] -z-10 group-hover:bg-brand-50 transition-all" />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}