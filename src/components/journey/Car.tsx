"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Top-down convertible.
 *
 * To use your real artwork later, drop the transparent PNG at
 * /public/images/journey/car.png and set CAR_IMAGE_SRC below — the
 * placeholder SVG is then automatically replaced, no other changes needed.
 */
const CAR_IMAGE_SRC: string | null = "/images/journey/car.webp?v=2";

export default function Car({
  parked = false,
  className,
}: {
  parked?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const animate = parked || reduce;

  return (
    <motion.div
      className={`relative mx-auto will-change-transform ${
        className ?? "w-[52%] max-w-[270px]"
      }`}
      // Gentle idle "engine" bob + steering sway so the car feels alive.
      animate={animate ? undefined : { y: [0, -6, 0], rotate: [-0.8, 0.8, -0.8] }}
      transition={{
        y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{
        filter: "drop-shadow(0 18px 22px rgba(40,22,10,0.45))",
      }}
    >
      {CAR_IMAGE_SRC ? (
        <img
          src={CAR_IMAGE_SRC}
          alt="A couple driving a vintage convertible"
          className="w-full h-auto select-none pointer-events-none"
          // Flip vertically so the car faces upward — driving up toward the
          // "Save the Date" text, matching the reference.
          style={{ transform: "scaleY(-1)" }}
        />
      ) : (
        <PlaceholderCar />
      )}
    </motion.div>
  );
}

function PlaceholderCar() {
  return (
    <svg
      viewBox="0 0 220 380"
      className="w-full h-auto select-none pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c1212" />
          <stop offset="0.5" stopColor="#c8281f" />
          <stop offset="1" stopColor="#7c1212" />
        </linearGradient>
        <linearGradient id="carSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="seat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7c08c" />
          <stop offset="1" stopColor="#c99a63" />
        </linearGradient>
      </defs>

      {/* Wheels (peeking out from under the body) */}
      <g fill="#191512">
        <rect x="30" y="74" width="16" height="50" rx="7" />
        <rect x="174" y="74" width="16" height="50" rx="7" />
        <rect x="26" y="262" width="16" height="54" rx="7" />
        <rect x="178" y="262" width="16" height="54" rx="7" />
      </g>

      {/* Body */}
      <path
        d="M110 10
           C152 10 168 44 172 92
           L176 150
           C179 205 179 300 168 332
           C161 357 140 372 110 372
           C80 372 59 357 52 332
           C41 300 41 205 44 150
           L48 92
           C52 44 68 10 110 10 Z"
        fill="url(#carBody)"
        stroke="#5a0d0d"
        strokeWidth="2"
      />

      {/* Glossy sheen over the paint */}
      <path
        d="M110 10
           C152 10 168 44 172 92
           L176 150
           C179 205 179 300 168 332
           C161 357 140 372 110 372
           C80 372 59 357 52 332
           C41 300 41 205 44 150
           L48 92
           C52 44 68 10 110 10 Z"
        fill="url(#carSheen)"
      />

      {/* Hood + trunk centre creases */}
      <g stroke="#8a1414" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <line x1="110" y1="26" x2="110" y2="78" />
        <line x1="110" y1="320" x2="110" y2="360" />
      </g>
      {/* Bonnet ornament */}
      <ellipse cx="110" cy="24" rx="5" ry="7" fill="#f0d9a8" opacity="0.9" />

      {/* Open cabin */}
      <rect x="62" y="120" width="96" height="190" rx="22" fill="#3a2a1c" />
      <rect x="68" y="126" width="84" height="178" rx="18" fill="url(#seat)" />

      {/* Windshield */}
      <path
        d="M70 132 Q110 118 150 132 L150 144 Q110 132 70 144 Z"
        fill="#cfe6f2"
        opacity="0.85"
      />

      {/* Seat backs */}
      <rect x="74" y="196" width="34" height="40" rx="12" fill="#c9985f" />
      <rect x="112" y="196" width="34" height="40" rx="12" fill="#c9985f" />

      {/* The couple (heads from above) */}
      {/* Driver */}
      <circle cx="91" cy="244" r="15" fill="#caa078" />
      <path d="M76 244 a15 15 0 0 1 30 0 q-15 -9 -30 0 Z" fill="#2c1d12" />
      {/* Partner (with a low bun) */}
      <circle cx="129" cy="246" r="15" fill="#caa078" />
      <path d="M114 246 a15 15 0 0 1 30 0 q-15 -10 -30 0 Z" fill="#3a241a" />
      <circle cx="129" cy="262" r="6" fill="#3a241a" />

      {/* Steering wheel */}
      <circle
        cx="91"
        cy="214"
        r="9"
        fill="none"
        stroke="#2c1d12"
        strokeWidth="3"
      />
    </svg>
  );
}
