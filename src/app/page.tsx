"use client"
import React, { useState } from 'react'
import Profiles from '@/components/netflix/Profiles'
import Navbar from '@/components/netflix/Navbar'
import Billboard from '@/components/netflix/Billboard'
import Row from '@/components/netflix/Row'
import InfoModal from '@/components/netflix/InfoModal'
import NetflixPlayer from '@/components/netflix/NetflixPlayer'
import type { GuestProfile, NetflixItem } from '@/components/netflix/types'

const story: NetflixItem[] = [
  {
    id: 'story-1',
    type: 'story',
    title: 'The First Look',
    img: '/images/photo1.jpeg',
    eyebrow: 'Episode 01',
    match: '98% Match',
    year: '2026',
    rating: 'U/A 13+',
    duration: '7 min',
    quality: 'HD',
    synopsis: 'A quiet chapter from the beginning of their story, told through frames that feel more like cinema than a conventional invite.',
    cast: 'Sagar, Vandana',
    genres: 'Romance, Origin Story',
    mood: 'Soft, Intimate, Cinematic',
    tags: ['First Meet', 'Origin', 'Private Cut'],
  },
  {
    id: 'story-2',
    type: 'story',
    title: 'The Pre-Wedding Cut',
    img: '/images/photo2.jpeg',
    eyebrow: 'Episode 02',
    match: '99% Match',
    year: '2026',
    rating: 'U/A 13+',
    duration: '12 min',
    quality: '4K',
    synopsis: 'The couple poster moment: elegant, stylish, and designed to make every guest feel they are watching a premium wedding film launch.',
    cast: 'Sagar, Vandana, Creative Team',
    genres: 'Romance, Visual Album',
    mood: 'Stylish, Editorial, Premium',
    tags: ['Poster', 'Photoshoot', 'Cinematic'],
  },
  {
    id: 'story-3',
    type: 'story',
    title: 'Two Families, One Frame',
    img: '/images/photo3.jpeg',
    eyebrow: 'Episode 03',
    match: '97% Match',
    year: '2026',
    rating: 'U/A 13+',
    duration: '9 min',
    quality: 'HD',
    synopsis: 'A family-forward chapter that treats blessings, rituals, and togetherness with the dignity of a feature documentary.',
    cast: 'Family & Friends',
    genres: 'Family, Celebration',
    mood: 'Warm, Emotional, Grand',
    tags: ['Family', 'Blessings', 'Tradition'],
  },
  {
    id: 'story-4',
    type: 'gallery',
    title: 'Behind The Scenes',
    img: '/images/photo4.jpeg',
    eyebrow: 'Bonus',
    match: '95% Match',
    year: '2026',
    rating: 'U/A 13+',
    duration: '6 min',
    quality: 'HD',
    synopsis: 'Candid laughter, rehearsals, and the small in-between moments that usually never make it to an invitation.',
    cast: 'Friends, Cousins, Family',
    genres: 'Candid, Comedy, Celebration',
    mood: 'Fun, Human, Real',
    tags: ['Candid', 'BTS', 'Friends'],
  },
]

