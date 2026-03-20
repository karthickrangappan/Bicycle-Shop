import React from 'react';

export default function Services() {
  const servicePackages = [
    {
      title: "Basic Tune-Up",
      price: "$59",
      features: ["Brake adjustment", "Shifting adjustment", "Chain lubrication", "Tire inflation", "Safety inspection"],
      recommended: false
    },
    {
      title: "Comprehensive",
      price: "$129",
      features: ["Everything in Basic", "Drivetrain cleaning", "Wheel truing", "Bottom bracket adjustment", "Bike wash"],
      recommended: true
    },
    {
      title: "Pro Overhaul",
      price: "$249",
      features: ["Complete disassembly", "Bearing replacement", "Hydraulic bleed", "Suspension service", "Frame detailing"],
      recommended: false
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-subtle to-white py-16 sm:py-20 lg:py-24 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Expert <span className="text-primary-main">Bike Services</span>
          </h1>
          <p className="mt-4 sm:mt-6 mx-auto text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
            From quick tune-ups to complete custom builds, our certified mechanics treat every bike like it's their own.
          </p>
        </div>
      </section>

      {/* Pricing/Packages */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {servicePackages.map((pkg, idx) => (
            <div key={idx} className={`relative p-8 rounded-3xl border ${pkg.recommended ? 'border-primary-main shadow-2xl scale-100 md:scale-105 z-10' : 'border-gray-200 shadow-md'} bg-white flex flex-col transition-transform`}>
              {pkg.recommended && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-main text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
              <div className="text-4xl sm:text-5xl font-extrabold text-primary-main mb-6">{pkg.price}</div>
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-gray-600">
                    <svg className="w-5 h-5 text-primary-main mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${pkg.recommended ? 'bg-primary-main text-white hover:bg-primary-hover shadow-md hover:shadow-lg' : 'bg-primary-subtle text-primary-main hover:bg-primary-light'}`}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* A La Carte Services */}
      <section className="bg-gray-50 py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">A La Carte Repairs</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">Need something specific? We offer individual services to get you back on the road quickly.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "Flat Tire Repair", price: "from $15" },
              { name: "Brake Bleed", price: "from $35" },
              { name: "Wheel Truing", price: "from $25" },
              { name: "Chain Installation", price: "from $20" },
              { name: "Suspension Service", price: "from $80" },
              { name: "Custom Bike Build", price: "Contact Us" },
              { name: "E-Bike Diagnostics", price: "from $50" },
              { name: "Box & Ship Bike", price: "from $75" },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow group">
                <span className="font-medium text-gray-700 group-hover:text-primary-main transition-colors">{service.name}</span>
                <span className="text-primary-main font-semibold text-sm">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Not sure what you need?</h2>
          <p className="text-gray-500 mb-8 sm:text-lg leading-relaxed">
            Give us a call or drop by the shop. Our experts are always happy to diagnose your bike and provide a free, no-obligation estimate.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-primary-main hover:-translate-y-1 transition-all duration-300 shadow-md">
            Contact the Shop
          </a>
        </div>
      </section>

    </div>
  );
}