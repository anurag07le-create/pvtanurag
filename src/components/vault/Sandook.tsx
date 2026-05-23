"use client"
import React, { useState, useRef } from 'react'
import { motion, useAnimation, useDragControls } from 'framer-motion'

const photos = [
  { id: 1, src: '/images/photo1.jpeg', alt: 'A beautiful moment', type: 'sepia' },
  { id: 2, src: '/images/photo2.jpeg', alt: 'Smiles', type: 'polaroid' },
  { id: 3, src: '/images/photo3.jpeg', alt: 'Together', type: 'vintage' },
  { id: 4, src: '/images/photo4.jpeg', alt: 'Laughter', type: 'polaroid' },
  { id: 5, src: '/images/photo5.jpeg', alt: 'Forever', type: 'sepia' },
]

export default function Sandook() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const handleUnlock = () => {
    setIsUnlocked(true)
    setTimeout(() => {
      setIsOpen(true)
    }, 800) // Delay to let the lock animation finish before opening doors
  }

  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0a0604]" ref={containerRef}>
      
      {/* Heavy textured background */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,30,10,0.4)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />

      {/* The Sandook (Chest) */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        
        {/* The Lock Mechanism (Only visible when closed) */}
        {!isOpen && (
          <motion.div 
            className="absolute z-30 cursor-pointer"
            onClick={handleUnlock}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isUnlocked ? { y: 20, opacity: 0, rotate: 15 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Brass Lock visual */}
            <div className="w-24 h-32 bg-gradient-to-b from-[#B8860B] to-[#553b00] rounded-b-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-[3px] border-[#ffd700]/30 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/scratched-metal.png')] opacity-40 mix-blend-multiply" />
              <div className="w-4 h-12 bg-black/60 rounded-full mb-2 shadow-inner" />
              <p className="font-serif text-[#ffebb3] text-xs tracking-widest opacity-80 uppercase">Touch</p>
            </div>
          </motion.div>
        )}

        {/* Chest Box */}
        <div className="relative w-[300px] h-[200px] md:w-[450px] md:h-[250px] bg-gradient-to-b from-[#2a1306] to-[#120802] shadow-[0_40px_100px_rgba(0,0,0,0.9)] border-4 border-[#1a0a03] rounded-sm flex items-center justify-center">
          {/* Wood texture */}
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] mix-blend-multiply" />
          
          {/* Brass corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#B8860B] opacity-70" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#B8860B] opacity-70" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#B8860B] opacity-70" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#B8860B] opacity-70" />

          {/* Glowing interior indicating it's open */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,150,50,0.5)_0%,transparent_70%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Artifacts (Photos) - Emerge from the chest when open */}
      {isOpen && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {photos.map((photo, i) => (
            <Artifact 
              key={photo.id} 
              photo={photo} 
              index={i} 
              containerRef={containerRef} 
            />
          ))}
        </div>
      )}

      {/* Instructions when open */}
      <motion.p 
        className="absolute bottom-10 font-serif text-white/30 italic text-xl z-0 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ delay: 3, duration: 2 }}
      >
        Drag the memories out
      </motion.p>
    </div>
  )
}

function Artifact({ photo, index, containerRef }: { photo: any, index: number, containerRef: any }) {
  // Randomize initial scatter position coming out of the box
  const randomX = (Math.random() - 0.5) * 400
  const randomY = -200 - Math.random() * 200
  const randomRotate = (Math.random() - 0.5) * 40

  const styleMap = {
    sepia: "sepia-[0.8] contrast-125 brightness-90 hue-rotate-[-10deg]",
    polaroid: "contrast-110 brightness-110 saturate-50",
    vintage: "grayscale-[0.5] sepia-[0.4] contrast-150 brightness-75"
  }

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ scale: 1.05 }}
      initial={{ y: 0, x: 0, scale: 0, rotate: 0, opacity: 0 }}
      animate={{ 
        y: randomY, 
        x: randomX, 
        scale: 1, 
        rotate: randomRotate, 
        opacity: 1 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 12, 
        delay: 1 + (index * 0.2) // Emerge one by one
      }}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-grab p-3 bg-[#f4ebd0] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#d3c5a3]
        ${photo.type === 'polaroid' ? 'pb-12' : 'pb-3'}
      `}
      style={{ width: '220px', zIndex: 10 + index }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden shadow-inner">
        {/* Dust and noise overlay for vintage feel */}
        <div className="absolute inset-0 z-10 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] mix-blend-overlay pointer-events-none" />
        
        <img 
          src={photo.src} 
          alt={photo.alt}
          className={`w-full h-full object-cover ${styleMap[photo.type as keyof typeof styleMap]} pointer-events-none`}
        />
      </div>
      {photo.type === 'polaroid' && (
        <p className="mt-4 text-center font-serif text-[#5a4835] text-sm italic opacity-80">{photo.alt}</p>
      )}
    </motion.div>
  )
}
