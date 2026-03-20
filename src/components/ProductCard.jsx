import React from "react";

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "TrailBlazer Pro MTB",
    category: "Mountain",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "AeroGlide Road Bike",
    category: "Road",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "EcoCommute E-Bike",
    category: "E-Bikes",
    price: "$1,899",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Metro Cruiser City",
    category: "City",
    price: "$699",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Summit Seeker MTB",
    category: "Mountain",
    price: "$1,599",
    image: "https://images.unsplash.com/photo-1559160581-4471b8ee0b66?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Veloce Carbon Road",
    category: "Road",
    price: "$3,199",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
  }
];

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden group flex flex-col">

      {/* Image */}
      <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full text-gray-800 uppercase shadow">
          {product.category}
        </span>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-400 hover:text-red-500 shadow opacity-0 group-hover:opacity-100 transition">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">

        {/* Ratings */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">(12)</span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-hover transition">
          {product.name}
        </h3>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {product.price}
          </p>

          <button className="bg-gray-900 text-white hover:bg-primary-hover px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm flex items-center gap-2 transition">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}