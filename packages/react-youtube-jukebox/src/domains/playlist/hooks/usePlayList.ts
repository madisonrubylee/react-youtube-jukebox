import { useCallback, useEffect, useMemo, useRef } from "react";

import { clampIndex } from "../lib/utils";
import type {
  JukeboxTrack,
  PlayListTrack,
  UsePlayListOptions,
  UsePlayListResult,
} from "../lib/types";
import { useJukeboxPlayer } from "./useJukeboxPlayer";
import { useControllableState } from "./useControllableState";
import { usePlayListSize } from "./usePlayListSize";

function toJukeboxTracks(playlistTracks: PlayListTrack[]): JukeboxTrack[] {
  return playlistTracks.map((track) => ({
    videoId: track.videoId,
    title: track.title,
    artist: track.artist,
  }));
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
  const [resolvedActiveTabIndex, setResolvedActiveTabIndex] =
    useControllableState({
      value: controlledActiveTabIndex,
      defaultValue: defaultTabIndex,
      onChange: onActiveTabIndexChange,
    });
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
    defaultIndex,
    currentIndex,
    onCurrentIndexChange,
    onPlay,
    onPause,
    onTrackChange: onTrackChange ? handleTrackChange : undefined,
    onEnd,
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
      setResolvedActiveTabIndex(safeIndex);
    },
    [playlist.length, setResolvedActiveTabIndex],
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
