"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DivineLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div 
      className="fixed inset-0 bg-[#020101] z-[100] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Simple elegant AUM or Trident motif */}
        <h1 className="font-serif text-[#ffcda3] text-6xl md:text-8xl font-light opacity-80 mb-6 drop-shadow-[0_0_15px_rgba(255,205,163,0.3)]">
          ॐ
        </h1>
        
        {/* Glowing pulse line representing the Damaru ripple */}
        <div className="relative w-24 h-[1px] bg-white/10 mt-8 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full w-1/3 bg-[#ffcda3]/50 blur-sm"
            animate={{ left: ["-30%", "130%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
