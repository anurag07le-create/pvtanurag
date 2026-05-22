import React, { useState } from 'react'

export default function NetflixN({ className = "w-6 h-10" }: { className?: string }) {
  const [useFallback, setUseFallback] = useState(false)

  if (!useFallback) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img 
        src="/images/n-logo.png" 
        alt="N Logo" 
        className={className} 
        onError={() => setUseFallback(true)}
      />
    )
  }

  return (
    <svg viewBox="0 0 60 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leftRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e50914" />
          <stop offset="100%" stop-color="#9b060d" />
        </linearGradient>
        <linearGradient id="rightRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e50914" />
          <stop offset="100%" stop-color="#9b060d" />
        </linearGradient>
        <linearGradient id="centerRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e50914" />
          <stop offset="100%" stop-color="#B81D24" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>
      {/* Left Column */}
      <path d="M 10 95 L 10 5 L 25 5 L 25 95 Z" fill="url(#leftRed)" />
      {/* Right Column */}
      <path d="M 35 95 L 35 5 L 50 5 L 50 95 Z" fill="url(#rightRed)" />
      {/* Diagonal Column */}
      <path d="M 10 5 L 25 5 L 50 95 L 35 95 Z" fill="url(#centerRed)" filter="url(#shadow)" />
    </svg>
  )
}
