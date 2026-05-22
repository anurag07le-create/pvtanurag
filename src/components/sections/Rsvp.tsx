"use client"
import React, { useState } from 'react'
import { HennaBorder } from '@/components/ui/Ornaments'
import { motion, AnimatePresence } from 'framer-motion'

export default function Rsvp() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    events: {
      mehendi: false,
      wedding: false,
      reception: false
    },
    attending: 'yes',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save to localStorage for demo purposes
    localStorage.setItem('wedding_rsvp', JSON.stringify(formData))
    console.log("RSVP Submitted:", formData)
    
    // TODO: Connect to Formspree or Supabase for real submissions
    
    setIsSubmitted(true)
  }

  const handleCheckboxChange = (event: keyof typeof formData.events) => {
    setFormData(prev => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: !prev.events[event]
      }
    }))
  }

  return (
    <section id="rsvp" className="py-24 px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-deep-red mb-4">Aayenge Na? <span className="text-2xl md:text-3xl text-gold block mt-2">आएंगे ना?</span></h2>
          <p className="text-lg text-maroon italic">"Aapka intezaar rahega — batao, aa rahe ho!"</p>
        </div>

        <div className="relative bg-ivory/95 backdrop-blur-md rounded-xl border border-gold shadow-2xl p-6 md:p-12 overflow-hidden">
          
          <HennaBorder className="absolute inset-0 w-full h-full text-gold opacity-20 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="relative z-10 space-y-6"
              >
                <div>
                  <label className="block font-playfair text-deep-red text-lg mb-2">Full Name <span className="text-sm font-poppins text-maroon">(अपना नाम लिखें)</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Aapka naam likho..."
                    className="w-full bg-off-white border border-gold/50 rounded-md px-4 py-3 focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red text-dark-text placeholder-dark-text/40 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block font-playfair text-deep-red text-lg mb-2">Number of Guests <span className="text-sm font-poppins text-maroon">(कितने लोग?)</span></label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    required
                    placeholder="Kitne log aa rahe ho?"
                    className="w-full bg-off-white border border-gold/50 rounded-md px-4 py-3 focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red text-dark-text placeholder-dark-text/40 transition-colors"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block font-playfair text-deep-red text-lg mb-3">Which Events will you attend?</label>
                  <div className="space-y-3">
                    {Object.entries({
                      mehendi: "Mehendi & Sangeet",
                      wedding: "Wedding Ceremony / Vivah",
                      reception: "Reception"
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.events[key as keyof typeof formData.events] ? 'bg-deep-red border-deep-red' : 'border-gold bg-off-white group-hover:border-deep-red'}`}>
                          {formData.events[key as keyof typeof formData.events] && <span className="text-ivory text-xs">✓</span>}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={formData.events[key as keyof typeof formData.events]}
                          onChange={() => handleCheckboxChange(key as keyof typeof formData.events)}
                        />
                        <span className="text-dark-text font-medium select-none">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-playfair text-deep-red text-lg mb-3">Confirm Attendance</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.attending === 'yes' ? 'border-deep-red' : 'border-gold group-hover:border-deep-red'}`}>
                        {formData.attending === 'yes' && <div className="w-3 h-3 bg-deep-red rounded-full" />}
                      </div>
                      <input 
                        type="radio" 
                        name="attending"
                        className="hidden"
                        checked={formData.attending === 'yes'}
                        onChange={() => setFormData({...formData, attending: 'yes'})}
                      />
                      <span className="text-dark-text font-medium select-none">Haan, zaroor aayenge! 🎉 (Yes, we'll be there!)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.attending === 'no' ? 'border-deep-red' : 'border-gold group-hover:border-deep-red'}`}>
                        {formData.attending === 'no' && <div className="w-3 h-3 bg-deep-red rounded-full" />}
                      </div>
                      <input 
                        type="radio" 
                        name="attending"
                        className="hidden"
                        checked={formData.attending === 'no'}
                        onChange={() => setFormData({...formData, attending: 'no'})}
                      />
                      <span className="text-dark-text font-medium select-none">Afsos, nahi aa payenge 😢 (Sorry, can't make it)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-playfair text-deep-red text-lg mb-2">A message for the couple <span className="text-sm font-poppins text-maroon">(Optional)</span></label>
                  <textarea 
                    rows={3}
                    placeholder="Sagar aur Vandana ke liye kuch likho..."
                    className="w-full bg-off-white border border-gold/50 rounded-md px-4 py-3 focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red text-dark-text placeholder-dark-text/40 transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-deep-red text-ivory border-2 border-gold py-4 rounded-md font-semibold text-lg hover:bg-maroon hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  RSVP Bhejo 💌 / Send RSVP
                </button>

              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-12 min-h-[400px]"
              >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-5xl">🎊</span>
                </div>
                <h3 className="text-3xl font-playfair text-deep-red mb-4">Shukriya! / Thank you!</h3>
                <p className="text-lg text-dark-text mb-2">Aapka RSVP mil gaya. Milte hain shaadi mein!</p>
                <p className="text-lg text-maroon font-medium">आपका RSVP मिल गया। मिलते हैं शादी में!</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
