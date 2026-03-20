import React from 'react';

export default function About() {
  const values = [
    {
      title: "Expert Advice",
      desc: "Our staff are passionate riders who know bikes inside and out, ready to guide you.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Premium Quality",
      desc: "We carry only the top brands and the highest quality components for safety and performance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Dedicated Support",
      desc: "Enjoy ongoing support, professional servicing, and maintenance to keep you riding smoothly.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-subtle to-white py-16 sm:py-20 lg:py-24 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            About <span className="text-primary-main">Bicycle Shop</span>
          </h1>
          <p className="mt-4 sm:mt-6 mx-auto text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
            Passionate about cycling. Committed to quality. Your journey starts here.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed">
              <p>
                Founded in 2010, VeloDynamics started in a small garage with a big dream: to make high-quality bicycles accessible to everyone. Over the years, we've grown from a humble repair shop into a premier destination for cyclists of all levels.
              </p>
              <p>
                Whether you're a daily commuter, a weekend trail warrior, or a competitive road racer, we believe that the right bike can transform your life. Our team of expert mechanics and cycling enthusiasts are here to help you find the perfect ride.
              </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-96 lg:h-[450px]">
            <img 
              src="/images/img-7.png" 
              alt="Our Story" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-gray-500 mx-auto">
              We don't just sell bikes; we build relationships. Here is what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {values.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-subtle text-primary-main mb-6 group-hover:scale-110 group-hover:bg-primary-main group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}