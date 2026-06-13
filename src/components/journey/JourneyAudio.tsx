"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Small frosted circular sound toggle, pinned top-right — mirrors the
 * reference's mute button. Reuses the shared /song.mp3 background track
 * and the "start on first interaction" approach from the other experiences.
 */
export default function JourneyAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);

    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.4;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch {
        // Autoplay blocked — will start on first interaction.
      }
    };

    const handleFirstInteraction = () => {
      if (!isPlaying) playAudio();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("scroll", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-5 right-5 md:top-7 md:right-7 z-[120]">
      <audio ref={audioRef} src="/song.mp3" loop autoPlay preload="auto" />
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_4px_14px_rgba(80,50,30,0.25)] flex items-center justify-center text-[#7a513a] transition-transform active:scale-95 hover:scale-105"
      >
        {isPlaying ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 10v4h4l5 5V5L7 10H3zm13.59 2L17 9.41 15.59 8 13 10.59 10.41 8 9 9.41 11.59 12 9 14.59 10.41 16 13 13.41 15.59 16 17 14.59 14.41 12z" />
          </svg>
        )}
      </button>
    </div>
  );
}
