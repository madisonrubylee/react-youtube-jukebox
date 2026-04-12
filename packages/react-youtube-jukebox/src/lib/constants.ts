import type {
  JukeboxChrome,
  JukeboxPosition,
  JukeboxTheme,
  PlayListSize,
  PlayListTheme,
} from "./types";

export const DEFAULT_POSITION: JukeboxPosition = "bottom-right";
export const DEFAULT_THEME: JukeboxTheme = "glass";
export const DEFAULT_CHROME: JukeboxChrome = "classic";
export const TEMPORARILY_DISABLED_CHROMES: readonly JukeboxChrome[] = [
  "wallet",
  "ride",
];
export const DEFAULT_OFFSET_PX = 20;
export const DEFAULT_VOLUME = 100;
export const LEVEL_BAR_HEIGHTS = [12, 18, 14] as const;
export const LEVEL_BAR_REST_HEIGHT = 8;
export const LEVEL_BAR_ANIMATION_DELAY_MS = 120;

export const DEFAULT_PLAYLIST_THEME: PlayListTheme = "dark";
export const DEFAULT_PLAYLIST_SIZE: PlayListSize = "compact";
