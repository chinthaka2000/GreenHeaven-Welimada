import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBlur = useTransform(scrollY, [0, 100], ['blur(5px)', 'blur(10px)']);
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.08)']
  );
  const links = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Experiences',
      href: '/experiences'
    },
    {
      name: 'Stay',
      href: '/accommodations'
    },
    {
      name: 'Blog',
      href: '/blog'
    }];

  return (
    <>
      <motion.nav
        style={{
          backdropFilter: navBlur,
          backgroundColor: navBg
        }}
        className={`
          fixed top-6 left-1/2 -translate-x-1/2 z-50
          rounded-full border border-forest-moss/10
          px-6 py-3 flex items-center justify-between
          transition-all duration-500 hidden md:flex
          ${isScrolled ? 'w-[800px] max-w-[95%]' : 'w-[95%] max-w-5xl'}
        `}>

        <div className="flex items-center">
          <Link to="/" className="flex flex-row items-center gap-2">
            <img src="https://mgfwijircgytueryzkyw.supabase.co/storage/v1/object/public/images/1.svg" alt="greenheaven logo" className="h-8 w-auto" />
            <span className="font-serif font-bold text-xl bg-gradient-to-r from-forest-moss to-sage-green bg-clip-text text-transparent whitespace-nowrap">
              GreenHeaven Welimada
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          {links.map((link) =>
            <Link
              key={link.name}
              to={link.href}
              className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors relative group font-semibold ${location.pathname === link.href ? 'text-sage-green' : 'text-forest-moss/80 hover:text-sage-green'}`}>

              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-sage-green transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          )}
        </div>

        <motion.button
          onClick={() => navigate('/accommodations#booking')}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          className="px-5 py-2 rounded-full bg-white/5 border border-golden-amber/50 text-golden-amber font-mono text-xs tracking-widest uppercase hover:bg-golden-amber/10 transition-colors">

          Book Now
        </motion.button>
      </motion.nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Link to="/" className="flex flex-row items-center gap-2">
          <img src="https://mgfwijircgytueryzkyw.supabase.co/storage/v1/object/public/images/1.svg" alt="greenheaven logo" className="h-8 w-auto drop-shadow-lg" />
          <span className="font-serif font-bold text-xl bg-gradient-to-r from-cream-mist to-golden-amber bg-clip-text text-transparent drop-shadow-lg">
            GreenHeaven Welimada
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-cream-mist">

          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="fixed inset-0 z-40 bg-forest-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden">

          {links.map((link) =>
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-serif text-3xl hover:text-golden-amber ${location.pathname === link.href ? 'text-golden-amber' : 'text-cream-mist'}`}>

              {link.name}
            </Link>
          )}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/accommodations#booking');
            }}
            className="px-8 py-3 rounded-full bg-golden-amber text-forest-black font-bold font-mono uppercase tracking-widest">
            Book Your Stay
          </button>
        </motion.div>
      }
    </>);

}