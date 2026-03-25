import type { JukeboxTheme } from "@react-youtube-jukebox/core";

type JukeboxThemeOption = {
  description: string;
  label: string;
  value: JukeboxTheme;
};

export const DEFAULT_JUKEBOX_THEME: JukeboxTheme = "glass";

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
];
