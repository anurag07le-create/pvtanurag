"use client"
import React, { useState, useEffect } from 'react'
import { Search, Bell, ChevronDown } from 'lucide-react'
import NetflixLogo from './NetflixLogo'
import type { GuestProfile } from './types'

export default function Navbar({ profile }: { profile?: GuestProfile | null }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-500 flex items-center px-4 md:px-12 py-5 ${isScrolled ? 'bg-netflix-black' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
      
      {/* Netflix Logo */}
      <div className="mr-10">
        <NetflixLogo className="w-24 md:w-28 h-6 md:h-8 cursor-pointer" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-5 text-sm font-medium text-netflix-light">
        <li className="cursor-pointer font-bold text-white transition">Home</li>
        <li className="cursor-pointer hover:text-white transition">Story</li>
        <li className="cursor-pointer hover:text-white transition">Episodes</li>
        <li className="cursor-pointer hover:text-white transition">Gallery</li>
        <li className="cursor-pointer hover:text-white transition">My List</li>
      </ul>

      {/* Mobile Menu Dropdown (Simplified) */}
      <div className="md:hidden flex items-center gap-1 text-sm text-white font-medium">
        Browse <ChevronDown size={14} />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center ml-auto space-x-4 md:space-x-6 text-white">
        <Search size={20} className="cursor-pointer" />
        <span className="hidden md:block text-sm">Reserve Seat</span>
        <Bell size={20} className="cursor-pointer" />
        
        {/* Profile Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center text-xs font-bold border border-transparent">
            {profile?.initial || 'G'}
          </div>
          <ChevronDown size={16} className="hidden md:block transition group-hover:rotate-180" />
        </div>
      </div>

    </nav>
  )
}
