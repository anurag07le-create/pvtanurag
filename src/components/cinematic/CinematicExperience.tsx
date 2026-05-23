"use client";

import React, { useEffect, useState } from "react";
import LenisProvider from "@/components/cinematic/LenisProvider";
import Hero from "@/components/cinematic/Hero";
import KineticTypography from "@/components/cinematic/KineticTypography";
import Countdown from "@/components/cinematic/Countdown";
import Story from "@/components/cinematic/Story";
import Gallery from "@/components/cinematic/Gallery";
import VideoMaskText from "@/components/cinematic/VideoMaskText";
import ParallaxSection from "@/components/cinematic/ParallaxSection";
import StackingEvents from "@/components/cinematic/StackingEvents";
import GoldenThread from "@/components/cinematic/GoldenThread";
import InvitationMessage from "@/components/cinematic/InvitationMessage";
import Footer from "@/components/cinematic/Footer";
import Cursor from "@/components/cinematic/Cursor";
import Loader from "@/components/cinematic/Loader";
import AudioPlayer from "@/components/cinematic/AudioPlayer";

export default function CinematicExperience() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#050505";
    document.documentElement.style.backgroundColor = "#050505";
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  return (
    <LenisProvider>
      <main className="min-h-[100dvh] bg-[#050505] font-sans text-[#f5f5f5] selection:bg-white selection:text-black">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@200;300;400&display=swap');

          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }

          html, body {
            background-color: #050505;
            -webkit-tap-highlight-color: transparent;
            -webkit-text-size-adjust: 100%;
          }

          @media (hover: hover) and (pointer: fine) {
            html, body, a, button, input { cursor: none; }
          }
        `,
          }}
        />

        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

        <div
          className={`transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <GoldenThread />
          <Cursor />
          <AudioPlayer />
          <Hero />
          <InvitationMessage />
          <KineticTypography />
          <Countdown />
          <Story />
          <Gallery />
          <VideoMaskText />
          <StackingEvents />
          <Footer />
        </div>
      </main>
    </LenisProvider>
  );
}
