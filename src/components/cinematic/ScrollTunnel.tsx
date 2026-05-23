"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const tunnelImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop"
]

export default function ScrollTunnel() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset determines when 0 and 1 happen. Start at top of container, end at bottom.
  })

  // We are creating a 3D tunnel effect by mapping scroll progress to the scale and Z-index (simulated by scale/opacity) of images.
  
  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#020101] z-20 overflow-hidden perspective-[1000px]">
      
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Core typography in the center of the tunnel */}
        <div className="absolute z-50 text-center pointer-events-none mix-blend-difference">
          <h2 className="font-serif text-5xl md:text-8xl italic font-light text-white">The Journey</h2>
          <p className="font-sans text-xs tracking-[0.5em] uppercase mt-4 text-white/70">Fly through time</p>
        </div>

        {/* The images positioned in 3D space */}
        {tunnelImages.map((src, index) => {
          // Calculate when each image should fly past the camera based on scroll progress
          // Image 0 flies past first, Image 4 flies past last.
          const startProgress = index * 0.15;
          const endProgress = startProgress + 0.4;
          
          // The image starts tiny in the distance, and scales up to massive as it flies "past" the camera
          const scale = useTransform(scrollYProgress, [startProgress, endProgress], [0, 5])
          
          // Opacity fades in as it approaches, and fades out instantly as it hits scale 3+ (flying behind camera)
          const opacity = useTransform(scrollYProgress, [startProgress, startProgress + 0.2, endProgress - 0.1, endProgress], [0, 1, 1, 0])
          
          // Blur simulates depth of field
          const blur = useTransform(scrollYProgress, [startProgress, startProgress + 0.2, endProgress - 0.1, endProgress], ["10px", "0px", "0px", "20px"])

          // Alternate left and right positioning to make it feel like a tunnel
          const isLeft = index % 2 === 0
          const xOffset = isLeft ? "-30vw" : "30vw"
          const yOffset = index % 3 === 0 ? "-20vh" : "20vh"

          return (
            <motion.div
              key={index}
              className="absolute w-[40vw] h-[50vh] md:w-[20vw] md:h-[30vh] bg-cover bg-center rounded-sm shadow-2xl"
              style={{
                backgroundImage: `url(${src})`,
                scale,
                opacity,
                filter: blur,
                x: xOffset,
                y: yOffset,
                transformOrigin: "center center",
              }}
            />
          )
        })}
        
        {/* Hyperspace/Tunnel Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
             style={{ backgroundImage: 'radial-gradient(circle at center, transparent 20%, black 100%)' }} />

      </div>
    </section>
  )
}
