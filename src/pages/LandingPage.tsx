import React from 'react';
import { ParticleBackground } from '../components/ui/ParticleBackground';
import { CustomCursor } from '../components/ui/CustomCursor';
import { Navigation } from '../components/sections/Navigation';
import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { About } from '../components/sections/About';
import { Experiences } from '../components/sections/Experiences';
import { Accommodations } from '../components/sections/Accommodations';
import { Dining } from '../components/sections/Dining';
import { Testimonials } from '../components/sections/Testimonials';
import { Booking } from '../components/sections/Booking';
import { Gallery } from '../components/sections/Gallery';
import { Footer } from '../components/sections/Footer';
export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-forest-black text-cream-mist selection:bg-golden-amber/30">
      <CustomCursor />
      <ParticleBackground />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Experiences />
        <Accommodations />
        <Dining />
        <Testimonials />
        <Gallery />
        <Booking />
      </main>

      <Footer />
    </div>);

}