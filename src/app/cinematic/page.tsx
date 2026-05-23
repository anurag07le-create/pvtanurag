"use client"

import React, { useEffect, useState } from 'react'
import LenisProvider from '@/components/cinematic/LenisProvider'
import Hero from '@/components/cinematic/Hero'
import Countdown from '@/components/cinematic/Countdown'
import Story from '@/components/cinematic/Story'
import Gallery from '@/components/cinematic/Gallery'
import PopUpBook from '@/components/cinematic/PopUpBook'
import SaptapadiSection from '@/components/cinematic/SaptapadiSection'
import Rsvp from '@/components/cinematic/Rsvp'
import Footer from '@/components/cinematic/Footer'
import Cursor from '@/components/cinematic/Cursor'
import Loader from '@/components/cinematic/Loader'
import AudioPlayer from '@/components/cinematic/AudioPlayer'

export default function CinematicPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = '#050505'
    document.documentElement.style.backgroundColor = '#050505'
    return () => {
      document.body.style.backgroundColor = ''
      document.documentElement.style.backgroundColor = ''
    }
  }, [])

  return (
    <LenisProvider>
      <main className="bg-[#050505] text-[#f5f5f5] min-h-[100dvh] font-sans selection:bg-white selection:text-black">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@200;300;400&display=swap');
          
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          
          html, body {
            background-color: #050505;
            -webkit-tap-highlight-color: transparent;
            -webkit-text-size-adjust: 100%;
          }
          
          /* Hide cursor only on desktop */
          @media (hover: hover) and (pointer: fine) {
            html, body, a, button, input { cursor: none; }
          }
        `}} />

        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

        <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Cursor />
          <AudioPlayer />
          <Hero />
          <Countdown />
          <Story />
          <Gallery />
          <PopUpBook />
          <SaptapadiSection />
          <Rsvp />
          <Footer />
        </div>

      </main>
    </LenisProvider>
  )
}
