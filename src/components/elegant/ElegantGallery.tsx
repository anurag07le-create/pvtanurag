"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "The Beginning",
    description: "Where our journey started",
    color: "from-[#0A1A2F] to-[#112a46]"
  },
  {
    id: 2,
    title: "The Proposal",
    description: "A moment in time",
    color: "from-[#112a46] to-[#183b5e]"
  },
  {
    id: 3,
    title: "The Journey",
    description: "Building our forever",
    color: "from-[#183b5e] to-[#0A1A2F]"
  }
];

export default function ElegantGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Translate the gallery horizontally
  // We have 3 items, so we need to scroll by roughly -66% of the container width to show the last item
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0A1A2F]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Texture */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img 
            src="/images/elegant/teal-texture.png" 
            alt="Texture" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>

        <motion.div 
          style={{ x }} 
          className="flex gap-16 md:gap-32 px-[10vw] md:px-[20vw]"
        >
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id}
              className="relative shrink-0 w-[80vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex flex-col items-center justify-center"
            >
              {/* Golden Arch Frame */}
              <div className="absolute inset-0 rounded-t-full border-t-4 border-x-4 border-[#d4af37] opacity-80 shadow-[0_0_30px_rgba(212,175,55,0.15)] overflow-hidden">
                 {/* Inner Gradient or Image */}
                 <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-80`} />
                 
                 {/* Arch Inner Glow */}
                 <div className="absolute inset-0 rounded-t-full border-t-2 border-x-2 border-[#ffebb3] opacity-30 m-4" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center p-8">
                 <h3 className="font-cinzel text-3xl md:text-5xl text-[#e6c875] mb-4 drop-shadow-md">
                   {item.title}
                 </h3>
                 <p className="font-vibes text-2xl md:text-4xl text-white/90">
                   {item.description}
                 </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
