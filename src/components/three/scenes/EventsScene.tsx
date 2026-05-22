"use client"
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function EventsScene({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const flames = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      x: (i - 2) * 3, // Spread evenly horizontally
      y: -2 + Math.random(),
      z: -3,
      offset: Math.random() * 10
    }))
  }, [])

  const flameRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    if (!groupRef.current || opacityRef.current === 0) {
      groupRef.current?.visible && (groupRef.current.visible = false)
      return
    }
    
    groupRef.current.visible = true
    const op = opacityRef.current

    flameRefs.current.forEach((mesh, i) => {
      if (mesh) {
        // Sway gently
        mesh.rotation.z = Math.sin(state.clock.elapsedTime * 2 + flames[i].offset) * 0.1
        mesh.rotation.x = Math.cos(state.clock.elapsedTime * 1.5 + flames[i].offset) * 0.1
        
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = op
      }
    })
  })

  return (
    <group ref={groupRef} visible={false}>
      {flames.map((f, i) => (
        <mesh 
          key={`flame-${i}`} 
          ref={(el) => { flameRefs.current[i] = el }}
          position={[f.x, f.y, f.z]}
        >
          {/* Elongated cone for flame */}
          <coneGeometry args={[0.3, 1.2, 16]} />
          <meshBasicMaterial color="#FF8C00" transparent depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
