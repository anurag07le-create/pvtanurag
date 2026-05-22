"use client"
import { useEffect, useRef } from 'react'

export function useScrollProgress() {
  const progress = useRef(0)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      progress.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      
      isScrolling.current = true
      
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 100) // 100ms after last scroll event, consider scrolling stopped
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    
    // Initial call
    onScroll()
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [])
  
  return { progress, isScrolling }
}
