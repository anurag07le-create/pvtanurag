"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const lines = [
  { text: "Two", style: "italic" },
  { text: "families", style: "normal" },
  { text: "one", style: "italic" },
  { text: "destiny", style: "normal" },
  { text: "—", style: "normal" },
  { text: "Vandana", style: "italic" },
  { text: "&", style: "normal" },
  { text: "Sagar", style: "italic" },
]

function KineticWord({ word, index, totalWords, containerRef }: { 
  word: { text: string; style: string }; 
  index: number; 
  totalWords: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Each word activates at a different scroll point
  const wordStart = index / totalWords
  const wordPeak = (index + 0.5) / totalWords
  const wordEnd = (index + 1) / totalWords

  // Scale: small → big → slightly smaller
  const scale = useTransform(scrollYProgress, 
    [wordStart, wordPeak, wordEnd], 
    [0.3, 1, 0.8]
  )

  // Opacity: fade in → full → fade out
  const opacity = useTransform(scrollYProgress,
    [wordStart, wordStart + 0.02, wordPeak, wordEnd - 0.02, wordEnd],
    [0, 1, 1, 0.3, 0]
  )

  // Y position: rise up → center → drift up and away
  const y = useTransform(scrollYProgress,
    [wordStart, wordPeak, wordEnd],
    [60, 0, -40]
  )

  // Rotation: slight tilt → straight → tilt other way
  const rotate = useTransform(scrollYProgress,
    [wordStart, wordPeak, wordEnd],
    [index % 2 === 0 ? -8 : 8, 0, index % 2 === 0 ? 4 : -4]
  )

  // X slide: alternate from left/right
  const x = useTransform(scrollYProgress,
    [wordStart, wordPeak, wordEnd],
    [index % 2 === 0 ? -80 : 80, 0, 0]
  )

  // Letter spacing expands then contracts
  const letterSpacing = useTransform(scrollYProgress,
    [wordStart, wordPeak, wordEnd],
    ["0.05em", "0.15em", "0.1em"]
  )

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, zIndex: 30 }}
    >
      <motion.span
        className={`font-serif text-[16vw] md:text-[12vw] text-white leading-none select-none whitespace-nowrap ${word.style === 'italic' ? 'italic font-light' : 'font-extralight'}`}
        style={{ scale, y, rotate, x, letterSpacing }}
      >
        {word.text}
      </motion.span>
    </motion.div>
  )
}

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Background color shifts from pure black → deep warm → back to black
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0])

  return (
    <section 
      ref={containerRef} 
      className="relative z-20 bg-[#050505]"
      style={{ height: `${lines.length * 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">
        
        {/* Warm amber ambient glow */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,50,1)_0%,transparent_70%)] pointer-events-none"
          style={{ opacity: bgOpacity }}
        />

        {/* Kinetic words */}
        {lines.map((word, i) => (
          <KineticWord 
            key={i} 
            word={word} 
            index={i} 
            totalWords={lines.length}
            containerRef={containerRef}
          />
        ))}

        {/* Subtle scroll hint at the very start */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-40"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0.5, 0]) }}
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}
