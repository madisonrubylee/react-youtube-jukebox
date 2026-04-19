import clsx from "clsx";
import { memo, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import type { PlayListTrack } from "../../../lib/types";
import { PlayingIndicator } from "./PlayListIcons";

const useSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type TrackRowProps = {
  index: number;
  track: PlayListTrack;
  isActive: boolean;
  showPlayingIndicator: boolean;
  onSelect: (index: number) => void;
};

const TrackRow = memo(function TrackRow({
  index,
  track,
  isActive,
  showPlayingIndicator,
  onSelect,
}: TrackRowProps) {
  const handleClick = useCallback(() => {
    onSelect(index);
  }, [index, onSelect]);

  return (
    <button
      type="button"
      role="listitem"
      onClick={handleClick}
      className={clsx("rp-track", {
        "rp-track--active": isActive,
      })}>
      <div className="rp-track__index">
        {showPlayingIndicator ? <PlayingIndicator /> : index + 1}
      </div>
      <div className="rp-track__info">
        <div className="rp-track__title">{track.title}</div>
        <div className="rp-track__artist">{track.artist}</div>
      </div>
    </button>
  );
});

export function PlayListTrackList({
  tracks,
  activePlaylistIndex,
  currentGlobalIndex,
  isPlaying,
  onTrackSelect,
}: {
  tracks: PlayListTrack[];
  activePlaylistIndex: number;
  currentGlobalIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
}) {
  const trackListRef = useRef<HTMLDivElement | null>(null);

  useSafeLayoutEffect(() => {
    const trackListElement = trackListRef.current;

    if (!trackListElement) {
      return;
    }

    trackListElement.scrollTop = 0;
  }, [activePlaylistIndex]);

  if (tracks.length === 0) {
    return (
      <div ref={trackListRef} className="rp-track-list">
        <div className="rp-track-list__empty">No tracks in this playlist</div>
      </div>
    );
  }

  return (
    <div ref={trackListRef} className="rp-track-list" role="list">
      {tracks.map((track, index) => {
        const isActive = index === currentGlobalIndex;

        return (
          <TrackRow
            key={`${track.videoId}-${index}`}
            index={index}
            track={track}
            isActive={isActive}
            showPlayingIndicator={isActive && isPlaying}
            onSelect={onTrackSelect}
          />
        );
      })}
    </div>
  );
}
