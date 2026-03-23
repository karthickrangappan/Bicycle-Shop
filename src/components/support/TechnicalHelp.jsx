import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { HelpCircle, Book, MessageCircle, Wrench, Settings, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "How do I maintain my bike's drivetrain?",
    answer: "Regular cleaning and lubrication are essential. Use a degreaser to clean the chain every 100 miles, followed by a quality lubricant suited for your riding conditions."
  },
  {
    question: "What tire pressure should I use?",
    answer: "Recommended pressure ranges are listed on the sidewalls of your tires. For road bikes, typically 80-110 PSI; for mountain bikes, 25-45 PSI depending on terrain."
  },
  {
    question: "How often should I service my suspension?",
    answer: "We recommend a basic lower leg service every 50 hours of riding and a full damper service every 100-200 hours to ensure optimal performance."
  },
  {
    question: "Is my bicycle compatible with indoor trainers?",
    answer: "Most modern bikes are compatible. You may need specific thru-axle adapters depending on your bike model and the trainer type (wheel-on vs. direct drive)."
  }
];

export default function TechnicalHelp() {
  return (
    <div className="bg-[#fafbff] min-h-screen pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2" />
      
      <PageHeader 
        title="Technical Help" 
        subtitle="Expert assistance for your elite ride."
        icon={HelpCircle} 
        badge="Engineering Support"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: FAQs */}
          <div className="lg:col-span-2 space-y-12">
            <motion.section
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 shadow-sm border border-brand-100">
                    <Settings size={24} />
                  </div>
                  Quick Solutions
                </h2>
                <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-300">Updated weekly</span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {faqs.map((faq, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-brand-500/30 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors tracking-tight">
                      {faq.question}
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute -bottom-10 -right-10 p-8 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000">
                <Book size={200} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6 tracking-tight">Manuals & Documentation</h3>
                <p className="text-slate-400 mb-8 font-medium max-w-lg text-lg leading-relaxed">
                  Access every assembly guide, maintenance log, and technical specification for your machine.
                </p>
                <button className="bg-brand-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-600 transition-all flex items-center gap-3 shadow-xl shadow-brand-500/20 active:scale-95">
                  Browse Documents <Book size={20} />
                </button>
              </div>
            </motion.section>
          </div>

          {/* Sidebar: Support Options */}
          <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-10 rounded-[3rem] bg-white/40 backdrop-blur-xl border border-white sticky top-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]"
            >
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 mb-8 shadow-sm">
                 <MessageCircle size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Live Support</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                Connect with our certified mechanics for real-time diagnostics.
              </p>
              
              <div className="space-y-5">
                {[
                  { title: 'Video Consult', sub: 'Book a Mechanic', icon: Wrench },
                  { title: 'Priority Queue', sub: 'Urgent Help', icon: AlertCircle }
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-slate-50 flex items-center gap-5 hover:bg-brand-500 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 group-hover:bg-white/20 flex items-center justify-center text-brand-500 group-hover:text-white transition-colors">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                      <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 bg-slate-900 text-white py-5 rounded-2xl font-black transition-all shadow-2xl active:scale-95 hover:bg-brand-500">
                Start Expert Chat
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
