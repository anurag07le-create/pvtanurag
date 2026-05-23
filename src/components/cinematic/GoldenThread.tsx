"use client"
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function GoldenThread() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Smooth out the scroll progress for an expensive, heavy feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Map the smooth progress to CSS values
  const scaleY = smoothProgress
  
  // For the glowing tip, we need to map the 0-1 progress to a Top percentage.
  // We use scrollYProgress directly or smoothProgress. We'll use smoothProgress.
  const tipTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 bottom-0 left-6 md:left-16 w-[1px] md:w-[2px] z-[100] pointer-events-none">
      {/* Background Track */}
      <div className="absolute inset-0 bg-white/5" />
      
      {/* The Thread */}
      <motion.div 
        className="absolute top-0 w-full h-full origin-top"
        style={{ 
          scaleY,
          background: 'linear-gradient(to bottom, transparent, #DAA520, #FFDF00)'
        }}
      />
      
      {/* The Glowing Tip */}
      <motion.div
        className="absolute w-4 h-4 md:w-6 md:h-6 rounded-full -translate-x-1/2 -translate-y-1/2 left-[0.5px] md:left-[1px]"
        style={{
          top: tipTop,
          background: 'radial-gradient(circle, #FFDF00 0%, transparent 70%)',
          filter: 'drop-shadow(0 0 10px #DAA520)',
          opacity: smoothProgress // Fade in as you start scrolling
        }}
      />
      
      {/* Deep Flare on the Tip */}
      <motion.div
        className="absolute w-12 h-[2px] md:w-20 rounded-full bg-[#FFDF00] -translate-x-1/2 -translate-y-1/2 left-[0.5px] md:left-[1px] blur-[2px]"
        style={{
          top: tipTop,
          opacity: smoothProgress,
          mixBlendMode: "screen"
        }}
      />
    </div>
  )
}
