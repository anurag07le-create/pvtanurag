"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSky() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  // Generate some random positions for lanterns
  const lanterns = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 20 + Math.random() * 40
  }));

  return (
    <motion.div 
      ref={ref} 
      className="sticky top-0 h-screen w-full bg-[#000022] overflow-hidden flex flex-col items-center justify-center z-10"
      style={{ opacity, y: y1 }}
    >
      {/* Stars Background */}
      <div className="absolute inset-0 pixelated opacity-50" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0))', backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />

      {/* Floating Lanterns */}
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute bottom-[-100px]"
          style={{ left: l.left, width: l.size, height: l.size }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0px", "20px", "-20px", "0px"],
          }}
          transition={{
            y: { duration: l.duration, repeat: Infinity, ease: "linear", delay: l.delay },
            x: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
        >
          <img src="/images/pixel/lantern.png" alt="lantern" className="w-full h-full object-contain pixelated drop-shadow-[0_0_15px_rgba(255,150,0,0.8)]" />
        </motion.div>
      ))}

      {/* Text Overlay */}
      <div className="relative z-10 text-center flex flex-col items-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
        <h2 className="font-pixel text-[10px] md:text-xs text-[#DAA520] mb-6 tracking-[0.2em] animate-pulse">PRESS START</h2>
        <h1 className="font-pixel text-4xl md:text-6xl text-white mb-6 leading-tight">
          SAGAR<br/>
          <span className="text-xl md:text-2xl text-[#DAA520]">weds</span><br/>
          VANDANA
        </h1>
        <p className="font-pixel text-[8px] md:text-[10px] text-white/50 tracking-[0.3em] mt-8">SCROLL TO CONTINUE</p>
      </div>
    </motion.div>
  );
}
