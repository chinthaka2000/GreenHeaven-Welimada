import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function About() {
  const [aboutStories, setAboutStories] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('about_stories').select('*').order('order_index').then(({ data }) => {
      if (data) setAboutStories(data);
    });
  }, []);

  return (
    <Section id="about">
      <div className="mb-16 md:mb-24 text-center">
        <h2 className="font-mono text-forest-moss text-sm tracking-[0.3em] uppercase mb-4 font-bold">
          Our Story
        </h2>
        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest-moss mb-6 font-bold">
          The greenheaven Welimada Concept
        </h3>
        <p className="font-sans text-xl text-forest-moss/80 max-w-2xl mx-auto leading-relaxed">
          Discover the intention behind every square foot of our sanctuary.
        </p>
      </div>

      <div className="space-y-24 md:space-y-40">
        {aboutStories.map((story, index) => (
          <div key={story.title} className={`flex flex-col gap-12 lg:gap-24 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

            {/* Image Box */}
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] w-full group rounded-[40px] overflow-hidden shadow-2xl border border-forest-moss/10">
                <div className="absolute inset-0 bg-sage-green/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img
                  src={story.image_url}
                  alt={story.img_alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            </motion.div>

            {/* Content Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 space-y-8 px-4"
            >
              <h2 className="font-mono text-forest-moss text-sm tracking-[0.3em] uppercase mb-2 font-bold text-sage-green">
                {story.title}
              </h2>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-5xl text-forest-moss leading-tight mb-6 hidden md:block">
                {story.heading}
              </h3>

              <div className="w-16 h-[2px] bg-golden-amber/50 mb-8 hidden md:block" />

              <p className="font-sans text-xl text-forest-moss/85 leading-relaxed mb-6">
                {story.text1}
              </p>
              <p className="font-sans text-xl text-forest-moss/85 leading-relaxed">
                {story.text2}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}