"use client"
import React from 'react'
import { Play, Pause, Disc3 } from 'lucide-react'
import { useAudio } from '@/hooks/useAudio'
import { useMobile } from '@/hooks/useMobile'
import clsx from 'clsx'

export default function MusicPlayer() {
  const { isPlaying, togglePlay, currentLyric } = useAudio()
  const isMobile = useMobile()

  return (
    <div className={clsx(
      "fixed z-40 transition-all duration-500",
      isMobile 
        ? "bottom-6 right-6" 
        : "bottom-0 left-0 right-0 border-t border-gold/30 bg-ivory/80 backdrop-blur-md px-6 py-4"
    )}>
      {isMobile ? (
        // Mobile floating button
        <button 
          onClick={togglePlay}
          className="w-14 h-14 bg-deep-red rounded-full flex items-center justify-center text-ivory shadow-lg border-2 border-gold hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          {/* Pulsing ring when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-deep-red animate-ping opacity-50" />
          )}
        </button>
      ) : (
        // Desktop full bar
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Disc3 
              size={32} 
              className={clsx("text-deep-red", isPlaying && "animate-spin-slow")} 
              style={{ animationDuration: '3s' }}
            />
            <div>
              <p className="text-xs text-maroon uppercase tracking-widest font-semibold">Now Playing</p>
              <p className="text-sm font-medium">CO2 — Prateek Kuhad</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-8 overflow-hidden text-center">
            <p className="text-deep-red italic font-medium transition-opacity duration-300">
              {currentLyric}
            </p>
          </div>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-deep-red rounded-full flex items-center justify-center text-ivory hover:bg-maroon transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>
        </div>
      )}
    </div>
  )
}
