// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Jukebox } from "./Jukebox";

const { mockUseJukeboxPlayer } = vi.hoisted(() => ({
  mockUseJukeboxPlayer: vi.fn(() => ({
    currentIndex: 0,
    isMuted: false,
    isPlaying: false,
    playerMountRef: vi.fn(),
    volume: 100,
    setVolume: vi.fn(),
    toggleMute: vi.fn(),
    togglePlay: vi.fn(),
    playNext: vi.fn(),
    playPrev: vi.fn(),
  })),
}));

vi.mock("../hooks/useJukeboxPlayer", () => ({
  useJukeboxPlayer: mockUseJukeboxPlayer,
}));

describe("Jukebox", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom expanded content instead of the default expanded player", () => {
    render(
      <Jukebox
        tracks={[
          {
            videoId: "track-1",
            title: "Track One",
            artist: "Artist One",
          },
          {
            videoId: "track-2",
            title: "Track Two",
            artist: "Artist Two",
          },
        ]}
        portal={false}
        renderExpandedContent={({ currentTrack, isExpanded, totalTracks }) => (
          <section data-testid="custom-expanded">
            {currentTrack.title}:{isExpanded ? "open" : "closed"}:{totalTracks}
          </section>
        )}
      />,
    );

    expect(screen.getByTestId("custom-expanded").textContent).toBe(
      "Track One:closed:2",
    );
    expect(screen.queryByRole("button", { name: "Play" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { expanded: false }));

    expect(screen.getByTestId("custom-expanded").textContent).toBe(
      "Track One:open:2",
    );
  });
});
