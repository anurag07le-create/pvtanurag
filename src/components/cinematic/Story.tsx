"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const timelineEvents = [
  {
    id: 1,
    title: "The Families Met",
    text: "Two families, one beautiful connection. When it's meant to be, everything falls into place.",
    image: "/images/photo1.jpeg",
    year: "2026"
  },
  {
    id: 2,
    title: "They Said Yes",
    text: "15th April: the day both hearts agreed. A simple yes that changed everything forever.",
    image: "/images/photo2.jpeg",
    year: "15 APR"
  },
  {
    id: 3,
    title: "The Date Was Fixed",
    text: "10th May: it became official. The stars aligned, and the countdown to forever began.",
    image: "/images/photo4.jpeg",
    year: "10 MAY"
  },
  {
    id: 4,
    title: "The Celebration Awaits",
    text: "6th December: two families become one. You are invited to witness this beautiful beginning.",
    image: "/images/photo5.jpeg",
    year: "6 DEC"
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
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-sm aspect-[4/5] relative overflow-hidden rounded-sm shadow-2xl border border-[#1B4332]/10">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Side */}
      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'items-start text-left' : 'items-start md:items-end text-left md:text-right'}`}>
        <span className="font-sans text-amber-600/70 tracking-[0.4em] uppercase text-[10px] font-bold mb-4">
          Phase 0{index + 1}
        </span>
        
        <h3 className="font-serif text-4xl md:text-5xl text-[#1B4332] font-light italic leading-tight mb-4">
          {event.title}
        </h3>
        
        <p className="font-sans text-[#1B4332]/70 font-light text-sm md:text-base leading-relaxed max-w-md mb-6">
          {event.text}
        </p>

        <div className="text-[#1B4332]/10 font-serif text-5xl md:text-7xl font-bold tracking-tighter select-none">
          {event.year}
        </div>
      </div>
      
    </motion.div>
  )
}

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax the sanskrit text slower than the scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  return (
    <section ref={containerRef} className="relative bg-[#FDFBF7] z-20 overflow-hidden">
      
      {/* Sanskrit Whispers Background */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03] pointer-events-none select-none z-0"
        style={{ y: backgroundY }}
      >
        <h1 className="font-serif text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap text-[#DAA520]">
          मंगलम् भगवान विष्णुः
        </h1>
        <h1 className="font-serif text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap ml-[20vw] text-[#DAA520]">
          मंगलम् गरुड़ध्वजः
        </h1>
        <h1 className="font-serif text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap mr-[20vw] text-[#DAA520]">
          मंगलम् पुण्डरीकाक्षः
        </h1>
        <h1 className="font-serif text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap text-[#DAA520]">
          मंगलाय तनो हरिः
        </h1>
      </motion.div>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col items-center justify-center py-20 md:py-32 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-7xl text-[#1B4332] font-light italic mb-3 md:mb-4 text-center"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-[#1B4332]/40 tracking-[0.4em] text-[10px] md:text-xs uppercase"
        >
          How it all began
        </motion.p>
      </div>

      {/* Story cards: vertical scroll */}
      {timelineEvents.map((event, i) => (
        <StoryCard key={event.id} event={event} index={i} />
      ))}
    </section>
  )
}
