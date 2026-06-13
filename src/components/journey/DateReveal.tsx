"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { CONFIG } from "@/lib/config";

const d = CONFIG.weddingDate;
const DD = String(d.getDate()).padStart(2, "0");
const MM = String(d.getMonth() + 1).padStart(2, "0");
const YY = String(d.getFullYear()).slice(2);

export default function DateReveal({ progress }: { progress: MotionValue<number> }) {
  // The whole block fades in once the drive begins and clears before arrival.
  const blockOpacity = useTransform(progress, [0.12, 0.2, 0.68, 0.76], [0, 1, 1, 0]);
  const blockY = useTransform(progress, [0.12, 0.2], [24, 0]);

  // Digits drop in one at a time as the car rolls past them.
  const o1 = useTransform(progress, [0.26, 0.34], [0, 1]);
  const y1 = useTransform(progress, [0.26, 0.34], [26, 0]);
  const o2 = useTransform(progress, [0.38, 0.46], [0, 1]);
  const y2 = useTransform(progress, [0.38, 0.46], [26, 0]);
  const o3 = useTransform(progress, [0.5, 0.58], [0, 1]);
  const y3 = useTransform(progress, [0.5, 0.58], [26, 0]);

  const digits = [
    { v: DD, o: o1, y: y1 },
    { v: MM, o: o2, y: y2 },
    { v: YY, o: o3, y: y3 },
  ];

  return (
    <motion.div
      className="absolute inset-x-0 top-[7%] z-30 flex flex-col items-center text-center px-6 pointer-events-none"
      style={{ opacity: blockOpacity, y: blockY }}
    >
      <span className="font-montserrat text-[#f6e7d4] text-[9px] md:text-[11px] tracking-[0.42em] uppercase mb-3 drop-shadow-[0_1px_4px_rgba(30,16,6,0.7)]">
        The Celebration of Love
      </span>
      <h1 className="font-cinzel text-[#fdf6ec] text-[8vw] md:text-5xl tracking-[0.18em] leading-none drop-shadow-[0_2px_10px_rgba(30,16,6,0.8)]">
        SAVE THE DATE
      </h1>

      <div className="mt-5 md:mt-7 flex flex-col items-center gap-1 md:gap-2">
        {digits.map((dig, i) => (
          <motion.span
            key={i}
            className="font-cormorant text-[#fdf6ec] text-[14vw] md:text-7xl leading-[0.95] tabular-nums drop-shadow-[0_2px_10px_rgba(30,16,6,0.8)]"
            style={{ opacity: dig.o, y: dig.y }}
          >
            {dig.v}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
