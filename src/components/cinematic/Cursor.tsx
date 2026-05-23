"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering over an element that should trigger the "magnetic" expansion
      if (
        target.tagName.toLowerCase() === 'img' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[100] items-center justify-center rounded-full mix-blend-difference bg-[#1B4332]"
      animate={{
        x: mousePosition.x - (isHovering ? 40 : 10),
        y: mousePosition.y - (isHovering ? 40 : 10),
        width: isHovering ? 80 : 20,
        height: isHovering ? 80 : 20,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    >
      <motion.span 
        className="text-black text-[10px] tracking-widest font-bold uppercase whitespace-nowrap opacity-0"
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        View
      </motion.span>
    </motion.div>
  )
}
