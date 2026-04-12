import { useCallback, useEffect, useRef, useState } from "react";

import {
  getNextTrackIndex,
  getRandomTrackIndex,
  type JukeboxPlayerState,
  type JukeboxTrack,
  type RepeatMode,
} from "../lib/shared";
import {
  canControlPlayer,
  loadYouTubeIframeApi,
  PLAYER_STATE_ENDED,
  PLAYER_STATE_PAUSED,
  PLAYER_STATE_PLAYING,
  type YouTubePlayer,
} from "../lib/youtube";
import { useLatestRef } from "./useLatestRef";
import { useProgressPolling } from "./useProgressPolling";
import { useVolumeControl } from "./useVolumeControl";

const DEFAULT_REPEAT: RepeatMode = "all";

const REPEAT_CYCLE: Record<RepeatMode, RepeatMode> = {
  none: "all",
  all: "one",
  one: "none",
};

type UseJukeboxPlayerOptions = {
  autoplay: boolean;
  tracks: JukeboxTrack[];
  defaultIndex?: number;
  currentIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
  shuffle?: boolean;
  repeat?: RepeatMode;
  onPlay?: () => void;
  onPause?: () => void;
  onTrackChange?: (track: JukeboxTrack, index: number) => void;
  onEnd?: () => void;
};

type TrackEndedAction =
  | { type: "stop" }
  | { type: "replay"; videoId: string }
  | { type: "advance"; nextIndex: number };

function resolveTrackEndedAction(
  tracks: JukeboxTrack[],
  currentIndex: number,
  repeatMode: RepeatMode,
): TrackEndedAction {
  const trackCount = tracks.length;

  if (trackCount <= 0) {
    return { type: "stop" };
  }

  if (trackCount === 1) {
    if (repeatMode === "none") {
      return { type: "stop" };
    }

    const videoId = tracks[0]?.videoId;
    return videoId ? { type: "replay", videoId } : { type: "stop" };
  }

  if (repeatMode === "one") {
    const videoId = tracks[currentIndex]?.videoId;
    return videoId ? { type: "replay", videoId } : { type: "stop" };
  }

  const isLast = currentIndex === trackCount - 1;

  if (repeatMode === "none" && isLast) {
    return { type: "stop" };
  }

  return {
    type: "advance",
    nextIndex: getNextTrackIndex(currentIndex, 1, trackCount),
  };
}

function createPersistentWrapper(): HTMLDivElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  return wrapper;
}

