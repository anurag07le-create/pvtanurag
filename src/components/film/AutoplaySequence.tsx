"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AutoplaySequence() {
  const [scene, setScene] = useState(0)

  // Autoplay Timeline Logic
  useEffect(() => {
    const timeline = [
      { delay: 5000, nextScene: 1 },  // After 5s, go to Scene 1 (Names)
      { delay: 12000, nextScene: 2 }, // At 12s total (7s later), go to Scene 2 (Haldi)
      { delay: 20000, nextScene: 3 }, // At 20s total (8s later), go to Scene 3 (Wedding)
      { delay: 28000, nextScene: 4 }, // At 28s total (8s later), go to Scene 4 (Outro)
    ]

    const timeouts = timeline.map(event => 
      setTimeout(() => {
        setScene(event.nextScene)
      }, event.delay)
    )

    return () => {
      timeouts.forEach(t => clearTimeout(t))
    }
  }, [])

  // Framer Motion configuration for smooth fading between scenes
  const fadeVariants = {
    initial: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 2, ease: "easeOut" as const } },
    exit: { opacity: 0, filter: "blur(10px)", scale: 1.05, transition: { duration: 1.5, ease: "easeIn" as const } }
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Liquid Gold Placeholder */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[#B8860B] rounded-full mix-blend-screen blur-[100px]"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#DAA520] rounded-full mix-blend-screen blur-[120px]"
          animate={{
            x: [0, -60, 60, 0],
            y: [0, 60, -60, 0],
            scale: [1, 0.9, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Actual Video goes here later */}
        {/* <video src="/videos/liquid-gold.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50" /> */}
      </div>

      {/* Cinematic Text Overlay */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          
          {/* SCENE 0: Intro (0-5s) */}
          {scene === 0 && (
            <motion.div key="scene0" variants={fadeVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center">
              <p className="font-sans text-[#DAA520] tracking-[0.5em] uppercase text-xs mb-4">A Cinematic Sequence</p>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-light italic">
                Two lives. One beautiful journey.
              </h2>
            </motion.div>
          )}

          {/* SCENE 1: Names (5-12s) */}
          {scene === 1 && (
            <motion.div key="scene1" variants={fadeVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center">
              <h1 className="font-serif text-6xl md:text-8xl text-white font-light tracking-widest leading-tight">
                Sagar
              </h1>
              <span className="font-serif text-3xl text-[#DAA520] italic my-2">&</span>
              <h1 className="font-serif text-6xl md:text-8xl text-white font-light tracking-widest leading-tight">
                Vandana
              </h1>
            </motion.div>
          )}

          {/* SCENE 2: Pre-Wedding Events (12-20s) */}
          {scene === 2 && (
            <motion.div key="scene2" variants={fadeVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center">
              <p className="font-sans text-[#DAA520] tracking-[0.4em] uppercase text-xs mb-8">The Celebration Begins</p>
              
              <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                <div className="text-center">
                  <h3 className="font-serif text-4xl text-white mb-2">Mehandi & Behrana</h3>
                  <p className="font-sans text-white/60 tracking-widest text-xs uppercase">5 December 2026</p>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-4xl text-white mb-2">Haldi</h3>
                  <p className="font-sans text-white/60 tracking-widest text-xs uppercase">Morning | 6 Dec 2026</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCENE 3: Wedding (20-28s) */}
          {scene === 3 && (
            <motion.div key="scene3" variants={fadeVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center">
              <p className="font-sans text-[#DAA520] tracking-[0.4em] uppercase text-xs mb-6">The Sacred Union</p>
              <h2 className="font-serif text-6xl md:text-7xl text-white mb-4">The Wedding</h2>
              <p className="font-serif text-2xl text-white/80 italic mb-2">The Grand Palace</p>
              <p className="font-sans text-white/60 tracking-widest text-xs uppercase">4:00 PM | 6 December 2026</p>
            </motion.div>
          )}

          {/* SCENE 4: Outro / RSVP (28s onwards) */}
          {scene === 4 && (
            <motion.div key="scene4" variants={fadeVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center">
              <div className="w-16 h-16 mb-8 relative flex items-center justify-center">
                 <div className="absolute inset-0 border border-[#DAA520]/50 rounded-full animate-ping opacity-50" />
                 <div className="w-8 h-8 bg-[#DAA520] rounded-full blur-[2px]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light italic mb-8">
                We await your presence.
              </h2>
              <button 
                className="px-8 py-4 border border-[#DAA520] text-[#DAA520] font-sans text-xs tracking-[0.3em] uppercase hover:bg-[#DAA520] hover:text-black transition-all duration-700"
              >
                RSVP Now
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Persistent Progress Bar at the very bottom */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-20">
        <motion.div 
          className="h-full bg-[#DAA520]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 28, ease: "linear" }}
        />
      </div>

    </div>
  )
}
