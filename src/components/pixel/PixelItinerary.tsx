"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const events = [
  { id: 1, title: "MEHANDI", date: "5 DEC 26", time: "10:00 AM", location: "HOTEL NATRAJ" },
  { id: 2, title: "BEHRANA", date: "5 DEC 26", time: "08:00 PM", location: "HOTEL NATRAJ" },
  { id: 3, title: "HALDI", date: "6 DEC 26", time: "10:00 AM", location: "HOTEL NATRAJ" },
  { id: 4, title: "WEDDING", date: "6 DEC 26", time: "04:00 PM", location: "HOTEL NATRAJ" },
  { id: 5, title: "RECEPTION", date: "6 DEC 26", time: "08:00 PM", location: "HOTEL NATRAJ" },
];

export default function PixelItinerary() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full min-h-[150vh] bg-[#1a0e05] py-32 z-40 overflow-hidden">
      
      {/* Background Mandap Image */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ y: bgY }}
      >
        <img 
          src="/images/pixel/mandap.jpg" 
          alt="Mandap Background" 
          className="w-full h-full object-cover pixelated"
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
        <h2 className="font-pixel text-3xl md:text-5xl text-[#DAA520] mb-16 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-center">
          ITINERARY
        </h2>

        <div className="w-full flex flex-col gap-8 md:gap-12">
          {events.map((evt, i) => (
            <motion.div 
              key={evt.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="w-full bg-[#3d1e11]/80 border-4 border-[#8b4513] p-6 md:p-8 rounded-sm shadow-[8px_8px_0_rgba(0,0,0,0.8)] backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="text-center md:text-left">
                <span className="font-pixel text-[10px] text-[#DAA520] block mb-2">{`// EVENT 0${evt.id}`}</span>
                <h3 className="font-pixel text-xl md:text-2xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  {evt.title}
                </h3>
              </div>
              
              <div className="text-center md:text-right font-pixel text-xs text-white/80 space-y-2">
                <p>{evt.date} <span className="text-[#DAA520]">|</span> {evt.time}</p>
                <p className="text-[10px] text-[#DAA520]">{evt.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
