"use client"

import React, { useEffect, useState } from 'react'
import LenisProvider from '@/components/cinematic/LenisProvider'
import Hero from '@/components/cinematic/Hero'
import Story from '@/components/cinematic/Story'
import Gallery from '@/components/cinematic/Gallery'
import Rsvp from '@/components/cinematic/Rsvp'
import Cursor from '@/components/cinematic/Cursor'
import Loader from '@/components/cinematic/Loader'
import AudioPlayer from '@/components/cinematic/AudioPlayer'

export default function CinematicPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Ensure the body has the dark background for this route specifically
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
      <main className="bg-[#050505] text-[#f5f5f5] min-h-screen font-sans selection:bg-white selection:text-black">
        {/* Load elegant fonts */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@200;300;400&display=swap');
          
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          
          html, body {
            background-color: #050505;
            cursor: none;
          }
          /* Ensure clickable elements also hide default cursor */
          a, button, input { cursor: none; }
        `}} />

        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

        <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Cursor />
          <AudioPlayer />
          <Hero />
          <Story />
          <Gallery />
          <Rsvp />
        </div>

      </main>
    </LenisProvider>
  )
}
