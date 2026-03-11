import React from 'react';
import { About } from '../components/sections/About';
import { Testimonials } from '../components/sections/Testimonials';
import { SEO } from '../components/SEO';

export function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us | Green Heaven Welimada" 
        description="Learn about our sustainable farming practices, our community, and the peaceful retreats at Green Heaven in Welimada." 
        url="https://greenheaven.lk/about"
      />
      <div className="flex flex-col pt-32 pb-20">
        <About />
        <Testimonials />
      </div>
    </>
  );
}
