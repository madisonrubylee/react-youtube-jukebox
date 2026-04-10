import { describe, expect, it, vi } from "vitest";

import {
  DEFAULT_POSITION,
  getPositionStyle,
  getRandomTrackIndex,
  normalizeOffset,
} from "./shared";

describe("shared position helpers", () => {
  it("keeps the default position unchanged", () => {
    expect(DEFAULT_POSITION).toBe("bottom-right");
  });

  it("supports bottom-center positioning for portal rendering", () => {
    expect(getPositionStyle("bottom-center", 20, true)).toEqual({
      position: "fixed",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
    });
  });

  it("supports top-center positioning for inline rendering", () => {
    expect(getPositionStyle("top-center", { x: 48, y: 12 }, false)).toEqual({
      position: "absolute",
      top: 12,
      left: "50%",
      transform: "translateX(-50%)",
    });
  });

  it("preserves existing corner positioning behavior", () => {
    expect(getPositionStyle("top-left", { x: 8, y: 16 }, true)).toEqual({
      position: "fixed",
      top: 16,
      left: 8,
    });

    expect(getPositionStyle("bottom-right", { x: 10, y: 24 }, false)).toEqual({
      position: "absolute",
      bottom: 24,
      right: 10,
    });
  });

  it("normalizes numeric offsets into both axes", () => {
    expect(normalizeOffset(20)).toEqual({ x: 20, y: 20 });
  });
});

describe("getRandomTrackIndex", () => {
  it("returns 0 when there is at most one track", () => {
    expect(getRandomTrackIndex(0, 0)).toBe(0);
    expect(getRandomTrackIndex(0, 1)).toBe(0);
  });

  it("returns the only other index when there are two tracks", () => {
    expect(getRandomTrackIndex(0, 2)).toBe(1);
    expect(getRandomTrackIndex(1, 2)).toBe(0);
  });

  it("returns an index different from the current index", () => {
    const randomSpy = vi.spyOn(Math, "random");

    randomSpy.mockReturnValue(0.99);
    expect(getRandomTrackIndex(0, 3)).toBe(2);

    randomSpy.mockReturnValue(0);
    expect(getRandomTrackIndex(1, 3)).toBe(0);

    randomSpy.mockRestore();
  });
});
