"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "The First Yes",
    date: "14th February 2026",
    image: "/images/photo1.jpeg"
  },
  {
    id: 2,
    title: "Wedding Fixed",
    date: "20th April 2026",
    image: "/images/photo2.jpeg"
  },
  {
    id: 3,
    title: "The Roka",
    date: "15th August 2026",
    image: "/images/photo4.jpeg"
  },
  {
    id: 4,
    title: "Pre-Wedding Shoot",
    date: "10th October 2026",
    image: "/images/photo5.jpeg"
  },
  {
    id: 5,
    title: "The Journey Begins",
    date: "Forever",
    image: "/images/photo3-nobg.png"
  }
];

export default function ElegantGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Translate the gallery horizontally
  // We have 5 items, so we need to scroll by roughly -80% of the container width to show the last item
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

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

        <div className="absolute top-10 left-10 z-10 text-[#d4af37]">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase mb-2">Our Journey</p>
          <h2 className="font-vibes text-4xl">A Timeline of Love</h2>
        </div>

        <motion.div 
          style={{ x }} 
          className="flex gap-16 md:gap-32 px-[10vw] md:px-[20vw] h-[60vh] md:h-[70vh] items-center"
        >
          {GALLERY_ITEMS.map((item, index) => {
            const marginClass = index % 2 === 0 ? "mt-0 mb-16" : "mt-16 mb-0";

            return (
              <div 
                key={item.id}
                className={`relative shrink-0 w-[80vw] md:w-[40vw] h-full flex flex-col items-center justify-center ${marginClass}`}
              >
                {/* Golden Arch Frame */}
                <div className="absolute inset-0 rounded-t-[150px] border-t-4 border-x-4 border-[#d4af37] opacity-80 shadow-[0_0_30px_rgba(212,175,55,0.15)] overflow-hidden bg-[#050e18]">
                   {/* Image inside arch */}
                   <img 
                     src={item.image} 
                     alt={item.title}
                     className="w-full h-full object-cover opacity-80"
                   />
                   
                   {/* Arch Inner Glow */}
                   <div className="absolute inset-0 rounded-t-[150px] border-t-2 border-x-2 border-[#ffebb3] opacity-30 m-4 pointer-events-none" />
                </div>

                {/* Content Overlay */}
                <div className="absolute -bottom-12 w-full text-center">
                   <h3 className="font-cinzel text-2xl md:text-4xl text-[#e6c875] mb-2 drop-shadow-md">
                     {item.title}
                   </h3>
                   <p className="font-montserrat text-xs md:text-sm text-white/70 tracking-widest uppercase">
                     {item.date}
                   </p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
