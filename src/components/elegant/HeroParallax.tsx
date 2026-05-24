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

  // Background Sky Parallax: Scales up to simulate zooming into the sky, and moves up slightly
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Typography Animation: Fades out, moves up, tracks wider, and blurs out (camera focus pull)
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-80%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const textTracking = useTransform(scrollYProgress, [0, 0.4], ["0.1em", "0.5em"]);
  const textBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(12px)"]);

  // Palace Animation: Slides up smoothly, scales down slightly to simulate settling into the scene
  const palaceY = useTransform(scrollYProgress, [0.1, 0.8], ["100vh", "5vh"]);
  const palaceScale = useTransform(scrollYProgress, [0.1, 0.8], [1.1, 1]);

  // Generate 35 lanterns with extreme depth (some blurred foreground, some sharp background)
  const lanterns = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      const isForeground = Math.random() > 0.8; // 20% are massive foreground elements
      const left = Math.random() * 100;
      const duration = isForeground ? 10 + Math.random() * 10 : 20 + Math.random() * 30; 
      const delay = Math.random() * -40; 
      const size = isForeground ? 2.5 + Math.random() * 1.5 : 0.4 + Math.random() * 1.2; 
      const zIndex = isForeground ? 40 : 15; 
      const blur = isForeground ? `blur(${2 + Math.random() * 4}px)` : 'blur(0px)';
      
      return { id: i, left, duration, delay, size, zIndex, blur };
    });
  }, []);

  // Fireflies/Stars array for extra magical atmosphere
  const fireflies = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * -5,
    size: 1 + Math.random() * 3
  })), []);

  const lanternContainerY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#0A1A2F]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* z-[1] Layer: Sky Background */}
        <motion.div 
          className="absolute inset-0 w-full h-[130%] -top-[10%] z-[1]"
          style={{ y: skyY, scale: skyScale }}
        >
          <img 
            src="/images/elegant/sky-bg.jpg" 
            alt="Twilight Sky" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/40 to-transparent opacity-80" />
        </motion.div>

        {/* z-[5] Layer: Magical Fireflies */}
        <div className="absolute inset-0 w-full h-full z-[5] pointer-events-none mix-blend-screen opacity-60">
          {fireflies.map(fly => (
            <motion.div
              key={`fly-${fly.id}`}
              className="absolute bg-[#ffebb3] rounded-full"
              style={{ left: `${fly.left}%`, top: `${fly.top}%`, width: fly.size, height: fly.size, boxShadow: '0 0 10px 2px rgba(255, 235, 179, 0.8)' }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: fly.duration, repeat: Infinity, delay: fly.delay, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* z-[15/40] Layer: Floating Lanterns with Depth of Field */}
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
          style={{ y: lanternContainerY }}
        >
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              className="absolute bottom-[-30%]"
              style={{ 
                left: `${lantern.left}%`,
                zIndex: lantern.zIndex,
                scale: lantern.size,
                filter: lantern.blur,
                opacity: lantern.zIndex === 40 ? 0.9 : 0.6
              }}
              animate={{ 
                y: ["0vh", "-150vh"],
                rotate: [-8, 8, -8],
                x: ["-10px", "10px", "-10px"]
              }}
              transition={{
                y: { duration: lantern.duration, repeat: Infinity, ease: "linear", delay: lantern.delay },
                rotate: { duration: lantern.duration * 0.3, repeat: Infinity, ease: "easeInOut" },
                x: { duration: lantern.duration * 0.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <img 
                src="/images/elegant/lantern.png" 
                alt="Floating Lantern" 
                className="w-12 md:w-20 h-auto drop-shadow-[0_0_20px_rgba(255,180,0,0.8)]"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* z-[20] Layer: Cinematic Typography BACKGROUND */}
        <motion.div 
          className="absolute top-[12%] z-[20] w-full text-center flex flex-col items-center justify-center pointer-events-none"
          style={{ 
            y: textY,
            opacity: textOpacity,
            scale: textScale,
            filter: textBlur
          }}
        >
          <h1 className="font-cinzel text-[24vw] md:text-[16vw] leading-[0.8] text-white/5 font-bold tracking-tighter whitespace-nowrap select-none">
            FOREVER
          </h1>
          <h1 className="font-cinzel text-[24vw] md:text-[16vw] leading-[0.8] text-white/5 font-bold tracking-tighter whitespace-nowrap select-none">
            ALWAYS
          </h1>
        </motion.div>

        {/* z-[30] Layer: Foreground Background-Removed Couple */}
        <motion.div 
          className="absolute bottom-0 w-full max-w-none md:max-w-[1200px] h-[105vh] md:h-[95vh] flex justify-center z-[30] pointer-events-none"
          style={{ y: palaceY, scale: palaceScale }}
        >
          {/* Subtle golden bloom behind the couple */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#d4af37]/20 blur-[100px] rounded-full mix-blend-screen" />
          <motion.img 
            src="/images/photo3-nobg.png" 
            alt="Sagar & Vandana" 
            className="w-full h-full object-contain object-bottom drop-shadow-[0_-10px_40px_rgba(212,175,55,0.2)] scale-110 md:scale-[1.2] origin-bottom"
          />
        </motion.div>

        {/* z-[35] Layer: Foreground Typography */}
        <motion.div 
          className="absolute bottom-[20%] md:bottom-[25%] z-[35] flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <p className="font-montserrat text-[#e6c875] tracking-[0.4em] text-[10px] md:text-sm uppercase mb-4 drop-shadow-md">
            A Celebration of Love
          </p>
          <h2 className="font-cinzel text-[12vw] md:text-8xl text-white font-light tracking-tight leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            Sagar & Vandana
          </h2>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[40] flex flex-col items-center pointer-events-none mix-blend-screen"
          style={{ opacity: textOpacity }}
        >
          <span className="font-montserrat text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#e6c875] mb-4 drop-shadow-md">
            Scroll
          </span>
          <div className="w-[1px] h-12 md:h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full h-1/2 bg-[#d4af37]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
