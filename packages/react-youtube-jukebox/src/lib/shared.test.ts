import { describe, expect, it } from "vitest";

import {
  DEFAULT_POSITION,
  getPositionStyle,
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
