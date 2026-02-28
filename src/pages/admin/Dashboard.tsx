import { Link } from 'react-router-dom';
import { LayoutTemplate, FileText, Image, PenTool, Tent, Calendar } from 'lucide-react';

export function Dashboard() {
  const cards = [
    { title: 'Experiences', path: '/admin/experiences', icon: Tent, description: 'Manage farm activities and dynamic widgets' },
    { title: 'Reservations', path: '/admin/bookings', icon: Calendar, description: 'View and manage upcoming customer bookings.' },
    { title: 'Blog Posts', path: '/admin/blog', icon: PenTool, description: 'Write, edit, and publish farm updates and stories' },
    { title: 'Hero Section', path: '/admin/hero', icon: LayoutTemplate, description: 'Update main headline and background' },
    { title: 'About Stories', path: '/admin/about', icon: FileText, description: 'Manage your farm introduction and photos' },
    { title: 'Gallery Items', path: '/admin/gallery', icon: Image, description: 'Add or modify gallery images and captions' }
  ];

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/50">
      <h1 className="font-serif text-4xl text-forest-moss mb-4">Welcome to Admin</h1>
      <p className="font-mono text-sm tracking-widest uppercase text-forest-moss/60 max-w-2xl leading-relaxed mb-12">
        Select a section below or from the sidebar to edit your website's content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link key={i} to={card.path} className="block p-6 rounded-2xl border border-black/10 hover:border-sage-green hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sage-green/20 text-forest-moss flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon size={24} />
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase font-bold text-forest-moss mb-2">{card.title}</h3>
              <p className="text-sm text-forest-moss/70">{card.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
