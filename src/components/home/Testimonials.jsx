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
      content: "Found my dream setup here. The precision in their custom building process is unmatched. My performance has seen a significant boost.",
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
      content: "Found my dream setup here. The precision in their custom building process is unmatched. My performance has seen a significant boost.",
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
    <section className="py-24 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-2 block">
              Rider Stories
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Trusted by the <span className="text-brand-500">Community.</span>
            </h2>
          </div>

          <p className="max-w-sm text-slate-500 text-sm">
            Join thousands of riders who trust CycleCore.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          speed={800} // smooth transition
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="h-full p-6 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col justify-between">

                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-brand-500 text-brand-500" />
                    ))}
                  </div>

                  {/* Quote */}
                  <Quote className="text-brand-500/20 mb-3" size={40} />

                  <p className="text-slate-700 text-base leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* User */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-brand-600 text-xs font-semibold">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}