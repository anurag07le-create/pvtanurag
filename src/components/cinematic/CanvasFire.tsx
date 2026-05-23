"use client"
import React, { useRef, useEffect } from 'react'

export default function CanvasFire() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup canvas resolution
    canvas.width = 400
    canvas.height = 400

    const particles: Particle[] = []
    const particleCount = 150

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      color: string

      constructor() {
        this.reset()
      }

      reset() {
        // Spawn particles in a central base area
        this.x = 200 + (Math.random() - 0.5) * 60
        this.y = 350 + (Math.random() - 0.5) * 20
        // Move upwards, with slight horizontal drift
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = -Math.random() * 3 - 2
        this.size = Math.random() * 30 + 10
        this.life = 0
        this.maxLife = Math.random() * 50 + 50
        
        // Pick a random fire color
        const colors = [
          'rgba(255, 200, 50, 0.8)', // Yellow core
          'rgba(255, 100, 0, 0.6)',  // Orange mid
          'rgba(200, 30, 0, 0.4)',   // Red edge
          'rgba(100, 10, 0, 0.2)'    // Dark edge
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life++
        
        // Shrink as it rises
        if (this.size > 0.2) this.size -= 0.2

        if (this.life >= this.maxLife || this.size <= 0) {
          this.reset()
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        
        // Add a glow effect
        ctx.shadowBlur = 20
        ctx.shadowColor = this.color
        
        ctx.fill()
        ctx.closePath()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationFrameId: number

    const render = () => {
      // Clear with slight transparency for motion blur trail effect
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Use lighter blending for realistic fire overlap
      ctx.globalCompositeOperation = 'lighter'

      particles.forEach(p => {
        p.update()
        p.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-contain filter contrast-150 saturate-200"
      style={{
        // Ensure the black background of the canvas vanishes into the section background
        mixBlendMode: 'screen' 
      }}
    />
  )
}
