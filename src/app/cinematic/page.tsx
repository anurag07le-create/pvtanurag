import type { Metadata } from "next";
import CinematicExperience from "@/components/cinematic/CinematicExperience";

export const metadata: Metadata = {
  title: "Sagar & Vandana | Cinematic Wedding Invitation",
  description:
    "A cinematic wedding invitation for Sagar and Vandana, with the story, celebrations, RSVP, and calendar details.",
  openGraph: {
    title: "Sagar & Vandana | Cinematic Wedding Invitation",
    description:
      "Step into the wedding story of Sagar and Vandana and join the December 2026 celebrations.",
    type: "website",
  },
};

export default function CinematicPage() {
  return <CinematicExperience />;
}
