"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const scenes = [
  {
    image: "https://images.unsplash.com/photo-1583939000240-690e16fb2536?q=80&w=2000&auto=format&fit=crop",
    title: "SAGAR & VANDANA",
    subtitle: "THE UNION"
  },
  {
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
    title: "MEHANDI & HALDI",
    subtitle: "DECEMBER 5, 2026"
  },
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    title: "THE WEDDING",
    subtitle: "DECEMBER 6, 2026"
  }
]

export default function GlassEngine() {
  const [stage, setStage] = useState(-1) // -1 is waiting for ignite, 0, 1, 2 are scenes
  const [isSweeping, setIsSweeping] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // We preload a deep cinematic bass drop sound
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_248fb2eb5b.mp3?filename=cinematic-bass-boom-114407.mp3')
  }, [])

  const handleNext = () => {
    if (stage >= scenes.length - 1) return

    // Play bass drop
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {})
    }

    // Trigger the blinding light sweep
    setIsSweeping(true)
    
    // Exactly when the light sweep covers the screen, change the image and text behind it
    setTimeout(() => {
      setStage(prev => prev + 1)
    }, 400) // 400ms into the sweep

    // Remove the sweep element after it finishes
    setTimeout(() => {
      setIsSweeping(false)
    }, 1500)
  }

  // Pre-Ignite State
  if (stage === -1) {
    return (
      <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Frosted Glass Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-110 blur-[20px] grayscale transition-all duration-[3000ms]"
          style={{ backgroundImage: `url(${scenes[0].image})` }}
        />
        
        {/* Ignite Button */}
        <button 
          onClick={handleNext}
          className="relative z-20 group flex flex-col items-center cursor-pointer"
        >
          <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center relative transition-all duration-1000 group-hover:border-white/80 group-hover:scale-110">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-50" />
            <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
            </div>
          </div>
          <p className="mt-8 font-cinzel tracking-[0.5em] text-white/50 text-sm group-hover:text-white group-hover:shadow-[0_0_20px_white] transition-all duration-500">
            IGNITE
          </p>
        </button>
      </div>
    )
  }

  // Active Scene State
  const currentScene = scenes[stage]

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      
      {/* Background Image Container */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={stage}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${currentScene.image})` }}
          initial={{ scale: 1.1, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 0.6, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Subtle Vignette for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />

      {/* Blinding Light Sweep Element */}
      {isSweeping && (
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "100%", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 45%, #fff 50%, rgba(255,255,255,0.8) 55%, transparent 100%)",
            mixBlendMode: "screen",
            boxShadow: "0 0 100px 50px rgba(255,255,255,0.5)"
          }}
        />
      )}

      {/* Typography Extrusion */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full h-full justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${stage}`}
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <p className="font-sans text-white/70 tracking-[0.4em] text-xs uppercase mb-6 drop-shadow-md">
              {currentScene.subtitle}
            </p>
            <h1 className="font-cinzel text-5xl md:text-8xl text-white font-bold tracking-widest leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              {currentScene.title.split('&').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-white/50 mx-4 font-light">&</span>}
                </React.Fragment>
              ))}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Button (5% Interaction) */}
      {stage < scenes.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={handleNext}
          className="absolute bottom-12 z-30 font-sans text-white/50 tracking-[0.3em] text-xs uppercase hover:text-white transition-colors flex items-center gap-4 group"
        >
          <span className="w-8 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-12 transition-all duration-500" />
          Next
          <span className="w-8 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-12 transition-all duration-500" />
        </motion.button>
      )}
      
      {stage === scenes.length - 1 && (
         <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 z-30 font-cinzel text-[#DAA520] tracking-[0.3em] text-sm uppercase hover:text-white transition-colors border border-[#DAA520] px-8 py-4 bg-black/50 backdrop-blur-md"
        >
          RSVP NOW
        </motion.button>
      )}

    </div>
  )
}
