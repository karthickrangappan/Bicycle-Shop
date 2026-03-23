import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function PageHeader({ title, icon: Icon }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="relative pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16 overflow-hidden bg-slate-900 border-none">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.15)_0%,_transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.1)_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center">



          {/* Icon & Title Group */}
          <div className="flex flex-col items-center mb-4">
            {Icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-brand-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand-500/30 ring-4 ring-slate-100/10 mb-3"
              >
                <Icon size={24} strokeWidth={2.5} className="sm:w-7 sm:h-7" />
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1] max-w-4xl"
            >
              {title}
            </motion.h1>
          </div>

          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl shadow-black/20"
          >
            <Link to="/" className="text-slate-400 hover:text-white transition-all transform hover:scale-110 flex items-center gap-2">
              <Home size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Catalog</span>
            </Link>

            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;

              return (
                <div key={name} className="flex items-center gap-3">
                  <ChevronRight size={12} className="text-slate-600" />
                  {isLast ? (
                    <span className="text-brand-400 text-[9px] font-black uppercase tracking-widest bg-brand-500/10 px-2.5 py-1 rounded-lg">
                      {name.replace(/-/g, ' ')}
                    </span>
                  ) : (
                    <Link to={routeTo} className="text-slate-400 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest">
                      {name.replace(/-/g, ' ')}
                    </Link>
                  )}
                </div>
              );
            })}
          </motion.nav>

        </div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full rotate-180 transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-6 w-full fill-white sm:h-10 lg:h-14">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </div>
  );
}
