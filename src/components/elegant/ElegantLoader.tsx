"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function ElegantLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'done'>('sealed')
  const dragY = useMotionValue(0)
  const dragYSpring = useSpring(dragY, { stiffness: 400, damping: 40 })
  
  // Envelope flap rotation driven by drag
  const flapRotate = useTransform(dragYSpring, [0, -120], [0, -180])
  const flapOpacity = useTransform(dragYSpring, [0, -80], [1, 0])
  const contentOpacity = useTransform(dragYSpring, [-60, -120], [0, 1])
  const contentY = useTransform(dragYSpring, [-60, -120], [30, 0])

  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const hasFired = useRef(false)

  // Tap fallback for users who don't swipe
  const handleTap = () => {
    if (phase !== 'sealed') return
    setPhase('opening')
    dragY.set(-150)
    setTimeout(() => setPhase('done'), 1800)
    setTimeout(() => onComplete(), 2800)
  }

  // Touch swipe logic
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (phase !== 'sealed' || hasFired.current) return
    const delta = e.touches[0].clientY - startY.current
    if (delta < 0) {
      dragY.set(delta)
      if (delta < -80) {
        hasFired.current = true
        setPhase('opening')
        dragY.set(-150)
        // Haptic feedback
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50)
        setTimeout(() => setPhase('done'), 1800)
        setTimeout(() => onComplete(), 2800)
      }
    }
  }

  const handleTouchEnd = () => {
    if (phase === 'sealed' && !hasFired.current) {
      dragY.set(0)
    }
  }

  // Auto-open after 5 seconds if user doesn't interact
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'sealed') handleTap()
    }, 5000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[200] bg-[#0A1A2F] flex flex-col items-center justify-center"
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
            <div className="relative flex items-center justify-center w-24 h-24 mb-4">
              <img 
                src="/images/elegant/ganpati.png" 
                alt="Lord Ganesha" 
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>
            <span className="font-montserrat text-[#e6c875] text-[10px] tracking-[0.3em] uppercase mt-2 drop-shadow-md">
              Shree Ganeshay Namah
            </span>
          </motion.div>

          {/* Envelope Container */}
          <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px] mt-16 md:mt-24 cursor-pointer perspective-[1200px]">
            
            {/* Envelope Back Body */}
            <div className="absolute inset-0 bg-[#0e2436] border border-[#d4af37]/20 rounded-md shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-end">
              
              {/* Inner letter peek (visible when flap opens) */}
              <motion.div 
                className="absolute inset-x-4 top-4 bottom-12 bg-[#061120] border border-[#d4af37]/50 rounded-md flex flex-col items-center justify-center px-6 overflow-hidden"
                style={{ opacity: contentOpacity, y: contentY }}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37] to-transparent" />
                <span className="font-cinzel text-xl md:text-2xl text-[#d4af37] tracking-wider relative z-10 text-center">
                  Sagar & Vandana
                </span>
                <span className="font-montserrat text-[#e6c875]/60 text-[8px] md:text-[10px] tracking-[0.4em] uppercase mt-4 relative z-10 text-center">
                  Are getting married
                </span>
              </motion.div>

              {/* Envelope Front Pocket (Covers the bottom half of the letter) */}
              <div className="absolute bottom-0 left-0 w-full h-[65%] bg-[#0e2436] border-t border-[#d4af37]/20 rounded-b-md shadow-[0_-5px_20px_rgba(0,0,0,0.3)] overflow-hidden z-10">
                 {/* Diagonal Seams */}
                 <svg viewBox="0 0 400 170" className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                   <path d="M0,0 L200,100 L400,0" fill="none" stroke="#d4af37" strokeWidth="1" />
                   <path d="M0,170 L200,100 L400,170" fill="none" stroke="#d4af37" strokeWidth="1" />
                 </svg>
                 {/* Subtle Mandala Background */}
                 <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `radial-gradient(circle at 50% 100%, rgba(212,175,55,1) 0%, transparent 70%)` }}
                 />
              </div>
            </div>

            {/* Envelope Top Flap (Triangle) */}
            <motion.div
              className="absolute -top-[1px] left-0 right-0 h-[130px] md:h-[160px] origin-top z-20"
              style={{ rotateX: flapRotate, backfaceVisibility: "hidden" }}
            >
              <svg viewBox="0 0 400 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" preserveAspectRatio="none">
                <path 
                  d="M0,0 L400,0 L200,160 Z" 
                  fill="#0e2436" 
                  stroke="rgba(212,175,55,0.4)" 
                  strokeWidth="1"
                />
              </svg>
              
              {/* Wax Seal */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-4 w-16 h-16 md:w-20 md:h-20"
                style={{ opacity: flapOpacity }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d4af37] via-[#b38f24] to-[#80661a] shadow-[0_4px_15px_rgba(0,0,0,0.5)] border-2 border-[#ffebb3]/50 flex items-center justify-center relative">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#0A1A2F]/30" />
                  <span className="font-vibes text-[#0A1A2F] text-2xl md:text-3xl font-bold">
                    S&V
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Swipe instruction */}
          <motion.div 
            className="absolute bottom-16 flex flex-col items-center"
            animate={{ opacity: phase === 'opening' ? 0 : [0.3, 1, 0.3] }}
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
