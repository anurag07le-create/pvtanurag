"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const timelineEvents = [
  {
    id: 1,
    title: "The Families Met",
    text: "Two families, one beautiful connection. When it's meant to be, everything falls into place.",
    date: "2026",
    image: "/images/photo1.jpeg"
  },
  {
    id: 2,
    title: "They Said Yes",
    text: "15th April: the day both hearts agreed. A simple yes that changed everything forever.",
    date: "15 APR",
    image: "/images/photo2.jpeg"
  },
  {
    id: 3,
    title: "The Date Was Fixed",
    text: "10th May: it became official. The stars aligned, and the countdown to forever began.",
    date: "10 MAY",
    image: "/images/photo4.jpeg"
  },
  {
    id: 4,
    title: "The Celebration Awaits",
    text: "6th December: two families become one. You are invited to witness this beautiful beginning.",
    date: "06 DEC",
    image: "/images/photo5.jpeg"
  }
]

export default function ElegantStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Background Parallax for the Sanskrit text
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#0A1A2F]">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden">
        
        {/* Ambient glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen transform-gpu z-0" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 80%)' }}
        />

        {/* Sanskrit Parallax Background */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03] pointer-events-none select-none z-0 transform-gpu"
          style={{ y: backgroundY, willChange: 'transform' }}
        >
          <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap text-[#d4af37]">
            मंगलम् भगवान विष्णुः
          </h1>
          <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap ml-[20vw] text-[#d4af37]">
            मंगलम् गरुड़ध्वजः
          </h1>
          <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap mr-[20vw] text-[#d4af37]">
            मंगलम् पुण्डरीकाक्षः
          </h1>
          <h1 className="font-cinzel text-[15vw] md:text-[10vw] leading-[0.8] whitespace-nowrap text-[#d4af37]">
            मंगलाय तनो हरिः
          </h1>
        </motion.div>

        {/* Left Side: Sticky Ornate Frame */}
        <div className="w-full h-[55vh] md:h-screen md:w-1/2 flex items-center justify-center relative p-4 md:p-12 z-10 pt-20 md:pt-12">
           <div className="relative w-[70vw] max-w-[320px] md:max-w-[450px] aspect-[3/4] border-[6px] md:border-[10px] border-[#d4af37]/40 rounded-t-full shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden">
              {/* Inner golden border for luxury detail */}
              <div className="absolute inset-2 md:inset-3 border-[1px] md:border-[2px] border-[#d4af37] rounded-t-[900px] z-20 pointer-events-none mix-blend-overlay opacity-80" />
              
              {/* Corner Ornaments (CSS pseudo-elements via tailwind classes) */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37] z-20 opacity-50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37] z-20 opacity-50" />
              
              {timelineEvents.map((event, index) => {
                 const step = 1 / timelineEvents.length;
                 const start = index * step;
                 const end = (index + 1) * step;
                 // Smooth fade in and fade out mapping
                 const opacity = useTransform(scrollYProgress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0, 1, 1, 0])
                 const scale = useTransform(scrollYProgress, [start, end], [1, 1.1])
                 
                 return (
                   <motion.img 
                     key={`img-${event.id}`}
                     src={event.image}
                     alt={event.title}
                     className="absolute inset-0 w-full h-full object-cover"
                     style={{ opacity, scale, willChange: 'opacity, transform' }}
                   />
                 )
              })}
           </div>
        </div>

        {/* Right Side: Scrolling Text Container */}
        <div className="w-full h-[45vh] md:h-screen md:w-1/2 relative overflow-hidden flex items-start md:items-center justify-center z-10">
            {timelineEvents.map((event, index) => {
                 const step = 1 / timelineEvents.length;
                 const start = index * step;
                 const end = (index + 1) * step;
                 
                 // Text slides up significantly faster for a noticeable parallax effect
                 const y = useTransform(scrollYProgress, [start, end], ["30vh", "-30vh"])
                 const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0])
                 const blur = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"])
                 
                 return (
                    <motion.div 
                      key={`text-${event.id}`}
                      className="absolute w-full max-w-sm px-6 text-center md:text-left flex flex-col justify-center"
                      style={{ y, opacity, filter: blur, willChange: 'opacity, transform, filter' }}
                    >
                       <span className="font-montserrat text-[#d4af37] font-bold text-[10px] md:text-sm tracking-[0.3em] uppercase mb-3 block">
                         {event.date}
                       </span>
                       <h3 className="font-cinzel text-3xl md:text-5xl text-white mb-4 drop-shadow-md leading-tight">
                         {event.title}
                       </h3>
                       <p className="font-montserrat text-white/60 text-sm md:text-base font-light leading-relaxed">
                         {event.text}
                       </p>
                    </motion.div>
                 )
            })}
        </div>

      </div>
    </section>
  )
}
