"use client"
import React, { useState } from 'react'
import { CONFIG } from '@/lib/config'
import { LotusCorner } from '@/components/ui/Ornaments'
import { Play } from 'lucide-react'

export default function Video() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="video" className="py-24 px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl text-deep-red mb-4 text-center">Hamara Safar <span className="text-2xl md:text-3xl text-gold block mt-2">हमारा सफ़र</span></h2>
        
        <div className="relative w-full aspect-video mt-12 bg-dark-text border-8 border-gold rounded-lg shadow-2xl overflow-hidden group">
          
          <LotusCorner className="absolute top-4 left-4 w-10 h-10 text-gold z-10" />
          <LotusCorner className="absolute top-4 right-4 w-10 h-10 text-gold rotate-90 z-10" />
          <LotusCorner className="absolute bottom-4 right-4 w-10 h-10 text-gold rotate-180 z-10" />
          <LotusCorner className="absolute bottom-4 left-4 w-10 h-10 text-gold -rotate-90 z-10" />

          {!isPlaying && (
            <div 
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-maroon/20 backdrop-blur-sm cursor-pointer hover:bg-maroon/10 transition-colors"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-20 h-20 bg-deep-red/90 rounded-full flex items-center justify-center border-2 border-gold shadow-lg group-hover:scale-110 transition-transform">
                <Play size={40} className="text-ivory ml-2" />
              </div>
              <p className="mt-6 text-ivory font-playfair text-2xl drop-shadow-md">Play Our Story</p>
            </div>
          )}

          {isPlaying && (
            <iframe 
              className="absolute inset-0 w-full h-full z-10"
              src={`https://www.youtube.com/embed/${CONFIG.youtubeVideoId}?autoplay=1`} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}
        </div>

        <p className="mt-12 text-lg text-maroon font-medium italic text-center max-w-2xl">
          "Yeh video hai unki kahani ka ek chhota sa hissa..."
          <span className="block mt-2 text-gold">यह video है उनकी कहानी का एक छोटा सा हिस्सा...</span>
        </p>

      </div>
    </section>
  )
}
