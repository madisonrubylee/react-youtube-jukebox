import type { CSSProperties } from "react";

import {
  DEFAULT_CHROME,
  DEFAULT_OFFSET_PX,
  TEMPORARILY_DISABLED_CHROMES,
} from "./constants";
import type {
  JukeboxChrome,
  JukeboxOffset,
  JukeboxPosition,
  JukeboxTrack,
} from "./types";

export function getEffectiveChrome(chrome: JukeboxChrome): JukeboxChrome {
  const isTemporarilyDisabledChrome =
    TEMPORARILY_DISABLED_CHROMES.includes(chrome);

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

export type TrackEndedAction =
  | { type: "stop" }
  | { type: "replay"; videoId: string }
  | { type: "advance"; nextIndex: number };

/**
 * Decides what to do when a track finishes playing.
 * - 0 tracks: stop
 * - 1 track: replay the same video
 * - 2+ tracks: advance to the next index (wraps around the list)
 */
export function resolveTrackEndedAction(
  tracks: JukeboxTrack[],
  currentIndex: number,
): TrackEndedAction {
  const trackCount = tracks.length;

  if (trackCount <= 0) {
    return { type: "stop" };
  }

  if (trackCount === 1) {
    const videoId = tracks[0]?.videoId;
    return videoId ? { type: "replay", videoId } : { type: "stop" };
  }

  return {
    type: "advance",
    nextIndex: getNextTrackIndex(currentIndex, 1, trackCount),
  };
}

export function clampVolume(value: number) {
  return Math.min(Math.max(Math.round(value), 0), 100);
}

export function clampIndex(index: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(index, total - 1));
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

const HEX_SHORT_LENGTH = 3;
const HEX_LONG_LENGTH = 6;
const HEX_COLOR_PATTERN = /^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

function parseHexChannel(value: string): number | null {
  const parsed = parseInt(value, 16);
  return Number.isNaN(parsed) ? null : parsed;
}

export function parseHexColor(hex: string): [number, number, number] | null {
  const clean = hex.replace(/^#/, "");

  if (!HEX_COLOR_PATTERN.test(clean)) {
    return null;
  }

  if (clean.length === HEX_SHORT_LENGTH) {
    const r = parseHexChannel(clean.charAt(0).repeat(2));
    const g = parseHexChannel(clean.charAt(1).repeat(2));
    const b = parseHexChannel(clean.charAt(2).repeat(2));

    if (r === null || g === null || b === null) {
      return null;
    }

    return [r, g, b];
  }

  if (clean.length === HEX_LONG_LENGTH) {
    const r = parseHexChannel(clean.slice(0, 2));
    const g = parseHexChannel(clean.slice(2, 4));
    const b = parseHexChannel(clean.slice(4, 6));

    if (r === null || g === null || b === null) {
      return null;
    }

    return [r, g, b];
  }

  return null;
}

function lightenChannel(channel: number, amount: number): number {
  return Math.min(255, Math.round(channel + (255 - channel) * amount));
}

export function buildAccentOverrides(
  accentColor: string,
): Record<`--${string}`, string> {
  const rgb = parseHexColor(accentColor);

  if (!rgb) {
    return { "--rp-accent": accentColor };
  }

  const [r, g, b] = rgb;
  const HOVER_LIGHTEN_AMOUNT = 0.15;
  const hoverR = lightenChannel(r, HOVER_LIGHTEN_AMOUNT);
  const hoverG = lightenChannel(g, HOVER_LIGHTEN_AMOUNT);
  const hoverB = lightenChannel(b, HOVER_LIGHTEN_AMOUNT);

  return {
    "--rp-accent": accentColor,
    "--rp-accent-hover": `rgb(${hoverR}, ${hoverG}, ${hoverB})`,
    "--rp-tab-active-bg": accentColor,
    "--rp-track-active": `rgba(${r}, ${g}, ${b}, 0.12)`,
  };
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
