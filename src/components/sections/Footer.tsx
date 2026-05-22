"use client"
import React, { useState } from 'react'
import { CONFIG } from '@/lib/config'
import { MandalaSVG } from '@/components/ui/Ornaments'
import { Share2, Link as LinkIcon, Check } from 'lucide-react'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareText = `Sagar aur Vandana ki shaadi mein aao! 💍 ${typeof window !== 'undefined' ? window.location.href : ''}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  return (
    <section id="footer" className="py-16 px-4 bg-deep-red min-h-[50svh] flex flex-col items-center justify-between border-t-4 border-gold">
      
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto flex-grow justify-center">
        
        <MandalaSVG className="w-24 h-24 text-gold opacity-50 mb-8" />
        
        <h2 className="text-4xl md:text-5xl text-ivory font-playfair tracking-wide mb-4 text-center drop-shadow-md">
          {CONFIG.groomName} <span className="text-gold">💍</span> {CONFIG.brideName}
        </h2>
        
        <div className="flex items-center gap-3 text-light-gold font-medium tracking-wider mb-8">
          <span>{CONFIG.weddingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-gold/50">•</span>
          <span>{CONFIG.city}</span>
        </div>

        <p className="text-lg md:text-xl text-ivory/90 italic font-playfair mb-2 text-center">
          "Pyaar ki yeh daastaan abhi shuru hui hai..."
        </p>
        <p className="text-base md:text-lg text-gold font-medium mb-10 text-center">
          "प्यार की यह दास्तान अभी शुरू हुई है..."
        </p>

        <p className="text-sm text-ivory/70 tracking-widest uppercase mb-1">
          With love from both our families 🙏
        </p>
        <p className="text-sm text-ivory/70 mb-12">
          दोनों परिवारों की तरफ से ढेर सारा प्यार
        </p>

        {/* Share Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-6 rounded-full font-medium transition-colors"
          >
            <Share2 size={18} />
            <span>WhatsApp pe Share karo</span>
          </a>
          
          <button 
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 bg-ivory/10 hover:bg-ivory/20 text-ivory border border-gold/30 py-3 px-6 rounded-full font-medium transition-colors"
          >
            {copied ? <Check size={18} className="text-green-400" /> : <LinkIcon size={18} />}
            <span>{copied ? "Link copy ho gaya! ✓" : "Link Copy karo"}</span>
          </button>
        </div>

      </div>

    </section>
  )
}
