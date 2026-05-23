"use client"
import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const textY = useTransform(scrollY, [0, 1000], [0, 400])
  const coupleY = useTransform(scrollY, [0, 1000], [0, 150])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [gyroPermission, setGyroPermission] = useState(false)

  useEffect(() => {
    const mobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsMobile(mobile)

    if (mobile) {
      // Request gyroscope permission on iOS 13+
      const requestPermission = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          try {
            const response = await (DeviceOrientationEvent as any).requestPermission()
            if (response === 'granted') setGyroPermission(true)
          } catch {
            // Permission denied, that's ok
          }
        } else {
          // Android or older iOS — permission not needed
          setGyroPermission(true)
        }
      }
      
      // Try silently first, will request on first tap if needed
      requestPermission()
    }
  }, [])

  // Gyroscope handler for mobile
  useEffect(() => {
    if (!isMobile || !gyroPermission) return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma || 0 // left-right tilt (-90 to 90)
      const beta = e.beta || 0   // front-back tilt (-180 to 180)
      
      setTilt({
        x: Math.max(-30, Math.min(30, gamma * 0.8)),
        y: Math.max(-30, Math.min(30, (beta - 45) * 0.5)) // offset because phone is held at ~45deg
      })
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [isMobile, gyroPermission])

  // Mouse handler for desktop
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Request gyro permission on first tap (iOS requirement)
  const handleTap = async () => {
    if (isMobile && !gyroPermission) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const response = await (DeviceOrientationEvent as any).requestPermission()
          if (response === 'granted') setGyroPermission(true)
        } catch {
          // silent fail
        }
      }
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[150vh] bg-[#050505] overflow-hidden"
      onClick={handleTap}
    >
      
      {/* Ambient Deep Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,40,40,0.4)_0%,#050505_80%)] z-0" />

      {/* Film Grain Overlay */}
      <div 
        className="fixed inset-0 z-[90] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <motion.div 
        className="sticky top-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity }}
      >
        
        {/* BACKGROUND LAYER (GIANT TYPOGRAPHY) */}
        <motion.div 
          className="absolute top-[8%] md:top-[12%] z-10 w-full text-center flex flex-col items-center justify-center"
          style={{ 
            y: textY,
            x: -tilt.x * 0.5,
          }}
        >
          <h1 className="font-serif text-[24vw] md:text-[16vw] leading-[0.8] text-white/10 font-bold tracking-tighter whitespace-nowrap select-none">
            FOREVER
          </h1>
          <h1 className="font-serif text-[24vw] md:text-[16vw] leading-[0.8] text-white/10 font-bold tracking-tighter whitespace-nowrap select-none italic">
            ALWAYS
          </h1>
        </motion.div>

        {/* FOREGROUND LAYER (BACKGROUND REMOVED COUPLE) */}
        <motion.div 
          className="absolute bottom-0 w-full max-w-none md:max-w-4xl h-[95vh] md:h-[80vh] z-20 flex justify-center pointer-events-none"
          style={{ 
            y: coupleY,
            x: tilt.x,
          }}
        >
          <motion.img 
            src="/images/photo3-nobg.png"
            alt="Vandana and Sagar"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>

        {/* MIDDLE TEXT LAYER */}
        <div className="relative z-30 text-center px-4 mt-[15vh] md:mt-[20vh] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <span className="text-gray-300 font-sans tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] md:text-sm block mb-3 md:mb-4">
              A Celebration of Love
            </span>
          </motion.div>
          
          <motion.h2 
            className="font-serif text-[12vw] md:text-8xl text-white font-light tracking-tight leading-none mix-blend-difference"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.8 }}
          >
            Vandana & Sagar
          </motion.h2>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute bottom-8 md:bottom-10 z-40 flex flex-col items-center pointer-events-none"
        >
          <p className="font-sans text-[9px] md:text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-3 md:mb-4">
            Scroll
          </p>
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/50 to-transparent origin-top animate-pulse" />
        </motion.div>

      </motion.div>
    </div>
  )
}
