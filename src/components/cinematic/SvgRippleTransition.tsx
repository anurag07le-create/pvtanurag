"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function SvgRippleTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // We map the scroll progress to the scale of the displacement map
  // It starts at 0 (no distortion), peaks at 100 (heavy liquid distortion), and goes back to 0
  const displacementScale = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.5, 0.6, 1], 
    [0, 50, 100, 50, 0]
  )

  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-[#020101] z-20 overflow-hidden">
      
      {/* Invisible SVG Filter Definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquidRipple">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise" />
            <motion.feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              // We cast scale to any here because Framer Motion's SVG properties can sometimes have type definition issues in older versions, 
              // but it works perfectly at runtime.
              scale={displacementScale as any} 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        {/* The element we are applying the liquid filter to */}
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ filter: 'url(#liquidRipple)' }}
        >
          {/* A massive gradient orb to distort */}
          <div className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gradient-to-tr from-[#020101] via-gray-700 to-white opacity-20 blur-3xl" />
          
          <motion.h2 
            className="font-serif text-5xl md:text-8xl text-white font-light italic z-10 text-center px-4"
            style={{ opacity }}
          >
            A Fluid Transition
          </motion.h2>
        </motion.div>
      </div>

    </section>
  )
}
