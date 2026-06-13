"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Road from "./Road";
import Car from "./Car";
import DateReveal from "./DateReveal";
import Destination from "./Destination";

export default function DriveScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Hero caption fades the moment you start scrolling.
  const captionOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // The driving car recedes and dissolves as the road turns to blush.
  const carScale = useTransform(scrollYProgress, [0, 0.8, 0.92], [1, 1, 0.7]);
  const carY = useTransform(scrollYProgress, [0, 0.8, 0.92], ["0%", "0%", "-8%"]);
  const carOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  return (
    <section ref={ref} className="relative h-[600vh] bg-[#2e1d12]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Centred "lane" — full-width on phones, a portrait strip on desktop */}
        <div className="absolute inset-0 mx-auto w-full max-w-[520px] overflow-hidden">
          <Road progress={scrollYProgress} />
          <DateReveal progress={scrollYProgress} />

          {/* Hero caption */}
          <motion.div
            className="absolute inset-x-0 bottom-[7%] z-30 text-center pointer-events-none"
            style={{ opacity: captionOpacity }}
          >
            <p className="font-montserrat text-[#f6e7d4] text-[10px] md:text-xs tracking-[0.4em] uppercase drop-shadow-[0_1px_6px_rgba(30,16,6,0.8)]">
              Scroll down to move the car
            </p>
            <motion.div
              className="mx-auto mt-3 w-[1px] h-10 bg-[#f6e7d4]/40 overflow-hidden"
              aria-hidden
            >
              <motion.div
                className="w-full h-1/2 bg-[#f6e7d4]"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* The driving car (centred to the whole stage so it stays aligned) */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ scale: carScale, y: carY, opacity: carOpacity }}
        >
          <div className="w-full max-w-[520px] flex justify-center">
            <Car />
          </div>
        </motion.div>

        {/* Blush arrival panel, full-bleed over everything */}
        <Destination progress={scrollYProgress} />
      </div>
    </section>
  );
}
