import { useCallback } from "react";

import type { UseJukeboxOptions, UseJukeboxResult } from "../lib/types";
import { getNextTrackIndex } from "../lib/utils";
import { useJukeboxPlayer } from "./useJukeboxPlayer";
import { useControllableState } from "./useControllableState";

export function useJukebox({
  tracks,
  autoplay = true,
  defaultIndex,
  currentIndex,
  onCurrentIndexChange,
  onPlay,
  onPause,
  onTrackChange,
  onEnd,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
}: UseJukeboxOptions): UseJukeboxResult {
  const player = useJukeboxPlayer({
    autoplay,
    tracks,
    defaultIndex,
    currentIndex,
    onCurrentIndexChange,
    onPlay,
    onPause,
    onTrackChange,
    onEnd,
  });

  const totalTracks = tracks.length;
  const hasTracks = totalTracks > 0;
  const hasMultipleTracks = totalTracks > 1;
  const currentTrack = tracks[player.currentIndex];
  const nextTrack = hasMultipleTracks
    ? tracks[getNextTrackIndex(player.currentIndex, 1, totalTracks)]
    : undefined;

  const [resolvedExpanded, setResolvedExpanded] = useControllableState({
    value: controlledExpanded,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange,
  });
  const expanded = hasTracks ? resolvedExpanded : false;

  const applyExpanded = useCallback(
    (nextExpanded: boolean) => {
      if (!hasTracks) {
        return;
      }

      setResolvedExpanded(nextExpanded);
    },
    [hasTracks, setResolvedExpanded],
  );

  const openExpanded = useCallback(() => {
    applyExpanded(true);
  }, [applyExpanded]);

  const closeExpanded = useCallback(() => {
    applyExpanded(false);
  }, [applyExpanded]);

  const toggleExpanded = useCallback(() => {
    if (!hasTracks) {
      return;
    }

    applyExpanded(!expanded);
  }, [applyExpanded, expanded, hasTracks]);

  return {
    player,
    currentTrack,
    nextTrack,
    totalTracks,
    hasTracks,
    hasMultipleTracks,
    expanded,
    openExpanded,
    closeExpanded,
    toggleExpanded,
  };
}
