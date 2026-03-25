// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { JukeboxTrack } from "../lib/shared";
import type { YouTubeNamespace, YouTubePlayerOptions } from "../lib/youtube";
import { useJukeboxPlayer } from "./useJukeboxPlayer";

const BASE_TRACKS: JukeboxTrack[] = [
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
  readonly loadVideoById = vi.fn();
  readonly mute = vi.fn();
  readonly pauseVideo = vi.fn();
  readonly playVideo = vi.fn();
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
  autoplay = true,
  tracks,
}: {
  autoplay?: boolean;
  tracks: JukeboxTrack[];
}) {
  const { currentIndex, playerMountRef } = useJukeboxPlayer({
    autoplay,
    tracks,
  });

  return (
    <>
      <div ref={playerMountRef} />
      <output data-testid="current-index">{currentIndex}</output>
    </>
  );
}

describe("useJukeboxPlayer", () => {
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
  });

  it("keeps the same player instance when tracks get a new array reference", async () => {
    const { rerender } = render(<HookHarness tracks={BASE_TRACKS} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    const firstInstance = MockYouTubePlayer.instances[0];

    rerender(<HookHarness tracks={[...BASE_TRACKS]} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    expect(firstInstance?.destroy).not.toHaveBeenCalled();
  });

  it("updates the active video without rebuilding the player", async () => {
    const { rerender } = render(<HookHarness tracks={BASE_TRACKS} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    const firstInstance = MockYouTubePlayer.instances[0];

    firstInstance?.loadVideoById.mockClear();

    rerender(
      <HookHarness
        tracks={[
          {
            ...BASE_TRACKS[0]!,
            videoId: "track-1-remix",
          },
          BASE_TRACKS[1]!,
        ]}
      />,
    );

    await waitFor(() => {
      expect(firstInstance?.loadVideoById).toHaveBeenCalledWith(
        "track-1-remix",
      );
    });

    expect(MockYouTubePlayer.instances).toHaveLength(1);
    expect(firstInstance?.destroy).not.toHaveBeenCalled();
    expect(screen.getByTestId("current-index").textContent).toBe("0");
  });
});
