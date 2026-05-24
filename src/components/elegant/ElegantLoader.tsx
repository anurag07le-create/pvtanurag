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
    setTimeout(() => setPhase('done'), 1200)
    setTimeout(() => onComplete(), 2200)
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
      if (delta < -100) {
        hasFired.current = true
        setPhase('opening')
        dragY.set(-150)
        // Haptic feedback
        if (navigator.vibrate) navigator.vibrate(30)
        setTimeout(() => setPhase('done'), 1200)
        setTimeout(() => onComplete(), 2200)
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
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleTap}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />

          {/* Envelope Container */}
          <div className="relative w-[280px] h-[200px] md:w-[360px] md:h-[240px]">
            
            {/* Envelope Body */}
            <div className="absolute inset-0 bg-[#0e2436] border border-[#d4af37]/40 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              
              {/* Inner letter peek (visible when flap opens) */}
              <motion.div 
                className="absolute inset-x-4 top-4 bottom-4 bg-[#F5F2EA] border border-[#d4af37]/20 rounded-sm flex flex-col items-center justify-center px-6"
                style={{ opacity: contentOpacity, y: contentY }}
              >
                <span className="font-montserrat text-[9px] md:text-[10px] text-[#0A1A2F]/60 tracking-[0.5em] uppercase mb-3">
                  You are invited
                </span>
                <h3 className="font-cinzel text-xl md:text-2xl text-[#0A1A2F] font-bold text-center leading-tight">
                  Sagar & Vandana
                </h3>
                <div className="w-12 h-[1px] bg-[#d4af37] mt-3 mb-2" />
                <span className="font-montserrat text-[8px] md:text-[10px] text-[#d4af37] font-bold tracking-widest">
                  06 | 12 | 2026
                </span>
              </motion.div>
            </div>

            {/* Envelope Flap (Triangle) */}
            <motion.div
              className="absolute -top-[1px] left-0 right-0 h-[100px] md:h-[120px] origin-top"
              style={{ rotateX: flapRotate, perspective: 800 }}
            >
              <svg viewBox="0 0 360 120" className="w-full h-full" preserveAspectRatio="none">
                <path 
                  d="M0,0 L360,0 L360,0 L180,120 L0,0 Z" 
                  fill="#0e2436" 
                  stroke="rgba(212,175,55,0.4)" 
                  strokeWidth="1"
                />
              </svg>
              
              {/* Wax Seal */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 bottom-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b38f24] border-2 border-[#fff]/20 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
                style={{ opacity: flapOpacity }}
              >
                <span className="font-cinzel text-[#0A1A2F] text-xs md:text-sm font-bold">V&S</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Swipe instruction */}
          <motion.div 
            className="mt-16 flex flex-col items-center"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            <span className="font-montserrat text-[10px] text-[#e6c875]/70 tracking-[0.3em] uppercase mt-3">
              Swipe up to open
            </span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
