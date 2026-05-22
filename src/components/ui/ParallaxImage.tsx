"use client"
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface ParallaxImageProps {
  bgSrc: string
  cutoutSrc: string
  className?: string
  alt?: string
}

export default function ParallaxImage({ bgSrc, cutoutSrc, className = "", alt = "Couple" }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)
  const cutoutRef = useRef<HTMLImageElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !bgRef.current || !cutoutRef.current || !fgRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    })

    // Background moves slowly
    tl.fromTo(bgRef.current, 
      { y: -30, scale: 1.1 },
      { y: 30, ease: "none" },
      0
    )

    // Cutout moves faster, creating 3D pop
    tl.fromTo(cutoutRef.current,
      { y: 50, scale: 1.15 },
      { y: -30, ease: "none" },
      0
    )

    // Foreground particles/light moves fastest
    tl.fromTo(fgRef.current,
      { y: 80 },
      { y: -80, ease: "none" },
      0
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden rounded-md border-2 border-gold shadow-lg ${className}`}
    >
      {/* Background Layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        ref={bgRef}
        src={bgSrc} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover z-0 origin-center"
      />
      
      {/* Cutout Layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        ref={cutoutRef}
        src={cutoutSrc} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover z-10 origin-bottom drop-shadow-2xl"
      />

      {/* Foreground Overlay (Dust/Light) */}
      <div 
        ref={fgRef}
        className="absolute inset-[-20%] z-20 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(212,160,23,0.4) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  )
}
