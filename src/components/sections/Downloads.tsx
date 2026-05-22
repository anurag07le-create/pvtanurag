"use client"
import React from 'react'
import { Download } from 'lucide-react'

export default function Downloads() {
  const cards = [
    {
      title: "4 Days to Go 💍",
      file: "/countdown-cards/4days.jpg",
      bgClass: "bg-deep-red",
      textClass: "text-gold"
    },
    {
      title: "3 Days to Go 🌸",
      file: "/countdown-cards/3days.jpg",
      bgClass: "bg-blush-pink",
      textClass: "text-maroon"
    },
    {
      title: "2 Days to Go 🎊",
      file: "/countdown-cards/2days.jpg",
      bgClass: "bg-ivory",
      textClass: "text-gold"
    },
    {
      title: "Kal Hai Shaadi! 🥳",
      file: "/countdown-cards/1day.jpg",
      bgClass: "bg-gold",
      textClass: "text-deep-red"
    }
  ]

  const handleDownload = (file: string, name: string) => {
    // Note: Developer needs to add real images to public/countdown-cards/
    const link = document.createElement('a')
    link.href = file
    link.download = `Sagar-Vandana-${name}.jpg`
    link.click()
  }

  return (
    <section id="downloads" className="py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl text-deep-red mb-4 text-center">Shaadi ka Countdown <span className="text-2xl md:text-3xl text-gold block mt-2">शादी का काउंटडाउन</span></h2>
        
        <p className="text-lg text-maroon font-medium italic mb-16 text-center max-w-2xl">
          "Download karo aur share karo apne stories pe!"
          <span className="block mt-1 text-sm font-poppins not-italic">Download our countdown cards for your Instagram/WhatsApp stories!</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {cards.map((card, i) => (
            <div key={i} className="flex flex-col items-center group">
              
              {/* Preview Thumbnail (16:9 crop of 9:16) */}
              <div className={`w-full aspect-[9/16] ${card.bgClass} rounded-2xl border-4 border-gold/30 shadow-lg mb-6 overflow-hidden relative group-hover:scale-[1.02] group-hover:border-gold transition-all duration-300 flex items-center justify-center`}>
                <p className={`font-playfair text-2xl text-center px-4 ${card.textClass}`}>
                  {card.title}
                  <span className="block text-xs font-poppins mt-4 opacity-70">Placeholder Image</span>
                </p>
              </div>

              <h3 className="font-playfair text-xl text-deep-red mb-1 text-center">{card.title}</h3>
              <p className="text-xs text-dark-text/70 mb-4 text-center">Instagram Story / WhatsApp Status</p>

              <button 
                onClick={() => handleDownload(card.file, card.title.replace(/[^a-zA-Z0-9]/g, ''))}
                className="flex items-center gap-2 bg-deep-red text-ivory px-6 py-2 rounded-full border border-gold hover:bg-maroon hover:shadow-md transition-all active:scale-95"
              >
                <Download size={18} />
                <span className="font-medium text-sm">Download</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
