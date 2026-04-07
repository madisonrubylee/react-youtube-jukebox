import type { JukeboxTrack, PlayListItem } from "react-youtube-jukebox";

const CHILL_COVER_IMAGE = "/chill.jpg";
const HIPHOP_COVER_IMAGE = "/hiphop.jpg";
const K_HIPHOP_COVER_IMAGE = "/slom.jpg";
const LOWKEY_COVER_IMAGE = "/lowkey.jpg";

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
    title: "Chill",
    image: CHILL_COVER_IMAGE,
    data: [
      {
        artist: "Coldplay",
        title: "Sparks",
        videoId: "Ar48yzjn1PE",
      },
      {
        artist: "James Blake",
        title: "You're Too Precious",
        videoId: "6WfY8wixwD8",
      },
      {
        artist: "혁오",
        title: "World of the forgotten",
        videoId: "W0NEZ4hmftM",
      },
      { artist: "Miso", title: "Blinded", videoId: "s6L50_yAa6M" },
      { artist: "레이디스코드", title: "Galaxy", videoId: "hcgT1eq3CLM" },
      {
        artist: "Patrick Watson",
        title: "Je te laisserai des mots",
        videoId: "mcdO9UP0hp8",
      },
      {
        artist: "Mac DeMarco",
        title: "Heart to Heart",
        videoId: "qBoQzo98EpQ",
      },
      { artist: "백예린", title: "can i b u", videoId: "01IfPZx-Rk" },
      { artist: "새소년", title: "난춘", videoId: "A5ZWtVZafIs" },
    ],
  },
  {
    title: "Hiphop",
    image: HIPHOP_COVER_IMAGE,
    data: [
      { artist: "Kanye West", title: "530", videoId: "h3130iA7O98" },
      {
        artist: "Kendrick Lamar",
        title: "Money Trees",
        videoId: "Iy-dJwHVX84",
      },
      {
        artist: "XXXTENTACION",
        title: "before I close my eyes",
        videoId: "2EpBqtqf8Go",
      },
      { artist: "Mac Miller", title: "Self Care", videoId: "SsKT0s5J8ko" },
      { artist: "Lil Uzi Vert", title: "20 Min", videoId: "bnFa4Mq5PAM" },
      {
        artist: "Black Hippy",
        title: "Shadow of Death",
        videoId: "eDTtymsNmvQ",
      },
      {
        artist: "88rising",
        title: "California",
        videoId: "xLBMEQPwPbE",
      },
      {
        artist: "Destiny Rogers",
        title: "Tomboy",
        videoId: "BaOScwq_lZs",
      },
    ],
  },
  {
    title: "K-Hiphop",
    image: K_HIPHOP_COVER_IMAGE,
    data: [
      { artist: "에픽하이", title: "신발장", videoId: "cydpkLwAf5g" },
      { artist: "빈지노", title: "Always Awake", videoId: "iGWKNrtbF9I" },
      { artist: "슈프림팀", title: "데려가", videoId: "F8iCFQBFWjM" },
      { artist: "에픽하이", title: "Rich", videoId: "k67WVkHBoes" },
      { artist: "웨이체드", title: "Lover", videoId: "5oFYzh7hgtw" },
      { artist: "SUMIN", title: "텅 빈 밤", videoId: "fCXpMJAcbNQ" },
      {
        artist: "코드 쿤스트",
        title: "Terminal",
        videoId: "uOFb81z3nVs",
      },
      { artist: "Sik-K", title: "STAY on FIRE", videoId: "icW0nFygkrM" },
      { artist: "Sik-K", title: "Habibi", videoId: "xSfY7ICmBuA" },
    ],
  },
  {
    title: "Lowkey",
    image: LOWKEY_COVER_IMAGE,
    data: [
      {
        artist: "The Neighbourhood",
        title: "Daddy Issues",
        videoId: "_lMlsPQJs6U",
      },
      { artist: "Doja Cat", title: "So High", videoId: "8LJsMUkxIWY" },
      { artist: "Doja Cat", title: "Streets", videoId: "jJdlgKzVsnI" },
      { artist: "Doja Cat", title: "You Right", videoId: "JXgV1rXUoME" },
      {
        artist: "Justin Bieber",
        title: "Come Around Me",
        videoId: "C86jztHhLyk",
      },
      {
        artist: "Illionaire Records",
        title: "Ratchet",
        videoId: "UavAet2LEDY",
      },
      { artist: "식케이", title: "30MIN", videoId: "bosIjxfosOU" },
      {
        artist: "K.Flay",
        title: "High Enough",
        videoId: "cEcLxqHcQFU",
      },
      { artist: "Harry Styles", title: "She", videoId: "zQ3PeDGswz4" },
      {
        artist: "Brent Faiyaz",
        title: "Poison",
        videoId: "O8CKxlmkZtw",
      },
    ],
  },
];

export const singlePlaylistDemo: PlayListItem[] = [demoPlaylist[0]!];

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
