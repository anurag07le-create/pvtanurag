"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ElegantFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // The huge text scales up as you scroll down into the footer
  const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-[#0A1A2F] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Magic */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#d4af37]/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Massive Text Reveal */}
      <motion.div 
        style={{ scale: textScale, opacity: textOpacity }}
        className="relative z-10 w-full text-center px-4"
      >
        <p className="font-montserrat text-[#e6c875] tracking-[0.4em] text-xs md:text-sm uppercase mb-8">
          Join us for the premiere of their
        </p>
        <h2 className="font-cinzel text-[15vw] md:text-[12vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#d4af37] drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          FOREVER
        </h2>
      </motion.div>

      {/* RSVP Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-20 mt-16 md:mt-24"
      >
        <button 
          onClick={() => alert("RSVP functionality coming soon!")}
          className="group relative px-12 py-5 bg-transparent overflow-hidden"
        >
          <div className="absolute inset-0 border border-[#d4af37] transition-all duration-500 group-hover:bg-[#d4af37]" />
          <span className="relative z-10 font-montserrat text-[#e6c875] text-xs md:text-sm tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-[#0A1A2F]">
            RSVP NOW
          </span>
        </button>
      </motion.div>

      {/* A single floating lantern going up into the sky */}
      <motion.div
        className="absolute bottom-[-100px] right-[20%] pointer-events-none mix-blend-screen opacity-60 z-0"
        animate={{ 
          y: ["0vh", "-120vh"],
          x: ["0px", "-50px", "0px"]
        }}
        transition={{
          y: { duration: 25, repeat: Infinity, ease: "linear" },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <img 
          src="/images/elegant/lantern.png" 
          alt="Lantern" 
          className="w-24 md:w-32 h-auto drop-shadow-[0_0_20px_rgba(255,180,0,0.8)]"
        />
      </motion.div>

    </section>
  )
}
