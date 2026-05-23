"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const events = [
  {
    id: "mehandi",
    title: "Mehandi",
    date: "5 Dec 2026",
    time: "10:00 AM",
    venue: "The Royal Gardens",
    desc: "Colors of joy and intricate patterns.",
  },
  {
    id: "behrana",
    title: "Behrana",
    date: "5 Dec 2026",
    time: "8:00 PM",
    venue: "Grand Temple Hall",
    desc: "A divine evening of prayers and blessings.",
  },
  {
    id: "haldi",
    title: "Haldi",
    date: "6 Dec 2026",
    time: "10:00 AM",
    venue: "The Sunny Courtyard",
    desc: "The vibrant morning ritual of purification.",
  },
  {
    id: "wedding",
    title: "Wedding",
    date: "6 Dec 2026",
    time: "4:00 PM",
    venue: "The Grand Palace",
    desc: "The sacred union under the stars.",
  }
]

export default function ArdhanarishvaraEvents() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 4 events, so we make it 400vh tall
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // The two halves merging
  // Left half starts at 50% width, right half at 50% width.
  // As they merge, they both fade out slightly to reveal the event in the center.

  return (
    <section ref={containerRef} className="relative w-full z-30" style={{ height: '400vh' }}>
      
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#110808]">
        
        {/* Background split (Shiva/Parvati) */}
        <div className="absolute inset-0 flex pointer-events-none">
          {/* Left: Shiva (Cool, Ash, Water) */}
          <motion.div 
            className="w-1/2 h-full bg-[#0a1118] border-r border-white/5 flex items-center justify-end pr-4 md:pr-10"
          >
            <p className="font-serif text-[10vh] md:text-[20vh] text-white/5 font-bold tracking-tighter leading-none origin-right -rotate-90">
              SHIVA
            </p>
          </motion.div>
          
          {/* Right: Parvati (Warm, Vermillion, Silk) */}
          <motion.div 
            className="w-1/2 h-full bg-[#2a0808] flex items-center justify-start pl-4 md:pl-10"
          >
            <p className="font-serif text-[10vh] md:text-[20vh] text-[#ffcda3]/5 font-bold tracking-tighter leading-none origin-left rotate-90">
              PARVATI
            </p>
          </motion.div>
        </div>

        {/* Central Event Cards */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {events.map((ev, index) => {
            const start = index * 0.25
            const peak = start + 0.125
            const end = start + 0.25

            const opacity = useTransform(scrollYProgress, 
              [start, start + 0.05, peak, end - 0.05, end], 
              [0, 1, 1, 0, 0]
            )
            const scale = useTransform(scrollYProgress, 
              [start, peak, end], 
              [0.8, 1, 1.2]
            )

            return (
              <motion.div 
                key={ev.id}
                className="absolute inset-0 flex items-center justify-center px-6"
                style={{ opacity, scale }}
              >
                <div className="bg-[#020101]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 w-full max-w-lg rounded-sm text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <span className="font-sans text-[#ffcda3] text-[10px] tracking-[0.4em] uppercase mb-4 block">
                    Event {index + 1}
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl text-white font-light mb-4">
                    {ev.title}
                  </h3>
                  <p className="font-serif text-xl md:text-2xl text-white/70 italic mb-8">
                    "{ev.desc}"
                  </p>
                  
                  <div className="w-12 h-[1px] bg-white/20 mx-auto mb-8" />
                  
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-xs tracking-widest text-white/50 uppercase">Date & Time</p>
                    <p className="font-serif text-lg text-white mb-4">{ev.date} | {ev.time}</p>
                    
                    <p className="font-sans text-xs tracking-widest text-white/50 uppercase">Venue</p>
                    <p className="font-serif text-lg text-white leading-tight">{ev.venue}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
