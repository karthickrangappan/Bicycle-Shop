import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary-subtle pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 border-t border-gray-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-6 xl:pr-10 text-center sm:text-left">
            <a href="/" className="flex justify-center sm:justify-start items-center mb-5 group">
              <img
                src="/images/logo.png"
                alt="Bicycle Shop"
                className="h-14 sm:h-16 lg:h-20 xl:h-24 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <p className="text-sm text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-sm mx-auto sm:mx-0">
              Your premier destination for high-quality bicycles, accessories, and professional repair services. Ride with passion, explore the world.
            </p>

            {/* Social */}
            <div className="flex justify-center sm:justify-start gap-3">
              {["facebook", "twitter", "instagram"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm border border-gray-100 hover:bg-primary-main hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    {icon === "facebook" && (
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    )}
                    {icon === "twitter" && (
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996"/>
                    )}
                    {icon === "instagram" && (
                      <path d="M12 2c2.5 0 2.8.01 3.8.06 1 .05 1.6.2 2 .4a4 4 0 011.4 1.4c.2.4.35 1 .4 2 .05 1 .06 1.3.06 3.8s-.01 2.8-.06 3.8c-.05 1-.2 1.6-.4 2a4 4 0 01-1.4 1.4c-.4.2-1 .35-2 .4-1 .05-1.3.06-3.8.06s-2.8-.01-3.8-.06c-1-.05-1.6-.2-2-.4a4 4 0 01-1.4-1.4c-.2-.4-.35-1-.4-2C2.01 14.8 2 14.5 2 12s.01-2.8.06-3.8c.05-1 .2-1.6.4-2a4 4 0 011.4-1.4c.4-.2 1-.35 2-.4C6.8 2.01 7.1 2 9.6 2H12z"/>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop / Support / Contact */}
          {[{
            title: "Shop",
            items: ["Mountain Bikes", "Road Bikes", "City Bikes", "E-Bikes", "Accessories"]
          },{
            title: "Support",
            items: ["Contact Us", "FAQ", "Shipping", "Sizing Guide", "Warranty"]
          }].map((section, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-4 sm:mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-sm text-gray-600">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-primary-main flex items-center justify-center sm:justify-start gap-2 group transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-main"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-4 sm:mb-6">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <span>123 Cycling Lane, Spoke City, CA 90210</span>
              </li>
              <li>(555) 123-4567</li>
              <li>hello@bicycleshop.com</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 sm:mt-14 lg:mt-16 pt-6 sm:pt-8 border-t border-gray-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Bicycle Shop. All rights reserved.</p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <a href="#" className="hover:text-primary-main transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-main transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}