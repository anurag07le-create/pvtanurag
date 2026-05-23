"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParvatiAwakening() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transition from cold cosmic void to warm vibrant love
  const bgColor = useTransform(scrollYProgress, [0.3, 0.6], ["#020101", "#2a0a08"])
  
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.3, 0.4], [0, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.6, 0.7], [0, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 0.95], [0, 1, 0])
  
  const y1 = useTransform(scrollYProgress, [0.1, 0.4], [50, -50])
  const y2 = useTransform(scrollYProgress, [0.4, 0.7], [50, -50])
  const y3 = useTransform(scrollYProgress, [0.7, 0.95], [50, -50])

  return (
    <motion.section 
      ref={containerRef} 
      className="relative w-full z-20"
      style={{ height: '300vh', backgroundColor: bgColor }}
    >
      
      <div className="sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden px-6">
        
        {/* Placeholder for AI Video (Kumkum / Lotus explosion) */}
        {/* <motion.video src="/videos/awakening.mp4" ... style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 0.5]) }} /> */}

        {/* Floating Lotus Petals (Abstract CSS simulation) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 0.3]) }}
        >
           <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-red-900 rounded-full blur-[100px]" />
           <div className="absolute bottom-[30%] right-[20%] w-48 h-48 bg-orange-600 rounded-full blur-[120px]" />
        </motion.div>

        {/* Text sequence */}
        <div className="relative z-10 w-full max-w-2xl text-center">
          
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: opacity1, y: y1 }}>
            <p className="font-sans text-[#ffcda3]/60 tracking-widest uppercase text-xs mb-4">The Ascetic</p>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-light leading-snug">
              Like the deep, still void of Kailash...
            </h2>
          </motion.div>

          <motion.div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: opacity2, y: y2 }}>
            <p className="font-sans text-[#ffcda3]/60 tracking-widest uppercase text-xs mb-4">The Devotee</p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#ffcda3] font-light leading-snug italic">
              She brought warmth, color, and life to his world.
            </h2>
          </motion.div>

          <motion.div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: opacity3, y: y3 }}>
            <h2 className="font-serif text-4xl md:text-6xl text-white font-light leading-snug">
              Two halves of a single soul.
            </h2>
            <p className="font-sans text-white/50 tracking-[0.3em] uppercase text-[10px] mt-6">
              Ardhanarishvara
            </p>
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}
