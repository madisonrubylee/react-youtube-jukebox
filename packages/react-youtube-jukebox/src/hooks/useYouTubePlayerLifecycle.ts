import { useEffect, type RefObject } from "react";

import {
  loadYouTubeIframeApi,
  type YouTubePlayer,
  type YouTubePlayerErrorEvent,
  type YouTubePlayerStateEvent,
} from "../lib/youtube";
import { useLatestRef } from "./useLatestRef";

type UseYouTubePlayerLifecycleOptions = {
  playerRef: RefObject<YouTubePlayer | null>;
  persistentWrapper: HTMLDivElement | null;
  isContainerMounted: boolean;
  hasTracks: boolean;
  getInitialVideoId: () => string;
  onReady: (player: YouTubePlayer) => void;
  onReadinessChange: (isReady: boolean) => void;
  onStateChange: (event: YouTubePlayerStateEvent) => void;
  onError?: ((error: unknown) => void) | undefined;
};

/**
 * Owns the YT.Player instance lifecycle: creation, teardown, readiness wiring.
 * Callbacks are read via latest-refs so they never retrigger the effect.
 * The caller keeps ownership of `playerRef` so sibling hooks can read the same instance.
 */
export function useYouTubePlayerLifecycle({
  playerRef,
  persistentWrapper,
  isContainerMounted,
  hasTracks,
  getInitialVideoId,
  onReady,
  onReadinessChange,
  onStateChange,
  onError,
}: UseYouTubePlayerLifecycleOptions): void {
  const getInitialVideoIdRef = useLatestRef(getInitialVideoId);
  const onReadyRef = useLatestRef(onReady);
  const onReadinessChangeRef = useLatestRef(onReadinessChange);
  const onStateChangeRef = useLatestRef(onStateChange);
  const onErrorRef = useLatestRef(onError);

  useEffect(() => {
    if (!persistentWrapper || !isContainerMounted || !hasTracks) {
      return;
    }

    const wrapper = persistentWrapper;
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
          videoId: getInitialVideoIdRef.current(),
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

              onReadyRef.current(player);
              onReadinessChangeRef.current(true);
            },
            onStateChange: (event) => {
              onStateChangeRef.current(event);
            },
            onError: (event: YouTubePlayerErrorEvent) => {
              console.warn(
                "[react-youtube-jukebox] YouTube player reported an error",
                event,
              );
              onErrorRef.current?.(event);
            },
          },
        });
      })
      .catch((error) => {
        console.warn(
          "[react-youtube-jukebox] Failed to initialize the YouTube iframe API",
          error,
        );
        onErrorRef.current?.(error);
        onReadinessChangeRef.current(false);
      });

    const onReadinessChange = onReadinessChangeRef.current;

    return () => {
      isCancelled = true;
      onReadinessChange(false);
      playerRef.current?.destroy();
      playerRef.current = null;

      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
    };
  }, [
    playerRef,
    persistentWrapper,
    isContainerMounted,
    hasTracks,
    getInitialVideoIdRef,
    onReadyRef,
    onReadinessChangeRef,
    onStateChangeRef,
    onErrorRef,
  ]);
}
