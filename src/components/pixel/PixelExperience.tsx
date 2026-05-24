"use client";

import React, { useEffect, useState } from "react";
import LenisProvider from "@/components/cinematic/LenisProvider";
import HeroSky from "./HeroSky";
import PalaceExterior from "./PalaceExterior";
import CourtyardFountain from "./CourtyardFountain";
import PixelItinerary from "./PixelItinerary";
import PixelRSVP from "./PixelRSVP";

export default function PixelExperience() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add the retro pixel font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Global body styling for the pixel route
    document.body.style.backgroundColor = "#000022"; // Deep night sky blue
    document.documentElement.style.backgroundColor = "#000022";
    
    setIsLoaded(true);

    return () => {
      document.head.removeChild(link);
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  return (
    <LenisProvider>
      <main className="min-h-[100dvh] bg-[#000022] font-sans text-white selection:bg-[#DAA520] selection:text-black overflow-hidden">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .font-pixel { font-family: 'Press Start 2P', cursive; }
          
          /* Pixelated rendering for images */
          .pixelated {
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
          }

          html, body {
            background-color: #000022;
            -webkit-tap-highlight-color: transparent;
          }
        `,
          }}
        />

        {isLoaded && (
          <div className="relative w-full">
            <HeroSky />
            <PalaceExterior />
            <CourtyardFountain />
            <PixelItinerary />
            <PixelRSVP />
          </div>
        )}
      </main>
    </LenisProvider>
  );
}
