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
      
      {/* The 3D Wax Seal Tip */}
      <motion.div
        className="absolute w-12 h-12 md:w-16 md:h-16 -translate-x-1/2 -translate-y-1/2 left-[1px] flex items-center justify-center"
        style={{
          top: tipTop,
          opacity: smoothProgress,
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
        }}
      >
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#d4af37] via-[#b38b22] to-[#6b5314] shadow-[inset_0_2px_5px_rgba(255,255,255,0.4)] border border-[#ffebb3]/20 flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border-[0.5px] border-[#6b5314] shadow-[inset_0_3px_6px_rgba(0,0,0,0.5)] flex items-center justify-center bg-gradient-to-br from-[#9c781b] to-[#d4af37]">
            <span className="font-vibes text-[#ffebb3] text-lg md:text-2xl drop-shadow-[0_2px_1px_rgba(0,0,0,0.6)]">
              S&V
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
