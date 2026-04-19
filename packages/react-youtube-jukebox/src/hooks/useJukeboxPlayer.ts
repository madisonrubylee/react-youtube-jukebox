import { useCallback, useEffect, useRef, useState } from "react";

import type { JukeboxPlayerState, JukeboxTrack } from "../lib/types";
import { getNextTrackIndex, resolveTrackEndedAction } from "../lib/utils";
import {
  canControlPlayer,
  PLAYER_STATE_ENDED,
  PLAYER_STATE_PAUSED,
  PLAYER_STATE_PLAYING,
  type YouTubePlayer,
  type YouTubePlayerStateEvent,
} from "../lib/youtube";
import { useLatestRef } from "./useLatestRef";
import { usePersistentPlayerMount } from "./usePersistentPlayerMount";
import { useProgressPolling } from "./useProgressPolling";
import { useTrackIndexController } from "./useTrackIndexController";
import { useVolumeControl } from "./useVolumeControl";
import { useYouTubePlayerLifecycle } from "./useYouTubePlayerLifecycle";

type UseJukeboxPlayerOptions = {
  autoplay: boolean;
  tracks: JukeboxTrack[];
  defaultIndex?: number | undefined;
  currentIndex?: number | undefined;
  onCurrentIndexChange?: ((index: number) => void) | undefined;
  onPlay?: (() => void) | undefined;
  onPause?: (() => void) | undefined;
  onTrackChange?: ((track: JukeboxTrack, index: number) => void) | undefined;
  onEnd?: (() => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};

export function useJukeboxPlayer({
  autoplay,
  tracks,
  defaultIndex = 0,
  currentIndex: controlledCurrentIndex,
  onCurrentIndexChange,
  onPlay,
  onPause,
  onTrackChange,
  onEnd,
  onError,
}: UseJukeboxPlayerOptions): JukeboxPlayerState {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const isPlayingRef = useRef(false);
  const shouldResumePlaybackRef = useRef(autoplay);
  const tracksRef = useRef(tracks);

  const onPlayRef = useLatestRef(onPlay);
  const onPauseRef = useLatestRef(onPause);
  const onTrackChangeRef = useLatestRef(onTrackChange);
  const onEndRef = useLatestRef(onEnd);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { isContainerMounted, persistentWrapper, playerMountRef } =
    usePersistentPlayerMount();

  const { isMuted, volume, setVolume, toggleMute, syncPlayerAudioState } =
    useVolumeControl(playerRef);

  const {
    applyTrackIndex,
    currentIndexRef,
    currentVideoId,
    hasMultipleTracks,
    hasTracks,
    safeCurrentIndex,
    trackCount,
  } = useTrackIndexController({
    tracks,
    defaultIndex,
    currentIndex: controlledCurrentIndex,
    onCurrentIndexChange,
  });
  const applyTrackIndexRef = useLatestRef(applyTrackIndex);

  const { currentTime, duration, progress, seek, resetProgress } =
    useProgressPolling(playerRef, isPlaying, isReady, currentVideoId);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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

  const handleEnded = useCallback(() => {
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

    applyTrackIndexRef.current(action.nextIndex);
  }, [applyTrackIndexRef, currentIndexRef, onEndRef, resetProgress]);

  const handleYoutubeStateChange = useCallback(
    (event: YouTubePlayerStateEvent) => {
      if (event.data === PLAYER_STATE_ENDED) {
        handleEnded();
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
    [handleEnded, onPauseRef, onPlayRef],
  );

  const getInitialVideoId = useCallback(
    () => tracksRef.current[currentIndexRef.current]?.videoId ?? "",
    [currentIndexRef],
  );

  useYouTubePlayerLifecycle({
    playerRef,
    persistentWrapper,
    isContainerMounted,
    hasTracks,
    getInitialVideoId,
    onReady: syncPlayerAudioState,
    onReadinessChange: setIsReady,
    onStateChange: handleYoutubeStateChange,
    onError,
  });

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

  const moveTrack = useCallback(
    (step: number) => {
      if (!hasMultipleTracks) {
        return;
      }

      shouldResumePlaybackRef.current = isPlayingRef.current;
      const nextIndex = getNextTrackIndex(
        currentIndexRef.current,
        step,
        trackCount,
      );

      applyTrackIndex(nextIndex);
    },
    [applyTrackIndex, currentIndexRef, hasMultipleTracks, trackCount],
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

  const togglePlay = useCallback(() => {
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
  }, [hasTracks, isReady, pausePlayback]);

  const playNext = useCallback(() => {
    moveTrack(1);
  }, [moveTrack]);

  const playPrev = useCallback(() => {
    moveTrack(-1);
  }, [moveTrack]);

  const playTrackAt = useCallback(
    (index: number) => {
      if (!hasTracks) {
        return;
      }

      shouldResumePlaybackRef.current = isPlayingRef.current;
      applyTrackIndex(index);
    },
    [applyTrackIndex, hasTracks],
  );

  return {
    playerMountRef,
    currentIndex: safeCurrentIndex,
    isMuted,
    isPlaying,
    volume,
    setVolume,
    toggleMute,
    togglePlay,
    playNext,
    playPrev,
    playTrackAt,
    progress,
    duration,
    currentTime,
    seek,
  };
}
