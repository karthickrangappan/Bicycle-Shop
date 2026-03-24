import React, { useState } from 'react';
import PageHeader from '../../layout/PageHeader';
import { ShieldAlert, Camera, Send, FileText, User, ShoppingBag, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function WarrantyClaimForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("Warranty claim submitted successfully!");
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#fafbff] min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10 translate-x-1/2" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-zl w-full bg-white/40 backdrop-blur-2xl border border-white rounded-[5rem] p-16 text-center shadow-2xl shadow-slate-200/50"
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-28 h-28 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.4)]"
          >
            <CheckCircle2 size={56} />
          </motion.div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4">Transmission Successful</p>
          <h2 className="text-4xl font-black text-slate-950 mb-6 tracking-tighter">Request #CC-92834</h2>
          <p className="text-slate-500 font-medium mb-12 text-lg leading-relaxed max-w-md mx-auto">
            Our engineering team has received your claim. We will review the telemetry and contact you via secure email within 24-48 business hours.
          </p>
          <Link to="/" className="inline-flex items-center gap-3 bg-slate-950 text-white px-12 py-6 rounded-3xl font-black hover:bg-emerald-500 transition-all active:scale-95 shadow-2xl shadow-slate-950/20 uppercase tracking-widest text-xs">
             <ArrowLeft size={18} /> Return to Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafbff] min-h-screen pb-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2" />
      
      <PageHeader 
        title="Warranty Portal" 
        subtitle="Secure claim submission for elite components."
        icon={ShieldAlert} 
        badge="Direct Engineering Link"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="max-w-md mx-auto flex justify-between mb-20 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100/50 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((num) => (
            <div key={num} className="relative z-10 flex flex-col items-center">
               <div 
                 className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-all duration-500 border-4 ${
                   step === num 
                   ? 'bg-emerald-500 border-white text-white scale-110 shadow-2xl shadow-emerald-500/30' 
                   : step > num 
                   ? 'bg-slate-950 border-white text-white shadow-lg'
                   : 'bg-white border-slate-100 text-slate-300'
                 }`}
               >
                 {step > num ? <CheckCircle2 size={24} /> : num}
               </div>
               <p className={`absolute -bottom-8 text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${step === num ? 'text-emerald-500' : 'text-slate-300'}`}>
                 {num === 1 ? 'Authentication' : num === 2 ? 'Specification' : 'Verification'}
               </p>
            </div>
          ))}
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/40 backdrop-blur-2xl border border-white/60 p-10 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
                       <ShoppingBag size={28} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-950 tracking-tight">Product Authentication</h3>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Identity verification via serial ID</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Exact Model Name</label>
                      <input type="text" placeholder="e.g. Apex 3000 Carbon" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Serial Number</label>
                      <input type="text" placeholder="Found on bottom bracket" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" required />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Date of Acquisition</label>
                       <input type="date" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" required />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
                       <FileText size={28} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-950 tracking-tight">Issue Specification</h3>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Detailed structural diagnostics</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Anatomic Description</label>
                    <textarea rows="5" placeholder="Please describe the behavioral issue in detail..." className="w-full px-8 py-5 bg-white border border-slate-100 rounded-3xl font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none" required />
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Visual Documentation</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map(i => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -5 }}
                          className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center group hover:border-blue-500 hover:bg-white transition-all cursor-pointer shadow-sm shadow-inner"
                        >
                          <Camera className="text-slate-300 group-hover:text-blue-500 mb-3" />
                          <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400">Add Intel</span>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Standard requirement: 1 clear photo of serial ID and issue locus.</p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-100">
                       <User size={28} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-950 tracking-tight">Rider Verification</h3>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Direct contact for engineering response</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Identity</label>
                      <input type="text" placeholder="As seen on invoice" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Secure Email</label>
                      <input type="email" placeholder="For diagnostic updates" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Encrypted Contact</label>
                       <input type="tel" placeholder="+1 (800) 000-0000" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                  </div>

                  <div className="p-8 bg-slate-950 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <div className="flex gap-6 items-center">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.1em]">
                        I certify that this machine is within initial ownership and all data provided reflects true performance behavioral metrics.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-10 border-t border-slate-100">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-slate-950 transition-colors group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Diagnostic Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button type="button" onClick={nextStep} className="bg-slate-950 text-white px-10 py-5 rounded-3xl font-black flex items-center gap-4 hover:bg-emerald-500 transition-all duration-300 shadow-2xl active:scale-95 uppercase tracking-widest text-xs">
                  Continue Diagnostic <ArrowRight size={20} />
                </button>
              ) : (
                <button type="submit" className="bg-emerald-500 text-white px-12 py-6 rounded-[2rem] font-black flex items-center gap-4 hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/30 active:scale-95 uppercase tracking-widest text-xs">
                  Transmit Claim <Send size={20} />
                </button>
              )}
            </div>

          </form>
        </motion.div>

        {/* Footer info */}
        <div className="text-center mt-20 opacity-30 group">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-950 group-hover:opacity-100 transition-opacity">
             Secure Claim Portal | Tier-3 Encryption Protocol <br />
             CyclesCore Engineering Command
           </p>
        </div>
      </div>
    </div>
  );
}
