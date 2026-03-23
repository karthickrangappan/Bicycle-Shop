import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { ShieldCheck, FileText, CheckCircle, XCircle, ShoppingBag, Truck, Calendar, Cog } from 'lucide-react';
import { motion } from 'framer-motion';

const warrantyTerms = [
  {
    title: "Frame Warranty",
    period: "Lifetime",
    description: "Covers manufacturer defects in the frame and fork for the original owner.",
    icon: ShieldCheck
  },
  {
    title: "Components",
    period: "2 Years",
    description: "Suspension, drivetrain, and other major non-wear parts are covered for 24 months.",
    icon: ShoppingBag
  },
  {
    title: "Consumables",
    period: "30 Days",
    description: "Tires, tubes, brake pads, and cables are covered for manufacturing defects only.",
    icon: Cog
  }
];

const steps = [
  {
    title: "Identify the problem",
    description: "Contact us via help center with clear photos and video of the issue.",
    icon: FileText
  },
  {
    title: "Case Review",
    description: "Our engineers review the claim within 24-48 business hours.",
    icon: Calendar
  },
  {
    title: "Resolution",
    description: "If approved, we'll provide parts or arrange for local repair/replacement.",
    icon: CheckCircle
  }
];

import { Link } from 'react-router-dom';

export default function WarrantyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Warranty Policy" icon={ShieldCheck} />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <section className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Your Peace Of Mind, Guaranteed.</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            At CycleCore, we engineering our bicycles to the highest standards. We stand behind every machine we build, ensuring you can ride with absolute confidence.
          </p>
        </section>

        {/* Coverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {warrantyTerms.map((term, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 transition-all text-center group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-xl shadow-slate-200 mx-auto mb-8 group-hover:scale-110 transition-transform">
                <term.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{term.title}</h3>
              <p className="text-brand-600 font-black uppercase text-xs tracking-widest mb-4">{term.period}</p>
              <p className="text-slate-500 font-medium leading-relaxed">{term.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Claim Process */}
        <div className="bg-slate-900 rounded-[40px] px-8 py-20 text-white relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.15)_0%,_transparent_40%)] pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-3">
              <Truck className="text-brand-400" size={32} />
              The Claim Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[60px] left-[50px] right-[50px] h-px bg-white/10" />
              
              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-500/20 ring-4 ring-white/10 group-hover:rotate-6 transition-transform">
                    <step.icon size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-[200px]">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link to="/warranty-claim" className="inline-block bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
                Start A Warranty Claim
              </Link>
              <p className="mt-6 text-slate-500 font-medium text-sm">
                Have your product serial number and proof of purchase ready.
              </p>
            </div>
          </div>
        </div>

        {/* Not Covered */}
        <section className="mt-24 p-12 border-2 border-dashed border-slate-200 rounded-[40px]">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 justify-center">
            <XCircle className="text-red-500" />
            What's Not Covered?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              "Normal wear & tear", 
              "Improper assembly", 
              "Corrosion/oxidation", 
              "Crash damage", 
              "Commercial usage",
              "Unauthorized mods",
              "Theft/Loss",
              "Poor maintenance"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {item}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
