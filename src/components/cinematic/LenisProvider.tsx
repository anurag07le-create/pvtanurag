"use client"
import { ReactLenis } from '@studio-freight/react-lenis'
import type React from 'react'

const LenisRoot = ReactLenis as unknown as React.ComponentType<{
  root?: boolean
  options?: { lerp: number; duration: number; smoothWheel: boolean }
  children?: React.ReactNode
}>

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <LenisRoot root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </LenisRoot>
  )
}
