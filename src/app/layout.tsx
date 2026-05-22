import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Sagar & Vandana | Now Streaming",
  description: "A Netflix-style cinematic wedding invitation for Sagar and Vandana.",
  openGraph: {
    title: "Sagar & Vandana | Now Streaming",
    description: "Join us for the premiere of their forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} font-sans bg-netflix-black text-white antialiased selection:bg-netflix-red selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
