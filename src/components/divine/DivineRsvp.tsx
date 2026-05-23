"use client"
import React, { useState } from 'react'

export default function DivineRsvp() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#020101] flex flex-col items-center justify-center py-20 px-4 z-40">
      
      {/* Background Mandala / Temple door aesthetic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-[150vw] md:w-[60vw] h-auto text-[#ffcda3] fill-current">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-white font-light mb-4">
          Grace Us With Your Presence
        </h2>
        <p className="font-sans text-[#ffcda3]/70 tracking-widest uppercase text-xs mb-12">
          Kindly respond by November 1st, 2026
        </p>

        {submitted ? (
          <div className="bg-white/5 border border-[#ffcda3]/20 rounded-sm p-12 backdrop-blur-sm">
            <h3 className="font-serif text-3xl text-[#ffcda3] italic mb-4">Dhanyawad</h3>
            <p className="font-sans text-white/70 font-light">We deeply appreciate your blessings and look forward to celebrating with you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-sm p-8 md:p-12 backdrop-blur-sm text-left">
            <div className="mb-6">
              <label className="font-sans text-xs tracking-widest text-[#ffcda3]/70 uppercase block mb-2">Name(s)</label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-serif text-xl focus:outline-none focus:border-[#ffcda3] transition-colors rounded-none placeholder-white/20"
                placeholder="e.g. The Sharma Family"
              />
            </div>
            
            <div className="mb-10">
              <label className="font-sans text-xs tracking-widest text-[#ffcda3]/70 uppercase block mb-4">Will you attend?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="attending" required className="peer sr-only" />
                  <div className="w-4 h-4 rounded-full border border-white/30 peer-checked:border-[#ffcda3] peer-checked:bg-[#ffcda3] transition-colors" />
                  <span className="font-serif text-lg text-white/70 group-hover:text-white transition-colors">Joyfully Accept</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="attending" className="peer sr-only" />
                  <div className="w-4 h-4 rounded-full border border-white/30 peer-checked:border-[#ffcda3] peer-checked:bg-[#ffcda3] transition-colors" />
                  <span className="font-serif text-lg text-white/70 group-hover:text-white transition-colors">Regretfully Decline</span>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 border border-[#ffcda3]/50 text-[#ffcda3] font-sans text-xs tracking-[0.3em] uppercase hover:bg-[#ffcda3] hover:text-black transition-all duration-500"
            >
              Offer Aashirwad (Submit)
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
