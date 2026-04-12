import { useCallback, useRef, useState, type RefObject } from "react";

import { clampVolume, DEFAULT_VOLUME } from "../lib/shared";
import type { YouTubePlayer } from "../lib/youtube";

type UseVolumeControlResult = {
  isMuted: boolean;
  volume: number;
  volumeRef: RefObject<number>;
  mutedPreferenceRef: RefObject<boolean>;
  setVolume: (nextVolume: number) => void;
  toggleMute: () => void;
  setIsMuted: (muted: boolean) => void;
};

export function useVolumeControl(
  playerRef: RefObject<YouTubePlayer | null>,
): UseVolumeControlResult {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const mutedPreferenceRef = useRef(true);
  const volumeRef = useRef(DEFAULT_VOLUME);

  const setVolume = useCallback(
    (nextVolume: number) => {
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
    },
    [playerRef],
  );

  const toggleMute = useCallback(() => {
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
  }, [playerRef]);

  return {
    isMuted,
    volume,
    volumeRef,
    mutedPreferenceRef,
    setVolume,
    toggleMute,
    setIsMuted,
  };
}
