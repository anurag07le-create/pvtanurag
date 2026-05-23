"use client"
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const events = [
  {
    id: 'mehandi',
    title: 'Mehandi',
    date: '5th December 2026',
    time: '10:00 AM',
    desc: 'Kickstarting the festivities with colors, music, and joy.',
    mapUrl: 'https://maps.app.goo.gl/bhebNmonJSe1KHay5'
  },
  {
    id: 'behrana',
    title: 'Behrana',
    date: '5th December 2026',
    time: '8:00 PM',
    desc: 'A divine evening of prayers and traditional blessings.',
    mapUrl: 'https://maps.app.goo.gl/bhebNmonJSe1KHay5'
  },
  {
    id: 'haldi',
    title: 'Haldi',
    date: '6th December 2026',
    time: '10:00 AM',
    desc: 'The vibrant morning ritual of purification and love.',
    mapUrl: 'https://maps.app.goo.gl/bhebNmonJSe1KHay5'
  },
  {
    id: 'wedding',
    title: 'The Wedding',
    date: '6th December 2026',
    time: '4:00 PM',
    desc: 'The grand ceremony where two souls become one.',
    mapUrl: 'https://maps.app.goo.gl/bhebNmonJSe1KHay5'
  },
  {
    id: 'reception',
    title: 'Reception',
    date: '6th December 2026',
    time: '8:00 PM',
    desc: 'A night of celebration, dining, and dancing.',
    mapUrl: 'https://maps.app.goo.gl/bhebNmonJSe1KHay5'
  }
]

export default function Itinerary() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // The glowing progress line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#050505] py-32 px-4 md:px-12 z-20 flex justify-center"
    >
      <div className="max-w-4xl w-full">
        
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-5xl md:text-7xl text-white font-light italic mb-4"
          >
            The Itinerary
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-white/40 tracking-[0.4em] text-xs uppercase"
          >
            Two Days of Magic
          </motion.p>
        </div>

        <div className="relative w-full pb-24">
          {/* Vertical Track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* Glowing Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-white via-white to-transparent -translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
          />

          {events.map((event, index) => {
            const isEven = index % 2 === 0
            return (
              <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse mb-24 last:mb-0 group cursor-none" data-cursor="hover">
                
                {/* Glowing Dot on the Line */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 shadow-[0_0_10px_#fff] z-10 transition-transform duration-500 group-hover:scale-150" />

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className={`w-[calc(100%-3rem)] md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg hover:bg-white/10 transition-colors duration-500 relative overflow-hidden">
                    
                    {/* Subtle sheer overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <span className="font-mono text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-4">
                      {event.date} | {event.time}
                    </span>
                    
                    <h3 className="font-serif text-3xl md:text-5xl text-white font-light italic mb-4">
                      {event.title}
                    </h3>
                    
                    <p className="font-sans text-gray-400 font-light text-sm leading-relaxed mb-8">
                      {event.desc}
                    </p>

                    <a 
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/20 px-6 py-2 rounded-full text-xs text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      View Map
                    </a>
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
