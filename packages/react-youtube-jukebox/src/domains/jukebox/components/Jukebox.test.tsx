// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Jukebox } from "./Jukebox";

const { mockUseJukeboxPlayer, getDefaultJukeboxPlayerMock } = vi.hoisted(() => {
  const getDefaultJukeboxPlayerMock = () => ({
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
    playTrackAt: vi.fn(),
    progress: 0,
    duration: 0,
    currentTime: 0,
    seek: vi.fn(),
  });

  return {
    getDefaultJukeboxPlayerMock,
    mockUseJukeboxPlayer: vi.fn(getDefaultJukeboxPlayerMock),
  };
});

vi.mock("../../../hooks/useJukeboxPlayer", () => ({
  useJukeboxPlayer: mockUseJukeboxPlayer,
}));

describe("Jukebox", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockUseJukeboxPlayer.mockImplementation(getDefaultJukeboxPlayerMock);
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

  it("hides the seek bar in the default expanded player when showSeekBar is false", () => {
    render(
      <Jukebox
        tracks={[
          {
            videoId: "track-1",
            title: "Track One",
            artist: "Artist One",
          },
        ]}
        portal={false}
        showSeekBar={false}
      />,
    );

    fireEvent.click(screen.getByRole("button", { expanded: false }));

    expect(screen.queryByLabelText("Playback position")).toBeNull();
  });

  it("does not render shuffle and repeat controls in the default expanded player", () => {
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

    expect(screen.queryByRole("button", { name: "Shuffle" })).toBeNull();
    expect(screen.queryByRole("button", { name: /Repeat:/ })).toBeNull();
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

  it("triggers togglePlay when Space is pressed while keyboard shortcuts are enabled", () => {
    const togglePlay = vi.fn();

    mockUseJukeboxPlayer.mockImplementation(() => ({
      ...getDefaultJukeboxPlayerMock(),
      togglePlay,
    }));

    render(
      <Jukebox
        tracks={[
          {
            videoId: "track-1",
            title: "Track One",
            artist: "Artist One",
          },
        ]}
        portal={false}
        keyboard
      />,
    );

    fireEvent.keyDown(window, { code: "Space", key: " " });

    expect(togglePlay).toHaveBeenCalledTimes(1);
  });

  it("ignores keyboard shortcuts while an input is focused", () => {
    const togglePlay = vi.fn();

    mockUseJukeboxPlayer.mockImplementation(() => ({
      ...getDefaultJukeboxPlayerMock(),
      togglePlay,
    }));

    render(
      <div>
        <input data-testid="field" defaultValue="" />
        <Jukebox
          tracks={[
            {
              videoId: "track-1",
              title: "Track One",
              artist: "Artist One",
            },
          ]}
          portal={false}
          keyboard
        />
      </div>,
    );

    fireEvent.focus(screen.getByTestId("field"));
    fireEvent.keyDown(screen.getByTestId("field"), { code: "Space", key: " " });

    expect(togglePlay).not.toHaveBeenCalled();
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
