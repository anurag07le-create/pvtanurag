"use client"
import React from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const { progress } = useScrollProgress()
  const p = progress.current

  // Use a fast interval or RAF if we want to visually update progress bar
  // For simplicity, we can use a state that tracks the ref, but ref + requestAnimationFrame is better for performance.
  // Actually, let's use a simpler approach for the progress bar with state just for this component.
  
  const [scrollPos, setScrollPos] = React.useState(0)
  
  React.useEffect(() => {
    let frameId: number
    const update = () => {
      setScrollPos(progress.current)
      frameId = requestAnimationFrame(update)
    }
    frameId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frameId)
  }, [progress])

  return (
    <div className="fixed right-0 top-0 bottom-0 w-1.5 bg-gold/20 z-50">
      <div 
        className="w-full bg-gold rounded-full shadow-[0_0_10px_rgba(212,160,23,0.8)]"
        style={{ 
          height: `${scrollPos * 100}%`,
          transition: 'height 0.1s ease-out'
        }}
      />
    </div>
  )
}
