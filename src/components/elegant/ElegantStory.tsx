"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const timelineEvents = [
  {
    id: 1,
    title: "The First Yes",
    text: "Two families, one beautiful connection. When it's meant to be, everything just falls into place.",
    date: "12 . 04 . 2026",
    alignment: "left",
    image: "/images/photo1.jpeg"
  },
  {
    id: 2,
    title: "The Engagement",
    text: "Rings exchanged, promises made, and the beginning of forever sealed with love and blessings.",
    date: "28 . 06 . 2026",
    alignment: "right",
    image: "/images/photo2.jpeg"
  },
  {
    id: 3,
    title: "Wedding Fixed",
    text: "The stars aligned, the date was set. The countdown to our biggest celebration begins.",
    date: "06 . 12 . 2026",
    alignment: "left",
    image: "/images/photo4.jpeg"
  }
]

export default function ElegantStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Background Parallax for the Sanskrit text
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"])
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[#0A1A2F] flex flex-col items-center py-32 overflow-hidden transform-gpu">
      
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen transform-gpu" 
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 80%)' }}
      />

      {/* Sanskrit Parallax Background */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.04] pointer-events-none select-none z-0 transform-gpu"
        style={{ y: backgroundY, willChange: 'transform' }}
      >
        <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap text-[#d4af37]">
          मंगलम् भगवान विष्णुः
        </h1>
        <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap ml-[20vw] text-[#d4af37]">
          मंगलम् गरुड़ध्वजः
        </h1>
        <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap mr-[20vw] text-[#d4af37]">
          मंगलम् पुण्डरीकाक्षः
        </h1>
        <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap text-[#d4af37]">
          मंगलाय तनो हरिः
        </h1>
      </motion.div>

      <div className="relative z-10 text-center mb-20 md:mb-32">
        <span className="font-montserrat text-[#e6c875]/70 text-[10px] md:text-xs tracking-[0.5em] uppercase block mb-3 drop-shadow-sm">
          Our Journey
        </span>
        <h2 className="font-cinzel text-4xl md:text-6xl text-[#d4af37] drop-shadow-md">
          A Timeline of Love
        </h2>
      </div>

      <div className="relative w-full max-w-5xl px-4 md:px-8 z-10 flex flex-col gap-24 md:gap-32">
        
        {/* The Golden Center Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2 bg-[#d4af37]/20 flex flex-col items-center">
           <motion.div 
             className="w-[2px] bg-gradient-to-b from-[#d4af37] to-transparent origin-top"
             style={{ scaleY: lineScale, height: '100%', willChange: 'transform' }}
           />
        </div>

        {timelineEvents.map((event, index) => {
          const isLeft = index % 2 === 0
          
          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
            >
              
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#0A1A2F] border-2 border-[#d4af37] -translate-x-[5px] md:-translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.5)] z-20" />

              {/* Card Content Wrapper */}
              <div className={`
                w-full pl-12 md:pl-0 md:w-[45%] flex flex-col md:flex-row gap-6 md:gap-8 items-center
                ${isLeft ? 'md:justify-end md:pr-12 md:flex-row-reverse' : 'md:justify-start md:pl-12'}
              `}>
                
                {/* Image */}
                <div className="w-full md:w-1/2 max-w-[200px] shrink-0">
                  <div className="w-full aspect-[4/5] relative rounded-t-full rounded-b-lg overflow-hidden border-2 border-[#d4af37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#d4af37] mix-blend-color opacity-20 pointer-events-none" />
                  </div>
                </div>

                {/* Text */}
                <div className={`flex flex-col flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="font-montserrat text-[#d4af37] font-bold text-xs md:text-sm tracking-widest mb-2">
                    {event.date}
                  </span>
                  <h3 className="font-cinzel text-2xl md:text-4xl text-white mb-4 drop-shadow-md">
                    {event.title}
                  </h3>
                  <p className="font-montserrat text-white/60 text-sm md:text-base font-light leading-relaxed">
                    {event.text}
                  </p>
                </div>

              </div>

            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
