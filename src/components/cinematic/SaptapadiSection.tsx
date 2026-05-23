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

export default function SaptapadiSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Create a very tall section so we can scroll through all 7 vows
  // 7 vows + intro + outro = 9 "pages" of scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Fade out the intro message as we scroll down
  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  
  // Fade in the outro (Aashirwad) message at the very end
  const outroOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1])

  return (
    <section ref={containerRef} className="relative w-full bg-[#030101] z-20" style={{ height: '900vh' }}>
      
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background ambient lighting based on fire */}
        <div 
          className="absolute inset-0 blur-[100px] pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at center, rgba(200,60,0,0.15) 0%, transparent 70%)` 
          }}
        />

        {/* Intro Message */}
        <motion.div 
          className="absolute top-[20%] text-center px-4 w-full z-30"
          style={{ opacity: introOpacity }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-[#ffcda3] font-light italic mb-4">
            The Saptapadi
          </h2>
          <p className="font-sans text-[#1B4332]/60 text-xs md:text-sm tracking-[0.2em] uppercase max-w-md mx-auto leading-relaxed">
            As we prepare to walk the seven steps around the sacred fire.
          </p>
          
          <div className="mt-12 w-[1px] h-16 bg-gradient-to-b from-[#ffcda3]/50 to-transparent mx-auto animate-pulse" />
        </motion.div>

        {/* Subtle Sacred Geometry / Mandala Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <motion.svg 
            viewBox="0 0 100 100" 
            className="w-[150vw] md:w-[80vw] h-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ffcda3" strokeWidth="0.5" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ffcda3" strokeWidth="0.2" />
            <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="none" stroke="#ffcda3" strokeWidth="0.5" />
            <path d="M50 20 L55 45 L80 50 L55 55 L50 80 L45 55 L20 50 L45 45 Z" fill="none" stroke="#ffcda3" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#ffcda3" strokeWidth="0.5" />
          </motion.svg>
        </div>

        {/* The 7 Vows (Centered, Large Typography, Mapped to scroll progress) */}
        <div className="absolute inset-0 w-full px-6 flex items-center justify-center z-20 pointer-events-none">
          {vows.map((vow, index) => {
            // Range from 0.1 to 0.9 divided by 7 vows
            const start = 0.1 + (index * 0.11)
            const peak = start + 0.05
            const end = start + 0.11

            const opacity = useTransform(scrollYProgress, 
              [start, peak, end], 
              [0, 1, 0]
            )
            const y = useTransform(scrollYProgress, 
              [start - 0.05, peak, end + 0.05], 
              [50, 0, -50]
            )
            const scale = useTransform(scrollYProgress,
              [start, peak, end],
              [0.9, 1, 1.1]
            )
            const filter = useTransform(scrollYProgress, 
              [start, peak, end], 
              ["blur(10px)", "blur(0px)", "blur(10px)"]
            )

            return (
              <motion.div
                key={vow.id}
                className="absolute flex flex-col items-center gap-6 w-full max-w-3xl mx-auto text-center"
                style={{ opacity, y, scale, filter }}
              >
                <p className="font-sans text-[#ffcda3]/50 text-xs md:text-sm tracking-[0.5em] uppercase">
                  Vow {vow.id}
                </p>
                <h3 className="font-serif text-4xl md:text-6xl text-[#1B4332] font-light leading-tight drop-shadow-[0_0_15px_rgba(255,205,163,0.3)]">
                  {vow.sanskrit}
                </h3>
                <p className="font-serif text-2xl md:text-3xl text-[#ffcda3] italic font-light">
                  "{vow.english}"
                </p>
                
                {/* Small elegant divider under each vow */}
                <div className="w-8 h-[1px] bg-[#ffcda3]/30 mt-4" />
              </motion.div>
            )
          })}
        </div>

        {/* Outro Message (Call for Aashirwad) */}
        <motion.div 
          className="absolute inset-0 bg-[#030101] z-40 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: outroOpacity, pointerEvents: 'none' }}
        >
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl text-[#1B4332] font-light italic mb-6 leading-tight">
              We seek your Aashirwad
            </h2>
            <p className="font-sans text-[#ffcda3]/80 text-sm md:text-base tracking-widest uppercase leading-relaxed">
              Please join us to bless these promises and witness two families become one.
            </p>
            <div className="w-16 h-[1px] bg-[#ffcda3]/30 mx-auto mt-10" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
