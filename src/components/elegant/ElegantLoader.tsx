"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ElegantLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'done'>('sealed')
  const hasFired = useRef(false)

  const handleTap = () => {
    if (phase !== 'sealed' || hasFired.current) return
    hasFired.current = true
    setPhase('opening')
    
    // Haptic feedback if available
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30)
    }

    setTimeout(() => setPhase('done'), 1800)
    setTimeout(() => onComplete(), 2500)
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
          className="fixed inset-0 z-[200] bg-[#0A1A2F] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          onClick={handleTap}
        >
          {/* Left Door */}
          <motion.div 
            className="absolute top-0 left-0 w-1/2 h-full bg-[#0A1A2F] border-r-2 border-[#d4af37]/50 shadow-[5px_0_30px_rgba(0,0,0,0.8)] z-10 flex items-center justify-end overflow-hidden"
            initial={{ x: "0%" }}
            animate={{ x: phase === 'opening' ? "-100%" : "0%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            {/* Left Door Pattern */}
            <div className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: `linear-gradient(rgba(212,175,55,0.8) 2px, transparent 2px), linear-gradient(90deg, rgba(212,175,55,0.8) 2px, transparent 2px)`,
                backgroundSize: '40px 40px'
              }}
            />
            {/* Left Door Inner Border */}
            <div className="absolute top-4 bottom-4 left-4 right-2 border-2 border-[#d4af37]/30 rounded-l-md pointer-events-none" />
          </motion.div>

          {/* Right Door */}
          <motion.div 
            className="absolute top-0 right-0 w-1/2 h-full bg-[#0A1A2F] border-l-2 border-[#d4af37]/50 shadow-[-5px_0_30px_rgba(0,0,0,0.8)] z-10 flex items-center justify-start overflow-hidden"
            initial={{ x: "0%" }}
            animate={{ x: phase === 'opening' ? "100%" : "0%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
             {/* Right Door Pattern */}
             <div className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: `linear-gradient(rgba(212,175,55,0.8) 2px, transparent 2px), linear-gradient(90deg, rgba(212,175,55,0.8) 2px, transparent 2px)`,
                backgroundSize: '40px 40px'
              }}
            />
            {/* Right Door Inner Border */}
            <div className="absolute top-4 bottom-4 left-2 right-4 border-2 border-[#d4af37]/30 rounded-r-md pointer-events-none" />
          </motion.div>

          {/* Center Piece (Ganpati & Instruction) */}
          <motion.div 
            className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
            animate={{ 
              opacity: phase === 'opening' ? 0 : 1,
              scale: phase === 'opening' ? 0.9 : 1
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Minimalist Ganesha SVG */}
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] mb-6"
            >
              <path d="M50 15 C 45 15, 40 25, 40 35 C 40 45, 45 55, 50 65 C 55 55, 60 45, 60 35 C 60 25, 55 15, 50 15 Z" fill="#d4af37"/>
              <path d="M40 35 C 30 35, 20 30, 20 20" stroke="#d4af37" strokeWidth="4" strokeLinecap="round"/>
              <path d="M60 35 C 70 35, 80 30, 80 20" stroke="#d4af37" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="50" cy="40" r="4" fill="#0A1A2F"/>
              <path d="M50 65 C 50 75, 45 85, 35 85" stroke="#d4af37" strokeWidth="5" strokeLinecap="round"/>
              <path d="M30 45 C 20 45, 10 55, 15 65" stroke="#d4af37" strokeWidth="4" strokeLinecap="round"/>
              <path d="M70 45 C 80 45, 90 55, 85 65" stroke="#d4af37" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="50" cy="20" r="6" fill="#d4af37"/>
            </svg>

            <span className="font-montserrat text-[#e6c875] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-16 drop-shadow-md">
              Shree Ganeshay Namah
            </span>

            <motion.div 
              className="flex flex-col items-center mt-12"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-montserrat text-[#e6c875]/70 text-[10px] tracking-[0.3em] uppercase border border-[#d4af37]/30 px-6 py-2 rounded-full">
                Tap to enter
              </span>
            </motion.div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
