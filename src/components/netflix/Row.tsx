"use client"
import React, { useRef, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Play } from 'lucide-react'
import type { NetflixItem } from './types'

interface RowProps {
  title: string
  subtitle?: string
  items: NetflixItem[]
  isLargeRow?: boolean
  onItemClick?: (item: NetflixItem) => void
}

export default function Row({ title, subtitle, items, isLargeRow = false, onItemClick }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleScroll = (direction: 'left' | 'right') => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <section className="row-container group relative mb-11">
      <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:gap-4">
        <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
        {subtitle && <p className="text-sm text-white/45">{subtitle}</p>}
      </div>

      <div className="relative">
        <button
          onClick={() => handleScroll('left')}
          aria-label={`Scroll ${title} left`}
          className={`absolute bottom-0 left-0 top-0 z-40 flex w-12 items-center justify-center rounded-r-md bg-black/55 opacity-0 transition-opacity hover:bg-black/75 group-hover:opacity-100 ${!isMoved && 'hidden'}`}
        >
          <ChevronLeft className="text-white" size={32} />
        </button>

        <div ref={rowRef} className="hide-scroll flex items-stretch gap-2 overflow-x-scroll p-1 md:gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className={`group/card relative flex-none cursor-pointer text-left transition-transform duration-300 hover:z-50 hover:scale-105 ${isLargeRow ? 'w-[168px] md:w-[250px]' : 'w-[250px] md:w-[320px]'}`}
            >
              <div className={`relative w-full overflow-hidden rounded-[4px] bg-zinc-900 netflix-card-shadow ${isLargeRow ? 'aspect-[2/3]' : 'aspect-video'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/15 to-transparent" />
                <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
                  {item.eyebrow && (
                    <span className="rounded-sm bg-netflix-red px-2 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white">
                      {item.eyebrow}
                    </span>
                  )}
                  {item.quality && <span className="ml-auto border border-white/45 px-1 text-[10px] font-bold text-white/80">{item.quality}</span>}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="line-clamp-2 text-sm font-bold text-white drop-shadow-md md:text-lg">{item.title}</h3>
                  {item.type === 'event' ? (
                    <div className="mt-2 space-y-1 text-[11px] text-white/70 md:text-xs">
                      {item.date && <p className="flex items-center gap-1.5"><Calendar size={12} /> {item.date}</p>}
                      {item.time && <p className="flex items-center gap-1.5"><Clock size={12} /> {item.time}</p>}
                      {item.venue && <p className="flex items-center gap-1.5"><MapPin size={12} /> {item.venue}</p>}
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-white/70 md:text-xs">
                      {item.match && <span className="text-green-400">{item.match}</span>}
                      {item.duration && <span>{item.duration}</span>}
                      <span className="flex items-center gap-1 opacity-0 transition group-hover/card:opacity-100"><Play size={12} fill="currentColor" /> Preview</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleScroll('right')}
          aria-label={`Scroll ${title} right`}
          className="absolute bottom-0 right-0 top-0 z-40 flex w-12 items-center justify-center rounded-l-md bg-black/55 opacity-0 transition-opacity hover:bg-black/75 group-hover:opacity-100"
        >
          <ChevronRight className="text-white" size={32} />
        </button>
      </div>
    </section>
  )
}
