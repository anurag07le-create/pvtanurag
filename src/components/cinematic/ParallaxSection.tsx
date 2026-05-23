"use client"
import React, { useRef, useState, useEffect } from 'react'
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

  // Fallback for mobile devices (gyroscope could be added here, but for now we just use a static beautiful layout if no mouse)
  
  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center cursor-crosshair z-20"
    >
      {/* Background Layer (Scenery) */}
      <motion.div 
        className="absolute inset-[-10%] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 blur-sm"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516104276722-e42100dc89d5?q=80&w=2000&auto=format&fit=crop")' }}
        />
      </motion.div>

      {/* Foreground Layer (The Couple cutout) 
          Using a transparent PNG here creates the 3D effect.
      */}
      <motion.div 
        className="absolute inset-[-5%] z-10 flex items-end justify-center pb-20"
        style={{ x: fgX, y: fgY }}
      >
        <div 
          className="w-[80vw] h-[80vh] md:w-[40vw] bg-contain bg-bottom bg-no-repeat drop-shadow-2xl"
          style={{ backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/55bba9bee4b06c8a24559b95/1614713735759-V1Q0A4J09S0Y08D2J0K7/Couple+PNG.png")' }} // Placeholder PNG with transparent background
        />
      </motion.div>

      {/* 3D Floating Text Layer */}
      <motion.div 
        className="absolute z-20 pointer-events-none text-center"
        style={{ x: textX, y: textY }}
      >
        <h2 className="font-serif text-5xl md:text-8xl text-white font-light italic drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          The Depth of Love
        </h2>
        <p className="font-sans text-white/70 tracking-[0.4em] uppercase text-xs mt-4 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          Move your cursor
        </p>
      </motion.div>

    </section>
  )
}
