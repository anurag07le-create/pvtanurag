"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PalaceExterior() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  
  // Parallax for the couple standing on the balcony
  const coupleY = useTransform(scrollYProgress, [0, 1], ["30%", "-10%"]);

  return (
    <div ref={ref} className="relative w-full h-[150vh] bg-[#000022] z-20">
      <motion.div 
        className="sticky top-0 h-screen w-full flex items-end justify-center overflow-hidden"
        style={{ y: y1 }}
      >
        <img 
          src="/images/pixel/palace.jpg" 
          alt="Palace" 
          className="w-full h-full object-cover pixelated" 
        />
        
        {/* Couple on the balcony */}
        <motion.div 
          className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-16 md:w-24"
          style={{ y: coupleY }}
        >
           <img 
            src="/images/pixel/couple.png" 
            alt="Couple" 
            className="w-full h-auto pixelated drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
