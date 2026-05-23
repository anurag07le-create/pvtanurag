"use client"
import React, { useState } from 'react'
import { motion, type PanInfo } from 'framer-motion'

const events = [
  {
    id: "mehandi",
    title: "Mehandi",
    date: "5 Dec 2026",
    time: "10:00 AM",
    venue: "Hotel Natraj & Resort",
    color: "#1B4332", // Deep Green
    accent: "#D8F3DC",
    image: "/images/mehandi-caricature.png",
    description: "Kickstarting the festivities with colors, music, and joy."
  },
  {
    id: "behrana",
    title: "Behrana",
    date: "5 Dec 2026",
    time: "8:00 PM",
    venue: "Hotel Natraj & Resort",
    color: "#4A0404", // Maroon
    accent: "#FFD6A5",
    image: "/images/behrana-caricature.png",
    description: "A divine evening of prayers and traditional blessings."
  },
  {
    id: "haldi",
    title: "Haldi",
    date: "6 Dec 2026",
    time: "10:00 AM",
    venue: "Hotel Natraj & Resort",
    color: "#E29578", // Warm Terracotta/Yellow
    accent: "#FFDDD2",
    image: "/images/haldi-caricature.png",
    description: "The vibrant morning ritual of purification and love."
  },
  {
    id: "wedding",
    title: "Wedding",
    date: "6 Dec 2026",
    time: "4:00 PM",
    venue: "Hotel Natraj & Resort",
    color: "#60100B", // Royal Red
    accent: "#EAE2B7",
    image: "/images/wedding-caricature.png",
    description: "The grand ceremony where two souls become one."
  },
  {
    id: "reception",
    title: "Reception",
    date: "6 Dec 2026",
    time: "8:00 PM",
    venue: "Hotel Natraj & Resort",
    color: "#0D1B2A", // Midnight Blue
    accent: "#E0E1DD",
    image: "/images/reception-caricature.png",
    description: "A night of celebration, dining, and dancing."
  }
]

