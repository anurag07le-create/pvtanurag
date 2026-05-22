"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import SceneManager from './SceneManager'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ThreeCanvas() {
  const { progress } = useScrollProgress()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundColor: 'transparent' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4A017" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B0000" />
        
        <SceneManager scrollProgress={progress} />
      </Canvas>
    </div>
  )
}
