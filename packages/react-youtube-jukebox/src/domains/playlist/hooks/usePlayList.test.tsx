// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { PlayListItem } from "../lib/types";
import type { YouTubeNamespace, YouTubePlayerOptions } from "../lib/youtube";
import { usePlayList } from "./usePlayList";

const PLAYLIST = [
  {
    title: "Focus Flow",
    data: [
      { videoId: "track-1", title: "Track One", artist: "Artist One" },
      { videoId: "track-2", title: "Track Two", artist: "Artist Two" },
    ],
  },
  {
    title: "Night Drive",
    data: [
      { videoId: "track-3", title: "Track Three", artist: "Artist Three" },
    ],
  },
] satisfies PlayListItem[];

class MockYouTubePlayer {
  static instances: MockYouTubePlayer[] = [];

  readonly cueVideoById = vi.fn();
  readonly destroy = vi.fn();
  readonly getCurrentTime = vi.fn(() => 0);
  readonly getDuration = vi.fn(() => 100);
  readonly loadVideoById = vi.fn();
  readonly mute = vi.fn();
  readonly pauseVideo = vi.fn();
  readonly playVideo = vi.fn();
  readonly seekTo = vi.fn();
  readonly setVolume = vi.fn();
  readonly unMute = vi.fn();

  constructor(
    _element: HTMLDivElement,
    readonly options: YouTubePlayerOptions,
  ) {
    MockYouTubePlayer.instances.push(this);
    queueMicrotask(() => {
      this.options.events.onReady();
    });
  }
}

function HookHarness({
  playlist = PLAYLIST,
  size,
  onSizeChange,
}: {
  playlist?: PlayListItem[];
  size?: "mini" | "compact" | "expanded";
  onSizeChange?: (size: "mini" | "compact" | "expanded") => void;
}) {
  const {
    player,
    activeTabIndex,
    currentTrack,
    size: resolvedSize,
    isMini,
    isExpanded,
    setActiveTabIndex,
    selectTrack,
    toggleSize,
    minimize,
    restore,
  } = usePlayList({
    playlist,
    autoplay: false,
    size,
    onSizeChange,
  });
  const { playerMountRef, currentIndex } = player;

  return (
    <>
      <div ref={playerMountRef} />
      <output data-testid="active-tab">{activeTabIndex}</output>
      <output data-testid="current-index">{currentIndex}</output>
      <output data-testid="current-track">
        {currentTrack?.title ?? "none"}
      </output>
      <output data-testid="size">{resolvedSize}</output>
      <output data-testid="is-mini">{String(isMini)}</output>
      <output data-testid="is-expanded">{String(isExpanded)}</output>
      <button type="button" data-testid="select-tab-1" onClick={() => setActiveTabIndex(1)}>
        Select Tab 1
      </button>
      <button type="button" data-testid="select-track-0" onClick={() => selectTrack(0)}>
        Select Track 0
      </button>
      <button type="button" data-testid="select-track-1" onClick={() => selectTrack(1)}>
        Select Track 1
      </button>
      <button type="button" data-testid="toggle-size" onClick={toggleSize}>
        Toggle Size
      </button>
      <button type="button" data-testid="minimize" onClick={minimize}>
        Minimize
      </button>
      <button type="button" data-testid="restore" onClick={restore}>
        Restore
      </button>
    </>
  );
}

describe("usePlayList", () => {
  beforeEach(() => {
    MockYouTubePlayer.instances = [];
    window.YT = {
      Player: MockYouTubePlayer as unknown as YouTubeNamespace["Player"],
    };
  });

  afterEach(() => {
    cleanup();
    delete window.YT;
    delete window.onYouTubeIframeAPIReady;
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("resets the active track index when the active playlist changes", async () => {
    render(<HookHarness />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    fireEvent.click(screen.getByTestId("select-track-1"));

    await waitFor(() => {
      expect(screen.getByTestId("current-index").textContent).toBe("1");
    });

    fireEvent.click(screen.getByTestId("select-tab-1"));

    await waitFor(() => {
      expect(screen.getByTestId("active-tab").textContent).toBe("1");
      expect(screen.getByTestId("current-index").textContent).toBe("0");
      expect(screen.getByTestId("current-track").textContent).toBe("Track Three");
    });
  });

  it("toggles playback when the current track is selected again", async () => {
    render(<HookHarness />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    fireEvent.click(screen.getByTestId("select-track-0"));

    expect(MockYouTubePlayer.instances[0]?.playVideo).toHaveBeenCalledTimes(1);
  });

  it("manages size state when uncontrolled", () => {
    render(<HookHarness />);

    fireEvent.click(screen.getByTestId("minimize"));
    expect(screen.getByTestId("size").textContent).toBe("mini");
    expect(screen.getByTestId("is-mini").textContent).toBe("true");

    fireEvent.click(screen.getByTestId("restore"));
    expect(screen.getByTestId("size").textContent).toBe("compact");

    fireEvent.click(screen.getByTestId("toggle-size"));
    expect(screen.getByTestId("size").textContent).toBe("expanded");
    expect(screen.getByTestId("is-expanded").textContent).toBe("true");
  });

  it("keeps controlled size stable while notifying changes", () => {
    const onSizeChange = vi.fn();

    render(<HookHarness size="compact" onSizeChange={onSizeChange} />);

    fireEvent.click(screen.getByTestId("toggle-size"));

    expect(onSizeChange).toHaveBeenCalledWith("expanded");
    expect(screen.getByTestId("size").textContent).toBe("compact");
  });

  it("returns a safe fallback for empty playlists", () => {
    render(<HookHarness playlist={[]} />);

    expect(screen.getByTestId("active-tab").textContent).toBe("0");
    expect(screen.getByTestId("current-index").textContent).toBe("0");
    expect(screen.getByTestId("current-track").textContent).toBe("none");
  });
});
