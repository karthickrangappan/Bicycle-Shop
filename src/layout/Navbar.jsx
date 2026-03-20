import React, { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary-subtle backdrop-blur-md  shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 sm:h-12 lg:h-40 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
            />
            
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-sm uppercase tracking-wide font-bold text-gray-600 hover:text-primary-main transition-colors duration-300 group py-2"
              >
                {item.label}
                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-primary-main transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2 rounded-full"></span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            
            {/* Wishlist */}
            <button className="relative text-gray-700 hover:text-primary-main transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-primary-main text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>

            {/* Cart */}
            <button className="relative text-gray-700 hover:text-primary-main transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-primary-main text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>

            {/* User */}
            <button className="relative text-gray-700 hover:text-primary-main transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 animate-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-6 space-y-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-base uppercase tracking-wide font-bold text-gray-600 hover:text-primary-main hover:translate-x-1 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex gap-4">
                <button className="text-gray-600 hover:text-primary-main flex items-center gap-1.5 font-bold transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span className="text-sm">0</span>
                </button>
                <button className="text-gray-600 hover:text-primary-main flex items-center gap-1.5 font-bold transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className="text-sm">2</span>
                </button>
              </div>
              
              {/* User (Mobile) */}
              <button className="p-2 bg-gray-50 text-gray-600 hover:text-primary-main hover:bg-primary-100 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
