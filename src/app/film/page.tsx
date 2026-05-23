import React from 'react'
import AutoplaySequence from '@/components/film/AutoplaySequence'

export const metadata = {
  title: 'Sagar & Vandana | A Cinematic Sequence',
  description: 'Two lives. One beautiful sequence.',
}

export default function FilmRoute() {
  return (
    <main className="bg-black min-h-[100dvh] text-white font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@200;300;400&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* STRICTLY DISABLE SCROLLING */
        html, body {
          background-color: black;
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          -webkit-tap-highlight-color: transparent;
          touch-action: none; /* Disables swipe-to-scroll on mobile */
        }
      `}} />
      
      <AutoplaySequence />
    </main>
  )
}
