import React from 'react';
import PixelExperience from '@/components/pixel/PixelExperience';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sagar & Vandana | A Pixel Story',
  description: 'Join us for our wedding celebration.',
};

export default function PixelPage() {
  return <PixelExperience />;
}
