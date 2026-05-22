"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const timelineEvents = [
  {
    id: 1,
    title: "The Quiet Beginning",
    text: "Before the noise, there was simply a quiet understanding. Two paths converging without force.",
    image: "/images/photo1.jpeg",
    year: "2024"
  },
  {
    id: 2,
    title: "The Alignment",
    text: "To listen without ego and speak without fear. Finding joy in the ordinary.",
    image: "/images/photo2.jpeg",
    year: "2025"
  },
  {
    id: 3,
    title: "Seven Promises",
    text: "To walk beside each other, never ahead, never behind. Choosing each other, again and again.",
    image: "/images/photo4.jpeg",
    year: "VOWS"
  },
  {
    id: 4,
    title: "The Celebration",
    text: "A new chapter is written. We invite you to witness our forever.",
    image: "/images/photo5.jpeg",
    year: "2026"
  }
]

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  // Move the timeline horizontally by translating X from 0% to -75% (for 4 items)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505] z-20">
      
      {/* Sticky container that locks while scrolling vertically */}
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        
        {/* Background Ambient Light */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(30,20,20,0.5),transparent_50%)] pointer-events-none" />

        <motion.div style={{ x }} className="flex gap-20 md:gap-40 px-[10vw] md:px-[20vw]">
          {timelineEvents.map((event, i) => (
            <div key={event.id} className="w-[85vw] md:w-[60vw] flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 h-[100dvh] md:h-auto py-24 md:py-0">
              
              {/* Image with clip-path reveal */}
              <div 
                className="w-full md:w-1/2 h-[40vh] md:h-auto md:aspect-[3/4] relative overflow-hidden bg-black group cursor-none"
                data-cursor="hover"
              >
                <motion.img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 origin-center"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col">
                <span className="text-netflix-red/60 font-sans tracking-[0.4em] uppercase text-xs font-bold mb-6">
                  Phase 0{i + 1}
                </span>
                
                <h3 className="font-serif text-4xl md:text-7xl text-white font-light italic mb-4 md:mb-8 leading-none">
                  {event.title}
                </h3>
                
                <p className="font-sans text-gray-400 font-light text-sm md:text-lg leading-relaxed max-w-md">
                  {event.text}
                </p>

                <div className="mt-8 md:mt-16 text-white/20 font-serif text-6xl md:text-9xl font-bold tracking-tighter">
                  {event.year}
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
