import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, Home, Image, FileText, LayoutTemplate, PenTool, Tent, Calendar, Settings } from 'lucide-react';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: Home },
    { label: 'Experiences', path: '/admin/experiences', icon: Tent },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { label: 'Blog Posts', path: '/admin/blog', icon: PenTool },
    { label: 'Hero Section', path: '/admin/hero', icon: LayoutTemplate },
    { label: 'About Stories', path: '/admin/about', icon: FileText },
    { label: 'Gallery Items', path: '/admin/gallery', icon: Image },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-sage-green flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-forest-black text-white flex flex-col border-r border-white/10 shrink-0 shadow-2xl z-20 md:h-screen md:sticky md:top-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-serif text-2xl text-sage-green">Admin Portal</h2>
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mt-1">greenheaven Welimada</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-mono uppercase text-xs tracking-widest ${isActive
                  ? 'bg-sage-green text-forest-black font-bold'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors font-mono uppercase text-xs tracking-widest"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 h-screen overflow-y-auto bg-stone-100 text-forest-moss [&_input]:bg-white [&_input]:text-forest-moss [&_textarea]:bg-white [&_textarea]:text-forest-moss [&_select]:bg-white [&_select]:text-forest-moss">
        <div className="max-w-5xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
