import type {
  JukeboxChrome,
  JukeboxTheme,
} from "@react-youtube-jukebox/core";

type JukeboxThemeOption = {
  description: string;
  label: string;
  value: JukeboxTheme;
};

type JukeboxChromeOption = {
  description: string;
  label: string;
  value: JukeboxChrome;
};

export const DEFAULT_JUKEBOX_THEME: JukeboxTheme = "glass";
export const DEFAULT_JUKEBOX_CHROME: JukeboxChrome = "classic";

export const jukeboxThemeOptions: JukeboxThemeOption[] = [
  {
    value: "glass",
    label: "Glass",
    description: "Current default. Soft glass, blur, and floating chrome.",
  },
  {
    value: "simple",
    label: "Simple",
    description: "Minimal neutral surface for calmer product UI.",
  },
  {
    value: "sunset",
    label: "Sunset",
    description: "Warm gradient theme for louder, more playful embeds.",
  },
  {
    value: "ride",
    label: "Ride",
    description: "The previous ride palette, now available as a reusable theme.",
  },
];

export const jukeboxChromeOptions: JukeboxChromeOption[] = [
  {
    value: "classic",
    label: "Classic",
    description: "Current default chrome. Floating glass dock with soft curves.",
  },
];
