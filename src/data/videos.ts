export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
}

export interface Reel {
  id: string;
  /** The Instagram shortcode, e.g. "C1a2B3c4D5e" from instagram.com/reel/C1a2B3c4D5e/ */
  instagramId: string;
  /** Instagram permalink type — "reel" for /reel/ URLs, "p" for /p/ post URLs. Defaults to "reel". */
  type?: "reel" | "p";
  title: string;
  description: string;
}

// Long form — YouTube
export const longFormVideos: Video[] = [
  {
    id: "1",
    youtubeId: "iU71SO2cAGw",
    title: "Finding Middle Ground: Hot Buddha's Pursuit of Balance (A Documentary)",
    description: "Documentary",
  },
  {
    id: "2",
    youtubeId: "wx7zp9jxbw0",
    title: "vlogging on a digicam?",
    description: "Vlog",
  },
  {
    id: "3",
    youtubeId: "nsRF0rXxC0M",
    title: "Shooting Video in Canada Wildfire Smoke",
    description: "Vlog",
  },
];

// Short form — Instagram Reels
export const shortFormReels: Reel[] = [
  {
    id: "1",
    instagramId: "Db8u_CliWcG",
    title: "Lightroom Alternatives",
    description: "Informational Vlog",
  },
  {
    id: "2",
    instagramId: "DcHTCAiPKKV",
    title: "Building Lightroom with AI",
    description: "Informational Vlog",
  },
  {
    id: "3",
    instagramId: "Dcbmkb0iPVx",
    title: "Building Photoshop with AI",
    description: "Informational Vlog",
  },
  {
    id: "4",
    instagramId: "DaoPl2zvK-k",
    title: "Taiwan Cinematic Video",
    description: "Cinematic Edit",
  },
  {
    id: "5",
    instagramId: "DbYt8xYivzO",
    title: "Ohio's Worst Air Quality",
    description: "Cinematic Journalism",
  },
  {
    id: "6",
    instagramId: "DSwGOHjAP-i",
    title: "Snow Scenes",
    description: "Cinematic Edit",
  },
  {
    id: "7",
    instagramId: "DN0jW3DQKc8",
    title: "How I Edited This",
    description: "Informational Vlog",
  },
  {
    id: "8",
    instagramId: "DcMPZ9-INN7",
    type: "p",
    title: "Top 5 Real Estate Mistakes",
    description: "Informational",
  },
  {
    id: "9",
    instagramId: "DZvHhjBogsh",
    type: "p",
    title: "My Name is Marc",
    description: "Cinematic Comedy",
  },
  {
    id: "10",
    instagramId: "DZFO-osooMC",
    type: "p",
    title: "Why Invest in Columbus",
    description: "Informational",
  },
];
