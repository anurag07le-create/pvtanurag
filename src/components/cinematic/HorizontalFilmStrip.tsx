"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const photos = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop"
]

export default function HorizontalFilmStrip() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  // We make the section 400vh tall to give us plenty of scrolling space to translate into horizontal movement
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Translates vertical scroll (0 to 1) into horizontal movement (0 to -100%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]) // -75% because we have 4 screen-widths of content

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#020101] z-20">
      
      {/* Sticky container that stays on screen while we "scroll horizontally" */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        <div className="absolute top-10 left-10 z-10 mix-blend-difference text-[#1B4332]">
          <p className="font-sans text-xs tracking-[0.4em] uppercase mb-2">The Gallery</p>
          <h2 className="font-serif text-3xl italic font-light">A Cinematic Timeline</h2>
        </div>

        {/* The horizontally moving track */}
        <motion.div 
          className="flex h-[60vh] gap-8 px-10 md:px-[20vw]"
          style={{ x }}
        >
          {photos.map((src, index) => {
            // Give each photo a slightly different vertical alignment for that "scattered" editorial look
            const marginClass = index % 2 === 0 ? "mt-0 mb-auto" : "mt-auto mb-0"
            
            return (
              <div 
                key={index}
                className={`relative w-[80vw] md:w-[40vw] h-[50vh] flex-shrink-0 group ${marginClass}`}
              >
                {/* 
                  Using an inner div with absolute inset-0 to hold the background image.
                  We can add a hover effect here to zoom the image slightly, proving it's interactive.
                */}
                <div className="absolute inset-0 overflow-hidden rounded-sm shadow-2xl">
                  <motion.div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                  {/* Grain Overlay */}
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay" />
                </div>
                
                {/* Minimalist Captions */}
                <div className="absolute -bottom-8 left-0 flex items-center justify-between w-full font-sans text-[#1B4332]/50 text-[10px] tracking-widest uppercase">
                  <span>FRAME 0{index + 1}</span>
                  <span>THE UNION</span>
                </div>
              </div>
            )
          })}
        </motion.div>
        
      </div>
    </section>
  )
}
