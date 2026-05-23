"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VideoMaskText() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Move the massive text horizontally as the user scrolls vertically down
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-50%"])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[150vh] bg-[#020101] flex items-center overflow-hidden z-20"
    >
      <div className="sticky top-0 w-full h-[100vh] flex flex-col justify-center overflow-hidden">
        
        {/* The Text Mask Layer */}
        <motion.div 
          className="whitespace-nowrap flex items-center"
          style={{ x }}
        >
          <h1 
            className="font-serif font-black text-[25vw] leading-none tracking-tighter uppercase"
            style={{
              // This is the magic CSS that clips the background video/image to the text
              backgroundImage: 'url("/images/photo4.jpeg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            SAGAR & VANDANA - FOREVER - SAGAR & VANDANA
          </h1>
        </motion.div>

        <p className="absolute bottom-10 w-full text-center font-sans text-[#1B4332]/50 text-xs tracking-[0.5em] uppercase">
          A Cinematic Mask
        </p>
      </div>
    </section>
  )
}
