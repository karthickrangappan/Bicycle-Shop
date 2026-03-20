import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const bannerData = [
  {
    id: 1,
    title: "Mountain Explorers",
    subtitle: "Conquer any trail with our rugged new MTB collection.",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 2,
    title: "City Commuters",
    subtitle: "Eco-friendly, fast, and stylish rides for the urban jungle.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 3,
    title: "Road Racing Excellence",
    subtitle: "Aerodynamic perfection designed for maximum speed.",
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 4,
    title: "The E-Bike Revolution",
    subtitle: "Go further and faster with less effort.",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 5,
    title: "Premium Accessories",
    subtitle: "Gear up! Everything you need for the perfect ride.",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 6,
    title: "Professional Services",
    subtitle: "Expert repairs, tune-ups, and custom builds.",
    image: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&w=1920&q=80"
  }
];

export default function Banner() {
  return (
    <div className="w-full h-screen">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="w-full h-full"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id} className="relative">

            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 flex items-center justify-center">

              <div className="text-center px-6 max-w-4xl">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {banner.title}
                </h2>

                <p className="text-lg sm:text-xl text-gray-200 mb-8">
                  {banner.subtitle}
                </p>

                <button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg">
                  Shop Collection
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}