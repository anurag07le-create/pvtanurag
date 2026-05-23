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
      
      {/* The Lotus Tip */}
      <motion.div
        className="absolute w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2 left-[0.5px] md:left-[1px] flex items-center justify-center text-[#FFDF00]"
        style={{
          top: tipTop,
          opacity: smoothProgress,
          filter: 'drop-shadow(0 0 10px rgba(218,165,32,0.8))'
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,223,0,0.8)]">
          <path d="M12 2.5s-2.5 5-5.5 7.5c-2.3 2-4.5 2-4.5 2s2 2.5 5 2.5c2 0 4-1 5-3 1 2 3 3 5 3 3 0 5-2.5 5-2.5s-2.2 0-4.5-2c-3-2.5-5.5-7.5-5.5-7.5z"/>
          <path d="M12 21s-3-2-5-5c-1.5-2.5-1-4-1-4s2 1 3.5 3c2 2.5 2.5 6 2.5 6z"/>
          <path d="M12 21s3-2 5-5c1.5-2.5 1-4 1-4s-2 1-3.5 3c-2 2.5-2.5 6-2.5 6z"/>
        </svg>
      </motion.div>
    </div>
  )
}
