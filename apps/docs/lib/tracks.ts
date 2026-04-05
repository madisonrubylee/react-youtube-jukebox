import type { JukeboxTrack, PlayListItem } from "react-youtube-jukebox";

export const demoTracks: JukeboxTrack[] = [
  {
    videoId: "yTg4v2Cnfyo",
    title: "Soul Below",
    artist: "Ljones",
  },
  {
    videoId: "s4MQku9Mkwc",
    title: "Something About Us",
    artist: "Daft Punk",
  },
  {
    videoId: "YnP8RwZqUUM",
    title: "Pick Your Poison",
    artist: "KiLLOWEN",
  },
];

export const singleDemoTrack: JukeboxTrack[] = [demoTracks[0]!];

export const emptyDemoTracks: JukeboxTrack[] = [];

export const demoPlaylist: PlayListItem[] = [
  {
    title: "Chill Vibes",
    image:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=640&q=80",
    data: [
      { title: "Soul Below", artist: "Ljones", videoId: "yTg4v2Cnfyo" },
      {
        title: "Something About Us",
        artist: "Daft Punk",
        videoId: "s4MQku9Mkwc",
      },
      { title: "Pick Your Poison", artist: "KiLLOWEN", videoId: "YnP8RwZqUUM" },
    ],
  },
  {
    title: "Focus",
    data: [
      { title: "Weightless", artist: "Marconi Union", videoId: "UfcAVejslrU" },
      { title: "Clair de Lune", artist: "Debussy", videoId: "CvFH_6DNRCY" },
    ],
  },
  {
    title: "Energy",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=640&q=80",
    data: [
      {
        title: "Blinding Lights",
        artist: "The Weeknd",
        videoId: "4NRXx6U8ABQ",
      },
      { title: "Levitating", artist: "Dua Lipa", videoId: "TUVcZfQe-Kw" },
    ],
  },
];

export const singlePlaylistDemo: PlayListItem[] = [
  {
    title: "Chill Vibes",
    image:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=640&q=80",
    data: [
      { title: "Soul Below", artist: "Ljones", videoId: "yTg4v2Cnfyo" },
    ],
  },
];

export const playlistWithoutImageDemo: PlayListItem[] = [
  {
    title: "Focus Flow",
    data: [
      { title: "Weightless", artist: "Marconi Union", videoId: "UfcAVejslrU" },
      { title: "Clair de Lune", artist: "Debussy", videoId: "CvFH_6DNRCY" },
      {
        title: "Near Light",
        artist: "Olafur Arnalds",
        videoId: "oAhO5eegMfY",
      },
    ],
  },
];

export const emptyPlaylistDemo: PlayListItem[] = [
  {
    title: "Coming Soon",
    data: [],
  },
];
