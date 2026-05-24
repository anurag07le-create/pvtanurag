"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const timelineEvents = [
  {
    id: 1,
    title: "The First Yes",
    text: "Two families, one beautiful connection. When it's meant to be, everything falls into place.",
    image: "/images/photo1.jpeg",
    year: "14 FEB"
  },
  {
    id: 2,
    title: "Wedding Fixed",
    text: "The day both hearts agreed. A simple yes that changed everything forever.",
    image: "/images/photo2.jpeg",
    year: "20 APR"
  },
  {
    id: 3,
    title: "The Roka",
    text: "It became official. The stars aligned, and the countdown to forever began.",
    image: "/images/photo4.jpeg",
    year: "15 AUG"
  },
  {
    id: 4,
    title: "Pre-Wedding Shoot",
    text: "Capturing the moments before two families become one. A beautiful beginning.",
    image: "/images/photo5.jpeg",
    year: "10 OCT"
  }
]

function StoryCard({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  // Simple elegant fade and slide in
  const yOffset = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])
  
  const isEven = index % 2 === 0

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity, y: yOffset }}
      className={`py-12 md:py-20 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 px-4 md:px-12 relative max-w-6xl mx-auto`}
    >
      
      {/* Image Side */}
      <div className="w-full md:w-1/2 flex justify-center relative">
        {/* Golden Arch Frame */}
        <div className="w-full max-w-sm aspect-[4/5] relative overflow-hidden rounded-t-[150px] shadow-[0_0_40px_rgba(212,175,55,0.2)] border-t-4 border-x-4 border-[#d4af37]">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-t-[150px] border-t-2 border-x-2 border-[#ffebb3] opacity-30 m-3 pointer-events-none" />
        </div>
      </div>

      {/* Text Side */}
      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'items-start text-left' : 'items-start md:items-end text-left md:text-right'}`}>
        <span className="font-montserrat text-[#e6c875] tracking-[0.4em] uppercase text-[10px] font-bold mb-4">
          Phase 0{index + 1}
        </span>
        
        <h3 className="font-cinzel text-4xl md:text-5xl text-white leading-tight mb-4 drop-shadow-md">
          {event.title}
        </h3>
        
        <p className="font-montserrat text-white/70 font-light text-sm md:text-base leading-relaxed max-w-md mb-6">
          {event.text}
        </p>

        <div className="text-[#d4af37]/20 font-vibes text-6xl md:text-8xl select-none drop-shadow-xl">
          {event.year}
        </div>
      </div>
      
    </motion.div>
  )
}

export default function ElegantStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section ref={containerRef} className="relative bg-[#0A1A2F] z-20 overflow-hidden py-16">
      
      {/* Background Texture */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img 
          src="/images/elegant/teal-texture.png" 
          alt="Texture" 
          className="w-full h-full object-cover opacity-10 mix-blend-overlay"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-4">
        <h2 className="font-cinzel text-4xl md:text-6xl text-[#d4af37] mb-3 md:mb-4 text-center drop-shadow-lg">
          Our Story
        </h2>
        <p className="font-montserrat text-[#e6c875]/70 tracking-[0.4em] text-[10px] md:text-xs uppercase">
          A Timeline of Love
        </p>
      </div>

      {/* Story cards: vertical scroll */}
      <div className="relative z-10">
        {timelineEvents.map((event, i) => (
          <StoryCard key={event.id} event={event} index={i} />
        ))}
      </div>
      
    </section>
  )
}
