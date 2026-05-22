"use client"
import React, { useRef, useState } from 'react'
import ParallaxImage from '@/components/ui/ParallaxImage'
import Lightbox from '@/components/ui/Lightbox'

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImg, setCurrentImg] = useState("")
  const [currentTitle, setCurrentTitle] = useState("")

  const openLightbox = (src: string, title: string) => {
    setCurrentImg(src)
    setCurrentTitle(title)
    setLightboxOpen(true)
  }

  return (
    <section id="gallery" className="py-24 px-4 min-h-screen bg-off-white/50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-deep-red mb-4">Hamare Pal <span className="text-2xl md:text-3xl text-gold block mt-2">हमारे पल</span></h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Placeholder images. ParallaxImage creates 3D depth by separating background and cutout */}
        <div className="cursor-pointer group" onClick={() => openLightbox('https://placehold.co/800x1200/FDF6EC/8B0000?text=Couple', 'Sagar & Vandana')}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <ParallaxImage 
              bgSrc="https://placehold.co/800x1200/F2C4CE/F2C4CE" 
              cutoutSrc="https://placehold.co/800x1200/transparent/8B0000?text=V+&+S"
              className="w-full h-full"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-ivory font-playfair text-xl">Sagar & Vandana</p>
              <p className="text-gold text-sm font-poppins">हमेशा के लिए</p>
            </div>
          </div>
        </div>

        <div className="cursor-pointer group" onClick={() => openLightbox('https://placehold.co/1200x800/FDF6EC/8B0000?text=Memories', 'Our Beautiful Moments')}>
          <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-xl lg:mt-12">
            <ParallaxImage 
              bgSrc="https://placehold.co/800x800/D4A017/D4A017" 
              cutoutSrc="https://placehold.co/800x800/transparent/FDF6EC?text=Moments"
              className="w-full h-full"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-ivory font-playfair text-xl">Our Beautiful Moments</p>
            </div>
          </div>
        </div>

        <div className="cursor-pointer group" onClick={() => openLightbox('https://placehold.co/800x1200/FDF6EC/8B0000?text=Love', 'A New Beginning')}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <ParallaxImage 
              bgSrc="https://placehold.co/800x1200/6D0F0F/6D0F0F" 
              cutoutSrc="https://placehold.co/800x1200/transparent/FDF6EC?text=Love"
              className="w-full h-full"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-ivory font-playfair text-xl">A New Beginning</p>
              <p className="text-gold text-sm font-poppins">नई शुरुआत</p>
            </div>
          </div>
        </div>

      </div>

      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        imageSrc={currentImg} 
        title={currentTitle} 
      />
    </section>
  )
}
