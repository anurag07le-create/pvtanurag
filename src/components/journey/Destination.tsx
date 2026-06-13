"use client";

import React, { useEffect, useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { CONFIG } from "@/lib/config";
import Car from "./Car";

const JOURNEY_PLACE = "Gujarat, India"; // short place name, like the reference's "DEHRADUN"
const TARGET = CONFIG.weddingDate.getTime();

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, isOver: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    isOver: false,
  };
}

// Deterministic sparkle field (no hydration mismatch).
const sparkles = Array.from({ length: 28 }).map((_, i) => ({
  left: `${(i * 23.7 + 5) % 100}%`,
  top: `${(i * 37.1 + 9) % 100}%`,
  size: 1.5 + (i % 3),
  delay: (i * 0.31) % 4,
  dur: 2.5 + (i % 4),
}));

export default function Destination({ progress }: { progress: MotionValue<number> }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const tick = () => setTime(getTimeLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Brown road dissolves into dusty rose, then the content settles in and
  // holds right to the end — so the page finishes exactly here, nothing after.
  const panelOpacity = useTransform(progress, [0.72, 0.9], [0, 1]);
  const contentOpacity = useTransform(progress, [0.85, 0.99], [0, 1]);
  const contentY = useTransform(progress, [0.85, 0.99], [30, 0]);

  const blocks = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-40 pointer-events-none"
      style={{ opacity: panelOpacity }}
    >
      {/* Dusty-rose backdrop with depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #dcae9f 0%, #c98a76 48%, #a5614e 100%)",
        }}
      />
      {/* Soft top glow + bottom vignette so it isn't flat */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 12%, rgba(255,238,228,0.55) 0%, transparent 55%), linear-gradient(180deg, transparent 60%, rgba(90,40,28,0.35) 100%)",
        }}
      />

      {/* Sparkle dust */}
      <div className="absolute inset-0 overflow-hidden">
        {sparkles.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.2, 0.6] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Faint parked car settled into the blush, behind the content */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] max-w-[200px] opacity-25 blur-[0.5px]">
        <Car parked className="w-full" />
      </div>

      {/* Content */}
      <motion.div
        className="relative h-full w-full flex flex-col items-center justify-center text-center px-8"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <h2 className="font-cormorant font-medium text-[#42241c] text-[13vw] md:text-7xl tracking-[0.14em] leading-[1.05] drop-shadow-[0_1px_1px_rgba(255,240,230,0.4)]">
          {CONFIG.groomName.toUpperCase()}
        </h2>
        <span className="font-cormorant italic text-[#9a5325] text-2xl md:text-4xl my-1 md:my-2">
          and
        </span>
        <h2 className="font-cormorant font-medium text-[#42241c] text-[13vw] md:text-7xl tracking-[0.14em] leading-[1.05] drop-shadow-[0_1px_1px_rgba(255,240,230,0.4)]">
          {CONFIG.brideName.toUpperCase()}
        </h2>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-6 md:mt-8">
          <span className="block h-[1px] w-10 md:w-14 bg-[#7a4332]/50" />
          <span className="text-[#7a4332] text-xs">❦</span>
          <span className="block h-[1px] w-10 md:w-14 bg-[#7a4332]/50" />
        </div>

        <p className="font-cinzel text-[#522d1f] text-[11px] md:text-sm tracking-[0.4em] uppercase mt-5 md:mt-6">
          {JOURNEY_PLACE}
        </p>
        <p className="font-montserrat text-[#6e4030] text-[9px] md:text-[11px] tracking-[0.34em] uppercase mt-3">
          Formal Invitation to Follow
        </p>

        {/* Countdown pills */}
        <div className="flex gap-2.5 md:gap-4 mt-9 md:mt-12">
          {blocks.map((b) => (
            <div
              key={b.label}
              className="w-[80px] h-[76px] md:w-[106px] md:h-[94px] rounded-2xl bg-white/45 backdrop-blur-md border border-white/70 flex flex-col items-center justify-center shadow-[0_8px_22px_rgba(90,40,28,0.25)]"
            >
              <span className="font-cormorant font-medium text-[#42241c] text-3xl md:text-5xl leading-none tabular-nums">
                {typeof b.value === "number" ? String(b.value).padStart(2, "0") : "--"}
              </span>
              <span className="font-montserrat text-[#6e4030] text-[8px] md:text-[10px] tracking-[0.25em] uppercase mt-2">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
