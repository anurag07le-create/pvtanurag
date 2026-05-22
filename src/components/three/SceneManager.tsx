"use client"
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import HeroScene from './scenes/HeroScene'
import JourneyScene from './scenes/JourneyScene'
import GalleryScene from './scenes/GalleryScene'
import EventsScene from './scenes/EventsScene'
import RsvpScene from './scenes/RsvpScene'

interface SceneManagerProps {
  scrollProgress: React.MutableRefObject<number>
}

export default function SceneManager({ scrollProgress }: SceneManagerProps) {
  // We'll manage the opacities of each scene based on scroll ranges
  const heroOpacity = useRef(1)
  const journeyOpacity = useRef(0)
  const galleryOpacity = useRef(0)
  const eventsOpacity = useRef(0)
  const rsvpOpacity = useRef(0)

  useFrame(() => {
    const p = scrollProgress.current

    // Smoothly interpolate opacities based on scroll progress ranges
    // Hero: 0 - 0.15
    heroOpacity.current = THREE.MathUtils.clamp(1 - (p / 0.15), 0, 1)
    
    // Journey: 0.12 - 0.40
    journeyOpacity.current = p > 0.12 && p < 0.42 
      ? THREE.MathUtils.clamp(p < 0.17 ? (p - 0.12) / 0.05 : p > 0.37 ? 1 - (p - 0.37) / 0.05 : 1, 0, 1) 
      : 0
      
    // Gallery: 0.37 - 0.60
    galleryOpacity.current = p > 0.37 && p < 0.62 
      ? THREE.MathUtils.clamp(p < 0.42 ? (p - 0.37) / 0.05 : p > 0.57 ? 1 - (p - 0.57) / 0.05 : 1, 0, 1) 
      : 0
      
    // Events: 0.57 - 0.75
    eventsOpacity.current = p > 0.57 && p < 0.77 
      ? THREE.MathUtils.clamp(p < 0.62 ? (p - 0.57) / 0.05 : p > 0.72 ? 1 - (p - 0.72) / 0.05 : 1, 0, 1) 
      : 0
      
    // RSVP (Countdown + RSVP section): 0.72 - 1.0
    rsvpOpacity.current = p > 0.72 
      ? THREE.MathUtils.clamp((p - 0.72) / 0.05, 0, 1) 
      : 0
  })

  return (
    <>
      <HeroScene opacityRef={heroOpacity} />
      <JourneyScene opacityRef={journeyOpacity} />
      <GalleryScene opacityRef={galleryOpacity} />
      <EventsScene opacityRef={eventsOpacity} />
      <RsvpScene opacityRef={rsvpOpacity} />
    </>
  )
}
