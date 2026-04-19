import { useCallback } from "react";

import type { UseJukeboxOptions, UseJukeboxResult } from "../../../lib/types";
import { getNextTrackIndex } from "../../../lib/utils";
import { useControllableState } from "../../../hooks/useControllableState";
import { useJukeboxPlayer } from "../../../hooks/useJukeboxPlayer";

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
  onError,
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
    onError,
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
    applyExpanded(!expanded);
  }, [applyExpanded, expanded]);

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
