"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EVENTS = [
  {
    id: "haldi",
    title: "Haldi",
    date: "12th November",
    time: "10:00 AM",
    venue: "The Royal Courtyard",
    bgColor: "bg-[#0c2336]",
  },
  {
    id: "sangeet",
    title: "Sangeet",
    date: "12th November",
    time: "7:00 PM",
    venue: "The Grand Ballroom",
    bgColor: "bg-[#091b2b]",
  },
  {
    id: "wedding",
    title: "The Wedding",
    date: "13th November",
    time: "4:00 PM",
    venue: "The Palace Gardens",
    bgColor: "bg-[#06141f]",
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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 flex flex-col items-center">
        
        <h2 className="font-cinzel text-5xl md:text-7xl tracking-widest text-[#d4af37] drop-shadow-md mb-24">
          ITINERARY
        </h2>

        <div className="w-full flex flex-col relative mt-10">
          {EVENTS.map((event, index) => {
            // Calculate a staggered stacking effect based on the index
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
  
  // The card scales down smoothly as subsequent cards overlap it
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
        className={`w-full h-full max-w-4xl rounded-2xl ${event.bgColor} border border-[#d4af37]/40 p-12 md:p-24 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center text-center relative overflow-hidden`}
      >
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-[#d4af37]/60" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-[#d4af37]/60" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-[#d4af37]/60" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-[#d4af37]/60" />

        <h3 className="font-cinzel text-4xl md:text-6xl text-white tracking-wider mb-6">
          {event.title}
        </h3>
        
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />
        
        <p className="font-montserrat text-xl md:text-2xl text-[#e6c875] tracking-widest uppercase mb-4">
          {event.date}
        </p>
        <p className="font-montserrat text-lg text-white/70 tracking-widest uppercase mb-12">
          {event.time}
        </p>
        
        <p className="font-vibes text-3xl md:text-5xl text-white/90">
          {event.venue}
        </p>

      </motion.div>
    </div>
  );
}
