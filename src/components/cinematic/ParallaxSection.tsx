"use client"
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse position values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs to make the parallax feel heavy and expensive
  const springConfig = { damping: 30, stiffness: 100, mass: 2 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Background moves slightly opposite to mouse
  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-5%", "5%"])
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-5%", "5%"])

  // Foreground (the couple) moves WITH the mouse to create depth
  const fgX = useTransform(smoothX, [-0.5, 0.5], ["5%", "-5%"])
  const fgY = useTransform(smoothY, [-0.5, 0.5], ["5%", "-5%"])
  
  // Floating text moves even faster
  const textX = useTransform(smoothX, [-0.5, 0.5], ["15%", "-15%"])
  const textY = useTransform(smoothY, [-0.5, 0.5], ["15%", "-15%"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Calculate mouse position relative to center of screen, normalized between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center cursor-crosshair z-20"
    >
      {/* Foreground Layer (The Couple) */}
      <motion.div 
        className="absolute inset-[-5%] z-10 flex items-center justify-center"
        style={{ x: fgX, y: fgY }}
      >
        <img
          src="/images/photo3-nobg.png"
          alt="Sagar and Vandana"
          className="h-[70vh] w-[88vw] object-contain object-bottom drop-shadow-[0_30px_55px_rgba(0,0,0,0.75)] md:h-[76vh] md:w-[44vw]"
        />
      </motion.div>

      {/* 3D Floating Text Layer */}
      <motion.div 
        className="absolute z-20 pointer-events-none text-center"
        style={{ x: textX, y: textY }}
      >
        <h2 className="font-serif text-5xl md:text-8xl text-white font-light italic drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          A Love in Focus
        </h2>
        <p className="font-sans text-white/70 tracking-[0.4em] uppercase text-xs mt-4 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          Sagar and Vandana
        </p>
      </motion.div>

    </section>
  )
}
