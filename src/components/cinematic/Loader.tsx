"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [showCoords, setShowCoords] = useState(false)

  useEffect(() => {
    // Fake loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setShowCoords(true), 300)
          setTimeout(() => onComplete(), 2000) // Complete after coords are shown
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
    >
      
      {/* Background Grid Lines (Luxury architectural feel) */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 text-center overflow-hidden h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showCoords ? (
            <motion.div
              key="counter"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="font-serif text-5xl md:text-7xl text-white font-light tracking-widest"
            >
              {Math.min(progress, 100)}%
            </motion.div>
          ) : (
            <motion.div
              key="coords"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="font-sans text-[10px] md:text-xs text-gray-400 tracking-[0.4em] uppercase mb-2">
                Destination Locked
              </div>
              <div className="font-sans text-sm md:text-base text-white tracking-[0.2em]">
                23.0230 N &nbsp;|&nbsp; 72.5282 E
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading Progress Bar */}
      <div className="absolute bottom-20 w-48 h-[1px] bg-white/20">
        <motion.div 
          className="h-full bg-white"
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </motion.div>
  )
}
