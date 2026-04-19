// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { JukeboxTrack } from "../lib/types";
import type { YouTubeNamespace, YouTubePlayerOptions } from "../lib/youtube";
import {
  PLAYER_STATE_ENDED,
  PLAYER_STATE_PLAYING,
} from "../lib/youtube";
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
  static autoReady = true;
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

    if (MockYouTubePlayer.autoReady) {
      queueMicrotask(() => {
        this.options.events.onReady();
      });
    }
  }
}

function HookHarness({
  autoplay = true,
  tracks,
  currentIndex: controlledCurrentIndex,
  onCurrentIndexChange,
  onPlay,
  onTrackChange,
}: {
  autoplay?: boolean;
  tracks: JukeboxTrack[];
  currentIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
  onPlay?: () => void;
  onTrackChange?: (track: JukeboxTrack, index: number) => void;
}) {
  const { currentIndex, playerMountRef } = useJukeboxPlayer({
    autoplay,
    tracks,
    currentIndex: controlledCurrentIndex,
    onCurrentIndexChange,
    onPlay,
    onTrackChange,
  });

  return (
    <>
      <div ref={playerMountRef} />
      <output data-testid="current-index">{currentIndex}</output>
    </>
  );
}

function DirectSelectHarness({ tracks }: { tracks: JukeboxTrack[] }) {
  const { currentIndex, playTrackAt, playerMountRef } = useJukeboxPlayer({
    autoplay: false,
    tracks,
  });

  return (
    <>
      <div ref={playerMountRef} />
      <output data-testid="current-index">{currentIndex}</output>
      <button type="button" data-testid="jump" onClick={() => playTrackAt(1)}>
        Jump
      </button>
    </>
  );
}

function AudioSyncHarness({ tracks }: { tracks: JukeboxTrack[] }) {
  const { playerMountRef, setVolume } = useJukeboxPlayer({
    autoplay: false,
    tracks,
  });

  return (
    <>
      <div ref={playerMountRef} />
      <button type="button" data-testid="set-volume" onClick={() => setVolume(30)}>
        Set Volume
      </button>
    </>
  );
}

describe("useJukeboxPlayer", () => {
  beforeEach(() => {
    MockYouTubePlayer.autoReady = true;
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

    firstInstance?.cueVideoById.mockClear();
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
      expect(firstInstance?.cueVideoById).toHaveBeenCalledWith("track-1-remix");
    });

    expect(MockYouTubePlayer.instances).toHaveLength(1);
    expect(firstInstance?.destroy).not.toHaveBeenCalled();
    expect(screen.getByTestId("current-index").textContent).toBe("0");
  });

  it("replays the current video when a single-track playlist ends", async () => {
    render(<HookHarness tracks={[BASE_TRACKS[0]!]} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    const instance = MockYouTubePlayer.instances[0];

    instance?.loadVideoById.mockClear();
    instance?.options.events.onStateChange({ data: PLAYER_STATE_ENDED });

    await waitFor(() => {
      expect(instance?.loadVideoById).toHaveBeenCalledWith("track-1");
    });
  });

  it("advances to the next track when playback ends in a multi-track playlist", async () => {
    render(<HookHarness tracks={BASE_TRACKS} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    const instance = MockYouTubePlayer.instances[0];

    instance?.options.events.onStateChange({ data: PLAYER_STATE_ENDED });

    await waitFor(() => {
      expect(screen.getByTestId("current-index").textContent).toBe("1");
    });
  });

  it("invokes onPlay when the player enters the playing state", async () => {
    const onPlay = vi.fn();

    render(<HookHarness tracks={BASE_TRACKS} onPlay={onPlay} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    const instance = MockYouTubePlayer.instances[0];

    instance?.options.events.onStateChange({ data: PLAYER_STATE_PLAYING });

    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it("syncs the latest mute and volume state when the player becomes ready", async () => {
    MockYouTubePlayer.autoReady = false;

    render(<AudioSyncHarness tracks={BASE_TRACKS} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    const instance = MockYouTubePlayer.instances[0];

    screen.getByTestId("set-volume").click();

    instance?.setVolume.mockClear();
    instance?.unMute.mockClear();
    instance?.mute.mockClear();
    instance?.options.events.onReady();

    expect(instance?.setVolume).toHaveBeenCalledWith(30);
    expect(instance?.unMute).toHaveBeenCalledTimes(1);
    expect(instance?.mute).not.toHaveBeenCalled();
  });

  it("notifies onTrackChange for the initial track", async () => {
    const onTrackChange = vi.fn();

    render(<HookHarness tracks={BASE_TRACKS} onTrackChange={onTrackChange} />);

    await waitFor(() => {
      expect(onTrackChange).toHaveBeenCalledWith(BASE_TRACKS[0], 0);
    });
  });

  it("jumps directly to the requested track index", async () => {
    render(<DirectSelectHarness tracks={BASE_TRACKS} />);

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    screen.getByTestId("jump").click();

    await waitFor(() => {
      expect(screen.getByTestId("current-index").textContent).toBe("1");
    });
  });

  it("supports a controlled currentIndex", async () => {
    const onCurrentIndexChange = vi.fn();
    const { rerender } = render(
      <HookHarness
        tracks={BASE_TRACKS}
        currentIndex={0}
        onCurrentIndexChange={onCurrentIndexChange}
      />,
    );

    await waitFor(() => {
      expect(MockYouTubePlayer.instances).toHaveLength(1);
    });

    rerender(
      <HookHarness
        tracks={BASE_TRACKS}
        currentIndex={1}
        onCurrentIndexChange={onCurrentIndexChange}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("current-index").textContent).toBe("1");
    });

    expect(onCurrentIndexChange).not.toHaveBeenCalled();
  });
});
