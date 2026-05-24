"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PixelRSVP() {
  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `You're invited to Sagar & Vandana's wedding!\n\n5th-6th December 2026\nLocation: https://maps.app.goo.gl/bhebNmonJSe1KHay5\n\nView the invitation: ${typeof window !== 'undefined' ? window.location.href : ''}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="relative w-full bg-[#000000] py-32 z-50 border-t-4 border-[#DAA520] flex flex-col items-center">
      
      {/* 8-bit Heart animation */}
      <motion.div 
        className="mb-12"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#DAA520" className="pixelated">
          <path d="M7 3h-4v4h-2v6h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-6h-2v-4h-4v-2h-4v2h-2v-2z" />
        </svg>
      </motion.div>

      <h2 className="font-pixel text-2xl md:text-4xl text-white mb-6 text-center leading-relaxed">
        LEVEL COMPLETE!
      </h2>
      
      <p className="font-pixel text-[10px] md:text-xs text-[#DAA520] mb-16 tracking-widest text-center">
        JOIN OUR PARTY
      </p>

      {/* Retro Buttons */}
      <div className="flex flex-col gap-6 w-full max-w-xs px-4">
        <button 
          onClick={handleWhatsAppShare}
          className="relative group bg-transparent border-4 border-[#25D366] text-[#25D366] py-4 px-6 font-pixel text-[10px] md:text-xs hover:bg-[#25D366] hover:text-black transition-colors"
        >
          <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-black px-2 text-[#25D366] group-hover:text-black text-[8px]">PRESS A TO</span>
          SHARE ON WHATSAPP
        </button>

        <button 
          className="relative group bg-transparent border-4 border-[#DAA520] text-[#DAA520] py-4 px-6 font-pixel text-[10px] md:text-xs hover:bg-[#DAA520] hover:text-black transition-colors"
        >
          <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-black px-2 text-[#DAA520] group-hover:text-black text-[8px]">PRESS B TO</span>
          SAVE TO CALENDAR
        </button>
      </div>

      <div className="mt-32 font-pixel text-[8px] text-white/30 uppercase tracking-[0.5em]">
        GAME OVER | 2026
      </div>
    </div>
  );
}
