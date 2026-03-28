// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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
    cleanup();
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

  it("omits expanded title and artist metadata in the default expanded player", () => {
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
      />,
    );

    fireEvent.click(screen.getByRole("button", { expanded: false }));

    expect(screen.getAllByText("Track One")).toHaveLength(1);
    expect(screen.getAllByText("Artist One")).toHaveLength(1);
  });

  it("falls back to classic chrome when disabled chrome presets are requested", () => {
    const { container } = render(
      <Jukebox
        tracks={[
          {
            videoId: "track-1",
            title: "Track One",
            artist: "Artist One",
          },
        ]}
        chrome="wallet"
        portal={false}
      />,
    );

    expect(container.firstElementChild?.getAttribute("data-chrome")).toBe(
      "classic",
    );
  });

  it("applies centered positioning styles when bottom-center is requested", () => {
    const { container } = render(
      <Jukebox
        tracks={[
          {
            videoId: "track-1",
            title: "Track One",
            artist: "Artist One",
          },
        ]}
        portal={false}
        position="bottom-center"
        offset={20}
      />,
    );

    const rootElement = container.firstElementChild as HTMLDivElement | null;

    expect(rootElement).not.toBeNull();
    expect(rootElement?.style.position).toBe("absolute");
    expect(rootElement?.style.bottom).toBe("20px");
    expect(rootElement?.style.left).toBe("50%");
    expect(rootElement?.style.transform).toBe("translateX(-50%)");
  });
});
