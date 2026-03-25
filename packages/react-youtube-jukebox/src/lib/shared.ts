import type { CSSProperties } from "react";

export type JukeboxTrack = {
  videoId: string;
  title: string;
  artist?: string;
};

export type JukeboxPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type JukeboxTheme = "glass" | "simple" | "sunset";

export type JukeboxOffset = number | { x: number; y: number };

export type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  position?: JukeboxPosition;
  theme?: JukeboxTheme;
  offset?: JukeboxOffset;
  portal?: boolean;
  className?: string;
};

export type JukeboxPlayerState = {
  currentIndex: number;
  isMuted: boolean;
  isPlaying: boolean;
  playerMountRef: (node: HTMLDivElement | null) => void;
  volume: number;
  setVolume: (nextVolume: number) => void;
  toggleMute: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
};

export const DEFAULT_POSITION: JukeboxPosition = "bottom-right";
export const DEFAULT_THEME: JukeboxTheme = "glass";
export const DEFAULT_OFFSET_PX = 20;
export const DEFAULT_VOLUME = 100;
export const LEVEL_BAR_HEIGHTS = [12, 18, 14] as const;
export const LEVEL_BAR_REST_HEIGHT = 8;
export const LEVEL_BAR_ANIMATION_DELAY_MS = 120;

export function getNextTrackIndex(
  index: number,
  step: number,
  totalTracks: number,
) {
  if (totalTracks <= 0) {
    return 0;
  }

  return (index + step + totalTracks) % totalTracks;
}

export function clampVolume(value: number) {
  return Math.min(Math.max(Math.round(value), 0), 100);
}

export function normalizeOffset(offset: JukeboxOffset | undefined) {
  if (typeof offset === "number") {
    return { x: offset, y: offset };
  }

  if (offset) {
    return { x: offset.x, y: offset.y };
  }

  return { x: DEFAULT_OFFSET_PX, y: DEFAULT_OFFSET_PX };
}

export function getPositionStyle(
  position: JukeboxPosition,
  offset: JukeboxOffset | undefined,
  isPortal: boolean,
): CSSProperties {
  const normalizedOffset = normalizeOffset(offset);
  const style: CSSProperties = {
    position: isPortal ? "fixed" : "absolute",
  };

  if (position.includes("top")) {
    style.top = normalizedOffset.y;
  } else {
    style.bottom = normalizedOffset.y;
  }

  if (position.includes("left")) {
    style.left = normalizedOffset.x;
  } else {
    style.right = normalizedOffset.x;
  }

  return style;
}
