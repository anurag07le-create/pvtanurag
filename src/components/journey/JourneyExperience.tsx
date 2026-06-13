"use client";

import React, { useEffect, useState } from "react";
import LenisProvider from "@/components/cinematic/LenisProvider";
import DriveScene from "./DriveScene";
import JourneyAudio from "./JourneyAudio";

export default function JourneyExperience() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Refined serif + tracked sans, loaded the same way as the other experiences.
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    setFontsLoaded(true);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <LenisProvider>
      <main className="min-h-[100dvh] bg-[#2e1d12] font-sans text-white selection:bg-[#caa17a] selection:text-[#2e1d12]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .font-cinzel { font-family: 'Cinzel', serif; }
          .font-cormorant { font-family: 'Cormorant Garamond', serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }

          html, body {
            background-color: #2e1d12;
            -webkit-tap-highlight-color: transparent;
          }
        `,
          }}
        />

        <div
          className={`relative w-full transition-opacity duration-700 ${
            fontsLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <JourneyAudio />
          <DriveScene />
        </div>
      </main>
    </LenisProvider>
  );
}
