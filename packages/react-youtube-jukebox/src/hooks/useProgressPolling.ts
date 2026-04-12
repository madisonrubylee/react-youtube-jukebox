import {
  startTransition,
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from "react";

import { canControlPlayer, type YouTubePlayer } from "../lib/youtube";

const PROGRESS_POLL_MS = 250;

type UseProgressPollingResult = {
  currentTime: number;
  duration: number;
  progress: number;
  seek: (seconds: number) => void;
  resetProgress: () => void;
};

export function useProgressPolling(
  playerRef: RefObject<YouTubePlayer | null>,
  isPlaying: boolean,
  isReady: boolean,
  currentVideoId: string | undefined,
): UseProgressPollingResult {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? currentTime / duration : 0;

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
  }, [isPlaying, isReady, currentVideoId, playerRef]);

  const seek = useCallback(
    (seconds: number) => {
      const player = playerRef.current;

      if (!canControlPlayer(player)) {
        return;
      }

      player.seekTo(seconds, true);
      setCurrentTime(seconds);
    },
    [playerRef],
  );

  const resetProgress = useCallback(() => {
    setCurrentTime(0);
  }, []);

  return { currentTime, duration, progress, seek, resetProgress };
}
