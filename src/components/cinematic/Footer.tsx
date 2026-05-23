"use client"
import React from 'react'
import { motion } from 'framer-motion'

// Generate .ics calendar content for all events
function generateICS() {
  const events = [
    {
      title: 'Mehandi - Vandana & Sagar',
      start: '20261205T043000Z', // 10:00 AM IST = 4:30 AM UTC
      end: '20261205T103000Z',
      description: 'Kickstarting the festivities with colors, music, and joy.',
    },
    {
      title: 'Behrana - Vandana & Sagar',
      start: '20261205T143000Z', // 8:00 PM IST = 2:30 PM UTC
      end: '20261205T173000Z',
      description: 'A divine evening of prayers and traditional blessings.',
    },
    {
      title: 'Haldi - Vandana & Sagar',
      start: '20261206T043000Z', // 10:00 AM IST
      end: '20261206T083000Z',
      description: 'The vibrant morning ritual of purification and love.',
    },
    {
      title: 'Wedding - Vandana & Sagar',
      start: '20261206T103000Z', // 4:00 PM IST
      end: '20261206T133000Z',
      description: 'The grand ceremony where two souls become one.',
    },
    {
      title: 'Reception - Vandana & Sagar',
      start: '20261206T143000Z', // 8:00 PM IST
      end: '20261206T183000Z',
      description: 'A night of celebration, dining, and dancing.',
    },
  ]

  const vevents = events.map(e => `BEGIN:VEVENT
DTSTART:${e.start}
DTEND:${e.end}
SUMMARY:${e.title}
DESCRIPTION:${e.description}
LOCATION:https://maps.app.goo.gl/bhebNmonJSe1KHay5
STATUS:CONFIRMED
END:VEVENT`).join('\n')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vandana & Sagar Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${vevents}
END:VCALENDAR`
}

function handleDownloadCalendar() {
  const ics = generateICS()
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'vandana-sagar-wedding.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function handleWhatsAppShare() {
  const message = encodeURIComponent(
    `You're invited to Vandana & Sagar's wedding!\n\n5th-6th December 2026\nLocation: https://maps.app.goo.gl/bhebNmonJSe1KHay5\n\nView the invitation: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nWe can't wait to celebrate with you.`
  )
  window.open(`https://wa.me/?text=${message}`, '_blank')
}

export default function Footer() {
  return (
    <section className="relative w-full bg-[#050505] py-20 md:py-32 px-4 z-20">
      <div className="max-w-lg mx-auto text-center">

        {/* Elegant sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="font-serif text-3xl md:text-5xl text-white font-light italic mb-4 leading-tight">
            With Love,
          </h3>
          <p className="font-serif text-2xl md:text-4xl text-white/60 font-light italic mb-2">
            Vandana & Sagar
          </p>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-4 mb-8" />
          <p className="font-sans text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase">
            & Our Beloved Families
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-col gap-4"
        >
          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] py-4 px-6 rounded-lg text-sm font-sans tracking-widest uppercase hover:bg-[#25D366]/20 active:scale-[0.98] transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share with Family
          </button>

          {/* Save to Calendar */}
          <button
            onClick={handleDownloadCalendar}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/15 text-white py-4 px-6 rounded-lg text-sm font-sans tracking-widest uppercase hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Save All Dates to Calendar
          </button>
        </motion.div>

        {/* Bottom credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 md:mt-28"
        >
          <p className="font-mono text-white/10 text-[9px] tracking-widest uppercase">
            Made with love | December 2026
          </p>
        </motion.div>

      </div>
    </section>
  )
}
