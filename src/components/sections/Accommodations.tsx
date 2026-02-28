import { Section } from '../ui/Section';
import { roomsData as rooms } from '../../data/siteData';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function Accommodations() {
  return (
    <Section id="accommodations">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="font-mono text-forest-moss text-sm tracking-[0.3em] uppercase mb-4 font-bold">
          Stay
        </h2>
        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest-moss mb-6">
          Rest in Nature
        </h3>
        <p className="font-sans text-xl text-forest-moss/80 max-w-2xl mx-auto leading-relaxed">
          Our accommodations are designed to blur the lines between indoors and outdoors, offering unparalleled luxury without compromising our eco-conscious roots.
        </p>
      </div>

      <div className="space-y-16 md:space-y-32">
        {rooms.map((room, idx) => (
          <motion.div
            key={room.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col gap-8 md:gap-16 items-center ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
          >
            {/* Image Side */}
            <div className="w-full lg:w-[60%] shrink-0">
              <div className="relative aspect-[4/3] w-full rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl group border border-forest-moss/10">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center px-4 md:px-0">
              <div className="flex items-baseline justify-between mb-4 border-b border-forest-moss/10 pb-6 pr-4">
                <h4 className="font-serif text-3xl md:text-4xl lg:text-4xl text-forest-moss font-bold">
                  {room.name}
                </h4>
                <div className="text-right">
                  <span className="block font-sans text-sm text-forest-moss/60 uppercase tracking-widest font-bold mb-1">Starting from</span>
                  <span className="font-serif text-2xl text-terracotta-clay italic font-bold">
                    {room.price}
                  </span>
                </div>
              </div>

              <p className="font-sans text-lg text-forest-moss/80 leading-relaxed mb-8">
                {room.desc}
              </p>

              <div className="space-y-4 mb-10">
                <h5 className="font-mono text-sm tracking-[0.2em] text-forest-moss uppercase font-bold text-sage-green/80 mb-4">
                  Premium Amenities
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {room.amenities.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-sage-green/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-sage-green" />
                      </div>
                      <span className="font-sans text-forest-moss/90 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}