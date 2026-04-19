import { describe, expect, it } from "vitest";

import { DEFAULT_POSITION } from "./constants";
import { getPositionStyle, normalizeOffset, parseHexColor } from "./utils";

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

describe("parseHexColor", () => {
  it("expands 3-digit shorthand hex colors", () => {
    expect(parseHexColor("#abc")).toEqual([0xaa, 0xbb, 0xcc]);
    expect(parseHexColor("abc")).toEqual([0xaa, 0xbb, 0xcc]);
  });

  it("parses 6-digit hex colors", () => {
    expect(parseHexColor("#112233")).toEqual([0x11, 0x22, 0x33]);
    expect(parseHexColor("fF8800")).toEqual([0xff, 0x88, 0x00]);
  });

  it("returns null for invalid hex strings", () => {
    expect(parseHexColor("")).toBeNull();
    expect(parseHexColor("xyz")).toBeNull();
    expect(parseHexColor("#12")).toBeNull();
    expect(parseHexColor("#12345")).toBeNull();
    expect(parseHexColor("#1234567")).toBeNull();
    expect(parseHexColor("rgb(1,2,3)")).toBeNull();
  });
});
