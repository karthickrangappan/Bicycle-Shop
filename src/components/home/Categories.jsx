import React from 'react';

const categories = [
  {
    id: 1,
    title: "Mountain Bikes",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80",
    link: "/shop"
  },
  {
    id: 2,
    title: "Road Bikes",
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80",
    link: "/shop"
  },
  {
    id: 3,
    title: "City Commuters",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    link: "/shop"
  },
  {
    id: 4,
    title: "E-Bikes",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
    link: "/shop"
  }
];

export default function Categories() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Shop by <span className="text-primary-main">Category</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Find exactly what you're looking for by browsing our specialized collections.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={category.link}
              className="group relative h-72 sm:h-80 rounded-4xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              {/* Background Image */}
              <img 
                src={category.image} 
                alt={category.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{category.title}</h3>
                <span className="inline-flex items-center text-sm font-bold tracking-wider uppercase text-primary-200 group-hover:text-primary-main transition-colors">
                  Explore
                  <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
        
      </div>
    </section>
  );
}