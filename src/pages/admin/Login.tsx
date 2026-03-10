import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-black text-white p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 md:p-12 bg-black/40 backdrop-blur-md rounded-[30px] border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl text-sage-green mb-2">Admin Portal</h2>
          <p className="font-mono text-xs tracking-widest text-white/50 uppercase">greenheaven Welimada</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-mono">{error}</div>}
        {message && <div className="mb-4 p-3 rounded-lg bg-sage-green/10 border border-sage-green/50 text-sage-green text-sm font-mono">{message}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/50 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sage-green transition-colors font-sans"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-white/50 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sage-green transition-colors font-sans"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-green text-forest-moss font-bold uppercase tracking-widest font-mono text-sm py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
