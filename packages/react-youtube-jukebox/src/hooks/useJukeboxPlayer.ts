import { useCallback, useEffect, useRef, useState } from "react";

import {
  clampVolume,
  DEFAULT_VOLUME,
  getNextTrackIndex,
  type JukeboxPlayerState,
  type JukeboxTrack,
} from "../lib/shared";
import {
  canControlPlayer,
  loadYouTubeIframeApi,
  PLAYER_STATE_ENDED,
  PLAYER_STATE_PAUSED,
  PLAYER_STATE_PLAYING,
  type YouTubePlayer,
} from "../lib/youtube";

type UseJukeboxPlayerOptions = {
  autoplay: boolean;
  tracks: JukeboxTrack[];
};

export function useJukeboxPlayer({
  autoplay,
  tracks,
}: UseJukeboxPlayerOptions): JukeboxPlayerState {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const mutedPreferenceRef = useRef(true);
  const shouldResumePlaybackRef = useRef(autoplay);
  const tracksRef = useRef(tracks);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const [playerMountNode, setPlayerMountNode] = useState<HTMLDivElement | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

  const trackCount = tracks.length;
  const hasTracks = trackCount > 0;
  const hasMultipleTracks = trackCount > 1;
  const safeCurrentIndex = hasTracks ? Math.min(currentIndex, trackCount - 1) : 0;
  const currentTrack = tracks[safeCurrentIndex];
  const currentVideoId = currentTrack?.videoId;

  const moveTrack = useCallback(
    (step: number) => {
      if (!hasMultipleTracks) {
        return;
      }

      shouldResumePlaybackRef.current = isPlayingRef.current;
      setCurrentIndex((index) => getNextTrackIndex(index, step, trackCount));
    },
    [hasMultipleTracks, trackCount],
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

  useEffect(() => {
    tracksRef.current = tracks;
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
    if (!playerMountNode || !hasTracks) {
      return;
    }

    let isCancelled = false;

    void loadYouTubeIframeApi()
      .then((YT) => {
        if (isCancelled) {
          return;
        }

        playerRef.current = new YT.Player(playerMountNode, {
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

                if (nextTrackCount <= 1) {
                  shouldResumePlaybackRef.current = false;
                  setIsPlaying(false);
                  return;
                }

                shouldResumePlaybackRef.current = true;
                setCurrentIndex((index) =>
                  getNextTrackIndex(index, 1, nextTrackCount),
                );
                return;
              }

              if (event.data === PLAYER_STATE_PLAYING) {
                setIsPlaying(true);
                return;
              }

              if (event.data === PLAYER_STATE_PAUSED) {
                setIsPlaying(false);
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
    };
  }, [hasTracks, playerMountNode]);

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

  return {
    playerMountRef: setPlayerMountNode,
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
  };
}
