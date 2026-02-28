import React from 'react';
import { About } from '../components/sections/About';
import { Testimonials } from '../components/sections/Testimonials';

export function AboutPage() {
  return (
    <div className="flex flex-col pt-32 pb-20">
      <About />
      <Testimonials />
    </div>
  );
}
