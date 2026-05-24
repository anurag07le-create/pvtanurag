"use client";

import React, { useEffect, useState } from "react";
import LenisProvider from "@/components/cinematic/LenisProvider";
import HeroParallax from "./HeroParallax";
import DetailsSection from "./DetailsSection";

export default function ElegantExperience() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add elegant fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    setIsLoaded(true);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <LenisProvider>
      <main className="min-h-[100dvh] bg-[#0A1A2F] font-sans text-white selection:bg-[#c9a763] selection:text-black overflow-x-hidden">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .font-cinzel { font-family: 'Cinzel', serif; }
          .font-vibes { font-family: 'Great Vibes', cursive; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }

          html, body {
            background-color: #0A1A2F;
            -webkit-tap-highlight-color: transparent;
          }
        `,
          }}
        />

        {isLoaded && (
          <div className="relative w-full">
             <HeroParallax />
             <DetailsSection />
          </div>
        )}
      </main>
    </LenisProvider>
  );
}
