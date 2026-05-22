export interface NetflixItem {
  id: string;
  title: string;
  img: string;
  type?: 'story' | 'event' | 'utility' | 'gallery';
  logo?: string;
  eyebrow?: string;
  match?: string;
  year?: string;
  rating?: string;
  duration?: string;
  quality?: string;
  date?: string;
  time?: string;
  venue?: string;
  address?: string;
  cta?: string;
  tags?: string[];
  synopsis: string;
  cast?: string;
  genres?: string;
  mood?: string;
}

export interface GuestProfile {
  id: string;
  label: string;
  initial: string;
  accent: string;
  tagline: string;
}
