"use client"
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      
      const isEven = i % 2 === 0
      
      gsap.fromTo(card,
        { x: isEven ? -80 : 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      )
    })
  }, [])

  const milestones = [
    {
      title: "Rishtey ki Baat",
      titleHi: "रिश्ते की बात",
      month: "August 2025",
      desc: "Dono parivaron mein pehli baar baat hui. Buzurgon ne socha, yeh rishta ho sakta hai...",
      icon: "🤝"
    },
    {
      title: "Kundali Mili",
      titleHi: "कुंडली मिली",
      month: "September 2025",
      desc: "Panditji ne dekha aur kaha — yeh jodi toh upar se bani hai.",
      icon: "⭐"
    },
    {
      title: "Pehli Mulaqat",
      titleHi: "पहली मुलाकात",
      month: "October 2025",
      desc: "Sagar aur Vandana pehli baar mile — dono parivaron ke saath, chai ki pyaali pe... aur haan bol diya.",
      icon: "☕"
    },
    {
      title: "Roka / Sagai",
      titleHi: "रोका / सगाई",
      month: "December 2025",
      desc: "Dono parivaron ne mil ke tay kiya — ab yeh bandhan pakka hai.",
      icon: "💍"
    },
    {
      title: "Shaadi ki Tayaari",
      titleHi: "शादी की तैयारी",
      month: "Current",
      desc: "Ghar saja, mehendi aai, aur shahnai ki awaaz door door tak pahunchi... ab bas ek din aur!",
      icon: "🌸"
    }
  ]

  return (
    <section id="journey" ref={sectionRef} className="py-24 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-deep-red mb-4">Kismat ka Milap <span className="text-2xl md:text-3xl text-gold block mt-2">किस्मत का मिलाप</span></h2>
        <p className="text-lg text-maroon italic">"Yeh shaadi sirf do logon ki nahi, do parivaron ki bhi hai."</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Center Line Desktop */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gold/50 md:-translate-x-1/2" />

        <div className="space-y-12">
          {milestones.map((milestone, i) => {
            const isEven = i % 2 === 0
            
            return (
              <div 
                key={i}
                ref={el => { cardsRef.current[i] = el }}
                className={`relative flex flex-col md:flex-row gap-8 md:justify-between items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 w-8 h-8 rounded-full bg-ivory border-4 border-gold -translate-x-1/2 flex items-center justify-center z-10 shadow-md">
                  <span className="text-xs">{milestone.icon}</span>
                </div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block md:w-5/12" />

                {/* Card Content */}
                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                  <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-gold shadow-lg hover:shadow-xl transition-shadow ${!isEven ? 'md:border-l-0 md:border-r-4 md:text-right' : ''}`}>
                    <div className={`inline-block px-4 py-1 rounded-full bg-deep-red text-ivory text-xs font-semibold tracking-wider mb-4 shadow-sm`}>
                      {milestone.month}
                    </div>
                    
                    <h3 className="text-2xl text-deep-red mb-1 font-semibold">{milestone.title}</h3>
                    <h4 className="text-lg text-gold mb-3 font-medium">{milestone.titleHi}</h4>
                    
                    <p className="text-dark-text/80 text-sm leading-relaxed mb-4">
                      {milestone.desc}
                    </p>
                    
                    {/* Placeholder for real images when they are added to public/photos/ */}
                    <div className="w-full h-40 bg-gold/10 rounded-lg flex items-center justify-center overflow-hidden border border-gold/20 relative group">
                      <div className="absolute inset-0 bg-deep-red/10 group-hover:bg-transparent transition-colors z-10" />
                      <span className="text-4xl z-0">{milestone.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
