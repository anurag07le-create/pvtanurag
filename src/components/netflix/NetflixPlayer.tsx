"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ChevronRight, MapPin, Volume2, VolumeX, X } from 'lucide-react'

interface PlayerProps {
  isOpen: boolean
  onClose: () => void
}

const STORY_DURATION = 15000

const episodes = [
  { id: 1, title: 'Episode 1: Not an Accident' },
  { id: 2, title: 'Episode 2: The Quiet Beginning' },
  { id: 3, title: 'Episode 3: Seven Promises' },
  { id: 4, title: 'Episode 4: Wedding Week' },
  { id: 5, title: 'Episode 5: Locations & Details' },
]

const originLines = [
  'We met.',
  'We talked.',
  'We realized.',
  'This was not chance.',
  'This was recognition.',
]

const promises = [
  'To walk beside each other.',
  'To listen with patience.',
  'To protect laughter.',
  'To build a home.',
  'To choose forever.',
]

export default function NetflixPlayer({ isOpen, onClose }: PlayerProps) {
  const [currentEpisode, setCurrentEpisode] = useState(1)
  const [lineStep, setLineStep] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      audioRef.current?.pause()
      return
    }

    const resetTimer = window.setTimeout(() => {
      setCurrentEpisode(1)
      setLineStep(0)
    }, 0)

    if (!audioRef.current) {
      audioRef.current = new Audio('/song.mp3')
      audioRef.current.loop = true
    }

    audioRef.current.muted = isMuted
    if (!isMuted) audioRef.current.play().catch(() => setIsMuted(true))

    return () => window.clearTimeout(resetTimer)
  }, [isOpen, isMuted])

  useEffect(() => {
    if (!isOpen) return
    setLineStep(0)
    const timers = [900, 2600, 4300, 6100, 8000].map((delay, index) =>
      window.setTimeout(() => setLineStep(index + 1), delay)
    )
    return () => timers.forEach(window.clearTimeout)
  }, [currentEpisode, isOpen])

  useEffect(() => {
    if (!isOpen) return
    if (currentEpisode === episodes.length) return
    const timer = window.setTimeout(() => setCurrentEpisode((episode) => episode + 1), STORY_DURATION)
    return () => window.clearTimeout(timer)
  }, [currentEpisode, isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setCurrentEpisode((episode) => Math.min(episode + 1, episodes.length))
      if (event.key === 'ArrowLeft') setCurrentEpisode((episode) => Math.max(episode - 1, 1))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const toggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (!audioRef.current) return
    audioRef.current.muted = nextMuted
    if (!nextMuted) audioRef.current.play().catch(() => setIsMuted(true))
  }

  if (!isOpen) return null

  const episode = episodes[currentEpisode - 1]

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden bg-[#250000] text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes episodeProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes redBreath { 0%, 100% { opacity: .82; transform: scale(1); } 50% { opacity: 1; transform: scale(1.04); } }
        @keyframes lineIn { from { opacity: 0; transform: translateY(18px); filter: blur(6px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes cardIn { from { opacity: 0; transform: translateY(28px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .episode-progress { animation: episodeProgress ${STORY_DURATION}ms linear forwards; transform-origin: left; }
        .red-breath { animation: redBreath 9s ease-in-out infinite; }
        .line-in { animation: lineIn 900ms cubic-bezier(.2,.8,.2,1) both; }
        .card-in { animation: cardIn 700ms cubic-bezier(.2,.8,.2,1) both; }
        .script-line { font-family: Georgia, 'Times New Roman', serif; font-style: italic; }
      ` }} />

      <div className="absolute inset-0 red-breath bg-[radial-gradient(circle_at_center,rgba(118,0,0,.9),#230000_58%,#0b0000_100%)]" />
      <div className="absolute inset-0 opacity-25" style={{ background: 'repeating-linear-gradient(28deg, transparent 0, transparent 15px, rgba(255,255,255,.08) 16px, transparent 17px)' }} />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/45 to-transparent" />

      <div className="absolute left-4 right-4 top-3 z-50 flex gap-1 md:left-8 md:right-8">
        {episodes.map((item) => (
          <div key={item.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/18">
            {currentEpisode > item.id && <div className="h-full w-full bg-white/70" />}
            {currentEpisode === item.id && <div key={currentEpisode} className="h-full w-full bg-netflix-red episode-progress" />}
          </div>
        ))}
      </div>

      <header className="relative z-40 flex items-center justify-between px-5 pt-8 md:px-8">
        <button onClick={onClose} className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/75 transition hover:text-white">
          <X size={20} /> Close
        </button>
        <div className="flex items-center gap-5">
          <span className="hidden text-sm font-medium text-white/60 md:inline">{episode.title}</span>
          <button onClick={toggleMute} aria-label="Toggle sound" className="text-white/75 transition hover:text-white">
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
        </div>
      </header>

      <main className="relative z-30 flex min-h-[calc(100vh-110px)] items-center justify-center px-5 pb-20 pt-8 text-center">
        {currentEpisode === 1 && (
          <div className="space-y-12 md:space-y-14">
            {originLines.map((line, index) => (
              <p
                key={line}
                className={`script-line text-4xl text-white md:text-5xl ${index === 4 ? 'text-white' : 'text-white/82'} ${lineStep > index ? 'line-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {currentEpisode === 2 && (
          <div className="card-in grid w-full max-w-4xl gap-5 md:grid-cols-2">
            {[
              ['Vandana', '/images/photo2.jpeg', 'Bride Side'],
              ['Sagar', '/images/photo3.jpeg', 'Groom Side'],
            ].map(([name, img, label]) => (
              <div key={name} className="overflow-hidden rounded-sm border border-white/12 bg-black/35 text-left shadow-2xl backdrop-blur-md">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={name} className="h-full w-full object-cover grayscale-[35%]" />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.32em] text-netflix-red">{label}</p>
                  <h2 className="text-4xl font-light uppercase tracking-[0.18em]">{name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentEpisode === 3 && (
          <div className="card-in w-full max-w-3xl">
            <p className="mb-8 text-xs font-black uppercase tracking-[0.4em] text-netflix-red">Seven Promises</p>
            <div className="space-y-5 text-left">
              {promises.map((promise, index) => (
                <div key={promise} className="flex items-center gap-5 border-b border-white/10 pb-4">
                  <span className="text-3xl font-black text-white/20">0{index + 1}</span>
                  <p className="text-xl font-light tracking-wide text-white md:text-2xl">{promise}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentEpisode === 4 && (
          <div className="card-in grid w-full max-w-5xl gap-4 md:grid-cols-3">
            {[
              ['Mehendi', '4 Dec', '6:00 PM'],
              ['Sangeet', '5 Dec', '7:30 PM'],
              ['Wedding', '6 Dec', '9:00 AM'],
            ].map(([name, date, time]) => (
              <div key={name} className="border border-white/12 bg-black/35 p-6 text-left backdrop-blur-md">
                <p className="mb-10 text-[10px] font-black uppercase tracking-[0.3em] text-netflix-red">Wedding Week</p>
                <h2 className="mb-3 text-3xl font-black uppercase">{name}</h2>
                <p className="text-white/65">{date} | {time}</p>
              </div>
            ))}
          </div>
        )}

        {currentEpisode === 5 && (
          <div className="card-in max-w-xl text-center">
            <MapPin className="mx-auto mb-6 h-10 w-10 text-netflix-red" />
            <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-netflix-red">Locations & Details</p>
            <h2 className="mb-4 text-5xl font-black uppercase md:text-7xl">Gujarat</h2>
            <p className="text-lg leading-8 text-white/72">The wedding premiere begins on 6 December 2026. Venue, route, RSVP, and guest pass details are available on the main screen.</p>
          </div>
        )}
      </main>

      <footer className="absolute bottom-6 left-5 right-5 z-40 flex items-center justify-end md:bottom-8 md:left-8 md:right-8">
        <button
          onClick={() => currentEpisode === episodes.length ? onClose() : setCurrentEpisode((value) => value + 1)}
          className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-white/65 transition hover:text-white"
        >
          {currentEpisode === episodes.length ? 'Finish' : currentEpisode === 1 ? 'Skip Scene' : 'Next Episode'}
          <ChevronRight size={18} />
        </button>
      </footer>
    </div>
  )
}
