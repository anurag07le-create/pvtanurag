import React from 'react'
import AgniKund from '@/components/saptapadi/AgniKund'

export const metadata = {
  title: 'The Seven Pheras | Vandana & Sagar',
  description: 'The sacred vows of marriage.',
}

export default function SaptapadiPage() {
  return (
    <main className="bg-[#020101] min-h-[100dvh] text-white selection:bg-[#ff6b00] selection:text-black font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        
        html, body {
          background-color: #020101;
          margin: 0;
          padding: 0;
          overscroll-behavior-y: none; /* Prevent pull-to-refresh on mobile dragging */
          touch-action: none; /* Prevent all browser handling of touch gestures */
        }
      `}} />
      
      <AgniKund />
    </main>
  )
}
