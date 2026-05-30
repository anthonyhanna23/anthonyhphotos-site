export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
}

export const videos: Video[] = [
  {
    id: "1",
    youtubeId: "dQw4w9WgXcQ",
    title: "Summer Festival Recap",
    description: "A cinematic recap of the 2024 Summer Music Festival in Columbus, Ohio.",
  },
  {
    id: "2",
    youtubeId: "dQw4w9WgXcQ",
    title: "Downtown After Dark",
    description: "A short film exploring Columbus streets at night through a cinematic lens.",
  },
  {
    id: "3",
    youtubeId: "dQw4w9WgXcQ",
    title: "Portrait Session BTS",
    description: "Behind the scenes of a natural light portrait session in the studio.",
  },
];
