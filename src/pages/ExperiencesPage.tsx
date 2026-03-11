import React from 'react';
import { Experiences } from '../components/sections/Experiences';
import { SEO } from '../components/SEO';

export function ExperiencesPage() {
  return (
    <>
      <SEO 
        title="Agri-Tourism Experiences | Green Heaven Welimada" 
        description="Explore organic farming, tea plucking, and local Sri Lankan culinary experiences at Green Heaven Welimada." 
        url="https://greenheaven.lk/experiences"
      />
      <div className="flex flex-col pt-32 pb-20">
        <Experiences />
      </div>
    </>
  );
}
