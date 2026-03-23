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
    <div className="bg-white min-h-screen">
      <PageHeader title="Technical Help" icon={HelpCircle} />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: FAQs */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Settings className="text-brand-500" size={32} />
                Common Troubleshooting
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="bg-brand-600 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Book size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Manuals & Documentation</h3>
                <p className="text-brand-100 mb-6 font-medium max-w-lg">
                  Access digital owner's manuals, assembly guides, and technical specifications for every CycleCore model ever built.
                </p>
                <button className="bg-white text-brand-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                  Browse Documents <Book size={18} />
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar: Support Options */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 text-white sticky top-24 shadow-2xl shadow-slate-200">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <MessageCircle className="text-brand-400" />
                Live Support
              </h3>
              <p className="text-slate-400 font-medium mb-8">
                Need specific assistance? Our engineers are online Monday-Friday, 9AM-6PM.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Book a Mechanic</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Video Consult</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Urgent Help</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Priority Queue</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-brand-500 hover:bg-brand-600 text-white py-4 rounded-xl font-black transition-all shadow-xl shadow-brand-500/20">
                Start Chat Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
