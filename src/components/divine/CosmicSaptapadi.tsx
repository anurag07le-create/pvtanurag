"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const vows = [
  { id: 1, sanskrit: "ॐ इष एकपदी भव", english: "To provide nourishment and stay faithful." },
  { id: 2, sanskrit: "ॐ ऊर्जे द्विपदी भव", english: "To grow physically, mentally, and spiritually." },
  { id: 3, sanskrit: "ॐ रायस्पोषाय त्रिपदी भव", english: "To share in wealth and righteousness." },
  { id: 4, sanskrit: "ॐ मायोभवाय चतुष्पदी भव", english: "To acquire knowledge, happiness, and peace." },
  { id: 5, sanskrit: "ॐ प्रजाभ्यः पञ्चपदी भव", english: "To raise strong and virtuous children." },
  { id: 6, sanskrit: "ॐ ऋतुभ्यः षट्पदी भव", english: "To live a long, disease-free life together." },
  { id: 7, sanskrit: "ॐ सखा सप्तपदी भव", english: "To remain lifelong friends and companions." }
]

export default function CosmicSaptapadi() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 900vh to fit all 7 vows comfortably
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const outroOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1])

  return (
    <section ref={containerRef} className="relative w-full bg-[#020101] z-40" style={{ height: '900vh' }}>
      
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
        
        {/* PLACEHOLDER FOR AI FIRE VIDEO (Havan Kund) */}
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          {/* Subtle placeholder fire glow */}
          <div className="w-[300px] h-[300px] bg-[#ff4500] rounded-full blur-[150px] opacity-20" />
          
          {/* Real video goes here: */}
          {/* <video src="/videos/sacred-fire.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60" /> */}
        </motion.div>

        {/* Intro */}
        <motion.div 
          className="absolute top-[20%] text-center px-4 w-full z-30"
          style={{ opacity: introOpacity }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-[#ffcda3] font-light italic mb-4">
            The Saptapadi
          </h2>
          <p className="font-sans text-white/60 text-xs md:text-sm tracking-[0.2em] uppercase max-w-md mx-auto leading-relaxed">
            The seven sacred steps around the eternal witness, Agni.
          </p>
        </motion.div>

        {/* The 7 Vows */}
        <div className="absolute inset-0 w-full px-6 flex items-center justify-center z-20 pointer-events-none">
          {vows.map((vow, index) => {
            const start = 0.1 + (index * 0.11)
            const peak = start + 0.05
            const end = start + 0.11

            const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0])
            const y = useTransform(scrollYProgress, [start - 0.05, peak, end + 0.05], [50, 0, -50])
            const scale = useTransform(scrollYProgress, [start, peak, end], [0.9, 1, 1.1])

            return (
              <motion.div
                key={vow.id}
                className="absolute flex flex-col items-center gap-6 w-full max-w-3xl mx-auto text-center"
                style={{ opacity, y, scale }}
              >
                <p className="font-sans text-[#ffcda3]/50 text-xs md:text-sm tracking-[0.5em] uppercase">
                  Step {vow.id}
                </p>
                <h3 className="font-serif text-3xl md:text-6xl text-white font-light leading-tight drop-shadow-[0_0_15px_rgba(255,205,163,0.3)]">
                  {vow.sanskrit}
                </h3>
                <p className="font-serif text-xl md:text-3xl text-[#ffcda3] italic font-light">
                  "{vow.english}"
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Outro */}
        <motion.div 
          className="absolute inset-0 bg-[#020101] z-40 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: outroOpacity, pointerEvents: 'none' }}
        >
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl text-white font-light italic mb-6 leading-tight">
              We seek your Aashirwad
            </h2>
            <p className="font-sans text-[#ffcda3]/80 text-sm md:text-base tracking-widest uppercase leading-relaxed">
              Please join us to bless these promises and witness our union.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
