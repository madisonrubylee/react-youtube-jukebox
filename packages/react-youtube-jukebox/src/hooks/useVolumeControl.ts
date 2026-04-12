import { useCallback, useRef, useState, type RefObject } from "react";

import { DEFAULT_VOLUME } from "../lib/constants";
import { clampVolume } from "../lib/utils";
import type { YouTubePlayer } from "../lib/youtube";

type UseVolumeControlResult = {
  isMuted: boolean;
  volume: number;
  setVolume: (nextVolume: number) => void;
  toggleMute: () => void;
  syncPlayerAudioState: (player: YouTubePlayer) => void;
};

export function useVolumeControl(
  playerRef: RefObject<YouTubePlayer | null>,
): UseVolumeControlResult {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const mutedPreferenceRef = useRef(true);
  const volumeRef = useRef(DEFAULT_VOLUME);

  const syncPlayerAudioState = useCallback((player: YouTubePlayer) => {
    player.setVolume(volumeRef.current);

    if (mutedPreferenceRef.current) {
      player.mute();
      return;
    }

    player.unMute();
  }, []);

  const setVolume = useCallback(
    (nextVolume: number) => {
      const clampedVolume = clampVolume(nextVolume);
      const isSilent = clampedVolume === 0;

      setVolumeState(clampedVolume);
      volumeRef.current = clampedVolume;
      mutedPreferenceRef.current = isSilent;
      setIsMuted(isSilent);

      const player = playerRef.current;

      if (!player) {
        return;
      }

      player.setVolume(clampedVolume);

      if (isSilent) {
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
    setVolume,
    toggleMute,
    syncPlayerAudioState,
  };
}