export default function PopUpBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  // Handle Swipe
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
    const swipe = offset.x
    if (swipe < -50 && currentPage < events.length - 1) {
      nextPage()
    } else if (swipe > 50 && currentPage > 0) {
      prevPage()
    }
  }

  const nextPage = () => {
    if (currentPage < events.length - 1 && !isFlipping) {
      setIsFlipping(true)
      setCurrentPage(prev => prev + 1)
      setTimeout(() => setIsFlipping(false), 800)
    }
  }

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true)
      setCurrentPage(prev => prev - 1)
      setTimeout(() => setIsFlipping(false), 800)
    }
  }

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#050505] flex items-center justify-center overflow-hidden py-20 z-20">
      
      {/* Background glow matching current event */}
      <motion.div 
        className="absolute inset-0 opacity-20 transition-colors duration-1000 blur-3xl"
        style={{ backgroundColor: events[currentPage].color }}
      />

      <div className="text-center absolute top-10 md:top-20 w-full z-30">
        <h2 className="font-serif text-3xl md:text-5xl text-white font-light italic">
          The Festivities
        </h2>
        <p className="font-sans text-white/50 text-xs tracking-widest uppercase mt-2">
          Swipe to explore
        </p>
      </div>

      {/* The Book Container */}
      <div 
        className="relative w-[90vw] max-w-[420px] h-[75vh] min-h-[600px] md:h-[750px] touch-none"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {events.map((event, index) => {
            const isCurrent = index === currentPage
            const isPast = index < currentPage
            
            return (
              <motion.div
                key={event.id}
                className="absolute inset-0 w-full h-full origin-left rounded-2xl shadow-2xl border border-white/10"
                initial={false}
                animate={{
                  rotateY: isPast ? -180 : 0,
                  zIndex: isCurrent ? 10 : isPast ? index : events.length - index,
                  opacity: isPast && index < currentPage - 1 ? 0 : 1 // Hide deeply past pages
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.64, 0.04, 0.35, 1] // Elegant book page turn ease
                }}
                style={{
                  backgroundColor: event.color,
                  backfaceVisibility: "hidden", // Hide back of page when turned
                }}
              >
                {/* Book Page Content */}
                <div className="w-full h-full p-6 md:p-8 flex flex-col relative overflow-hidden">
                  
                  {/* Subtle texture/pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0 1px, transparent 1px), radial-gradient(circle at 70% 40%, rgba(255,255,255,0.18) 0 1px, transparent 1px)",
                      backgroundSize: "28px 28px, 42px 42px",
                    }}
                  />

                  {/* Top Details (Takes up natural space) */}
                  <div className="relative z-10 flex-shrink-0 mb-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isCurrent ? 1 : 0, y: isCurrent ? 0 : 20 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <span className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2 block" style={{ color: event.accent }}>
                        Event {index + 1} of {events.length}
                      </span>
                      <h3 className="font-serif text-4xl md:text-5xl text-white font-light mb-2">
                        {event.title}
                      </h3>
                      <p className="font-serif text-xl md:text-2xl italic text-white/80 line-clamp-2">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Pop-Up Caricature Area (Fills remaining space cleanly) */}
                  <div className="relative flex-1 flex flex-col justify-end items-center z-20 min-h-0 mb-6">
                    <motion.div
                      className="origin-bottom w-full h-full flex justify-center items-end"
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ 
                        rotateX: isCurrent ? 0 : 90, 
                        opacity: isCurrent ? 1 : 0,
                        scale: isCurrent ? 1 : 0.8
                      }}
                      transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                      {event.image ? (
                        <img 
                          src={event.image} 
                          alt={`${event.title} Caricature`}
                          className="max-h-full max-w-[300px] w-auto drop-shadow-2xl object-contain pointer-events-none"
                          style={{ filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.5))' }}
                        />
                      ) : (
                        <div className="w-full max-w-[280px] aspect-[3/4] bg-white/10 rounded-xl border border-white/20 flex items-center justify-center backdrop-blur-md">
                          <p className="font-sans text-xs tracking-widest text-white/50 text-center px-4">IMAGE COMING SOON</p>
                        </div>
                      )}
                    </motion.div>
                    
                    {/* Shadow underneath pop-up */}
                    <motion.div 
                      className="w-[200px] h-[10px] bg-black/40 blur-md rounded-full mt-[-10px] flex-shrink-0"
                      animate={{ opacity: isCurrent ? 1 : 0, scale: isCurrent ? 1 : 0.5 }}
                      transition={{ delay: 0.4 }}
                    />
                  </div>

                  {/* Bottom Details Container (Stays safely at the bottom) */}
                  <div className="relative z-30 flex-shrink-0">
                    <motion.div 
                      className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isCurrent ? 1 : 0, y: isCurrent ? 0 : 20 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="font-sans text-[10px] tracking-widest text-white/50 uppercase mb-0.5">Date & Time</p>
                          <p className="font-serif text-lg text-white">{event.date} <span className="mx-2 text-white/50">|</span> <span className="font-sans text-base text-white/80">{event.time}</span></p>
                        </div>
                        <div>
                          <p className="font-sans text-[10px] tracking-widest text-white/50 uppercase mb-0.5">Venue</p>
                          <p className="font-serif text-lg text-white leading-tight">{event.venue}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Navigation Controls (Desktop) */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-6 z-30 pointer-events-none">
        <button 
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`pointer-events-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all ${currentPage === 0 ? 'opacity-30' : 'opacity-100 hover:bg-white/10'}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={nextPage}
          disabled={currentPage === events.length - 1}
          className={`pointer-events-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all ${currentPage === events.length - 1 ? 'opacity-30' : 'opacity-100 hover:bg-white/10'}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

    </section>
  )
}
