"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function KailashHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-[#020101]">
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
        
        {/* PLACEHOLDER FOR AI VIDEO (Mount Kailash / Cosmic Night) */}
        {/* We use a deep gradient as a fallback until the video is added */}
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0f1a] to-[#020101]"
          style={{ scale }}
        >
          {/* Subtle crescent moon glow (pure CSS representation) */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-transparent shadow-[10px_10px_20px_rgba(255,205,163,0.1),_inset_10px_10px_20px_rgba(255,205,163,0.1)] opacity-30 pointer-events-none blur-sm" />
          
          {/* Real video will go here once generated: */}
          {/* <video src="/videos/kailash-hero.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen" /> */}
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          className="relative z-10 text-center flex flex-col items-center px-4"
          style={{ y: yText, opacity }}
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-sans text-[#ffcda3]/60 tracking-[0.4em] uppercase text-xs md:text-sm mb-6"
          >
            The Cosmic Union
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="font-serif text-5xl md:text-8xl text-white font-light tracking-widest leading-tight"
          >
            Sagar <span className="text-[#ffcda3] italic font-medium mx-2">&</span> Vandana
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
            className="font-serif text-lg md:text-2xl text-white/50 italic mt-8 max-w-lg mx-auto"
          >
            "Vagarthaviva Sampriktau..."
            <br/>
            <span className="font-sans text-xs tracking-widest uppercase text-white/30 not-italic mt-2 block">
              Inseparable like word and meaning
            </span>
          </motion.p>
        </motion.div>

        {/* Scroll Indicator (Bilva Leaf / Pulse) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="absolute bottom-10 z-20 flex flex-col items-center"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#ffcda3]/50 to-transparent animate-pulse" />
        </motion.div>

      </div>
    </section>
  )
}
