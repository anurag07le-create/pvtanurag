"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const vows = [
  { id: 1, sanskrit: "ॐ इष एकपदी भव सा मामनुव्रता भव", english: "To provide nourishment and stay faithful." },
  { id: 2, sanskrit: "ॐ ऊर्जे द्विपदी भव सा मामनुव्रता भव", english: "To grow physically, mentally, and spiritually." },
  { id: 3, sanskrit: "ॐ रायस्पोषाय त्रिपदी भव सा मामनुव्रता भव", english: "To share in wealth and righteousness." },
  { id: 4, sanskrit: "ॐ मायोभवाय चतुष्पदी भव सा मामनुव्रता भव", english: "To acquire knowledge, happiness, and peace." },
  { id: 5, sanskrit: "ॐ प्रजाभ्यः पञ्चपदी भव सा मामनुव्रता भव", english: "To raise strong and virtuous children." },
  { id: 6, sanskrit: "ॐ ऋतुभ्यः षट्पदी भव सा मामनुव्रता भव", english: "To live a long, disease-free life together." },
  { id: 7, sanskrit: "ॐ सखा सप्तपदी भव सा मामनुव्रता भव", english: "To remain lifelong friends and companions." }
]

export default function AgniKund() {
  const [pherasCompleted, setPherasCompleted] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  // Track angle for continuous rotation
  const prevAngleRef = useRef<number | null>(null)
  const accumulatedAngleRef = useRef(0)
  const centerRef = useRef<{x: number, y: number} | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Glow effect based on completion
  const glowOpacity = Math.min(0.2 + (pherasCompleted * 0.1), 0.9)

  useEffect(() => {
    // Calculate center of screen once on mount
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    }
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    if (!centerRef.current) return
    const angle = Math.atan2(e.clientY - centerRef.current.y, e.clientX - centerRef.current.x)
    prevAngleRef.current = angle
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !centerRef.current || prevAngleRef.current === null) return

    // Calculate current angle
    const currentAngle = Math.atan2(e.clientY - centerRef.current.y, e.clientX - centerRef.current.x)
    
    // Calculate difference (handle wrap-around at PI / -PI)
    let delta = currentAngle - prevAngleRef.current
    if (delta > Math.PI) delta -= 2 * Math.PI
    if (delta < -Math.PI) delta += 2 * Math.PI

    // Accumulate total rotation (only counting clockwise movement for now, or absolute movement)
    // We'll enforce clockwise (delta > 0) or just accumulate absolute movement.
    // In Hindu weddings, pheras are clockwise.
    if (delta > 0) {
      accumulatedAngleRef.current += delta
    }

    // Check if a full circle is completed
    const currentPheras = Math.floor(accumulatedAngleRef.current / (2 * Math.PI))
    
    if (currentPheras > pherasCompleted && currentPheras <= 7) {
      setPherasCompleted(currentPheras)
      // Optional: Trigger a haptic feedback if on mobile
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50)
      }
    }

    prevAngleRef.current = currentAngle
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    prevAngleRef.current = null
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#020101] overflow-hidden flex flex-col items-center justify-center touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      
      {/* Background ambient lighting based on fire */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 blur-[100px] pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, rgba(255,100,0,${glowOpacity}) 0%, transparent 60%)` 
        }}
      />

      {/* Instructions */}
      <motion.div 
        className="absolute top-20 text-center z-20 pointer-events-none"
        animate={{ opacity: isDragging ? 0 : 1 }}
      >
        <h2 className="font-serif text-3xl md:text-5xl text-[#ffcda3] font-light italic tracking-wide">
          The Saptapadi
        </h2>
        <p className="font-sans text-white/50 text-[10px] tracking-[0.3em] uppercase mt-4">
          Trace a circle around the fire
        </p>
      </motion.div>

      {/* The Agni (Central Fire) */}
      <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 flex items-center justify-center pointer-events-none">
        {/* Core glow */}
        <motion.div 
          className="absolute w-16 h-16 bg-white rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Fire colors */}
        <motion.div 
          className="absolute w-24 h-24 bg-[#ff6b00] rounded-full blur-2xl"
          animate={{ scale: [1, 1.5, 1.2, 1.4, 1], opacity: [0.8, 1, 0.7, 0.9, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-32 h-32 bg-[#ff2a00] rounded-full blur-3xl opacity-60"
          animate={{ scale: [1.2, 1, 1.3, 1], rotate: [0, 45, -45, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Vows Display Area */}
      <div className="absolute bottom-24 w-full px-6 max-w-lg text-center z-20 pointer-events-none h-32 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {pherasCompleted > 0 && pherasCompleted <= 7 && (
            <motion.div
              key={pherasCompleted}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <p className="font-sans text-[#ffcda3]/60 text-[10px] tracking-[0.4em] uppercase">
                Vow {pherasCompleted} of 7
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-light">
                {vows[pherasCompleted - 1].sanskrit}
              </h3>
              <p className="font-serif text-lg md:text-xl text-[#ffcda3]/80 italic">
                "{vows[pherasCompleted - 1].english}"
              </p>
            </motion.div>
          )}

          {pherasCompleted === 7 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
              className="absolute -bottom-16 w-full text-center"
            >
              <p className="font-sans text-white/30 text-[10px] tracking-widest uppercase">
                The Seven Steps are Complete
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interaction Indicator Ring (Optional visual feedback for dragging) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.circle 
          cx="50" cy="50" r="30" 
          fill="none" 
          stroke="#ffcda3" 
          strokeWidth="0.2"
          strokeDasharray="1 2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  )
}
