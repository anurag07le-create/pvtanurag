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
    offset: ["start end", "end start"]
  })

  // Image clips open diagonally as you scroll in
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [
      "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    ]
  )

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.3, 1])
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0])

  return (
    <div ref={ref} className="min-h-[100dvh] flex flex-col items-center justify-center px-4 md:px-12 py-16 md:py-0 relative">
      
      {/* Phase label */}
      <motion.span 
        style={{ opacity: textOpacity }}
        className="font-sans text-amber-500/50 tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold mb-6 md:mb-8"
      >
        Phase 0{index + 1}
      </motion.span>

      {/* Image with clip-path reveal */}
      <motion.div 
        className="w-full max-w-sm md:max-w-lg aspect-[4/5] md:aspect-[3/4] relative overflow-hidden bg-black rounded-sm mb-8 md:mb-12"
        style={{ clipPath }}
      >
        <motion.img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
          style={{ scale: imageScale }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
      </motion.div>

      {/* Text content */}
      <div className="text-center max-w-md px-2 flex flex-col items-center">
        <div className="overflow-hidden pb-2 mb-4 md:mb-6">
          <motion.h3 
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-white font-light italic leading-none"
          >
            {event.title}
          </motion.h3>
        </div>
        
        <div className="overflow-hidden mb-6 md:mb-8">
          <motion.p 
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-sans text-gray-400 font-light text-sm md:text-base leading-relaxed"
          >
            {event.text}
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.div 
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-white/10 font-serif text-6xl md:text-8xl font-bold tracking-tighter select-none"
          >
            {event.year}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function Story() {
  return (
    <section className="relative bg-[#050505] z-20">
      
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center py-20 md:py-32 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-7xl text-white font-light italic mb-3 md:mb-4 text-center"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-white/40 tracking-[0.4em] text-[10px] md:text-xs uppercase"
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
