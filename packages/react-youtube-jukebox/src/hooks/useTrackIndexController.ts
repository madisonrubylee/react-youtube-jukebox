import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

import type { JukeboxTrack } from "../lib/shared";

function clampTrackIndex(index: number, totalTracks: number) {
  if (totalTracks <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(index, totalTracks - 1));
}

type UseTrackIndexControllerOptions = {
  tracks: JukeboxTrack[];
  defaultIndex: number;
  currentIndex: number | undefined;
  onCurrentIndexChange: ((index: number) => void) | undefined;
};

type UseTrackIndexControllerResult = {
  applyTrackIndex: (nextIndex: number) => void;
  currentIndexRef: RefObject<number>;
  currentVideoId: string | undefined;
  hasMultipleTracks: boolean;
  hasTracks: boolean;
  safeCurrentIndex: number;
  trackCount: number;
};

export function useTrackIndexController({
  tracks,
  defaultIndex,
  currentIndex: controlledCurrentIndex,
  onCurrentIndexChange,
}: UseTrackIndexControllerOptions): UseTrackIndexControllerResult {
  const trackSignature = useMemo(
    () => tracks.map((track) => track.videoId).join("::"),
    [tracks],
  );
  const [internalState, setInternalState] = useState(() => ({
    currentIndex: defaultIndex,
    trackSignature,
  }));
  const isCurrentIndexControlled = controlledCurrentIndex !== undefined;
  const trackCount = tracks.length;
  const hasTracks = trackCount > 0;
  const hasMultipleTracks = trackCount > 1;
  const internalCurrentIndex =
    internalState.trackSignature === trackSignature
      ? internalState.currentIndex
      : 0;
  const resolvedCurrentIndex = isCurrentIndexControlled
    ? controlledCurrentIndex
    : internalCurrentIndex;
  const safeCurrentIndex = hasTracks
    ? clampTrackIndex(resolvedCurrentIndex, trackCount)
    : 0;
  const currentTrack = tracks[safeCurrentIndex];
  const currentVideoId = currentTrack?.videoId;
  const currentIndexRef = useRef(safeCurrentIndex);

  useEffect(() => {
    currentIndexRef.current = safeCurrentIndex;
  }, [safeCurrentIndex]);

  const applyTrackIndex = useCallback(
    (nextIndex: number) => {
      if (!hasTracks) {
        return;
      }

      const safeNextIndex = clampTrackIndex(nextIndex, trackCount);

      if (!isCurrentIndexControlled) {
        setInternalState({
          currentIndex: safeNextIndex,
          trackSignature,
        });
      }

      onCurrentIndexChange?.(safeNextIndex);
    },
    [
      hasTracks,
      isCurrentIndexControlled,
      onCurrentIndexChange,
      trackCount,
      trackSignature,
    ],
  );

  return {
    applyTrackIndex,
    currentIndexRef,
    currentVideoId,
    hasMultipleTracks,
    hasTracks,
    safeCurrentIndex,
    trackCount,
  };
}
