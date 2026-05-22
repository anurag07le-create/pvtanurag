"use client"
import React from 'react'

export default function NetflixLogo({ className = "w-28 h-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png" 
      alt="Netflix" 
      className={`${className} object-contain`}
    />
  )
}
