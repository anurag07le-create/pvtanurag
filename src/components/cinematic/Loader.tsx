"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'sealed' | 'cracking' | 'opening' | 'done'>('sealed')

  const handleEnter = () => {
    if (phase !== 'sealed') return
    
    // Step 1: Crack the door and shine the light
    setPhase('cracking')
    
    // Tell the parent to start loading the content behind the door so it's ready
    onComplete()

    // Step 2: Aggressively slide the doors open after a tiny delay
    setTimeout(() => {
      setPhase('opening')
    }, 600)

    // Step 3: Unmount everything
    setTimeout(() => {
      setPhase('done')
    }, 2000) // Give it enough time to finish animating out
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[200] flex"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Door */}
          <motion.div
            className="w-1/2 h-full bg-[#050505] relative border-r border-transparent z-10"
            initial={{ x: "0%" }}
            animate={{
              x: phase === 'cracking' ? "-2px" : phase === 'opening' ? "-100%" : "0%",
              borderColor: phase === 'cracking' ? "rgba(255, 215, 0, 0.8)" : "transparent",
              boxShadow: phase === 'cracking' ? "5px 0 20px rgba(255, 215, 0, 0.4)" : "none"
            }}
            transition={{ 
              x: phase === 'opening' ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : { duration: 0.1 }
            }}
          />

          {/* Right Door */}
          <motion.div
            className="w-1/2 h-full bg-[#050505] relative border-l border-transparent z-10"
            initial={{ x: "0%" }}
            animate={{
              x: phase === 'cracking' ? "2px" : phase === 'opening' ? "100%" : "0%",
              borderColor: phase === 'cracking' ? "rgba(255, 215, 0, 0.8)" : "transparent",
              boxShadow: phase === 'cracking' ? "-5px 0 20px rgba(255, 215, 0, 0.4)" : "none"
            }}
            transition={{ 
              x: phase === 'opening' ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : { duration: 0.1 }
            }}
          />

          {/* Blinding Light Behind the Crack */}
          <AnimatePresence>
            {phase === 'cracking' && (
              <motion.div 
                className="absolute inset-0 z-0 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-[10px] h-full bg-white blur-[10px] shadow-[0_0_50px_rgba(255,255,255,1)]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Golden Touch Ring */}
          <AnimatePresence>
            {phase === 'sealed' && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer z-20"
                onClick={handleEnter}
                exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className="w-24 h-24 rounded-full border border-[#DAA520] flex items-center justify-center relative"
                  animate={{ boxShadow: ["0 0 0px #DAA520", "0 0 20px #DAA520", "0 0 0px #DAA520"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Inner pulsing ring */}
                  <motion.div 
                    className="absolute inset-2 border border-[#DAA520]/50 rounded-full"
                    animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  {/* Fingerprint / Text */}
                  <span className="font-sans text-[10px] text-[#DAA520] tracking-[0.3em] uppercase">Enter</span>
                </motion.div>
                <span className="font-serif text-white/40 italic mt-6 tracking-widest text-sm">Touch to unlock</span>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
