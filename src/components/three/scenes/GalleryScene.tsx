"use client"
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMobile } from '@/hooks/useMobile'

export default function GalleryScene({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) {
  const isMobile = useMobile()
  const groupRef = useRef<THREE.Group>(null)
  const mandalaRef = useRef<THREE.Group>(null)
  
  const sparkleCount = isMobile ? 40 : 80
  
  const sparkles = useMemo(() => {
    const temp = []
    for (let i = 0; i < sparkleCount; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5,
        speed: 1 + Math.random() * 2,
        offset: Math.random() * Math.PI * 2
      })
    }
    return temp
  }, [sparkleCount])

  const sparkleRefs = useRef<(THREE.Mesh | null)[]>([])
  const mandalaMats = useRef<(THREE.MeshBasicMaterial | null)[]>([])

  useFrame((state) => {
    if (!groupRef.current || opacityRef.current === 0) {
      groupRef.current?.visible && (groupRef.current.visible = false)
      return
    }
    
    groupRef.current.visible = true
    const op = opacityRef.current

    if (mandalaRef.current) {
      mandalaRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }

    mandalaMats.current.forEach(mat => {
      if (mat) mat.opacity = op * 0.2 // Faint wireframe
    })

    sparkleRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const s = sparkles[i]
        // Oscillation
        const alpha = (Math.sin(state.clock.elapsedTime * s.speed + s.offset) + 1) / 2
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = alpha * op
      }
    })
  })

  return (
    <group ref={groupRef} visible={false}>
      {/* Background Mandala Wireframe */}
      <group ref={mandalaRef} position={[0, 0, -4]}>
        {[1, 2, 3].map((radius, i) => (
          <mesh key={`ring-${i}`}>
            <torusGeometry args={[radius, 0.02, 16, 64]} />
            <meshBasicMaterial 
              ref={(el) => { mandalaMats.current[i] = el }}
              color="#D4A017" 
              wireframe 
              transparent 
            />
          </mesh>
        ))}
      </group>
      
      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <mesh 
          key={`sparkle-${i}`} 
          ref={(el) => { sparkleRefs.current[i] = el }}
          position={[s.x, s.y, s.z]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent />
        </mesh>
      ))}
    </group>
  )
}
