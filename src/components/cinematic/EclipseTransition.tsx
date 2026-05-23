"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function EclipseTransition() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // The "Sun" (Eclipse Light) rises from the bottom of the screen to the top
  const lightY = useTransform(scrollYProgress, [0, 1], ["150%", "-50%"])
  
  // The light gets brighter as it hits the center, then dims
  const lightOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  // Text shadow moves inversely to the light source to simulate physical shadows
  // As light goes up (Y decreases), shadow goes down
  const textShadowY = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"])

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#020101] z-20 overflow-hidden">
      
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* The Blinding Eclipse Light */}
        <motion.div 
          className="absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full pointer-events-none mix-blend-screen z-10"
          style={{
            y: lightY,
            opacity: lightOpacity,
            background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(218,165,32,0.8) 10%, rgba(218,165,32,0.4) 30%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />

        {/* The Typography acting as physical monuments blocking the light */}
        <motion.div className="relative z-20 flex flex-col items-center">
          <p className="font-sans text-[#DAA520] tracking-[0.5em] text-xs uppercase mb-8 z-20 relative">
            The Alignment
          </p>
          <motion.h2 
            className="font-serif text-6xl md:text-9xl text-black font-bold uppercase relative z-20 tracking-tighter"
            style={{
              // The text is completely black (a silhouette)
              color: '#000',
              // The shadow creates the glowing outline and the physical shadow dropping away from the light source
              textShadow: useTransform(() => `0px ${textShadowY.get()} 30px rgba(218,165,32,0.5), 0px 0px 2px rgba(255,255,255,0.5)`)
            }}
          >
            ECLIPSE
          </motion.h2>
          <p className="max-w-md text-center mt-8 font-sans text-white/50 text-sm leading-relaxed z-20 relative mix-blend-difference">
            When the stars align, the universe pauses to witness the union of two souls.
          </p>
        </motion.div>

        {/* Ambient background noise/stars */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

      </div>
    </section>
  )
}
