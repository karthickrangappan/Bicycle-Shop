import React from 'react';

export default function PromoBanner() {
  return (
    <section className="relative bg-primary-main overflow-hidden py-14 sm:py-16 lg:py-20 mt-4 sm:mt-8">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="promo-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 10a10 10 0 100 20 10 10 0 000-20zm0 15a5 5 0 110-10 5 5 0 010 10z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#promo-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Text Content */}
        <div className="text-center md:text-left flex-1">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 text-white text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">Limited Time Offer</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Gear Up for Spring
          </h2>
          <p className="text-primary-50 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0">
            Take up to <span className="font-bold text-white border-b-2 border-white/30 pb-0.5">30% off</span> our premium selection of mountain bikes, apparel, and custom components.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="flex-shrink-0 w-full md:w-auto text-center">
          <a href="/shop" className="inline-flex items-center justify-center w-full md:w-auto bg-white text-primary-main hover:bg-gray-50 font-bold text-lg py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
            Claim Discount
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}