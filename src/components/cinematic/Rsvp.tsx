"use client"
import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Rsvp() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  // Sheen/Glare logic
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"])
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "-100%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) setSubmitted(true)
  }

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#050505] flex flex-col items-center justify-center py-24 px-4 z-20 perspective-[2000px]">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(40,20,20,0.3)_0%,#050505_60%)] pointer-events-none" />

      <h2 className="text-white/40 font-sans text-xs tracking-[0.5em] uppercase mb-16 relative z-10 text-center">
        Your Presence Is Requested
      </h2>

      {/* 3D TICKET CONTAINER */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-xl aspect-[16/9] md:aspect-[2/1] rounded-lg cursor-none"
        data-cursor="hover"
      >
        
        {/* Ticket Surface */}
        <div className="absolute inset-0 bg-white/5 border border-white/20 rounded-lg backdrop-blur-md overflow-hidden flex flex-col items-center justify-center p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
          
          {/* Dynamic Glare/Sheen */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-0 pointer-events-none"
            style={{ x: sheenX, y: sheenY, scale: 2 }}
          />

          {!submitted ? (
            <div className="relative z-10 w-full text-center" style={{ transform: "translateZ(50px)" }}>
              <h3 className="font-serif text-3xl md:text-5xl text-white font-light italic mb-8">
                Admit One
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ENTER GUEST NAME" 
                  className="w-3/4 md:w-1/2 bg-transparent border-b border-white/30 pb-2 text-center text-white text-sm font-sans tracking-[0.2em] placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="mt-10 uppercase tracking-[0.3em] text-[10px] font-bold font-sans text-black bg-white py-3 px-8 hover:bg-gray-200 transition-colors"
                >
                  Confirm RSVP
                </button>
              </form>
            </div>
          ) : (
            <motion.div 
              className="relative z-10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transform: "translateZ(50px)" }}
            >
              <h3 className="font-serif text-3xl md:text-5xl text-white font-light mb-4">
                Confirmed.
              </h3>
              <p className="font-sans text-gray-400 font-light tracking-[0.2em] text-xs uppercase">
                We eagerly await your presence, {name}.
              </p>
            </motion.div>
          )}

          {/* Ticket Barcode details */}
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end opacity-40 font-mono text-[8px] tracking-widest text-white pointer-events-none">
            <span>DEC 06 2026</span>
            <div className="flex gap-1 h-6">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="bg-white w-[1px]" style={{ opacity: i % 3 === 0 || i % 5 === 0 ? 1 : 0.2 }} />
              ))}
            </div>
            <span>VIP ACCESS</span>
          </div>

        </div>
      </motion.div>

    </section>
  )
}
