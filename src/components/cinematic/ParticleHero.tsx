"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParticleHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // As the user scrolls down, the hero image scales up massively, blurs, and fades out, simulating blowing away into dust.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "50px"])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  // Text comes up as image blows away
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1])
  const textScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-[#020101] z-30">
      
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* The "Particle" Image - simulating an assembly/disassembly using heavy filters and scale */}
        <motion.div 
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1583939000240-690e16fb2536?q=80&w=2000&auto=format&fit=crop")',
            scale,
            opacity,
            filter: blur,
            y
          }}
        >
          {/* Noise overlay to give it that "particle/dust" texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        </motion.div>

        {/* The Reveal Text */}
        <motion.div 
          className="relative z-20 flex flex-col items-center text-center"
          style={{ opacity: textOpacity, scale: textScale }}
        >
          <p className="font-sans text-white/50 tracking-[0.5em] text-xs uppercase mb-8">
            The Assembly
          </p>
          <h1 className="font-serif text-6xl md:text-9xl text-white font-light italic drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            SAGAR <span className="font-sans text-3xl md:text-5xl mx-4 not-italic font-thin text-white/30">&</span> VANDANA
          </h1>
          <div className="mt-12 w-[1px] h-32 bg-gradient-to-b from-white to-transparent opacity-30" />
        </motion.div>

        {/* Initial Scroll Prompt */}
        <motion.div 
          className="absolute bottom-12 z-30 font-sans text-white/40 tracking-widest text-[10px] uppercase flex flex-col items-center gap-4"
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>Scroll to Disassemble</span>
          <div className="w-[1px] h-8 bg-white/40" />
        </motion.div>

      </div>
    </section>
  )
}
