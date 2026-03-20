import React from "react";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-center md:text-left">

          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center justify-center md:justify-start gap-3 mb-8 group">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11V9a2 2 0 0 0-2-2H4" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                CYCLE<span className="text-brand-500">CORE</span>
              </span>
            </a>
            
            <p className="text-slate-400 font-medium leading-relaxed mb-8 max-w-sm mx-auto md:mx-0">
               Engineering the future of cycling. Join our community for exclusive technical insights and early access to new releases.
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:border-brand-500 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8">Performance Shop</h4>
            <ul className="space-y-4">
              {["Mountain Bikes", "Road Racing", "Urban E-Bikes", "Smart Trainers", "Custom Components"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white flex items-center justify-center md:justify-start gap-2 group transition-colors">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-brand-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8">Rider Support</h4>
            <ul className="space-y-4">
              {["Technical Help", "Service Center", "Warranty Policy", "Sizing Guide", "Shipping Info"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white flex items-center justify-center md:justify-start gap-2 group transition-colors">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-brand-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8">The Workshop</h4>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MapPin size={20} className="text-brand-500" />
                <span>123 Performance Way, Gear City, GC 90210</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={20} className="text-brand-500" />
                <span>+1 (800) CYCLE-COR</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={20} className="text-brand-500" />
                <span>hello@cyclecore.io</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} CycleCore Engineering. All rights reserved.
          </p>
          <div className="flex gap-8 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}