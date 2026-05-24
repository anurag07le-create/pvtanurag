"use client"
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ElegantGoldenThread() {
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
  const tipTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 bottom-0 left-6 md:left-12 w-[2px] z-[100] pointer-events-none">
      {/* Background Track */}
      <div className="absolute inset-0 bg-white/5" />
      
      {/* The Thread */}
      <motion.div 
        className="absolute top-0 w-full h-full origin-top"
        style={{ 
          scaleY,
          background: 'linear-gradient(to bottom, transparent, #c9a763, #ffebb3)'
        }}
      />
      
      {/* The Glowing Tip (Star/Diamond) */}
      <motion.div
        className="absolute w-4 h-4 md:w-6 md:h-6 -translate-x-1/2 -translate-y-1/2 left-[1px] flex items-center justify-center text-[#ffebb3]"
        style={{
          top: tipTop,
          opacity: smoothProgress,
          filter: 'drop-shadow(0 0 15px rgba(255,235,179,1))'
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
           <path d="M12 0l2 9 9 2-9 2-2 9-2-9-9-2 9-2z"/>
        </svg>
      </motion.div>
    </div>
  )
}
