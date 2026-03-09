import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowRight, Leaf, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('This email is already subscribed.');
        }
        throw error;
      }

      setStatus('success');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (err: any) {
      console.error('Error subscribing:', err);
      setStatus('error');
      setMessage(err.message || 'Failed to subscribe. Please try again later.');
    }
  };

  return (
    <footer className="relative bg-cream-mist border-t border-forest-moss/20 pt-24 pb-12 overflow-hidden">
      {/* Decorative leaf watermark in the background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 text-sage-green/5 pointer-events-none">
        <Leaf size={400} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Column 1: Brand & Mission (Spans 4 columns) */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <h2 className="font-serif text-3xl text-golden-amber mb-6 flex items-center gap-3">
              <Leaf className="text-sage-green" size={24} />
              GreenHaven
            </h2>
            <p className="font-sans text-stone-300 leading-relaxed mb-8 max-w-sm">
              An organic sanctuary hidden in the lush hills of Welimada, Sri Lanka.
              We invite you to slow down, reconnect with the earth's ancient rhythms,
              and experience the true essence of mindful living.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/17EHNXtvUN/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:bg-sage-green hover:text-white hover:border-sage-green transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/17EHNXtvUN/"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:bg-sage-green hover:text-white hover:border-sage-green transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/17EHNXtvUN/"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:bg-sage-green hover:text-white hover:border-sage-green transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Links (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-[0.2em] mb-8 font-bold">
              Explore
            </h4>
            <ul className="space-y-4 font-sans text-stone-400">
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  Our Story
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/accommodations" onClick={() => window.scrollTo(0, 0)} className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  Villas & Stays
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/experiences" onClick={() => window.scrollTo(0, 0)} className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  Farm Experiences
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  Journal & News
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Legal (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-[0.2em] mb-8 font-bold">
              Support
            </h4>
            <ul className="space-y-4 font-sans text-stone-400">
              <li>
                <a href="mailto:admin@greenhaven.lk" className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" onClick={() => window.scrollTo(0, 0)} className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  Terms of Service
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </li>
              <li>
                <a href="#" className="inline-block relative overflow-hidden group hover:text-white transition-colors">
                  FAQ
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Spans 4 columns) */}
          <div className="lg:col-span-4 bg-white/5 rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-sage-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h4 className="font-serif text-xl text-white mb-2">Join Our Newsletter</h4>
              <p className="font-sans text-sm text-stone-400 mb-6 line-clamp-2">
                Subscribe to receive seasonal updates, exclusive farm retreat offers, and stories from the highlands.
              </p>
              <form className="relative" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-stone-500 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-all"
                  required
                  disabled={status === 'submitting' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sage-green rounded-lg text-white hover:bg-golden-amber hover:text-forest-moss transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Subscribe"
                >
                  {status === 'success' ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
                </button>
              </form>
              {status === 'success' && (
                <p className="mt-3 text-sm text-sage-green font-sans flex items-center gap-2">
                  <CheckCircle2 size={14} /> Thanks for subscribing!
                </p>
              )}
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-400 font-sans">{message}</p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest text-center md:text-left">
            <Link to="/admin/login" className="hover:text-stone-400 transition-colors cursor-default">
              © {currentYear} GreenHaven Welimada.
            </Link> All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
              Solution by
            </p>
            <a
              href="https://chinthaka2000.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-golden-amber hover:text-white transition-colors"
            >
              Chinthaka.github.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}