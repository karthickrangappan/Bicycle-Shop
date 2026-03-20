import React from 'react';

export default function Contact() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Get in <span className="text-primary-main">Touch</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-gray-500 text-sm sm:text-base md:text-lg">
            Have a question about a bike, need a repair, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Info (Left Column) */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <p className="text-gray-500 mb-8 sm:text-lg">
                Fill out the form and our team will get back to you within 24 hours. Or reach out directly via phone or email.
              </p>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-subtle p-3.5 rounded-full text-primary-main">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900">Address</h3>
                    <p className="text-gray-500 mt-1 sm:text-lg">123 Cycling Lane<br />Spoke City, CA 90210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-subtle p-3.5 rounded-full text-primary-main">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900">Phone</h3>
                    <p className="text-gray-500 mt-1 sm:text-lg">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-subtle p-3.5 rounded-full text-primary-main">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900">Email</h3>
                    <p className="text-gray-500 mt-1 sm:text-lg">hello@bicycleshop.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right Column) */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
              <form className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all bg-gray-50 focus:bg-white" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all bg-gray-50 focus:bg-white" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all bg-gray-50 focus:bg-white" placeholder="How can we help?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea id="message" rows="4" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all resize-none bg-gray-50 focus:bg-white" placeholder="Write your message here..."></textarea>
                </div>
                <button type="button" className="w-full bg-primary-main hover:bg-primary-hover text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg text-lg">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}