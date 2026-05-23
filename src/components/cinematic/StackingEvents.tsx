"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const events = [
  {
    id: "mehandi",
    title: "Mehandi",
    date: "5 Dec 2026",
    time: "10:00 AM",
    venue: "Hotel Natraj & Resort",
    color: "#1a1f1b", // Subtle dark green
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
    color: "#1c1414", // Subtle dark maroon
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
    color: "#1f1814", // Subtle dark terracotta
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
    color: "#1a0d0c", // Subtle deep red
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
    color: "#080c12", // Subtle midnight blue
    accent: "#E0E1DD",
    image: "/images/reception-caricature.png",
    description: "A night of celebration, dining, and dancing."
  }
]

const Card = ({ event, index, total }: { event: typeof events[0], index: number, total: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  })

  // The card scales down and fades slightly as the NEXT card scrolls over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "5%"])

  return (
    <div 
      ref={cardRef} 
      className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-12"
      style={{ zIndex: index + 1 }}
    >
      <motion.div 
        style={{ 
          backgroundColor: event.color,
          scale,
          opacity,
          y: yOffset
        }}
        className="relative w-full max-w-6xl h-full max-h-[90vh] md:max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5"
      >
        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Content Side */}
        <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-8 overflow-hidden">
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4" 
              style={{ color: event.accent }}
            >
              Event 0{index + 1}
            </motion.p>
            <motion.h2 
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl text-white font-light"
            >
              {event.title}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <p className="font-serif text-xl md:text-2xl italic text-white/80 max-w-md">
              "{event.description}"
            </p>

            <div className="h-[1px] w-12 bg-white/20 my-2" />

            <div>
              <p className="font-sans text-[10px] tracking-widest text-white/40 uppercase mb-1">Date & Time</p>
              <p className="font-serif text-2xl text-white">{event.date} <span className="mx-2 text-white/30">|</span> <span className="text-white/80">{event.time}</span></p>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-widest text-white/40 uppercase mb-1">Venue</p>
              <a 
                href="https://maps.app.goo.gl/bhebNmonJSe1KHay5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-serif text-2xl text-white hover:text-[#DAA520] transition-colors inline-flex items-center gap-2 group"
              >
                {event.venue}
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Image Side */}
        <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="w-full h-full flex items-center justify-center"
          >
            {event.image ? (
              <img 
                src={event.image} 
                alt={`${event.title} Caricature`}
                className="max-h-full max-w-[80%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              />
            ) : (
              <div className="w-64 h-80 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <p className="font-sans text-xs tracking-widest text-white/30">IMAGE SOON</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function StackingEvents() {
  return (
    <section className="relative w-full bg-[#050505] z-30 pb-[10vh]">
      <div className="text-center pt-32 pb-16 sticky top-0 z-0">
        <h2 className="font-serif text-4xl md:text-6xl text-white font-light italic">
          The Festivities
        </h2>
        <p className="font-sans text-white/50 text-xs tracking-[0.3em] uppercase mt-4">
          Scroll to explore
        </p>
      </div>
      
      <div className="relative">
        {events.map((event, index) => (
          <Card key={event.id} event={event} index={index} total={events.length} />
        ))}
      </div>
    </section>
  )
}
