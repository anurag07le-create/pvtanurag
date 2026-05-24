"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ElegantAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // Attempt to auto-play (browsers often block this until interaction)
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          // Lower volume for background music so it's not overpowering
          audioRef.current.volume = 0.4
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (err) {
        console.log("Auto-play blocked by browser. User must interact first.")
      }
    }
    
    // Add event listener for first interaction to start music gracefully
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        playAudio()
      }
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction)
    }
    
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    document.addEventListener('scroll', handleFirstInteraction)
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction)
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] flex items-center justify-center group">
      
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="/song.mp3" 
        loop 
        autoPlay
        preload="auto"
      />
      
      {/* Glowing Aura when playing */}
      {isPlaying && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-[#d4af37] mix-blend-screen z-0"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Floating Player Button */}
      <motion.button
        onClick={togglePlay}
        className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0A1A2F]/80 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] group-hover:border-[#d4af37] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Subtle inner gold ring */}
        <div className="absolute inset-1 rounded-full border-[0.5px] border-[#d4af37]/20" />

        {isPlaying ? (
          // Playing Animation (Audio Bars)
          <div className="flex gap-[3px] items-end h-4">
            <motion.div className="w-[3px] bg-[#d4af37] rounded-full origin-bottom" animate={{ height: ["4px", "16px", "4px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="w-[3px] bg-[#d4af37] rounded-full origin-bottom" animate={{ height: ["8px", "12px", "8px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
            <motion.div className="w-[3px] bg-[#d4af37] rounded-full origin-bottom" animate={{ height: ["16px", "6px", "16px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
          </div>
        ) : (
          // Muted / Play Icon
          <svg className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]/70 translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </motion.button>
    </div>
  )
}
