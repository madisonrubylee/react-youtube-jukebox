import type { CSSProperties } from "react";

import { DEFAULT_CHROME, DEFAULT_OFFSET_PX } from "./constants";
import type { JukeboxChrome, JukeboxOffset, JukeboxPosition } from "./types";

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
