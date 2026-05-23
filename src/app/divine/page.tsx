"use client"

import React, { useEffect, useState } from 'react'
import LenisProvider from '@/components/cinematic/LenisProvider'
import Cursor from '@/components/cinematic/Cursor'
import AudioPlayer from '@/components/cinematic/AudioPlayer'

// Divine Components
import DivineLoader from '@/components/divine/DivineLoader'
import KailashHero from '@/components/divine/KailashHero'
import ParvatiAwakening from '@/components/divine/ParvatiAwakening'
import ArdhanarishvaraEvents from '@/components/divine/ArdhanarishvaraEvents'
import CosmicSaptapadi from '@/components/divine/CosmicSaptapadi'
import DivineRsvp from '@/components/divine/DivineRsvp'

export default function DivineRoute() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Force strict dark mode for this entire route
  useEffect(() => {
    document.body.style.backgroundColor = '#020101'
    document.documentElement.style.backgroundColor = '#020101'
    return () => {
      document.body.style.backgroundColor = ''
      document.documentElement.style.backgroundColor = ''
    }
  }, [])

  return (
    <LenisProvider>
      <main className="bg-[#020101] text-[#f5f5f5] min-h-[100dvh] font-sans selection:bg-[#ffcda3] selection:text-black">
        {/* We use Cinzel or a similar high-end serif for the divine feel */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@200;300;400&display=swap');
          
          .font-serif { font-family: 'Cinzel', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          
          html, body {
            background-color: #020101;
            -webkit-tap-highlight-color: transparent;
            -webkit-text-size-adjust: 100%;
          }
          
          /* Hide cursor only on desktop */
          @media (hover: hover) and (pointer: fine) {
            html, body, a, button, input { cursor: none; }
          }
        `}} />

        {!isLoaded && <DivineLoader onComplete={() => setIsLoaded(true)} />}

        <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Cursor />
          <AudioPlayer />
          
          {/* The Journey */}
          <KailashHero />
          <ParvatiAwakening />
          <ArdhanarishvaraEvents />
          <CosmicSaptapadi />
          <DivineRsvp />
        </div>

      </main>
    </LenisProvider>
  )
}
