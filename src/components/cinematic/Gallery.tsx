"use client"
import React, { useRef } from 'react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'

const originalImages = [
  '/images/photo1.jpeg',
  '/images/photo2.jpeg',
  '/images/photo3.jpeg',
  '/images/photo4.jpeg',
  '/images/photo5.jpeg'
]
const galleryImages = Array.from({ length: 20 }).map((_, i) => originalImages[i % originalImages.length])

function PhotoCard({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  // Film developing effect: blur to sharp, dark to bright.
  const blur = useTransform(scrollYProgress, [0, 0.6, 1], [12, 4, 0])
  const brightness = useTransform(scrollYProgress, [0, 0.6, 1], [0.2, 0.6, 1])
  const grayscale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness}) grayscale(${grayscale})`

  return (
    <motion.div
      ref={ref}
      className="relative w-full break-inside-avoid rounded-sm overflow-hidden mb-3 md:mb-4"
      style={{ scale, opacity: imgOpacity }}
      onViewportEnter={() => {
        // Haptic feedback when photo reveals
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(10)
        }
      }}
    >
      <motion.div className="relative w-full overflow-hidden">
        <motion.img 
          src={src} 
          alt={`Memory ${index + 1}`}
          className="w-full h-auto object-cover"
          style={{ filter }}
        />
      </motion.div>
      
      {/* Subtle overlay that fades out */}
      <motion.div 
        className="absolute inset-0 bg-[#050505] pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.6, 0]) }}
      />
    </motion.div>
  )
}

export default function Gallery() {
  return (
    <section className="relative w-full min-h-[100dvh] bg-[#050505] py-20 md:py-32 px-4 md:px-12 z-20 overflow-hidden">
      
      <div className="text-center mb-16 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-7xl text-white font-light mb-3 md:mb-4"
        >
          The Archive
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-gray-500 font-light tracking-[0.3em] text-[10px] md:text-xs uppercase"
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
