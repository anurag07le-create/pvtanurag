import React from 'react'
import Sandook from '@/components/vault/Sandook'

export const metadata = {
  title: 'The Heirloom Vault | Vandana & Sagar',
  description: 'A timeless legacy of love.',
}

export default function VaultPage() {
  return (
    <main className="bg-[#0a0604] min-h-[100dvh] text-white selection:bg-[#B8860B] selection:text-black font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        
        html, body {
          background-color: #0a0604;
          margin: 0;
          padding: 0;
          overscroll-behavior-y: none; /* Prevent pull-to-refresh on mobile dragging */
        }
      `}} />
      
      <Sandook />
    </main>
  )
}
