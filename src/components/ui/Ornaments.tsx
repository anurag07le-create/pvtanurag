import React from 'react'

export const MandalaSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
    <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" />
    <path d="M50 35 Q65 50 50 65 Q35 50 50 35 Z" stroke="currentColor" strokeWidth="0.5" />
  </svg>
)

export const LotusCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 50 50" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 5 C30 15 45 20 45 25 C45 35 30 45 25 45 C20 45 5 35 5 25 C5 20 20 15 25 5 Z" />
    <path d="M25 15 C28 20 35 25 35 30 C35 35 28 40 25 40 C22 40 15 35 15 30 C15 25 22 20 25 15 Z" fill="var(--ivory)" />
  </svg>
)

export const DiyaRow = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center gap-6 ${className}`}>
    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
      <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="var(--gold)" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 8 8 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 8 12 2 12 2Z" />
        <path d="M4 18C4 18 8 14 12 14C16 14 20 18 20 18V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V18Z" fill="var(--deep-red)" />
      </svg>
    ))}
  </div>
)

export const HennaBorder = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="96" height="96" stroke="currentColor" strokeWidth="0.5" />
    <rect x="5" y="5" width="90" height="90" stroke="currentColor" strokeWidth="1" />
    <path d="M5 15 Q15 15 15 5" stroke="currentColor" strokeWidth="0.5" />
    <path d="M85 5 Q85 15 95 15" stroke="currentColor" strokeWidth="0.5" />
    <path d="M95 85 Q85 85 85 95" stroke="currentColor" strokeWidth="0.5" />
    <path d="M15 95 Q15 85 5 85" stroke="currentColor" strokeWidth="0.5" />
  </svg>
)
