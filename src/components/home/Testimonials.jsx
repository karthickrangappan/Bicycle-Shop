import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Daily Commuter",
      content: "VeloDynamics helped me find the perfect city bike for my daily commute. The staff was incredibly knowledgeable and didn't try to upsell me on things I didn't need. My ride to work has never been smoother!",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "Mountain Biker",
      content: "I brought my mountain bike in for a full suspension overhaul after a rough season. The mechanics here are wizards. It rides better now than it did when I bought it brand new. Highly recommend their service department.",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Road Cyclist",
      content: "The custom fitting process at VeloDynamics completely changed my riding experience. I used to get knee pain after 30 miles, but after their adjustments, I just completed my first century ride pain-free!",
      rating: 5,
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm sm:text-base md:text-lg text-primary-main font-bold tracking-widest uppercase">Testimonials</h2>
          <p className="mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900">
            What Our Riders Say
          </p>
          <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl xl:text-2xl text-gray-500 mx-auto">
            Don't just take our word for it. Read about the experiences of our amazing community of cyclists.
          </p>
        </div>

        {/* Testimonials Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="pb-16"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-auto">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-100 flex flex-col h-full justify-between hover:-translate-y-2 transition-all duration-300 ease-in-out">
              <div>
                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-6 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-600 text-base sm:text-lg md:text-xl italic mb-8 leading-relaxed">"{testimonial.content}"</p>
              </div>
              
              {/* Customer Info */}
              <div className="flex items-center mt-auto">
                <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-primary-light flex items-center justify-center text-primary-main font-bold text-lg sm:text-xl md:text-2xl shadow-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3 sm:ml-4">
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm md:text-base font-medium text-primary-main">{testimonial.role}</div>
                </div>
              </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}