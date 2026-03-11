import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Accommodations } from '../components/sections/Accommodations';
import { Dining } from '../components/sections/Dining';
import { Booking } from '../components/sections/Booking';
import { SEO } from '../components/SEO';

export function AccommodationsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#booking') {
      setTimeout(() => {
        const element = document.getElementById('booking');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <SEO 
        title="Luxury Farm Stay Accommodations | Green Heaven Welimada" 
        description="Relax in our comfortable, nature-immersed accommodations in the heart of Welimada, Sri Lanka. Perfect for a peaceful retreat." 
        url="https://greenheaven.lk/accommodations"
      />
      <div className="flex flex-col pt-32 pb-20">
        <Accommodations />
        <Dining />
        <div className="mt-20">
          <Booking />
        </div>
      </div>
    </>
  );
}
