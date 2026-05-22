"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3 // Ambient level
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
    <div className="fixed top-8 right-8 z-[150] mix-blend-difference cursor-none" data-cursor="hover">
      <audio ref={audioRef} src="/song.mp3" loop />
      
      <button 
        onClick={togglePlay}
        className="flex items-center gap-4 group"
      >
        <span className="font-sans text-[10px] text-white tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? 'Pause' : 'Sound'}
        </span>

        <div className="flex items-end gap-1 h-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-white"
              initial={{ height: "4px" }}
              animate={{ 
                height: isPlaying ? ["4px", "16px", "8px", "12px", "4px"] : "4px"
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </button>
    </div>
  )
}
