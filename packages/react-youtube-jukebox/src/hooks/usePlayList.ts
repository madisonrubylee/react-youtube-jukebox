import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  clampIndex,
  DEFAULT_PLAYLIST_SIZE,
  type JukeboxTrack,
  type PlayListSize,
  type PlayListTrack,
  type UsePlayListOptions,
  type UsePlayListResult,
} from "../lib/shared";
import { useJukeboxPlayer } from "./useJukeboxPlayer";

function toJukeboxTracks(playlistTracks: PlayListTrack[]): JukeboxTrack[] {
  return playlistTracks.map((track) => ({
    videoId: track.videoId,
    title: track.title,
    artist: track.artist,
  }));
}

function usePlayListSize({
  size: controlledSize,
  defaultSize = DEFAULT_PLAYLIST_SIZE,
  onSizeChange,
}: {
  size: PlayListSize | undefined;
  defaultSize: PlayListSize | undefined;
  onSizeChange: ((size: PlayListSize) => void) | undefined;
}) {
  const [internalSize, setInternalSize] = useState<PlayListSize>(defaultSize);
  const previousSizeRef = useRef<PlayListSize>("compact");
  const isControlled = controlledSize !== undefined;
  const resolvedSize = isControlled ? controlledSize : internalSize;

  const applySize = useCallback(
    (nextSize: PlayListSize) => {
      if (!isControlled) {
        setInternalSize(nextSize);
      }

      onSizeChange?.(nextSize);
    },
    [isControlled, onSizeChange],
  );

  const toggleSize = useCallback(() => {
    const nextSize: PlayListSize =
      resolvedSize === "compact" ? "expanded" : "compact";
    applySize(nextSize);
  }, [applySize, resolvedSize]);

  const minimize = useCallback(() => {
    if (resolvedSize !== "mini") {
      previousSizeRef.current = resolvedSize;
    }

    applySize("mini");
  }, [applySize, resolvedSize]);

  const restore = useCallback(() => {
    const nextSize =
      previousSizeRef.current === "mini" ? "compact" : previousSizeRef.current;
    applySize(nextSize);
  }, [applySize]);

  return { resolvedSize, toggleSize, minimize, restore } as const;
}

export function usePlayList({
  playlist,
  autoplay = false,
  defaultTabIndex = 0,
  activeTabIndex: controlledActiveTabIndex,
  onActiveTabIndexChange,
  defaultSize,
  size,
  onSizeChange,
  defaultIndex,
  currentIndex,
  onCurrentIndexChange,
  onPlay,
  onPause,
  onTrackChange,
  onEnd,
}: UsePlayListOptions): UsePlayListResult {
  const [internalActiveTabIndex, setInternalActiveTabIndex] = useState(
    defaultTabIndex,
  );
  const isActiveTabControlled = controlledActiveTabIndex !== undefined;
  const resolvedActiveTabIndex = isActiveTabControlled
    ? controlledActiveTabIndex
    : internalActiveTabIndex;
  const safeActiveTabIndex = clampIndex(resolvedActiveTabIndex, playlist.length);

  const activePlaylist = playlist[safeActiveTabIndex];
  const activeTracks = useMemo(() => activePlaylist?.data ?? [], [activePlaylist]);
  const activeTracksRef = useRef(activeTracks);
  const previousPlaylistIndexRef = useRef(safeActiveTabIndex);

  useEffect(() => {
    activeTracksRef.current = activeTracks;
  }, [activeTracks]);

  const jukeboxTracks = useMemo(
    () => toJukeboxTracks(activeTracks),
    [activeTracks],
  );

  const handleTrackChange = useCallback(
    (_track: JukeboxTrack, index: number) => {
      const nextTrack = activeTracksRef.current[index];

      if (!nextTrack) {
        return;
      }

      onTrackChange?.(nextTrack, index);
    },
    [onTrackChange],
  );

  const player = useJukeboxPlayer({
    autoplay,
    tracks: jukeboxTracks,
    ...(defaultIndex !== undefined ? { defaultIndex } : {}),
    ...(currentIndex !== undefined ? { currentIndex } : {}),
    ...(onCurrentIndexChange !== undefined ? { onCurrentIndexChange } : {}),
    ...(onPlay !== undefined ? { onPlay } : {}),
    ...(onPause !== undefined ? { onPause } : {}),
    ...(onTrackChange !== undefined ? { onTrackChange: handleTrackChange } : {}),
    ...(onEnd !== undefined ? { onEnd } : {}),
  });
  const {
    currentIndex: currentTrackIndex,
    playTrackAt,
    togglePlay,
  } = player;

  useEffect(() => {
    if (previousPlaylistIndexRef.current === safeActiveTabIndex) {
      return;
    }

    previousPlaylistIndexRef.current = safeActiveTabIndex;
    playTrackAt(0);
  }, [playTrackAt, safeActiveTabIndex]);

  const setActiveTabIndex = useCallback(
    (index: number) => {
      const safeIndex = clampIndex(index, playlist.length);

      if (!isActiveTabControlled) {
        setInternalActiveTabIndex(safeIndex);
      }

      onActiveTabIndexChange?.(safeIndex);
    },
    [isActiveTabControlled, onActiveTabIndexChange, playlist.length],
  );

  const selectTrack = useCallback(
    (index: number) => {
      const nextTrack = activeTracksRef.current[index];

      if (!nextTrack) {
        return;
      }

      const isCurrentTrackSelected = index === currentTrackIndex;

      if (isCurrentTrackSelected) {
        togglePlay();
        return;
      }

      playTrackAt(index);
    },
    [currentTrackIndex, playTrackAt, togglePlay],
  );

  const {
    resolvedSize,
    toggleSize,
    minimize,
    restore,
  } = usePlayListSize({
    size,
    defaultSize,
    onSizeChange,
  });

  const currentTrack = activeTracks[currentTrackIndex];
  const isMini = resolvedSize === "mini";
  const isExpanded = resolvedSize === "expanded";

  return {
    player,
    activeTabIndex: safeActiveTabIndex,
    activePlaylist,
    activeTracks,
    currentTrack,
    size: resolvedSize,
    isMini,
    isExpanded,
    setActiveTabIndex,
    selectTrack,
    toggleSize,
    minimize,
    restore,
  };
}
