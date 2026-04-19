import type { CSSProperties } from "react";

import {
  DEFAULT_CHROME,
  DEFAULT_OFFSET_PX,
  TEMPORARILY_DISABLED_CHROMES,
} from "./constants";
import type { JukeboxChrome, JukeboxOffset, JukeboxPosition } from "./types";

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

/** Picks a random track index in `[0, totalTracks)` other than `currentIndex`. */
export function getRandomTrackIndex(
  currentIndex: number,
  totalTracks: number,
): number {
  if (totalTracks <= 1) {
    return 0;
  }

  if (totalTracks === 2) {
    return currentIndex === 0 ? 1 : 0;
  }

  let nextIndex = currentIndex;

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * totalTracks);
  }

  return nextIndex;
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

function parseHexColor(hex: string): [number, number, number] | null {
  const clean = hex.replace(/^#/, "");

  if (clean.length === 3) {
    const redHex = clean.charAt(0);
    const greenHex = clean.charAt(1);
    const blueHex = clean.charAt(2);
    const r = parseInt(redHex + redHex, 16);
    const g = parseInt(greenHex + greenHex, 16);
    const b = parseInt(blueHex + blueHex, 16);
    return [r, g, b];
  }

  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
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
