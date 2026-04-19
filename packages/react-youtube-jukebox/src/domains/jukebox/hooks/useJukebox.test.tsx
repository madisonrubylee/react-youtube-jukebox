// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { JukeboxTrack } from "../lib/types";
import type { YouTubeNamespace, YouTubePlayerOptions } from "../lib/youtube";
import { useJukebox } from "./useJukebox";

const TRACKS: JukeboxTrack[] = [
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
];

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
  tracks = TRACKS,
  currentIndex,
  onCurrentIndexChange,
  expanded,
  onExpandedChange,
}: {
  tracks?: JukeboxTrack[];
  currentIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}) {
  const {
    player,
    currentTrack,
    nextTrack,
    expanded: isExpanded,
    hasTracks,
    toggleExpanded,
  } = useJukebox({
    tracks,
    autoplay: false,
    currentIndex,
    onCurrentIndexChange,
    expanded,
    onExpandedChange,
  });
  const { playerMountRef, playNext } = player;

  return (
    <>
      <div ref={playerMountRef} />
      <output data-testid="current-track">
        {currentTrack?.title ?? "none"}
      </output>
      <output data-testid="next-track">
        {nextTrack?.title ?? "none"}
      </output>
      <output data-testid="expanded">{String(isExpanded)}</output>
      <output data-testid="has-tracks">{String(hasTracks)}</output>
      <button type="button" data-testid="toggle-expanded" onClick={toggleExpanded}>
        Toggle Expanded
      </button>
      <button type="button" data-testid="next" onClick={playNext}>
        Next
      </button>
    </>
  );
}

describe("useJukebox", () => {
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

  it("derives the current and next tracks from the active index", async () => {
    render(<HookHarness />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    expect(screen.getByTestId("current-track").textContent).toBe("Track One");
    expect(screen.getByTestId("next-track").textContent).toBe("Track Two");
  });

  it("toggles expanded state when uncontrolled", () => {
    render(<HookHarness />);

    expect(screen.getByTestId("expanded").textContent).toBe("false");

    fireEvent.click(screen.getByTestId("toggle-expanded"));

    expect(screen.getByTestId("expanded").textContent).toBe("true");
  });

  it("keeps controlled expanded state stable while notifying changes", () => {
    const onExpandedChange = vi.fn();

    render(
      <HookHarness expanded={false} onExpandedChange={onExpandedChange} />,
    );

    fireEvent.click(screen.getByTestId("toggle-expanded"));

    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.getByTestId("expanded").textContent).toBe("false");
  });

  it("keeps controlled currentIndex derived state stable while notifying next index", async () => {
    const onCurrentIndexChange = vi.fn();

    render(
      <HookHarness
        currentIndex={1}
        onCurrentIndexChange={onCurrentIndexChange}
      />,
    );

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    fireEvent.click(screen.getByTestId("next"));

    expect(onCurrentIndexChange).toHaveBeenCalledWith(0);
    expect(screen.getByTestId("current-track").textContent).toBe("Track Two");
    expect(screen.getByTestId("next-track").textContent).toBe("Track One");
  });

  it("returns a safe fallback when tracks are empty", () => {
    render(<HookHarness tracks={[]} />);

    fireEvent.click(screen.getByTestId("toggle-expanded"));

    expect(screen.getByTestId("has-tracks").textContent).toBe("false");
    expect(screen.getByTestId("current-track").textContent).toBe("none");
    expect(screen.getByTestId("next-track").textContent).toBe("none");
    expect(screen.getByTestId("expanded").textContent).toBe("false");
  });
});
