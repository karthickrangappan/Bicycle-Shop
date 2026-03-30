import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const bannerData = [
  {
    id: 1,
    title: "Conquer Any Trail",
    subtitle: "Built for the roughest peaks. Experience the ultimate performance with our rugged mountain bike collection.",
    image: "/images/hero/bg-img (9).jpg",
    accent: "text-blue-400"
  },
  {
    id: 2,
    title: "The Road Elite",
    subtitle: "Pure speed. Aerodynamic perfection meets carbon fiber excellence. Engineered for the podium.",
    image: "/images/hero/bg-img (4).jpg",
    accent: "text-emerald-400"
  },
  {
    id: 3,
    title: "Urban Evolution",
    subtitle: "Eco City Life. Sustainable, fast, and remarkably stylish. The future of urban commuting.",
    image: "/images/hero/bg-img (1).jpg",
    accent: "text-cyan-400"
  }
];

export default function Banner() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen overflow-hidden group">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        //   bulletClass:
        //     'swiper-pagination-bullet bg-white/50 w-3 h-3 transition-all duration-300 mx-2 block rounded-full',
        //   bulletActiveClass:
        //     'bg-brand-500 w-8 rounded-full opacity-100 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
        // }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-full h-full"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id} className="relative">
            
            {/* Background */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[5s] kenburns-img"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950/40"></div>
              <div className="absolute inset-0 bg-grid-white/5 opacity-20"></div>
            </div>

            {/* Content (Centered) */}
            <div className="absolute inset-0 flex items-center pt-24 sm:pt-32 px-4 sm:px-8">
              <div className="max-w-[1600px] mx-auto w-full">
                <div className="max-w-5xl mx-auto text-center">
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <span className="inline-block px-5 py-2 mb-8 text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-brand-400 border border-brand-400/30 bg-brand-400/10 rounded-full backdrop-blur-sm">
                      Premium Collection 2024
                    </span>

                    <h2 className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 leading-[1.05] tracking-tighter drop-shadow-2xl">
                      {banner.title.split(' ').map((word, i) => (
                        <span
                          key={i}
                          className={i === 0 ? "" : `${banner.accent}`}
                        >
                          {word}{' '}
                        </span>
                      ))}
                    </h2>

                    <p className="text-base sm:text-xl lg:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg opacity-90">
                      {banner.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                      
                      <button 
                      onClick={() => navigate('/shop')} 
                      className="w-full sm:w-auto relative overflow-hidden px-10 sm:px-14 py-5 bg-brand-500 text-white font-black rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1 active:scale-95 group/btn">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          Shop Collection
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                      </button>

                      <button
                      onClick={() => navigate('/shop')}
                      className="w-full sm:w-auto px-10 sm:px-14 py-5 bg-white/10 backdrop-blur-xl text-white font-black rounded-2xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1 active:scale-95 border border-white/20">
                        View Showroom
                      </button>

                    </div>
                  </motion.div>

                </div>
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }

        .swiper-slide-active .kenburns-img {
          animation: kenburns 30s ease-in-out infinite;
        }

        /* Swiper Pagination Styling */
        .swiper-pagination {
          bottom: 40px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }

        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: white !important;
          opacity: 0.3 !important;
          border-radius: 99px !important;
          transition: all 0.5s ease !important;
        }

        .swiper-pagination-bullet-active {
          width: 40px !important;
          opacity: 1 !important;
          background: var(--color-brand-500) !important;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}