export function useJukeboxPlayer({
  autoplay,
  tracks,
  defaultIndex = 0,
  currentIndex: controlledCurrentIndex,
  onCurrentIndexChange,
  shuffle: shuffleInitial = false,
  repeat: repeatInitial = DEFAULT_REPEAT,
  onPlay,
  onPause,
  onTrackChange,
  onEnd,
}: UseJukeboxPlayerOptions): JukeboxPlayerState {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const persistentWrapperRef = useRef<HTMLDivElement | null>(
    createPersistentWrapper(),
  );
  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const shouldResumePlaybackRef = useRef(autoplay);
  const tracksRef = useRef(tracks);
  const repeatRef = useRef<RepeatMode>(repeatInitial);
  const shuffleRef = useRef(shuffleInitial);

  const onPlayRef = useLatestRef(onPlay);
  const onPauseRef = useLatestRef(onPause);
  const onTrackChangeRef = useLatestRef(onTrackChange);
  const onEndRef = useLatestRef(onEnd);

  const [isContainerMounted, setIsContainerMounted] = useState(false);
  const [internalCurrentIndex, setInternalCurrentIndex] =
    useState(defaultIndex);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(shuffleInitial);
  const [repeat, setRepeat] = useState<RepeatMode>(repeatInitial);

  const {
    isMuted,
    volume,
    volumeRef,
    mutedPreferenceRef,
    setVolume,
    toggleMute,
    setIsMuted,
  } = useVolumeControl(playerRef);

  const trackCount = tracks.length;
  const hasTracks = trackCount > 0;
  const hasMultipleTracks = trackCount > 1;
  const maxTrackIndex = Math.max(trackCount - 1, 0);
  const isCurrentIndexControlled = controlledCurrentIndex !== undefined;
  const resolvedCurrentIndex = isCurrentIndexControlled
    ? controlledCurrentIndex
    : internalCurrentIndex;
  const safeCurrentIndex = hasTracks
    ? Math.max(0, Math.min(resolvedCurrentIndex, maxTrackIndex))
    : 0;
  const currentTrack = tracks[safeCurrentIndex];
  const currentVideoId = currentTrack?.videoId;

  const { currentTime, duration, progress, seek, resetProgress } =
    useProgressPolling(playerRef, isPlaying, isReady, currentVideoId);

  useEffect(() => {
    repeatRef.current = repeat;
    shuffleRef.current = shuffle;
    isPlayingRef.current = isPlaying;
  }, [repeat, shuffle, isPlaying]);

  const applyTrackIndex = useCallback(
    (nextIndex: number) => {
      if (!hasTracks) {
        return;
      }

      const safeNextIndex = Math.max(0, Math.min(nextIndex, maxTrackIndex));

      if (!isCurrentIndexControlled) {
        setInternalCurrentIndex(safeNextIndex);
      }

      onCurrentIndexChange?.(safeNextIndex);
    },
    [hasTracks, isCurrentIndexControlled, maxTrackIndex, onCurrentIndexChange],
  );

  const moveTrack = useCallback(
    (step: number) => {
      if (!hasMultipleTracks) {
        return;
      }

      shouldResumePlaybackRef.current = isPlayingRef.current;
      const nextIndex = shuffleRef.current
        ? getRandomTrackIndex(currentIndexRef.current, trackCount)
        : getNextTrackIndex(currentIndexRef.current, step, trackCount);

      applyTrackIndex(nextIndex);
    },
    [applyTrackIndex, hasMultipleTracks, trackCount],
  );

  const pausePlayback = useCallback(() => {
    const player = playerRef.current;

    shouldResumePlaybackRef.current = false;

    if (!canControlPlayer(player)) {
      setIsPlaying(false);
      return;
    }

    player.pauseVideo();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    currentIndexRef.current = safeCurrentIndex;
  }, [safeCurrentIndex]);

  const [prevTracks, setPrevTracks] = useState(tracks);

  if (prevTracks !== tracks) {
    const hasTracksChanged =
      prevTracks.length !== tracks.length ||
      prevTracks.some((prev, i) => prev.videoId !== tracks[i]?.videoId);

    setPrevTracks(tracks);

    if (hasTracksChanged) {
      if (!isCurrentIndexControlled) {
        setInternalCurrentIndex(0);
      }
    }
  }

  useEffect(() => {
    tracksRef.current = tracks;
    shouldResumePlaybackRef.current = isPlayingRef.current;
  }, [tracks]);

  useEffect(() => {
    if (!isReady && !isPlayingRef.current) {
      shouldResumePlaybackRef.current = autoplay;
    }
  }, [autoplay, isReady]);

  useEffect(() => {
    if (!currentVideoId) {
      return;
    }

    const track = tracksRef.current[safeCurrentIndex];

    if (track && track.videoId === currentVideoId) {
      onTrackChangeRef.current?.(track, safeCurrentIndex);
    }
  }, [safeCurrentIndex, currentVideoId, onTrackChangeRef]);

  const toggleShuffle = useCallback(() => {
    setShuffle((value) => !value);
  }, []);

  const cycleRepeat = useCallback(() => {
    setRepeat((mode) => REPEAT_CYCLE[mode]);
  }, []);

  useEffect(() => {
    const wrapper = persistentWrapperRef.current;

    if (!wrapper || !isContainerMounted || !hasTracks) {
      return;
    }

    const playerTarget = document.createElement("div");
    playerTarget.style.width = "100%";
    playerTarget.style.height = "100%";
    wrapper.appendChild(playerTarget);

    let isCancelled = false;

    void loadYouTubeIframeApi()
      .then((YT) => {
        if (isCancelled) {
          return;
        }

        playerRef.current = new YT.Player(playerTarget, {
          width: "100%",
          height: "100%",
          videoId: tracksRef.current[currentIndexRef.current]?.videoId ?? "",
          playerVars: {
            controls: 1,
            origin: window.location.origin,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              const player = playerRef.current;

              if (!player) {
                return;
              }

              player.setVolume(volumeRef.current);

              if (mutedPreferenceRef.current) {
                player.mute();
              } else {
                player.unMute();
              }

              setIsMuted(mutedPreferenceRef.current);
              setIsReady(true);
            },
            onStateChange: (event) => {
              if (event.data === PLAYER_STATE_ENDED) {
                const player = playerRef.current;

                onEndRef.current?.();

                if (!player) {
                  shouldResumePlaybackRef.current = false;
                  setIsPlaying(false);
                  resetProgress();
                  return;
                }

                const action = resolveTrackEndedAction(
                  tracksRef.current,
                  currentIndexRef.current,
                  repeatRef.current,
                );

                if (action.type === "stop") {
                  shouldResumePlaybackRef.current = false;
                  setIsPlaying(false);
                  resetProgress();
                  return;
                }

                shouldResumePlaybackRef.current = true;

                if (action.type === "replay") {
                  player.loadVideoById(action.videoId);
                  return;
                }

                applyTrackIndex(action.nextIndex);
                return;
              }

              if (event.data === PLAYER_STATE_PLAYING) {
                setIsPlaying(true);
                onPlayRef.current?.();
                return;
              }

              if (event.data === PLAYER_STATE_PAUSED) {
                setIsPlaying(false);
                onPauseRef.current?.();
              }
            },
            onError: () => {
              shouldResumePlaybackRef.current = false;
              setIsPlaying(false);
            },
          },
        });
      })
      .catch(() => {
        setIsReady(false);
        setIsPlaying(false);
      });

    return () => {
      isCancelled = true;
      setIsReady(false);
      setIsPlaying(false);
      playerRef.current?.destroy();
      playerRef.current = null;

      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
    };
  }, [
    applyTrackIndex,
    hasTracks,
    isContainerMounted,
    onEndRef,
    onPauseRef,
    onPlayRef,
    resetProgress,
    mutedPreferenceRef,
    setIsMuted,
    volumeRef,
  ]);

  useEffect(() => {
    const player = playerRef.current;

    if (!isReady || !player || !currentVideoId) {
      return;
    }

    if (shouldResumePlaybackRef.current) {
      player.loadVideoById(currentVideoId);
      return;
    }

    player.cueVideoById(currentVideoId);
  }, [currentVideoId, isReady]);

  const playerMountRef = useCallback((slotNode: HTMLDivElement | null) => {
    const wrapper = persistentWrapperRef.current;

    if (!wrapper) {
      return;
    }

    if (slotNode) {
      slotNode.appendChild(wrapper);
      setIsContainerMounted(true);
    }
  }, []);

  return {
    playerMountRef,
    currentIndex: safeCurrentIndex,
    isMuted,
    isPlaying,
    volume,
    setVolume,
    toggleMute,
    togglePlay: useCallback(() => {
      const player = playerRef.current;

      if (!canControlPlayer(player) || !isReady || !hasTracks) {
        return;
      }

      if (isPlayingRef.current) {
        pausePlayback();
        return;
      }

      shouldResumePlaybackRef.current = true;
      player.playVideo();
    }, [hasTracks, isReady, pausePlayback]),
    playNext: useCallback(() => {
      moveTrack(1);
    }, [moveTrack]),
    playPrev: useCallback(() => {
      moveTrack(-1);
    }, [moveTrack]),
    playTrackAt: useCallback(
      (index: number) => {
        if (!hasTracks) {
          return;
        }

        shouldResumePlaybackRef.current = isPlayingRef.current;
        applyTrackIndex(index);
      },
      [applyTrackIndex, hasTracks],
    ),
    shuffle,
    toggleShuffle,
    repeat,
    cycleRepeat,
    progress,
    duration,
    currentTime,
    seek,
  };
}
