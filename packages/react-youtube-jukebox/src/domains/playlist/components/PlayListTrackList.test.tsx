// @vitest-environment jsdom

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ComponentProps } from "react";

import type { PlayListTrack } from "../../../lib/types";
import { PlayListTrackList } from "./PlayListTrackList";

const TRACKS: PlayListTrack[] = [
  { videoId: "track-1", title: "Track One", artist: "Artist One" },
  { videoId: "track-2", title: "Track Two", artist: "Artist Two" },
  { videoId: "track-3", title: "Track Three", artist: "Artist Three" },
];

function renderList(props: Partial<ComponentProps<typeof PlayListTrackList>> = {}) {
  const baseProps: ComponentProps<typeof PlayListTrackList> = {
    tracks: TRACKS,
    activePlaylistIndex: 0,
    currentGlobalIndex: 0,
    isPlaying: false,
    onTrackSelect: vi.fn(),
  };

  return render(<PlayListTrackList {...baseProps} {...props} />);
}

function getTrackButtons() {
  return Array.from(document.querySelectorAll<HTMLButtonElement>(".rp-track"));
}

describe("PlayListTrackList", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a button per track with stable identity", () => {
    const { rerender } = renderList();

    const initialButtons = getTrackButtons();
    expect(initialButtons).toHaveLength(TRACKS.length);

    rerender(
      <PlayListTrackList
        tracks={TRACKS}
        activePlaylistIndex={0}
        currentGlobalIndex={0}
        isPlaying
        onTrackSelect={vi.fn()}
      />,
    );

    const nextButtons = getTrackButtons();
    // The same DOM nodes should be reused thanks to stable keys.
    initialButtons.forEach((node, index) => {
      expect(nextButtons[index]).toBe(node);
    });
  });

  it("shows the playing indicator only on the active row when playing", () => {
    renderList({ currentGlobalIndex: 1, isPlaying: true });

    const buttons = getTrackButtons();
    expect(buttons[0]?.textContent).toContain("1");
    expect(buttons[1]?.querySelector(".rp-track__playing-icon")).not.toBeNull();
    expect(buttons[2]?.textContent).toContain("3");
  });

  it("calls onTrackSelect with the row index on click", () => {
    const onTrackSelect = vi.fn();
    renderList({ onTrackSelect });

    const buttons = getTrackButtons();
    buttons[2]?.click();

    expect(onTrackSelect).toHaveBeenCalledWith(2);
  });
});
