import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { Gallery } from '../components/sections/Gallery';

export function Home() {
  return (
    <div className="flex flex-col pb-20">
      <Hero />
      <Stats />
      <Gallery />
    </div>
  );
}
