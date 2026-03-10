import { Section } from '../ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function Gallery() {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('gallery_items').select('*').order('order_index').then(({ data }) => {
      if (data) setGalleryItems(data);
    });
  }, []);

  return (
    <Section id="gallery">
      <div className="mb-8 md:mb-16 text-center px-4 max-w-5xl mx-auto">
        <h2 className="font-mono text-forest-moss text-sm tracking-[0.3em] uppercase mb-4 font-bold">
          Gallery & Life
        </h2>
        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest-moss mb-6 font-bold">
          Life on the Farm
        </h3>
        <p className="font-sans text-xl text-forest-moss/80 leading-relaxed">
          Take a deeper look into the daily rhythms of greenheaven Welimada. Interact with the gallery to explore our sanctuary from misty mornings to vibrant harvests.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[800px] max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 p-4 md:px-8">
        {galleryItems.map((item, index) => {
          const isActive = activeItem === index;

          return (
            <motion.div
              layout
              key={index}
              onClick={() => setActiveItem(index)}
              onMouseEnter={() => setActiveItem(index)}
              className={`relative overflow-hidden rounded-[30px] md:rounded-[40px] cursor-pointer group flex-shrink-0 bg-forest-black transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'md:flex-[5] flex-[3]' : 'md:flex-1 flex-[0.5]'
                }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-tr ${item.color} to-forest-black z-10 transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-0' : 'opacity-80 group-hover:opacity-50'}`} />
              <div className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-0' : 'opacity-100'}`} />

              <motion.img
                layout="position"
                src={item.image_url}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transform origin-center transition-all duration-[1500ms] ease-out z-0 ${isActive ? 'brightness-100' : 'brightness-[0.6] grayscale-[20%]'}`}
                style={{
                  scale: isActive ? 1.05 : 1,
                }}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                <div className="flex flex-col h-full justify-between">
                  {/* Top Number */}
                  <div className="flex justify-between items-start">
                    <span className={`font-mono text-sm tracking-[0.2em] font-bold transition-colors duration-500 ${isActive ? 'text-sage-green shadow-sm' : 'text-white/50'}`}>
                      0{index + 1}
                    </span>

                    {/* Collapsed Title Overlay (visible only when not active on desktop) */}
                    {!isActive && (
                      <div className="hidden md:block absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] -rotate-90 whitespace-nowrap w-max opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-serif text-2xl text-white font-bold tracking-wide uppercase drop-shadow-md">
                          {item.title.split(' ')[0]} {/* Show just the first word to save space */}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Content */}
                  <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`content-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="max-w-xl"
                        >
                          <h4 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4 drop-shadow-xl">
                            {item.title}
                          </h4>
                          <p className="font-sans text-sm md:text-lg text-white/90 leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-none">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}