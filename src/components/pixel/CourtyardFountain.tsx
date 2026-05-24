"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CourtyardFountain() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  
  // The couple comes down to the fountain
  const coupleY = useTransform(scrollYProgress, [0, 1], ["-100%", "50%"]);
  const coupleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5]);

  return (
    <div ref={ref} className="relative w-full h-[150vh] bg-[#000022] z-30">
      <motion.div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ y: y1 }}
      >
        <img 
          src="/images/pixel/courtyard.jpg" 
          alt="Courtyard" 
          className="w-full h-full object-cover pixelated" 
        />
        
        {/* Couple walking in courtyard */}
        <motion.div 
          className="absolute bottom-[20%] left-[60%] -translate-x-1/2 w-20 md:w-32"
          style={{ y: coupleY, scale: coupleScale }}
        >
           <img 
            src="/images/pixel/couple.png" 
            alt="Couple" 
            className="w-full h-auto pixelated drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]" 
          />
        </motion.div>

        {/* Text overlay introducing events */}
        <motion.div 
          className="absolute top-[20%] w-full text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
           <h2 className="font-pixel text-2xl md:text-4xl text-[#DAA520] drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
             THE CELEBRATION
           </h2>
        </motion.div>
      </motion.div>
    </div>
  );
}
