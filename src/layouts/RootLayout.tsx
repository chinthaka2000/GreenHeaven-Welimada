import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ParticleBackground } from '../components/ui/ParticleBackground';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-forest-black text-forest-moss selection:bg-sage-green/30 flex flex-col">
      <ParticleBackground />
      <Navigation />

      <main className="relative z-10 w-full flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
