import { useCallback, useState } from "react";

import {
  getNextTrackIndex,
  type UseJukeboxOptions,
  type UseJukeboxResult,
} from "../lib/shared";
import { useJukeboxPlayer } from "./useJukeboxPlayer";

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
    ...(defaultIndex !== undefined ? { defaultIndex } : {}),
    ...(currentIndex !== undefined ? { currentIndex } : {}),
    ...(onCurrentIndexChange !== undefined ? { onCurrentIndexChange } : {}),
    ...(onPlay !== undefined ? { onPlay } : {}),
    ...(onPause !== undefined ? { onPause } : {}),
    ...(onTrackChange !== undefined ? { onTrackChange } : {}),
    ...(onEnd !== undefined ? { onEnd } : {}),
  });

  const totalTracks = tracks.length;
  const hasTracks = totalTracks > 0;
  const hasMultipleTracks = totalTracks > 1;
  const currentTrack = tracks[player.currentIndex];
  const nextTrack = hasMultipleTracks
    ? tracks[getNextTrackIndex(player.currentIndex, 1, totalTracks)]
    : undefined;

  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpandedControlled = controlledExpanded !== undefined;
  const resolvedExpanded = isExpandedControlled
    ? controlledExpanded
    : internalExpanded;
  const expanded = hasTracks ? resolvedExpanded : false;

  const applyExpanded = useCallback(
    (nextExpanded: boolean) => {
      if (!hasTracks) {
        return;
      }

      if (!isExpandedControlled) {
        setInternalExpanded(nextExpanded);
      }

      onExpandedChange?.(nextExpanded);
    },
    [hasTracks, isExpandedControlled, onExpandedChange],
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
