"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EVENTS = [
  {
    id: "mehandi",
    title: "Mehandi",
    date: "5 Dec 2026",
    time: "10:00 AM",
    venue: "Hotel Natraj & Resort",
    bgColor: "bg-[#091826]",
    image: "/images/mehandi-caricature.png"
  },
  {
    id: "behrana",
    title: "Behrana",
    date: "5 Dec 2026",
    time: "8:00 PM",
    venue: "Hotel Natraj & Resort",
    bgColor: "bg-[#0b1c2b]",
    image: "/images/behrana-caricature.png"
  },
  {
    id: "haldi",
    title: "Haldi",
    date: "6 Dec 2026",
    time: "10:00 AM",
    venue: "Hotel Natraj & Resort",
    bgColor: "bg-[#0c2031]",
    image: "/images/haldi-caricature.png"
  },
  {
    id: "wedding",
    title: "Wedding",
    date: "6 Dec 2026",
    time: "4:00 PM",
    venue: "Hotel Natraj & Resort",
    bgColor: "bg-[#0e2436]",
    image: "/images/wedding-caricature.png"
  },
  {
    id: "reception",
    title: "Reception",
    date: "6 Dec 2026",
    time: "8:00 PM",
    venue: "Hotel Natraj & Resort",
    bgColor: "bg-[#10273c]",
    image: "/images/reception-caricature.png"
  }
];

export default function ElegantItinerary() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="itinerary" ref={containerRef} className="relative w-full pb-[20vh] bg-[#0A1A2F]">
      
      {/* Background Texture */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src="/images/elegant/teal-texture.png" 
          alt="Texture" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32 flex flex-col items-center">
        
        <h2 className="font-cinzel text-5xl md:text-7xl tracking-widest text-[#d4af37] drop-shadow-md mb-24">
          ITINERARY
        </h2>

        <div className="w-full flex flex-col relative mt-10">
          {EVENTS.map((event, index) => {
            const targetScale = 1 - (EVENTS.length - index) * 0.05;
            return (
              <EventCard 
                key={event.id} 
                event={event} 
                index={index} 
                targetScale={targetScale}
                progress={scrollYProgress} 
                total={EVENTS.length}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

function EventCard({ event, index, progress, targetScale, total }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const rangeStart = index / total;
  const rangeEnd = 1;
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);
  
  return (
    <div 
      ref={cardRef} 
      className="sticky flex items-center justify-center w-full min-h-[60vh] mb-12"
      style={{ top: `calc(15vh + ${index * 20}px)` }}
    >
      <motion.div 
        style={{ scale }}
        className={`w-full h-full rounded-2xl ${event.bgColor} border border-[#d4af37]/40 p-6 md:p-16 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-6 md:gap-12 relative overflow-hidden`}
      >
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-8 md:w-12 h-8 md:h-12 border-t border-l border-[#d4af37]/60" />
        <div className="absolute top-4 right-4 w-8 md:w-12 h-8 md:h-12 border-t border-r border-[#d4af37]/60" />
        <div className="absolute bottom-4 left-4 w-8 md:w-12 h-8 md:h-12 border-b border-l border-[#d4af37]/60" />
        <div className="absolute bottom-4 right-4 w-8 md:w-12 h-8 md:h-12 border-b border-r border-[#d4af37]/60" />

        {/* Image takes priority on desktop, but on mobile we restrict height so text fits */}
        <div className="w-full md:w-1/2 flex justify-center order-first md:order-none">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full max-w-[200px] md:max-w-[300px] max-h-[35vh] md:max-h-none object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <h3 className="font-cinzel text-3xl md:text-6xl text-white tracking-wider mb-4 md:mb-6">
            {event.title}
          </h3>
          
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6 md:mb-8 md:ml-0 md:bg-gradient-to-r md:from-[#d4af37] md:to-transparent" />
          
          <p className="font-montserrat text-lg md:text-2xl text-[#e6c875] tracking-widest uppercase mb-2 md:mb-4">
            {event.date}
          </p>
          <p className="font-montserrat text-sm md:text-lg text-white/70 tracking-widest uppercase mb-6 md:mb-12">
            {event.time}
          </p>
          
          <a 
            href="https://maps.app.goo.gl/bhebNmonJSe1KHay5"
            target="_blank"
            rel="noreferrer"
            className="font-vibes text-2xl md:text-5xl text-white/90 hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            {event.venue}
          </a>
        </div>

      </motion.div>
    </div>
  );
}
