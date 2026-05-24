"use client";

import React, { useEffect, useState } from "react";
import LenisProvider from "@/components/cinematic/LenisProvider";
import HeroParallax from "./HeroParallax";
import ElegantStory from "./ElegantStory";
import ElegantPhotoGrid from "./ElegantPhotoGrid";
import ElegantItinerary from "./ElegantItinerary";
import ElegantGoldenThread from "./ElegantGoldenThread";
import ElegantInvitationMessage from "./ElegantInvitationMessage";
import ElegantFooter from "./ElegantFooter";
import ElegantLoader from "./ElegantLoader";
import ElegantCountdown from "./ElegantCountdown";
import SparkleCursor from "./SparkleCursor";

import ElegantAudioPlayer from "./ElegantAudioPlayer";

export default function ElegantExperience() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    // Add elegant fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    setFontsLoaded(true);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <LenisProvider>
      <main className="min-h-[100dvh] bg-[#0A1A2F] font-sans text-white selection:bg-[#c9a763] selection:text-black">
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

        {fontsLoaded && !envelopeOpened && <ElegantLoader onComplete={() => setEnvelopeOpened(true)} />}

        {fontsLoaded && (
          <div 
            className={`relative w-full transition-opacity duration-1000 ${
              envelopeOpened ? "opacity-100" : "opacity-0"
            }`}
          >
             {envelopeOpened && <SparkleCursor />}
             {envelopeOpened && <ElegantGoldenThread />}
             {envelopeOpened && <ElegantAudioPlayer />}
             <HeroParallax />
             <ElegantInvitationMessage />
             <ElegantCountdown />
             <ElegantStory />
             <ElegantPhotoGrid />
             <ElegantItinerary />
             <ElegantFooter />
          </div>
        )}
      </main>
    </LenisProvider>
  );
}
