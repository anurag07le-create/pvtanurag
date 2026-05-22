"use client"
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMobile } from '@/hooks/useMobile'

export default function RsvpScene({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) {
  const isMobile = useMobile()
  const groupRef = useRef<THREE.Group>(null)
  
  const confettiCount = isMobile ? 50 : 100
  const colors = ['#D4A017', '#8B0000', '#F2C4CE', '#1B6B5A']
  
  const confettis = useMemo(() => {
    const temp = []
    for (let i = 0; i < confettiCount; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 12,
        y: Math.random() * 10,
        z: (Math.random() - 0.5) * 6,
        speedY: 0.02 + Math.random() * 0.04,
        rotSpeedX: (Math.random() - 0.5) * 0.1,
        rotSpeedY: (Math.random() - 0.5) * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    return temp
  }, [confettiCount, colors])

  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(() => {
    if (!groupRef.current || opacityRef.current === 0) {
      groupRef.current?.visible && (groupRef.current.visible = false)
      return
    }
    
    groupRef.current.visible = true
    const op = opacityRef.current

    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y -= confettis[i].speedY
        mesh.rotation.x += confettis[i].rotSpeedX
        mesh.rotation.y += confettis[i].rotSpeedY
        
        if (mesh.position.y < -5) {
          mesh.position.y = 5
        }
        
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = op
      }
    })
  })

  return (
    <group ref={groupRef} visible={false}>
      {confettis.map((c, i) => (
        <mesh 
          key={`confetti-${i}`} 
          ref={(el) => { meshRefs.current[i] = el }}
          position={[c.x, c.y, c.z]}
        >
          <planeGeometry args={[0.15, 0.15]} />
          <meshBasicMaterial color={c.color} transparent side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}
