"use client"
import React, { useRef } from 'react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'

const originalImages = [
  '/images/photo1.jpeg',
  '/images/photo2.jpeg',
  '/images/photo4.jpeg',
  '/images/photo5.jpeg'
]
// Create a longer list to match the masonry look
const galleryImages = Array.from({ length: 20 }).map((_, i) => originalImages[i % originalImages.length])

function PhotoCard({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <motion.div
      ref={ref}
      className="relative w-full break-inside-avoid rounded-sm overflow-hidden mb-3 md:mb-4 border border-[#d4af37]/20 shadow-lg"
      style={{ scale, opacity: imgOpacity }}
    >
      <motion.div className="relative w-full overflow-hidden">
        <motion.img 
          src={src} 
          alt={`Memory ${index + 1}`}
          className="w-full h-auto object-cover"
        />
      </motion.div>
      
      {/* Subtle overlay that fades out */}
      <motion.div 
        className="absolute inset-0 bg-[#0A1A2F]"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.8, 0]) }}
      />
    </motion.div>
  )
}

export default function ElegantPhotoGrid() {
  return (
    <section className="relative w-full min-h-[100dvh] bg-[#0A1A2F] py-20 md:py-32 px-4 md:px-12 z-20 overflow-hidden">
      
      <div className="text-center mb-16 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-cinzel text-4xl md:text-6xl text-[#d4af37] drop-shadow-md mb-3 md:mb-4"
        >
          The Archive
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-montserrat text-[#e6c875]/60 tracking-[0.3em] text-[10px] md:text-xs uppercase"
        >
          Moments frozen in time
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 pb-16 md:pb-32">
        {galleryImages.map((src, index) => (
          <PhotoCard key={index} src={src} index={index} />
        ))}
      </div>
    </section>
  )
}
