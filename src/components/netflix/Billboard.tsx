import React from 'react'
import { CalendarDays, Info, Play } from 'lucide-react'
import type { GuestProfile } from './types'

interface BillboardProps {
  onPlay: () => void
  onInfo: () => void
  profile?: GuestProfile | null
}

export default function Billboard({ onPlay, onInfo, profile }: BillboardProps) {
  return (
    <section className="relative h-[94vh] min-h-[680px] w-full">
      <div className="absolute inset-0 h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/couple-hero.png"
          alt="Sagar and Vandana"
          className="h-full w-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-[#050505]/58 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-[45%] bg-gradient-to-t from-netflix-black via-netflix-black/90 to-transparent" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_70%_40%,transparent_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.82)_100%)]" />
      </div>

      <div className="absolute left-[4%] top-[23%] z-40 flex w-[92%] flex-col md:left-[60px] md:top-[28%] md:w-[48%] lg:w-[43%]">
        <div className="mb-4 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/n-logo.png" alt="N" className="h-7 w-5 object-contain md:h-8 md:w-6" />
          <span className="text-xs font-bold uppercase tracking-[0.38em] text-gray-300 md:text-sm">Original Wedding Film</span>
        </div>

        <h1 className="netflix-title flex flex-col text-[3.6rem] uppercase leading-none text-white drop-shadow-2xl md:text-[5.6rem] lg:text-[6.8rem]">
          <span>Sagar</span>
          <span className="text-netflix-red">& Vandana</span>
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80 md:text-sm">
          <span className="text-green-400">99% Match</span>
          <span>2026</span>
          <span className="border border-white/40 px-1">U/A 13+</span>
          <span>Wedding Premiere</span>
          <span className="border border-white/40 px-1">4K</span>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 drop-shadow-md md:mt-6 md:text-lg">
          Season 1 premieres at Hotel Natraj & Resort on 6 December 2026. A private wedding series for the people who made their story possible.
        </p>

        <div className="mt-4 flex items-center gap-3 md:mt-6">
          <button
            onClick={onPlay}
            className="flex items-center justify-center gap-2 rounded-[4px] bg-white px-5 py-2 text-sm font-bold text-[#141414] transition-colors hover:bg-white/75 md:px-6 md:py-2.5 md:text-base"
          >
            <Play size={20} fill="currentColor" />
            Play Episode 1
          </button>

          <button
            onClick={onInfo}
            className="flex items-center justify-center gap-2 rounded-[4px] bg-[rgba(109,109,110,0.7)] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[rgba(109,109,110,0.4)] md:px-6 md:py-2.5 md:text-base"
          >
            <Info size={20} />
            More Info
          </button>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.26em] text-white/45">
          6 Dec 2026 | Hotel Natraj & Resort | {profile?.label || 'Guest'} Cut
        </p>
      </div>

      <div className="absolute bottom-[31%] right-0 z-20 hidden items-center md:flex">
        <div className="border-l-[3px] border-white/40 bg-transparent py-1 pl-3 pr-4 text-sm font-medium text-white/80">
          <span className="flex items-center gap-2">
            <CalendarDays size={15} /> Dec 6
          </span>
        </div>
      </div>
    </section>
  )
}
