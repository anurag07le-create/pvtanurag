"use client"
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMobile } from '@/hooks/useMobile'

export default function JourneyScene({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) {
  const isMobile = useMobile()
  const groupRef = useRef<THREE.Group>(null)
  
  const petalCount = isMobile ? 20 : 40
  const bokehCount = isMobile ? 10 : 20
  
  // Rose petals
  const petals = useMemo(() => {
    const temp = []
    for (let i = 0; i < petalCount; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 10 - 5,
        z: (Math.random() - 0.5) * 5 - 2,
        speedY: 0.01 + Math.random() * 0.02,
        speedRotX: (Math.random() - 0.5) * 0.05,
        speedRotY: (Math.random() - 0.5) * 0.05,
        speedRotZ: (Math.random() - 0.5) * 0.05,
      })
    }
    return temp
  }, [petalCount])

  // Bokeh spheres
  const bokehs = useMemo(() => {
    const temp = []
    for (let i = 0; i < bokehCount; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 12,
        z: -2 - Math.random() * 8,
        scale: 1 + Math.random() * 2,
      })
    }
    return temp
  }, [bokehCount])

  const petalRefs = useRef<(THREE.Mesh | null)[]>([])
  const bokehRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(() => {
    if (!groupRef.current || opacityRef.current === 0) {
      groupRef.current?.visible && (groupRef.current.visible = false)
      return
    }
    
    groupRef.current.visible = true
    const currentOpacity = opacityRef.current

    // Animate petals falling
    petalRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y -= petals[i].speedY
        mesh.rotation.x += petals[i].speedRotX
        mesh.rotation.y += petals[i].speedRotY
        mesh.rotation.z += petals[i].speedRotZ
        
        // Reset if too low
        if (mesh.position.y < -5) {
          mesh.position.y = 5
        }
        
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = currentOpacity
      }
    })

    // Animate bokehs gently
    bokehRefs.current.forEach((mesh, i) => {
      if (mesh) {
        // base opacity is 0.04 * overall opacity
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = 0.04 * currentOpacity
      }
    })
  })

  return (
    <group ref={groupRef} visible={false}>
      {/* Rose Petals */}
      {petals.map((p, i) => (
        <mesh 
          key={`petal-${i}`} 
          ref={(el) => { petalRefs.current[i] = el }}
          position={[p.x, p.y, p.z]}
        >
          <planeGeometry args={[0.2, 0.3]} />
          <meshBasicMaterial color="#F2C4CE" side={THREE.DoubleSide} transparent />
        </mesh>
      ))}
      
      {/* Bokeh Glow Effect */}
      {bokehs.map((b, i) => (
        <mesh 
          key={`bokeh-${i}`} 
          ref={(el) => { bokehRefs.current[i] = el }}
          position={[b.x, b.y, b.z]}
          scale={[b.scale, b.scale, b.scale]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
