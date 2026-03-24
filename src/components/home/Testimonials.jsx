import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import 'swiper/css';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Pro Road Rider",
      content: "Found my dream setup here. The precision in their custom building process is unmatched. My performance has seen a  boost.",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "MTB Enthusiast",
      content: "The technical knowledge of the staff is incredible. They rebuilt my suspension and it feels completely transformed. Peak engineering.",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Urban Adventurer",
      content: "Eco-friendly, stylish, and remarkably fast. My new e-bike from CycleCore has completely changed my city commute. Highly recommend!",
      rating: 5,
    },
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Pro Road Rider",
      content: "Found my dream setup here. The precision in their custom building process is unmatched. My performance has seen a  boost.",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "MTB Enthusiast",
      content: "The technical knowledge of the staff is incredible. They rebuilt my suspension and it feels completely transformed. Peak engineering.",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Urban Adventurer",
      content: "Eco-friendly, stylish, and remarkably fast. My new e-bike from CycleCore has completely changed my city commute. Highly recommend!",
      rating: 5,
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <motion.span className="text-brand-600 font-black tracking-widest uppercase text-[10px] sm:text-xs mb-4 block">
              Rider Stories
            </motion.span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">
              Trusted by the <span className="text-brand-500">Community.</span>
            </h2>
          </div>

          <p className="max-w-sm text-slate-500 text-sm sm:text-base font-medium hidden md:block">
            Join thousands of riders who have discovered their true potential and trust CycleCore with their journey.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          loop={true}
          speed={800} // smooth transition
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
            1280: { slidesPerView: 3, spaceBetween: 32 },
            1536: { slidesPerView: 4, spaceBetween: 32 }
          }}
          className="!pb-20 !pt-4"
        >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={`${testimonial.id}-${idx}`}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="h-full p-8 rounded-[2.5rem] bg-white border border-slate-100/80 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.25)] hover:border-brand-200 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Glass highlight effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-brand-500 text-brand-500" />
                      ))}
                    </div>
  
                    {/* Quote */}
                    <Quote className="text-brand-500/10 mb-4 group-hover:text-brand-500/20 transition-colors duration-500" size={48} />
  
                    <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
  
                  {/* User */}
                  <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-slate-50">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-500">
                      {testimonial.name.charAt(0)}
                    </div>
  
                    <div>
                      <h4 className="font-black text-slate-900 text-base tracking-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-brand-600 text-xs font-black uppercase tracking-widest">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}