const events: NetflixItem[] = [
  {
    id: 'event-mehendi',
    type: 'event',
    title: 'Episode 01: Mehendi Morning',
    img: '/images/photo5.jpeg',
    eyebrow: 'Dec 5',
    year: '2026',
    rating: 'U/A 13+',
    duration: '10:00 AM',
    quality: 'HD',
    date: '5 December 2026',
    time: '10:00 AM',
    venue: 'Hotel Natraj & Resort',
    address: 'Gujarat, India',
    synopsis: 'The wedding week opens with color, blessings, fresh mehendi, and the quiet excitement of two families arriving into celebration mode.',
    cast: 'Bride Side, Groom Side, Family & Friends',
    genres: 'Tradition, Family, Celebration',
    mood: 'Colorful, Sacred, Warm',
    tags: ['Mehendi', 'Morning', 'Family'],
  },
  {
    id: 'event-behrana',
    type: 'event',
    title: 'Episode 02: Behrana Sandhya',
    img: '/images/photo2.jpeg',
    eyebrow: 'Dec 5',
    year: '2026',
    rating: 'U/A 13+',
    duration: '8:00 PM',
    quality: '4K',
    date: '5 December 2026',
    time: '8:00 PM',
    venue: 'Hotel Natraj & Resort',
    address: 'Gujarat, India',
    synopsis: 'A devotional evening with Sindhi tradition at the centre: intimate, graceful, and rooted in family blessings before the wedding day.',
    cast: 'Family & Invited Guests',
    genres: 'Devotional, Tradition, Family',
    mood: 'Elegant, Spiritual, Intimate',
    tags: ['Behrana', 'Sindhi Ritual', 'Evening'],
  },
  {
    id: 'event-haldi',
    type: 'event',
    title: 'Episode 03: Haldi Morning',
    img: '/images/photo1.jpeg',
    eyebrow: 'Dec 6',
    year: '2026',
    rating: 'U/A 13+',
    duration: '10:00 AM',
    quality: 'HD',
    date: '6 December 2026',
    time: '10:00 AM',
    venue: 'Hotel Natraj & Resort',
    address: 'Gujarat, India',
    synopsis: 'A sunlit celebration of blessings, turmeric, laughter, and the final family rituals before the mandap takes focus.',
    cast: 'Close Family & Friends',
    genres: 'Tradition, Family',
    mood: 'Bright, Sacred, Playful',
    tags: ['Haldi', 'Blessings', 'Morning'],
  },
  {
    id: 'event-wedding',
    type: 'event',
    title: 'Finale: The Wedding Ceremony',
    img: '/images/couple-hero.png',
    eyebrow: 'Dec 6',
    year: '2026',
    rating: 'U/A 13+',
    duration: '4:00 PM',
    quality: '4K',
    date: '6 December 2026',
    time: '4:00 PM',
    venue: 'Hotel Natraj & Resort',
    address: 'Gujarat, India',
    synopsis: 'The main premiere: sacred vows, seven promises, and the beginning of Sagar and Vandana as one family.',
    cast: 'Sagar, Vandana, Family & Friends',
    genres: 'Wedding, Ritual, Romance',
    mood: 'Sacred, Grand, Emotional',
    tags: ['Wedding', 'Vows', 'Mandap'],
  },
  {
    id: 'event-reception',
    type: 'event',
    title: 'After Credits: Reception',
    img: '/images/photo3.jpeg',
    eyebrow: 'Dec 6',
    year: '2026',
    rating: 'U/A 13+',
    duration: '8:00 PM',
    quality: '4K',
    date: '6 December 2026',
    time: '8:00 PM',
    venue: 'Hotel Natraj & Resort',
    address: 'Gujarat, India',
    synopsis: 'A formal evening of greetings, dinner, portraits, and the final celebration after the ceremony.',
    cast: 'All Guests',
    genres: 'Reception, Dinner, Celebration',
    mood: 'Elegant, Formal, Grand',
    tags: ['Reception', 'Dinner', 'Portraits'],
  },
]

const utilities: NetflixItem[] = [
  {
    id: 'reserve-seat',
    type: 'utility',
    title: 'Reserve My Seat',
    img: '/images/photo4.jpeg',
    eyebrow: 'Action',
    match: 'Essential',
    year: '2026',
    rating: 'Guest',
    duration: '1 min',
    quality: 'HD',
    synopsis: 'Confirm attendance, guest count, event preferences, and receive a digital wedding pass styled like a premiere ticket.',
    cast: 'Invited Guests',
    genres: 'RSVP, Guest Services',
    mood: 'Fast, Clear, Premium',
    tags: ['RSVP', 'Digital Pass', 'QR Ready'],
  },
  {
    id: 'open-map',
    type: 'utility',
    title: 'Venue & Route',
    img: '/images/photo5.jpeg',
    eyebrow: 'Map',
    match: 'Helpful',
    year: '2026',
    rating: 'Guest',
    duration: '2 min',
    quality: 'HD',
    synopsis: 'One-tap route to Hotel Natraj & Resort, with the full wedding schedule available in the episode cards.',
    cast: 'All Guests',
    genres: 'Travel, Venue',
    mood: 'Useful, Direct, Clean',
    tags: ['Map', 'Parking', 'Stay'],
  },
  {
    id: 'my-list',
    type: 'utility',
    title: 'My Wedding List',
    img: '/images/photo1.jpeg',
    eyebrow: 'New',
    match: 'Smart',
    year: '2026',
    rating: 'Guest',
    duration: '3 min',
    quality: 'HD',
    synopsis: 'Guests can save the events they plan to attend and get a compact personalized wedding schedule.',
    cast: 'Every Guest Profile',
    genres: 'Planner, Schedule',
    mood: 'Personal, Useful, Modern',
    tags: ['My List', 'Planner', 'Schedule'],
  },
  {
    id: 'poster-invite',
    type: 'utility',
    title: 'Download Poster Invite',
    img: '/images/couple-hero.png',
    eyebrow: 'Bonus',
    match: 'Premium',
    year: '2026',
    rating: 'Guest',
    duration: 'Instant',
    quality: '4K',
    synopsis: 'A shareable cinematic poster invite for family WhatsApp groups and personal guest reminders.',
    cast: 'Sagar & Vandana',
    genres: 'Poster, Invite',
    mood: 'Shareable, Premium, Memorable',
    tags: ['Poster', 'Invite', 'Download'],
  },
]

