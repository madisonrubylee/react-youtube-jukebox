import type { CSSProperties, ReactNode } from "react";

export type JukeboxTrack = {
  videoId: string;
  title: string;
  artist?: string;
};

export type JukeboxPosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left"
  | "top-center";

export type JukeboxTheme = "glass" | "simple" | "sunset" | "ride";
export type JukeboxChrome = "classic" | "wallet" | "ride";

export type JukeboxOffset = number | { x: number; y: number };

export type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  position?: JukeboxPosition;
  theme?: JukeboxTheme;
  chrome?: JukeboxChrome;
  offset?: JukeboxOffset;
  portal?: boolean;
  className?: string;
  renderExpandedContent?: (props: JukeboxExpandedRenderProps) => ReactNode;
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

export type JukeboxExpandedRenderProps = JukeboxPlayerState & {
  currentTrack: JukeboxTrack;
  isExpanded: boolean;
  nextTrack: JukeboxTrack | undefined;
  totalTracks: number;
};

export const DEFAULT_POSITION: JukeboxPosition = "bottom-right";
export const DEFAULT_THEME: JukeboxTheme = "glass";
export const DEFAULT_CHROME: JukeboxChrome = "classic";
export const TEMPORARILY_DISABLED_CHROMES = ["wallet", "ride"] as const;
export const DEFAULT_OFFSET_PX = 20;
export const DEFAULT_VOLUME = 100;
export const LEVEL_BAR_HEIGHTS = [12, 18, 14] as const;
export const LEVEL_BAR_REST_HEIGHT = 8;
export const LEVEL_BAR_ANIMATION_DELAY_MS = 120;

export type PlayListTrack = {
  title: string;
  artist: string;
  videoId: string;
};

export type PlayListItem = {
  title: string;
  image?: string;
  data: PlayListTrack[];
};

export type PlayListTheme = "light" | "dark";
export type PlayListSize = "compact" | "expanded";

export type PlayListProps = {
  playlist: PlayListItem[];
  autoplay?: boolean;
  theme?: PlayListTheme;
  size?: PlayListSize;
  defaultSize?: PlayListSize;
  onSizeChange?: (size: PlayListSize) => void;
  className?: string;
};

export const DEFAULT_PLAYLIST_THEME: PlayListTheme = "dark";
export const DEFAULT_PLAYLIST_SIZE: PlayListSize = "compact";

export function getEffectiveChrome(chrome: JukeboxChrome): JukeboxChrome {
  const isTemporarilyDisabledChrome = chrome === "wallet" || chrome === "ride";

  if (isTemporarilyDisabledChrome) {
    return DEFAULT_CHROME;
  }

  return chrome;
}

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
  const isTopPosition = position.startsWith("top");
  const isCenterPosition = position.endsWith("center");
  const isLeftPosition = position.endsWith("left");
  const style: CSSProperties = {
    position: isPortal ? "fixed" : "absolute",
  };

  if (isTopPosition) {
    style.top = normalizedOffset.y;
  } else {
    style.bottom = normalizedOffset.y;
  }

  if (isCenterPosition) {
    style.left = "50%";
    style.transform = "translateX(-50%)";
    return style;
  }

  if (isLeftPosition) {
    style.left = normalizedOffset.x;
  } else {
    style.right = normalizedOffset.x;
  }

  return style;
}
