"use client";

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set the container height to 300vh so we have plenty of room to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Sky Parallax (moves up slowly to create depth)
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Text Animation (fades out and moves up by 50% scroll)
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-50%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Palace Animation (slides up from the bottom starting halfway through the scroll)
  const palaceY = useTransform(scrollYProgress, [0.2, 0.8], ["100vh", "5vh"]);

  // Generate 25 random lanterns
  const lanterns = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const left = Math.random() * 100;
      const duration = 15 + Math.random() * 25; // 15s to 40s
      const delay = Math.random() * -30; // Start at different times
      const size = 0.5 + Math.random() * 1.5; // Scale 0.5 to 2.0
      const zIndex = Math.random() > 0.5 ? 15 : 25; // Some behind text, some in front
      
      return { id: i, left, duration, delay, size, zIndex };
    });
  }, []);

  // Lantern Scroll Parallax multiplier (they float up faster when scrolling)
  // We apply a slight negative Y push to the entire lantern container to create a parallax depth effect.
  const lanternContainerY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#0A1A2F]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* z-[1] Layer: Sky Background */}
        <motion.div 
          className="absolute inset-0 w-full h-[140%] -top-[10%] z-[1]"
          style={{ y: skyY }}
        >
          <img 
            src="/images/elegant/sky-bg.jpg" 
            alt="Twilight Sky" 
            className="w-full h-full object-cover opacity-90"
          />
          {/* Subtle gradient overlay to blend the sky */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Floating Lanterns Layer */}
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
          style={{ y: lanternContainerY }}
        >
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              className="absolute bottom-[-20%] drop-shadow-[0_0_15px_rgba(255,180,0,0.6)]"
              style={{ 
                left: `${lantern.left}%`,
                zIndex: lantern.zIndex,
                scale: lantern.size,
                opacity: 0.8
              }}
              animate={{ 
                y: ["0vh", "-130vh"],
                rotate: [-5, 5, -5] 
              }}
              transition={{
                y: {
                  duration: lantern.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: lantern.delay
                },
                rotate: {
                  duration: lantern.duration * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <img 
                src="/images/elegant/lantern.png" 
                alt="Floating Lantern" 
                className="w-16 md:w-24 h-auto"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* z-[20] Layer: Typography */}
        <motion.div 
          className="relative z-[20] flex flex-col items-center justify-center pointer-events-none drop-shadow-xl"
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
        >
          <h1 className="font-cinzel text-5xl md:text-8xl lg:text-9xl text-[#f3e5c8] tracking-widest text-center leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            ABHISHEK
          </h1>
          <span className="font-montserrat text-sm md:text-xl text-white/80 tracking-[0.5em] my-4 md:my-6 uppercase">
            Weds
          </span>
          <h1 className="font-cinzel text-5xl md:text-8xl lg:text-9xl text-[#f3e5c8] tracking-widest text-center leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            KANIKA
          </h1>
        </motion.div>

        {/* z-[30] Layer: Palace Dome Slide up */}
        <motion.div 
          className="absolute bottom-0 w-full flex justify-center z-[30] pointer-events-none"
          style={{ y: palaceY }}
        >
          {/* We ensure the palace image scales correctly and looks imposing */}
          <img 
            src="/images/elegant/palace-dome.png" 
            alt="Golden Palace Dome" 
            className="w-full max-w-5xl h-auto drop-shadow-[0_-10px_30px_rgba(0,0,0,0.4)]"
          />
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[40] flex flex-col items-center pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">
            Scroll to Discover
          </span>
          <motion.div 
            className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
            animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </motion.div>

      </div>
    </div>
  );
}
