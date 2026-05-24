"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TARGET_DATE = new Date('2026-12-06T16:00:00+05:30').getTime()

function getTimeLeft() {
  const now = Date.now()
  const diff = TARGET_DATE - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isOver: false
  }
}

type TimeLeft = ReturnType<typeof getTimeLeft>

// Deterministic particle positions to avoid hydration mismatch
const particles = Array.from({ length: 25 }).map((_, i) => ({
  left: `${(i * 17.3 + 7) % 100}%`,
  delay: (i * 0.47) % 4,
  duration: 3 + (i % 3) * 2,
  size: 2 + (i % 3),
}))

export default function ElegantCountdown() {
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const tick = () => setTime(getTimeLeft())
    const firstTick = window.setTimeout(tick, 0)
    const interval = setInterval(() => {
      tick()
    }, 1000)
    return () => {
      window.clearTimeout(firstTick)
      clearInterval(interval)
    }
  }, [])

  const blocks = [
    { label: 'Days', value: time?.days },
    { label: 'Hours', value: time?.hours },
    { label: 'Minutes', value: time?.minutes },
    { label: 'Seconds', value: time?.seconds },
  ]

  return (
    <section className="relative w-full min-h-[60dvh] md:min-h-[80dvh] bg-[#0A1A2F] flex flex-col items-center justify-center py-20 px-4 z-20 overflow-hidden transform-gpu">
      
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transform-gpu" 
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 60%)' }}
      />
      
      {/* Floating golden particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              bottom: '-10px',
              background: 'radial-gradient(circle, #ffebb3 0%, rgba(255,235,179,0) 70%)',
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, typeof window !== 'undefined' ? -window.innerHeight : -800],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-10 md:mb-16 relative z-10"
      >
        <span className="font-montserrat text-[#e6c875]/70 text-[10px] md:text-xs tracking-[0.5em] uppercase block mb-3 drop-shadow-sm">
          Counting Down To
        </span>
        <h2 className="font-cinzel text-4xl md:text-6xl text-[#d4af37] drop-shadow-md">
          The Big Day
        </h2>
      </motion.div>

      {time?.isOver ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <h3 className="font-cinzel text-5xl md:text-7xl text-[#d4af37] mb-4 drop-shadow-md">
            The Day Has Arrived
          </h3>
          <p className="font-montserrat text-[#e6c875]/50 text-sm tracking-[0.3em] uppercase">
            Let the celebrations begin
          </p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex gap-3 md:gap-8 relative z-10"
        >
          {blocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center">
              <div className="relative w-[72px] h-[90px] md:w-[120px] md:h-[140px] border border-[#d4af37]/30 bg-[#0e2436]/80 rounded-lg flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Subtle shimmer */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                <motion.span
                  key={time ? block.value : 'ssr'}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-cinzel text-3xl md:text-5xl text-white drop-shadow-md tabular-nums"
                >
                  {typeof block.value === 'number' ? String(block.value).padStart(2, '0') : '--'}
                </motion.span>
              </div>
              <span className="font-montserrat text-white/50 text-[9px] md:text-xs tracking-[0.3em] uppercase mt-3 md:mt-4">
                {block.label}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Date reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-12 md:mt-20 text-center relative z-10"
      >
        <p className="font-montserrat text-[10px] md:text-xs text-[#d4af37]/40 tracking-[0.2em] uppercase">
          6th December 2026 | 4:00 PM
        </p>
      </motion.div>
    </section>
  )
}