const comingSoon: NetflixItem[] = [
  {
    id: 'live-stream',
    type: 'utility',
    title: 'Live Stream Room',
    img: '/images/photo2.jpeg',
    eyebrow: 'Coming Soon',
    match: 'For distant guests',
    year: '2026',
    rating: 'Guest',
    duration: 'Live',
    quality: 'HD',
    synopsis: 'A private stream room that can unlock on the wedding day for relatives and friends who cannot travel.',
    cast: 'Remote Guests',
    genres: 'Live, Ceremony',
    mood: 'Inclusive, Premium, Useful',
    tags: ['Live', 'Remote Guests', 'Unlocks Dec 6'],
  },
  {
    id: 'album-drop',
    type: 'gallery',
    title: 'Wedding Album Drop',
    img: '/images/photo3.jpeg',
    eyebrow: 'Post Wedding',
    match: 'Coming Soon',
    year: '2026',
    rating: 'Guest',
    duration: 'After Premiere',
    quality: '4K',
    synopsis: 'After the wedding, this same website becomes the official photo and video gallery instead of disappearing.',
    cast: 'All Wedding Memories',
    genres: 'Gallery, Highlights',
    mood: 'Evergreen, Elegant, Emotional',
    tags: ['Album', 'Highlights', 'Post Wedding'],
  },
]

export default function Home() {
  const [profile, setProfile] = useState<GuestProfile | null>(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [selectedItem, setSelectedItem] = useState<NetflixItem | null>(null)

  const openInfo = (item?: NetflixItem) => {
    setSelectedItem(item || null)
    setShowInfo(true)
  }

  if (!profile) {
    return <Profiles onSelect={setProfile} />
  }

  return (
    <div className="relative min-h-screen bg-netflix-black pb-12">
      <Navbar profile={profile} />
      <Billboard profile={profile} onPlay={() => setShowPlayer(true)} onInfo={() => openInfo()} />

      <main className="relative z-20 pb-10">
        <Row
          title={`Top Picks For ${profile.label}`}
          subtitle="Personalized wedding premiere cards."
          items={profile.id === 'friends' ? [events[1], events[4], utilities[0], story[3]] : [events[3], utilities[0], events[0], utilities[1]]}
          onItemClick={openInfo}
        />
        <Row
          title="Continue Watching Their Story"
          subtitle="A cinematic invitation, told as episodes."
          items={story}
          isLargeRow
          onItemClick={openInfo}
        />
        <Row
          title="Wedding Week Episodes"
          subtitle="Every ceremony gets a serious episode card."
          items={events}
          onItemClick={openInfo}
        />
        <Row
          title="Guest Actions"
          subtitle="Out-of-the-box touches that make the invite useful."
          items={utilities}
          onItemClick={openInfo}
        />
        <Row
          title="Coming Soon After The Wedding"
          subtitle="The site can transform into a live room and album drop."
          items={comingSoon}
          onItemClick={openInfo}
        />
      </main>

      <NetflixPlayer isOpen={showPlayer} onClose={() => setShowPlayer(false)} />

      <InfoModal
        isOpen={showInfo}
        data={selectedItem}
        onClose={() => setShowInfo(false)}
        onPlay={() => {
          setShowInfo(false)
          setShowPlayer(true)
        }}
      />
    </div>
  )
}
