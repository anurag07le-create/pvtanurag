"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DetailsSection() {
  return (
    <div className="relative w-full min-h-screen z-40 bg-[#0A1A2F]">
      {/* Background Texture */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/elegant/teal-texture.png" 
          alt="Teal Texture" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[#061e27] mix-blend-multiply opacity-50" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-32 px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center max-w-2xl text-center space-y-12"
        >
          {/* Top Line */}
          <div className="w-full flex items-center justify-center space-x-4 opacity-80">
            <div className="h-[1px] w-12 md:w-24 bg-[#c9a763]"></div>
            <span className="font-montserrat text-xs md:text-sm tracking-[0.2em] uppercase text-[#c9a763]">
              The Wedding Celebration
            </span>
            <div className="h-[1px] w-12 md:w-24 bg-[#c9a763]"></div>
          </div>

          <h2 className="font-cinzel text-5xl md:text-7xl tracking-widest text-white drop-shadow-md">
            INVITE
          </h2>

          <p className="font-vibes text-3xl md:text-5xl text-[#c9a763] leading-relaxed">
            You are warmly invited to witness the union of
          </p>

          <div className="flex flex-col items-center space-y-4">
            <h3 className="font-cinzel text-4xl md:text-6xl text-white">
              Sagar
            </h3>
            <span className="font-vibes text-4xl text-[#c9a763]">&</span>
            <h3 className="font-cinzel text-4xl md:text-6xl text-white">
              Vandana
            </h3>
          </div>

          <div className="pt-8 w-full">
             <button 
                onClick={() => alert("The rest of the elegant itinerary is currently under construction!")}
                className="px-8 py-4 bg-transparent border border-[#c9a763] text-[#c9a763] font-montserrat text-sm tracking-[0.2em] uppercase hover:bg-[#c9a763] hover:text-[#0A1A2F] transition-colors duration-500"
              >
               View Details
             </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
