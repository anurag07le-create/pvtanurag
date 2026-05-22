"use client"
import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, Check, Clock, MapPin, Play, Plus, Ticket, X } from 'lucide-react'
import type { NetflixItem } from './types'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  data?: NetflixItem | null
  onPlay?: () => void
}

const fallbackItem: NetflixItem = {
  id: 'premiere',
  title: 'Sagar & Vandana',
  type: 'story',
  img: '/images/couple-hero.png',
  eyebrow: 'Original',
  match: '99% Match',
  year: '2026',
  rating: 'U/A 13+',
  duration: 'Wedding Premiere',
  quality: '4K',
  synopsis: 'A private streaming premiere for the people who made their story possible. Season 1 begins on 6 December 2026 in Gujarat.',
  cast: 'Sagar, Vandana, Family & Friends',
  genres: 'Romance, Family, Celebration',
  mood: 'Cinematic, Emotional, Grand',
  tags: ['Premiere', 'Family', 'Wedding Week'],
}

export default function InfoModal({ isOpen, onClose, data, onPlay }: InfoModalProps) {
  const item = data || fallbackItem

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/75 px-3 py-8 backdrop-blur-sm md:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-md bg-[#181818] shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 z-[999] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white shadow-xl transition-colors hover:bg-white hover:text-black"
            >
              <X size={22} />
            </button>

            <div className="relative aspect-video w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />
              <div className="absolute bottom-6 left-5 right-16 z-20 md:left-10">
                {item.eyebrow && <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-netflix-red">{item.eyebrow}</p>}
                <h2 className="max-w-2xl text-3xl font-black uppercase tracking-tight text-white md:text-5xl">{item.title}</h2>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onPlay}
                    className="flex items-center gap-2 rounded bg-white px-5 py-2 font-bold text-black transition hover:bg-white/80"
                  >
                    <Play size={18} fill="currentColor" /> Play
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/35 text-white transition hover:border-white">
                    <Plus size={20} />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/35 text-white transition hover:border-white">
                    <Check size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-8 p-5 md:grid-cols-[1fr_260px] md:p-10">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-medium">
                  {item.match && <span className="font-bold text-green-500">{item.match}</span>}
                  {item.year && <span className="text-gray-300">{item.year}</span>}
                  {item.rating && <span className="border border-gray-500 px-1 text-gray-300">{item.rating}</span>}
                  {item.duration && <span className="text-gray-300">{item.duration}</span>}
                  {item.quality && <span className="border border-gray-500 px-1 text-xs text-gray-300">{item.quality}</span>}
                </div>

                <p className="text-base leading-7 text-white md:text-lg">{item.synopsis}</p>

                {item.type === 'event' && (
                  <div className="mt-6 grid gap-3 rounded bg-black/25 p-4 sm:grid-cols-3">
                    {item.date && <p className="flex items-center gap-2 text-sm text-white/80"><CalendarPlus size={16} className="text-netflix-red" /> {item.date}</p>}
                    {item.time && <p className="flex items-center gap-2 text-sm text-white/80"><Clock size={16} className="text-netflix-red" /> {item.time}</p>}
                    {item.venue && <p className="flex items-center gap-2 text-sm text-white/80"><MapPin size={16} className="text-netflix-red" /> {item.venue}</p>}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {(item.tags || ['Wedding Week', 'Private Premiere']).map((tag) => (
                    <span key={tag} className="rounded-sm bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="space-y-4 text-sm">
                <p><span className="text-gray-500">Cast:</span> <span className="text-gray-300">{item.cast || 'Sagar, Vandana, Family & Friends'}</span></p>
                <p><span className="text-gray-500">Genres:</span> <span className="text-gray-300">{item.genres || 'Romance, Family, Celebration'}</span></p>
                <p><span className="text-gray-500">This title is:</span> <span className="text-gray-300">{item.mood || 'Premium, Cinematic, Emotional'}</span></p>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-netflix-red px-4 py-3 text-sm font-bold text-white transition hover:bg-netflix-hover">
                  <Ticket size={17} /> Reserve My Seat
                </button>
              </aside>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
