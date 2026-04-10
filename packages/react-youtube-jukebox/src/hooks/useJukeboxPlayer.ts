import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  clampVolume,
  DEFAULT_VOLUME,
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

const DEFAULT_REPEAT: RepeatMode = "all";

const PROGRESS_POLL_MS = 250;

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
  const mutedPreferenceRef = useRef(true);
  const shouldResumePlaybackRef = useRef(autoplay);
  const tracksRef = useRef(tracks);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const repeatRef = useRef<RepeatMode>(repeatInitial);
  const shuffleRef = useRef(shuffleInitial);

  const onPlayRef = useRef(onPlay);
  const onPauseRef = useRef(onPause);
  const onTrackChangeRef = useRef(onTrackChange);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onPlayRef.current = onPlay;
    onPauseRef.current = onPause;
    onTrackChangeRef.current = onTrackChange;
    onEndRef.current = onEnd;
  }, [onPlay, onPause, onTrackChange, onEnd]);

  const [isContainerMounted, setIsContainerMounted] = useState(false);
  const [internalCurrentIndex, setInternalCurrentIndex] = useState(defaultIndex);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [shuffle, setShuffle] = useState(shuffleInitial);
  const [repeat, setRepeat] = useState<RepeatMode>(repeatInitial);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const progress = duration > 0 ? currentTime / duration : 0;

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

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
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

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
  }, [safeCurrentIndex, currentVideoId]);

  useEffect(() => {
    startTransition(() => {
      setCurrentTime(0);
      setDuration(0);
    });
  }, [currentVideoId]);

  useEffect(() => {
    if (!isPlaying || !isReady) {
      return;
    }

    const player = playerRef.current;

    if (!canControlPlayer(player)) {
      return;
    }

    const tick = () => {
      const p = playerRef.current;
      if (!canControlPlayer(p)) {
        return;
      }

      const nextDuration = p.getDuration();
      const nextCurrent = p.getCurrentTime();

      if (Number.isFinite(nextDuration) && nextDuration > 0) {
        setDuration(nextDuration);
      }

      if (Number.isFinite(nextCurrent) && nextCurrent >= 0) {
        setCurrentTime(nextCurrent);
      }
    };

    tick();
    const id = window.setInterval(tick, PROGRESS_POLL_MS);

    return () => {
      window.clearInterval(id);
    };
  }, [isPlaying, isReady, currentVideoId]);

  const seek = useCallback((seconds: number) => {
    const player = playerRef.current;

    if (!canControlPlayer(player)) {
      return;
    }

    player.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

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
                const nextTrackCount = tracksRef.current.length;
                const mode = repeatRef.current;
                const player = playerRef.current;

                onEndRef.current?.();

                if (nextTrackCount <= 0 || !player) {
                  shouldResumePlaybackRef.current = false;
                  setIsPlaying(false);
                  setCurrentTime(0);
                  return;
                }

                if (nextTrackCount === 1) {
                  if (mode === "none") {
                    shouldResumePlaybackRef.current = false;
                    setIsPlaying(false);
                    setCurrentTime(0);
                    return;
                  }

                  shouldResumePlaybackRef.current = true;
                  const onlyId = tracksRef.current[0]?.videoId;

                  if (onlyId) {
                    player.loadVideoById(onlyId);
                  }

                  return;
                }

                const idx = currentIndexRef.current;

                if (mode === "one") {
                  shouldResumePlaybackRef.current = true;
                  const id = tracksRef.current[idx]?.videoId;

                  if (id) {
                    player.loadVideoById(id);
                  }

                  return;
                }

                const isLast = idx === nextTrackCount - 1;

                if (mode === "none" && isLast) {
                  shouldResumePlaybackRef.current = false;
                  setIsPlaying(false);
                  setCurrentTime(0);
                  return;
                }

                shouldResumePlaybackRef.current = true;
                applyTrackIndex(getNextTrackIndex(currentIndexRef.current, 1, nextTrackCount));
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
  }, [applyTrackIndex, hasTracks, isContainerMounted]);

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
    setVolume: useCallback((nextVolume: number) => {
      const clampedVolume = clampVolume(nextVolume);
      const player = playerRef.current;

      setVolumeState(clampedVolume);
      volumeRef.current = clampedVolume;

      if (clampedVolume === 0) {
        mutedPreferenceRef.current = true;
        setIsMuted(true);
      } else {
        mutedPreferenceRef.current = false;
        setIsMuted(false);
      }

      if (!player) {
        return;
      }

      player.setVolume(clampedVolume);

      if (clampedVolume === 0) {
        player.mute();
        return;
      }

      player.unMute();
    }, []),
    toggleMute: useCallback(() => {
      const player = playerRef.current;
      const nextMuted = !mutedPreferenceRef.current;

      mutedPreferenceRef.current = nextMuted;
      setIsMuted(nextMuted);

      if (!player) {
        return;
      }

      if (nextMuted) {
        player.mute();
        return;
      }

      player.unMute();
    }, []),
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
