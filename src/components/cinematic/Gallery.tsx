"use client"
import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Replicating the 5 images to make 20 as requested
const originalImages = [
  '/images/photo1.jpeg',
  '/images/photo2.jpeg',
  '/images/photo3.jpeg',
  '/images/photo4.jpeg',
  '/images/photo5.jpeg'
]
const galleryImages = Array.from({ length: 20 }).map((_, i) => originalImages[i % originalImages.length])
const chaosFrames = galleryImages.map((_, index) => {
  const seed = Math.sin(index + 1) * 10000
  const fraction = seed - Math.floor(seed)
  const next = (offset: number) => {
    const value = Math.sin(index * 12.9898 + offset) * 43758.5453
    return value - Math.floor(value)
  }

  return {
    x: fraction * 1000 - 500,
    y: next(78.233) * 1000 - 500,
    rotate: next(23.17) * 90 - 45,
    scale: next(91.7) * 1.5 + 0.5,
  }
})

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "0px" })

  return (
    <section className="relative w-full min-h-screen bg-[#050505] py-32 px-4 md:px-12 z-20 overflow-hidden">
      
      <div className="text-center mb-24">
        <h2 className="font-serif text-5xl md:text-7xl text-white font-light mb-4">
          The Archive
        </h2>
        <p className="font-sans text-gray-500 font-light tracking-[0.3em] text-xs uppercase">
          Moments frozen in time
        </p>
      </div>

      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4 pb-32"
      >
        {galleryImages.map((src, index) => {
          const frame = chaosFrames[index]

          return (
            <motion.div
              key={index}
              className="relative w-full break-inside-avoid rounded-sm overflow-hidden group cursor-none"
              data-cursor="hover"
              initial={{
                x: frame.x,
                y: frame.y,
                rotate: frame.rotate,
                scale: frame.scale,
                opacity: 0
              }}
              animate={isInView ? {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1
              } : {}}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                mass: 1,
                delay: isInView ? index * 0.05 : 0
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src={src} 
                alt="Gallery item"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
              />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
