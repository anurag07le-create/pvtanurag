"use client"
import React, { useState, useEffect } from 'react'
import { CONFIG } from '@/lib/config'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = CONFIG.weddingDate.getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="countdown" className="py-24 px-4 min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-red to-maroon z-0" />
      <div 
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Decorative large mandala behind timer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-[120vw] max-w-[1000px] text-white opacity-[0.03] animate-spin-slow" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 5 Q70 20 95 50 Q70 80 50 95 Q30 80 5 50 Q30 20 50 5 Z" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl text-gold mb-12 text-center drop-shadow-md">
          Abhi baaki hai... 
          <span className="text-2xl md:text-3xl text-blush-pink block mt-2">अभी बाकी है...</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl mb-12">
          
          {/* Days */}
          <div className="bg-maroon/80 backdrop-blur-sm border border-gold/40 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(212,160,23,0.1)]">
            <span className="text-5xl md:text-7xl font-playfair text-gold mb-2 drop-shadow-lg">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-blush-pink font-medium tracking-widest uppercase text-xs md:text-sm">Days</span>
            <span className="text-blush-pink/80 text-xs">दिन</span>
          </div>

          {/* Hours */}
          <div className="bg-maroon/80 backdrop-blur-sm border border-gold/40 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(212,160,23,0.1)]">
            <span className="text-5xl md:text-7xl font-playfair text-gold mb-2 drop-shadow-lg">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-blush-pink font-medium tracking-widest uppercase text-xs md:text-sm">Hours</span>
            <span className="text-blush-pink/80 text-xs">घंटे</span>
          </div>

          {/* Minutes */}
          <div className="bg-maroon/80 backdrop-blur-sm border border-gold/40 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(212,160,23,0.1)]">
            <span className="text-5xl md:text-7xl font-playfair text-gold mb-2 drop-shadow-lg">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-blush-pink font-medium tracking-widest uppercase text-xs md:text-sm">Minutes</span>
            <span className="text-blush-pink/80 text-xs">मिनट</span>
          </div>

          {/* Seconds */}
          <div className="bg-maroon/80 backdrop-blur-sm border border-gold/40 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(212,160,23,0.1)]">
            <span className="text-5xl md:text-7xl font-playfair text-gold mb-2 drop-shadow-lg">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-blush-pink font-medium tracking-widest uppercase text-xs md:text-sm">Seconds</span>
            <span className="text-blush-pink/80 text-xs">सेकंड</span>
          </div>

        </div>

        <p className="text-xl md:text-2xl text-ivory font-playfair italic mt-4 text-center">
          "Bas itna waqt bacha hai... 💍"
        </p>

      </div>
    </section>
  )
}
