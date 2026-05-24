"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Sparkle = {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
};

export default function SparkleCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsPointerDevice(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Randomly spawn trail sparkles on mouse move
      if (Math.random() > 0.8) {
        addSparkle(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn a burst of 6-8 sparkles on click/tap
      const count = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        // slight random offset for burst effect
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        addSparkle(e.clientX + offsetX, e.clientY + offsetY, true);
      }
    };

    const addSparkle = (x: number, y: number, isBurst = false) => {
      const id = Math.random().toString(36).substring(2, 9);
      const size = isBurst ? 4 + Math.random() * 6 : 2 + Math.random() * 4;
      const colors = ["#d4af37", "#f3e5ab", "#ffffff"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      setSparkles(prev => [...prev, { id, x, y, size, color }]);
      
      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Custom Global Cursor Dot (Only for pointer devices) */}
      {isPointerDevice && (
        <motion.div
          className="fixed top-0 left-0 w-3 h-3 bg-[#d4af37] rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_10px_#d4af37]"
          animate={{ x: cursorPos.x - 6, y: cursorPos.y - 6 }}
          transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        />
      )}

      {/* Sparkles / Tap Effects */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        <AnimatePresence>
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y }}
              animate={{ 
                opacity: 0, 
                scale: 1.5, 
                x: sparkle.x + (Math.random() - 0.5) * 50, 
                y: sparkle.y + 20 + Math.random() * 50 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                width: sparkle.size,
                height: sparkle.size,
                backgroundColor: sparkle.color,
                boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Hide default cursor on desktop */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a, button, input {
            cursor: none !important;
          }
        }
      `}} />
    </>
  );
}
