// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PlayList } from "./PlayList";

const PLAYLIST = [
  {
    id: "focus",
    title: "Focus Flow",
    data: [
      { videoId: "track-1", title: "Track One", artist: "Artist One" },
      { videoId: "track-2", title: "Track Two", artist: "Artist Two" },
    ],
  },
  {
    id: "night",
    title: "Night Drive",
    data: [
      { videoId: "track-3", title: "Track Three", artist: "Artist Three" },
    ],
  },
];

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
    shuffle: false,
    toggleShuffle: vi.fn(),
    repeat: "all" as const,
    cycleRepeat: vi.fn(),
    progress: 0,
    duration: 100,
    currentTime: 10,
    seek: vi.fn(),
  });

  return {
    getDefaultJukeboxPlayerMock,
    mockUseJukeboxPlayer: vi.fn(getDefaultJukeboxPlayerMock),
  };
});

vi.mock("../hooks/useJukeboxPlayer", () => ({
  useJukeboxPlayer: mockUseJukeboxPlayer,
}));

describe("PlayList", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: "",
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockUseJukeboxPlayer.mockImplementation(getDefaultJukeboxPlayerMock);
  });

  it("renders a seek bar and forwards seek updates", () => {
    const seek = vi.fn();

    mockUseJukeboxPlayer.mockImplementation(() => ({
      ...getDefaultJukeboxPlayerMock(),
      seek,
    }));

    render(<PlayList playlist={[...PLAYLIST]} portal={false} />);

    fireEvent.change(screen.getByLabelText("Playback position"), {
      target: { value: "42" },
    });

    expect(seek).toHaveBeenCalledWith(42);
  });

  it("hides the seek bar when showSeekBar is false", () => {
    render(<PlayList playlist={[...PLAYLIST]} portal={false} showSeekBar={false} />);

    expect(screen.queryByLabelText("Playback position")).toBeNull();
  });

  it("switches playlists from the built-in tabs", () => {
    render(<PlayList playlist={[...PLAYLIST]} portal={false} />);

    fireEvent.click(screen.getByRole("tab", { name: "Night Drive" }));

    expect(screen.getAllByText("Track Three").length).toBeGreaterThan(0);
  });

  it("calls playTrackAt when a different track is selected", () => {
    const playTrackAt = vi.fn();

    mockUseJukeboxPlayer.mockImplementation(() => ({
      ...getDefaultJukeboxPlayerMock(),
      playTrackAt,
    }));

    render(<PlayList playlist={[...PLAYLIST]} portal={false} />);

    fireEvent.click(screen.getByText("Track Two").closest("button")!);

    expect(playTrackAt).toHaveBeenCalledWith(1);
  });

  it("renders the current time labels around the seek bar", async () => {
    render(<PlayList playlist={[...PLAYLIST]} portal={false} />);

    await waitFor(() => {
      expect(screen.getByText("0:10")).toBeTruthy();
      expect(screen.getByText("1:40")).toBeTruthy();
    });
  });
});
