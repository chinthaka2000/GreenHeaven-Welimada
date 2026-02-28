import { Section } from '../ui/Section';
import { GlassCard } from '../ui/GlassCard';
export function Dining() {
  return (
    <Section id="dining">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="order-2 md:order-1">
          <h2 className="font-mono text-forest-moss text-sm tracking-[0.3em] uppercase mb-4 font-bold">
            Farm to Table
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl text-forest-moss mb-8">
            Taste the Earth
          </h3>

          <GlassCard className="p-8 md:p-12 bg-white/60 border-forest-moss/10 shadow-lg">
            <ul className="space-y-8">
              <li className="flex justify-between items-center group cursor-pointer">
                <div>
                  <h4 className="font-serif text-xl text-forest-moss font-bold group-hover:text-terracotta-clay transition-colors">
                    Jackfruit Curry
                  </h4>
                  <p className="font-sans text-sm text-forest-moss/80 mt-1">
                    Slow cooked with coconut milk and spices
                  </p>
                </div>
                <div className="h-[1px] flex-1 bg-forest-moss/20 mx-4" />
                <span className="font-mono text-terracotta-clay font-bold">$12</span>
              </li>
              <li className="flex justify-between items-center group cursor-pointer">
                <div>
                  <h4 className="font-serif text-xl text-forest-moss font-bold group-hover:text-terracotta-clay transition-colors">
                    Red Rice Hopper
                  </h4>
                  <p className="font-sans text-sm text-forest-moss/80 mt-1">
                    Served with spicy onion sambol
                  </p>
                </div>
                <div className="h-[1px] flex-1 bg-forest-moss/20 mx-4" />
                <span className="font-mono text-terracotta-clay font-bold">$8</span>
              </li>
              <li className="flex justify-between items-center group cursor-pointer">
                <div>
                  <h4 className="font-serif text-xl text-forest-moss font-bold group-hover:text-terracotta-clay transition-colors">
                    Lake Fish Ambul Thiyal
                  </h4>
                  <p className="font-sans text-sm text-forest-moss/80 mt-1">
                    Sour fish curry, a local delicacy
                  </p>
                </div>
                <div className="h-[1px] flex-1 bg-forest-moss/20 mx-4" />
                <span className="font-mono text-terracotta-clay font-bold">$16</span>
              </li>
            </ul>
          </GlassCard>
        </div>

        <div className="order-1 md:order-2 relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-green/40 to-transparent rounded-full blur-3xl" />
          <GlassCard className="w-full h-full flex items-center justify-center relative overflow-hidden group border-white/40 shadow-xl">
            <div className="absolute inset-0 bg-[url('https://mgfwijircgytueryzkyw.supabase.co/storage/v1/object/public/images/unsplash-1606787366850-de6330128bfc.jpg')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-sage-green/10" />
            <div className="relative z-10 w-32 h-32 rounded-full border-2 border-golden-amber flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <div className="w-28 h-28 rounded-full border border-white/30 flex items-center justify-center bg-forest-black/50 backdrop-blur-md">
                <span className="font-mono text-xs text-center leading-tight text-golden-amber uppercase tracking-widest">
                  100%
                  <br />
                  Organic
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>);

}