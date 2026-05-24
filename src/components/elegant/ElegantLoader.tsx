"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function ElegantLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'done'>('sealed')
  const y = useMotionValue(0)
  const springY = useSpring(y, { stiffness: 300, damping: 25 })
  const startY = useRef(0)
  const hasFired = useRef(false)

  // Map swipe distance to rotation
  const flapRotateX = useTransform(springY, [-100, 0], [180, 0])
  const envelopeY = useTransform(springY, [-200, 0], [100, 0])

  // Touch swipe logic
  const handleTouchStart = (e: React.TouchEvent) => {
    if (phase !== 'sealed') return
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (phase !== 'sealed' || hasFired.current) return
    const delta = e.touches[0].clientY - startY.current
    if (delta < 0) { // user swiped UP
      y.set(Math.max(delta, -150))
      
      if (delta < -80) {
        hasFired.current = true
        triggerOpen()
      }
    }
  }

  const handleTouchEnd = () => {
    if (phase !== 'sealed' || hasFired.current) return
    y.set(0) // snap back if they didn't swipe far enough
  }

  // Click/Tap fallback logic
  const handleTap = () => {
    if (phase !== 'sealed' || hasFired.current) return
    hasFired.current = true
    triggerOpen()
  }

  const triggerOpen = () => {
    setPhase('opening')
    y.set(-150)
    
    // Haptic feedback if available
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50)
    }

    setTimeout(() => setPhase('done'), 2200)
    setTimeout(() => onComplete(), 3000)
  }

  // Auto-open after 5 seconds if user doesn't interact
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'sealed') triggerOpen()
    }, 5000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0A1A2F] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 1, ease: "easeInOut" } }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleTap}
        >
          {/* Majestic Ganpati Logo */}
          <motion.div 
            className="absolute top-[8%] md:top-[12%] flex flex-col items-center justify-center opacity-90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="relative flex items-center justify-center w-24 h-24 mb-4 drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <img 
                src="/images/elegant/ganpati.png" 
                alt="Lord Ganesha" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-montserrat text-[#e6c875] text-[10px] tracking-[0.3em] uppercase mt-2 drop-shadow-md">
              Shree Ganeshay Namah
            </span>
          </motion.div>

          {/* Envelope Container */}
          <motion.div 
            className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px] mt-16 md:mt-24 cursor-pointer perspective-[1200px]"
            style={{ y: envelopeY }}
          >
            {/* The Inside Card that gets revealed */}
            <motion.div 
              className="absolute inset-x-4 bottom-2 top-10 bg-[#061120] border border-[#d4af37]/50 rounded-md shadow-inner flex flex-col items-center justify-center overflow-hidden"
              animate={{ 
                y: phase === 'opening' ? -80 : 0,
                opacity: phase === 'opening' ? 1 : 0.5 
              }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37] to-transparent" />
              <span className="font-cinzel text-xl md:text-2xl text-[#d4af37] tracking-wider relative z-10">
                Sagar & Vandana
              </span>
              <span className="font-montserrat text-[#e6c875]/60 text-[8px] md:text-[10px] tracking-[0.4em] uppercase mt-2 relative z-10">
                Are getting married
              </span>
            </motion.div>

            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-[#0e2436] rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#d4af37]/20" />

            {/* Bottom Flap */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A1A2F] border-t border-[#d4af37]/40 shadow-[-10px_-10px_20px_rgba(0,0,0,0.3)] z-20"
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            >
              {/* Subtle Mandala Pattern on Envelope Body */}
              <div className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 100%, rgba(212,175,55,1) 0%, transparent 70%)`
                }}
              />
            </div>

            {/* Left/Right Side Flaps */}
            <div 
              className="absolute inset-0 bg-[#0c1e2d] z-10 border border-[#d4af37]/10"
              style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)' }}
            />

            {/* Top Flap */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-[65%] origin-top z-30 drop-shadow-xl"
              style={{ rotateX: phase === 'opening' ? 180 : flapRotateX }}
              animate={phase === 'opening' ? { rotateX: 180 } : undefined}
              transition={phase === 'opening' ? { duration: 0.8, ease: "easeInOut" } : undefined}
            >
              <div 
                className="w-full h-full bg-[#0A1A2F] border-b border-[#d4af37]/60 relative overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
              >
                {/* Gold Edge Highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d4af37]/20" />
              </div>
              
              {/* Inside of top flap */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#061120] border-t border-[#d4af37]/30"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
              />
              
              {/* Royal Wax Seal */}
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
                animate={{ opacity: phase === 'opening' ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d4af37] via-[#b38f24] to-[#80661a] shadow-[0_4px_15px_rgba(0,0,0,0.5)] border-2 border-[#ffebb3]/50 flex items-center justify-center relative">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#0A1A2F]/30" />
                  <span className="font-vibes text-[#0A1A2F] text-2xl md:text-3xl font-bold">
                    S&V
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interaction Hint */}
          <motion.div 
            className="absolute bottom-16 flex flex-col items-center"
            animate={{ opacity: phase === 'opening' ? 0 : [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent mb-4" />
            <span className="font-montserrat text-[#e6c875] text-[10px] tracking-[0.3em] uppercase">
              Swipe up to open
            </span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
