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

  // Couple Animation: Starts fully visible, slowly moves down and scales up for parallax depth
  const coupleY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const coupleScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const coupleOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

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
    <div ref={containerRef} className="relative w-full h-[150vh] bg-[#0A1A2F]">
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
              className="absolute rounded-full"
              style={{ 
                left: `${fly.left}%`, 
                top: `${fly.top}%`, 
                width: fly.size, 
                height: fly.size, 
                // Replaced heavy box-shadow with a much cheaper radial gradient that looks identical
                background: 'radial-gradient(circle, #ffebb3 0%, rgba(255,235,179,0) 70%)',
                willChange: 'transform, opacity'
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: fly.duration, repeat: Infinity, delay: fly.delay, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* z-[15/40] Layer: Floating Lanterns with Depth of Field */}
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen transform-gpu"
          style={{ y: lanternContainerY }}
        >
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              className="absolute bottom-[-30%] transform-gpu"
              style={{ 
                left: `${lantern.left}%`,
                zIndex: lantern.zIndex,
                scale: lantern.size,
                filter: lantern.blur,
                opacity: lantern.zIndex === 40 ? 0.9 : 0.6,
                willChange: 'transform'
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
                className="w-12 md:w-20 h-auto"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* z-[20] Layer: Cinematic Typography BACKGROUND */}
        <motion.div 
          className="absolute top-[8%] md:top-[12%] z-[20] w-full text-center flex flex-col items-center justify-center pointer-events-none transform-gpu"
          style={{ 
            y: textY,
            opacity: textOpacity,
            scale: textScale,
            filter: textBlur,
            willChange: 'transform, opacity, filter'
          }}
        >
          <h1 className="font-cinzel text-[24vw] md:text-[16vw] leading-[0.8] text-white/5 font-bold tracking-tighter whitespace-nowrap select-none">
            FOREVER
          </h1>
          <h1 className="font-cinzel text-[24vw] md:text-[16vw] leading-[0.8] text-white/5 font-bold tracking-tighter whitespace-nowrap select-none italic">
            ALWAYS
          </h1>
        </motion.div>

        {/* z-[25] Layer: Middle Text Layer (Sagar & Vandana) */}
        <motion.div 
          className="relative z-[25] text-center px-4 mt-[15vh] md:mt-[20vh] pointer-events-none transform-gpu"
          style={{ opacity: textOpacity, willChange: 'opacity' }}
        >
          <p className="font-montserrat text-[#e6c875] tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm uppercase mb-3 md:mb-4 drop-shadow-md">
            A Celebration of Love
          </p>
          <h2 className="font-cinzel text-[12vw] md:text-8xl text-white font-light tracking-tight leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            Sagar & Vandana
          </h2>
        </motion.div>

        {/* z-[30] Layer: Foreground Background-Removed Couple */}
        <motion.div 
          className="absolute bottom-0 w-full max-w-[90vw] md:max-w-[800px] h-[55vh] md:h-[65vh] flex justify-center z-[30] pointer-events-none transform-gpu"
          style={{ 
            y: coupleY, 
            scale: coupleScale, 
            opacity: coupleOpacity, 
            willChange: 'transform, opacity', 
            transformOrigin: "bottom center",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
          }}
        >
          {/* Breathing Magical Golden Aura */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full mix-blend-screen pointer-events-none z-0" 
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0) 65%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Stardust Particles behind them */}
          <motion.div 
            className="absolute inset-0 z-[5] pointer-events-none opacity-50 mix-blend-screen mask-image-[linear-gradient(to_bottom,transparent,black,transparent)]"
            style={{ 
              backgroundImage: 'radial-gradient(2px 2px at 20% 30%, #d4af37 100%, transparent), radial-gradient(1.5px 1.5px at 60% 70%, #ffffff 100%, transparent), radial-gradient(2.5px 2.5px at 80% 20%, #d4af37 100%, transparent), radial-gradient(1px 1px at 30% 80%, #ffffff 100%, transparent)',
              backgroundSize: '150px 150px'
            }}
            animate={{ y: [0, -150] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Couple Image with Cinematic Dual-Tone Rim Lighting */}
          {/* Left shadow is warm gold, Right shadow is cool moonlight blue */}
          <img 
            src="/images/photo3-nobg.png" 
            alt="Sagar & Vandana" 
            className="w-full h-full object-contain object-bottom origin-bottom relative z-10 filter translate-y-[8%] md:translate-y-[10%]"
            style={{
              filter: "drop-shadow(-15px 0px 25px rgba(212,175,55,0.4)) drop-shadow(15px 0px 25px rgba(10,50,150,0.4)) drop-shadow(0px -10px 30px rgba(255,255,255,0.1))"
            }}
          />
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
