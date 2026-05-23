"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
    }
  }, [])

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

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150]">
      <audio ref={audioRef} src="/song.mp3" loop />
      
      <button 
        onClick={togglePlay}
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-95 transition-transform"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {/* Pulsing ring when not playing */}
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {isPlaying ? (
          /* Mini waveform when playing */
          <div className="flex items-end gap-[3px] h-5">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-white rounded-full"
                animate={{ 
                  height: ["6px", "18px", "10px", "14px", "6px"]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        ) : (
          /* Play icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="ml-1">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </div>
  )
}
