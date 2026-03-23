import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import Trending from './Trending';
import PromoBanner from './PromoBanner';
import Testimonials from './Testimonials';

export default function Home() {
  return (
    <main className="flex-grow">
      <Banner />
      <Categories />
      <Trending />
      <PromoBanner />
      <Testimonials />
    </main>
  );
}