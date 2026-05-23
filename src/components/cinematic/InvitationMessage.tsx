"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function InvitationMessage() {
  const lines = [
    "You are heartily invited",
    "for the blessing on the 7 vows",
    "we take for the new journey."
  ]

  return (
    <section className="relative w-full bg-[#050505] z-20 py-32 md:py-48 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl flex flex-col items-center">
        
        {/* Subtle decorative lotus element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12 md:mb-16 text-[#DAA520] opacity-50"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12 drop-shadow-[0_0_8px_rgba(218,165,32,0.5)]">
            <path d="M12 2.5s-2.5 5-5.5 7.5c-2.3 2-4.5 2-4.5 2s2 2.5 5 2.5c2 0 4-1 5-3 1 2 3 3 5 3 3 0 5-2.5 5-2.5s-2.2 0-4.5-2c-3-2.5-5.5-7.5-5.5-7.5z"/>
            <path d="M12 21s-3-2-5-5c-1.5-2.5-1-4-1-4s2 1 3.5 3c2 2.5 2.5 6 2.5 6z"/>
            <path d="M12 21s3-2 5-5c1.5-2.5 1-4 1-4s-2 1-3.5 3c-2 2.5-2.5 6-2.5 6z"/>
          </svg>
        </motion.div>

        {/* Masked text reveals */}
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          {lines.map((line, index) => (
            <div key={index} className="overflow-hidden pb-4">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: index * 0.2 // Stagger each line
                }}
                className="font-serif text-3xl md:text-5xl lg:text-7xl text-white/90 font-light italic leading-tight"
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Parents Details */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 flex flex-col md:flex-row gap-12 md:gap-32 items-center justify-center text-center w-full"
        >
          {/* Sagar's Details */}
          <div className="flex flex-col items-center">
            <h3 className="font-serif text-3xl md:text-4xl text-white font-light italic mb-2">Sagar</h3>
            <p className="font-sans text-[#DAA520]/60 tracking-widest text-[10px] uppercase mb-1">Son of</p>
            <p className="font-serif text-xl md:text-2xl text-white/80">Manojbhai & Poojaben</p>
          </div>

          {/* Decorative Divider */}
          <div className="hidden md:block w-[1px] h-24 bg-gradient-to-b from-transparent via-[#DAA520]/30 to-transparent" />
          <div className="block md:hidden w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DAA520]/30 to-transparent" />

          {/* Vandana's Details */}
          <div className="flex flex-col items-center">
            <h3 className="font-serif text-3xl md:text-4xl text-white font-light italic mb-2">Vandana</h3>
            <p className="font-sans text-[#DAA520]/60 tracking-widest text-[10px] uppercase mb-1">Daughter of</p>
            <p className="font-serif text-xl md:text-2xl text-white/80">Ghanshyambhai & Renuben</p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
