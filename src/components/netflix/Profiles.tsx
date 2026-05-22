"use client"
import React, { useState } from 'react'
import NetflixLogo from './NetflixLogo'
import { Crown, HeartHandshake, Users, Sparkles, Star } from 'lucide-react'
import type { GuestProfile } from './types'

const profiles: GuestProfile[] = [
  { id: 'bride', label: "Bride Side", initial: 'V', accent: 'from-rose-500 to-red-700', tagline: 'Warm memories, family-first moments.' },
  { id: 'groom', label: "Groom Side", initial: 'S', accent: 'from-red-700 to-zinc-900', tagline: 'The groom crew premiere cut.' },
  { id: 'family', label: 'Family', initial: 'F', accent: 'from-amber-500 to-red-800', tagline: 'Ceremonies, blessings, and details.' },
  { id: 'friends', label: 'Friends', initial: 'P', accent: 'from-sky-500 to-red-700', tagline: 'Sangeet, party, and candid chaos.' },
  { id: 'vip', label: 'VIP Guest', initial: 'VIP', accent: 'from-zinc-200 to-red-700', tagline: 'Fast access to RSVP and venue.' },
]

const icons = [HeartHandshake, Crown, Users, Sparkles, Star]

export default function Profiles({ onSelect }: { onSelect: (profile: GuestProfile) => void }) {
  const [loading, setLoading] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<GuestProfile | null>(null)

  const handleSelect = (profile: GuestProfile) => {
    setSelectedProfile(profile)
    setLoading(true)
    setTimeout(() => {
      onSelect(profile)
    }, 900)
  }

  return (
    <div className="fixed inset-0 bg-[#080808] z-[100] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.22),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.2),#080808_75%)]" />
      <div className="absolute top-6 left-6 md:left-10 z-10">
        <NetflixLogo className="w-24 md:w-28 h-6 md:h-8" />
      </div>

      {loading ? (
        <div className="relative z-10 flex flex-col items-center animate-fade-in">
          <div className="mb-6 text-center">
            <p className="text-netflix-red text-xs font-bold tracking-[0.45em] uppercase">Loading Premiere</p>
            <h2 className="mt-3 text-2xl md:text-4xl font-semibold text-white">{selectedProfile?.label}</h2>
          </div>
          <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full origin-left animate-[profileLoad_0.9s_ease-in-out_forwards] bg-netflix-red" />
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-5 animate-zoom-in">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.45em] text-netflix-red">Private Wedding Premiere</p>
          <h1 className="mb-3 text-center text-3xl font-medium text-white md:text-5xl">Who is watching?</h1>
          <p className="mb-10 max-w-2xl text-center text-sm leading-6 text-white/55 md:text-base">
            Choose your guest profile for a personalized cut of Sagar and Vandana wedding story.
          </p>
          
          <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {profiles.map((profile, index) => {
              const Icon = icons[index]
              return (
                <button
                  key={profile.id}
                  onClick={() => handleSelect(profile)}
                  className="group flex flex-col items-center text-center"
                >
                  <div className={`relative flex aspect-square w-full max-w-[150px] items-center justify-center overflow-hidden rounded bg-gradient-to-br ${profile.accent} border-2 border-transparent transition duration-300 group-hover:scale-105 group-hover:border-white`}>
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.24),transparent_40%,rgba(0,0,0,0.35))]" />
                    <Icon className="absolute right-3 top-3 h-5 w-5 text-white/65" />
                    <span className="relative text-3xl font-black tracking-tight text-white md:text-4xl">{profile.initial}</span>
                  </div>
                  <span className="mt-4 text-base font-medium text-gray-400 transition group-hover:text-white md:text-xl">{profile.label}</span>
                  <span className="mt-2 max-w-[150px] text-xs leading-5 text-white/35 transition group-hover:text-white/60">{profile.tagline}</span>
                </button>
              )
            })}
          </div>
          
          <button className="mt-14 border border-gray-500 px-6 py-2 text-sm uppercase tracking-widest text-gray-500 transition hover:border-white hover:text-white">
            Manage Invites
          </button>
        </div>
      )}
    </div>
  )
}
