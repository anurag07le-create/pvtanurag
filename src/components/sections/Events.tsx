"use client"
import React from 'react'
import { CONFIG } from '@/lib/config'
import { DiyaRow } from '@/components/ui/Ornaments'
import { MapPin } from 'lucide-react'

export default function Events() {
  const events = [
    {
      title: "Mehendi & Sangeet",
      titleHi: "मेहंदी और संगीत",
      icon: "🌺",
      tagline: "Rang lagao, nacho, gaao!",
      details: CONFIG.mehendi
    },
    {
      title: "Wedding (Vivah)",
      titleHi: "विवाह",
      icon: "💍",
      tagline: "Saat phere, saat vachan.",
      details: CONFIG.wedding
    },
    {
      title: "Reception",
      titleHi: "रिसेप्शन",
      icon: "✨",
      tagline: "Jashn manao, pyaar baato!",
      details: CONFIG.reception
    }
  ]

  return (
    <section id="events" className="py-24 px-4 min-h-screen bg-ivory/50">
      
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <DiyaRow className="mb-12" />
        
        <h2 className="text-4xl md:text-5xl text-deep-red mb-16 text-center">Shaadi ki Rasme <span className="text-2xl md:text-3xl text-gold block mt-2">शादी की रस्में</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {events.map((event, i) => (
            <div key={i} className="group relative bg-ivory border border-gold rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_10px_30px_rgba(212,160,23,0.2)]">
              {/* Top Accent Strip */}
              <div className="h-2 w-full bg-deep-red" />
              
              <div className="p-8 flex flex-col h-full">
                <div className="text-5xl text-center mb-6">{event.icon}</div>
                
                <h3 className="text-2xl text-deep-red font-semibold text-center mb-1">{event.title}</h3>
                <h4 className="text-lg text-gold font-medium text-center mb-6">{event.titleHi}</h4>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 justify-center text-maroon font-medium">
                    <span>📅</span>
                    <span>{event.details.date}</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center text-maroon font-medium">
                    <span>⏰</span>
                    <span>{event.details.time}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-4 text-center">
                    <MapPin className="text-deep-red w-5 h-5" />
                    <span className="font-semibold text-dark-text">{event.details.venue}</span>
                    <span className="text-sm text-dark-text/70">{event.details.address}</span>
                  </div>
                </div>

                <div className="border-t border-gold/30 pt-6 mt-auto">
                  <p className="text-center italic text-maroon mb-6">"{event.tagline}"</p>
                  
                  <a 
                    href={CONFIG.mapLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-ivory text-deep-red border border-deep-red rounded-full text-center font-semibold hover:bg-deep-red hover:text-ivory transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
