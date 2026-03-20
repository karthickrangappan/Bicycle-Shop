import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import PromoBanner from './PromoBanner';
import Testimonials from './Testimonials';

export default function Home() {
  return (
    <main className="flex-grow">
      <Banner />
      <Categories />
      <PromoBanner />
      <Testimonials />
    </main>
  );
}