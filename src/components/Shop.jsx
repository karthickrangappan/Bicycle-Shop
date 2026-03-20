import React, { useState } from 'react';
import ProductCard, { MOCK_PRODUCTS } from './ProductCard';

const CATEGORIES = ["All", "Mountain", "Road", "City", "E-Bikes"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(product => product.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-primary-main">Collection</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find the perfect ride for every terrain. From rugged mountain trails to smooth city streets, we have a bicycle built just for you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-28 border border-gray-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 border-b pb-3">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                        activeCategory === category 
                          ? "bg-primary-subtle text-primary-hover font-medium" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary-main"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}