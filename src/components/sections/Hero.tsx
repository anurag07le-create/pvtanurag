"use client"
import React, { useRef } from 'react'
import { CONFIG } from '@/lib/config'
import { MandalaSVG, LotusCorner } from '@/components/ui/Ornaments'
import { ChevronDown, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative justify-center pt-20 pb-10">
      
      {/* 4 Corner Ornaments */}
      <LotusCorner className="absolute top-8 left-8 w-12 h-12 text-gold opacity-80" />
      <LotusCorner className="absolute top-8 right-8 w-12 h-12 text-gold opacity-80 rotate-90" />
      <LotusCorner className="absolute bottom-8 right-8 w-12 h-12 text-gold opacity-80 rotate-180" />
      <LotusCorner className="absolute bottom-8 left-8 w-12 h-12 text-gold opacity-80 -rotate-90" />

      {/* Decorative Rotating Mandala Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <MandalaSVG className="w-[80vw] max-w-[800px] text-gold opacity-10 animate-spin-slow" />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl text-gold tracking-[0.2em] uppercase mb-6 font-medium">
            शादी का निमंत्रण
          </h2>
          <p className="text-xs md:text-sm text-maroon tracking-widest uppercase mb-10">
            Wedding Invitation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <h1 className="text-[clamp(3rem,10vw,6rem)] text-deep-red leading-none drop-shadow-sm">
            {CONFIG.groomName}
          </h1>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="my-4 text-deep-red"
          >
            <Heart size={32} fill="currentColor" />
          </motion.div>
          <h1 className="text-[clamp(3rem,10vw,6rem)] text-deep-red leading-none drop-shadow-sm">
            {CONFIG.brideName}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-lg md:text-xl text-gold italic font-medium mb-2">
            "Kismat ne milaya, parivaron ne sajaaya..."
          </p>
          <p className="text-base md:text-lg text-maroon font-medium mb-12">
            किस्मत ने मिलाया, परिवारों ने सजाया...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center gap-3 text-dark-text font-medium text-lg tracking-wide bg-ivory/50 px-6 py-2 rounded-full border border-gold/30 backdrop-blur-sm"
        >
          <span>📅</span> 
          <span>{CONFIG.weddingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-gold mx-2">•</span>
          <span>{CONFIG.city}</span>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-maroon/60"
      >
        <span className="text-sm font-medium tracking-widest uppercase">Scroll karo</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

    </section>
  )
}
