"use client"
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMobile } from '@/hooks/useMobile'

export default function HeroScene({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) {
  const isMobile = useMobile()
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  
  const particleCount = isMobile ? 30 : 60
  
  // Create marigold petals
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 8
      const y = (Math.random() - 0.5) * 8
      const z = (Math.random() - 0.5) * 4
      const color = Math.random() > 0.5 ? '#FFA500' : '#FF8C00' // Orange/Yellow
      temp.push({ x, y, z, color, offset: Math.random() * 100 })
    }
    return temp
  }, [particleCount])

  const particleRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    if (!groupRef.current || opacityRef.current === 0) {
      groupRef.current?.visible && (groupRef.current.visible = false)
      return
    }
    
    groupRef.current.visible = true
    
    // Rotate ring
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.1
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }

    // Animate petals
    particleRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y += Math.sin(state.clock.elapsedTime + particles[i].offset * 0.5) * 0.005
        mesh.position.x += Math.cos(state.clock.elapsedTime + particles[i].offset * 0.3) * 0.005
        mesh.rotation.z += 0.01
        mesh.rotation.x += 0.02
        
        // Update opacity for each petal material
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = opacityRef.current
      }
    })

    // Update ring material opacity
    if (materialRef.current) {
      materialRef.current.opacity = opacityRef.current
      materialRef.current.transparent = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Golden Torus Ring */}
      <mesh ref={ringRef} position={[0, 0, -2]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial ref={materialRef} color="#D4A017" metalness={0.8} roughness={0.2} transparent />
      </mesh>
      
      {/* Marigold Petals */}
      {particles.map((p, i) => (
        <mesh 
          key={i} 
          ref={(el) => { particleRefs.current[i] = el }}
          position={[p.x, p.y, p.z]}
        >
          <circleGeometry args={[0.15, 16]} />
          <meshBasicMaterial color={p.color} transparent side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}
