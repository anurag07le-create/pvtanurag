import React from 'react'
import GlassEngine from '@/components/ignite/GlassEngine'

export const metadata = {
  title: 'Sagar & Vandana | The Union',
  description: 'Ignite to reveal.',
}

export default function IgniteRoute() {
  return (
    <main className="bg-black min-h-[100dvh] text-white font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&family=Inter:wght@200;300;400&display=swap');
        
        /* Using Cinzel for a very cinematic, Marvel-movie/Luxury vibe */
        .font-cinzel { font-family: 'Cinzel', serif; }
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
          touch-action: none;
        }
      `}} />
      
      <GlassEngine />
    </main>
  )
}
