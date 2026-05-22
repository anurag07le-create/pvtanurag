"use client"
import { useState, useEffect, useRef } from 'react'

export const lyrics = [
  { time: 0, text: "♪ [Music Starts]" },
  { time: 8, text: "♪ Saansein bhi meri" },
  { time: 13, text: "♪ Tumhare liye hain" },
  { time: 17, text: "♪ Yeh dhadkan bhi meri" },
  { time: 22, text: "♪ Tumhare liye hai" },
  { time: 29, text: "♪ Kahaan the tum ab tak" },
  { time: 34, text: "♪ Kahaan the tum ab tak" },
  { time: 42, text: "♪ Mujhe dhoondne mein itni der" },
  { time: 48, text: "♪ Kyun kar di tumne..." },
  { time: 55, text: "♪ [Instrumental]" },
]

export function useAudio(src = '/song.mp3') {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLyric, setCurrentLyric] = useState("♪ CO2 — Prateek Kuhad")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio instance
    const audio = new Audio(src)
    audio.loop = true
    audioRef.current = audio

    const updateLyrics = () => {
      const currentTime = audio.currentTime
      // Find the last lyric whose time has passed
      let activeLyric = lyrics[0].text
      for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time) {
          activeLyric = lyrics[i].text
        }
      }
      setCurrentLyric(activeLyric)
    }

    audio.addEventListener('timeupdate', updateLyrics)

    return () => {
      audio.removeEventListener('timeupdate', updateLyrics)
      audio.pause()
      audio.src = ''
    }
  }, [src])

  // Play audio on first user interaction anywhere on document
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(err => console.log("Audio autoplay prevented:", err))
        
        // Remove listeners once we played it once
        document.removeEventListener('click', handleFirstInteraction)
        document.removeEventListener('touchstart', handleFirstInteraction)
      }
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return { isPlaying, togglePlay, currentLyric }
}
