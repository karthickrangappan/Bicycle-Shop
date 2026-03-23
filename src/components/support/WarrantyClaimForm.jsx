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
      <div className="bg-white min-h-screen">
        <PageHeader title="Claim Received" icon={CheckCircle2} />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-brand-500 rounded-[30px] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-brand-500/30"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Request ID: #CC-92834</h2>
          <p className="text-slate-600 font-medium mb-12 text-lg">
            Our engineering team has received your claim. We will review the details and contact you via email within 24-48 business hours.
          </p>
          <Link to="/" className="inline-block bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-500 transition-all">
            Return To Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Warranty Claim Portal" icon={ShieldAlert} />
      
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="flex justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all border-4 ${
                step >= num ? 'bg-brand-500 border-white text-white scale-110 shadow-xl shadow-brand-500/20' : 'bg-white border-slate-100 text-slate-300'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-2xl shadow-slate-200/50"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag className="text-brand-500" />
                    <h3 className="text-2xl font-black text-slate-900">Product Authentication</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Model Name</label>
                      <input type="text" placeholder="e.g. Apex 3000 Carbon" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Serial Number</label>
                      <input type="text" placeholder="Found on bottom bracket" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Date of Purchase</label>
                      <input type="date" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500" required />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <FileText className="text-brand-500" />
                    <h3 className="text-2xl font-black text-slate-900">Issue Specification</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Detailed Description</label>
                    <textarea rows="4" placeholder="Please describe the issue in detail..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500" required />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Visual Documentation</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center group hover:border-brand-500 transition-colors cursor-pointer">
                          <Camera className="text-slate-300 group-hover:text-brand-500 mb-2" />
                          <span className="text-[10px] font-black uppercase text-slate-400">Add Photo</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Please provide at least one clear photo of the serial number and the affected area.</p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <User className="text-brand-500" />
                    <h3 className="text-2xl font-black text-slate-900">Personal Contact</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                      <input type="text" placeholder="As it appears on bill" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                      <input type="email" placeholder="For claim status updates" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Phone Number</label>
                      <input type="tel" placeholder="+1 (800) 000-0000" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-brand-500" required />
                    </div>
                  </div>

                  <div className="p-6 bg-brand-50 rounded-3xl border border-brand-100">
                    <div className="flex gap-4">
                      <div className="w-6 h-6 bg-brand-500 rounded-lg flex items-center justify-center text-white shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        I confirm that the information provided is accurate and that I am the original owner of this bicycle. I understand that fraudulent claims will void all future warranties.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-8 border-t border-slate-50">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-slate-900 transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button type="button" onClick={nextStep} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-brand-500 transition-all">
                  Next Step <ArrowRight size={18} />
                </button>
              ) : (
                <button type="submit" className="bg-brand-500 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20">
                  Submit Claim <Send size={18} />
                </button>
              )}
            </div>

          </form>
        </motion.div>

        {/* Footer info */}
        <p className="text-center mt-12 text-slate-400 text-sm font-medium">
          Secure Claim Portal | Encrypted Data Transmission <br />
          CycleCore Engineering Support Team
        </p>
      </div>
    </div>
  );
}
