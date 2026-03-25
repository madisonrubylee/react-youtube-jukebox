import type { ChangeEvent, RefCallback } from "react";

import type { JukeboxTrack } from "../lib/shared";

type JukeboxExpandedPlayerProps = {
  currentIndex: number;
  currentTrack: JukeboxTrack;
  isMuted: boolean;
  isPlaying: boolean;
  nextTrack: JukeboxTrack | undefined;
  playerMountRef: RefCallback<HTMLDivElement>;
  totalTracks: number;
  volume: number;
  onPlayNext: () => void;
  onPlayPrev: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
};

function SpeakerIcon({ isMuted }: { isMuted: boolean }) {
  if (isMuted) {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M7.06 3.22a.75.75 0 0 1 1.19.61v8.34a.75.75 0 0 1-1.19.61L4.26 10.5H2.75A.75.75 0 0 1 2 9.75v-3.5c0-.41.34-.75.75-.75h1.51l2.8-2.28Z" />
        <path d="M10.28 5.22a.75.75 0 0 1 1.06 0L12 5.88l.66-.66a.75.75 0 1 1 1.06 1.06l-.66.66.66.66a.75.75 0 1 1-1.06 1.06L12 7.94l-.66.66a.75.75 0 0 1-1.06-1.06l.66-.66-.66-.66a.75.75 0 0 1 0-1.06Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M7.06 3.22a.75.75 0 0 1 1.19.61v8.34a.75.75 0 0 1-1.19.61L4.26 10.5H2.75A.75.75 0 0 1 2 9.75v-3.5c0-.41.34-.75.75-.75h1.51l2.8-2.28Z" />
      <path d="M10.5 5.02a.75.75 0 0 1 1.06 0 3.86 3.86 0 0 1 0 5.46.75.75 0 1 1-1.06-1.06 2.36 2.36 0 0 0 0-3.34.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

export function JukeboxExpandedPlayer({
  currentIndex,
  currentTrack,
  isMuted,
  isPlaying,
  nextTrack,
  playerMountRef,
  totalTracks,
  volume,
  onPlayNext,
  onPlayPrev,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
}: JukeboxExpandedPlayerProps) {
  const hasMultipleTracks = totalTracks > 1;

  const handleVolumeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value));
  };

  return (
    <div className="rj-expanded">
      <div className="rj-expanded__shell">
        <div className="rj-expanded__screen-frame">
          <div className="rj-expanded__screen">
            <div ref={playerMountRef} className="rj-expanded__player" />
          </div>
        </div>

        <div className="rj-expanded__meta">
          <div className="rj-expanded__titles">
            <div className="rj-expanded__title">{currentTrack.title}</div>
            <div className="rj-expanded__artist">
              {currentTrack.artist ?? "Unknown artist"}
            </div>
          </div>

          <div className="rj-expanded__controls">
            <button
              type="button"
              onClick={onPlayPrev}
              disabled={!hasMultipleTracks}
              className="rj-chip-button"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={onTogglePlay}
              className="rj-chip-button rj-chip-button--primary"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={onPlayNext}
              disabled={!hasMultipleTracks}
              className="rj-chip-button"
            >
              ▶
            </button>
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="rj-icon-button"
            >
              <span className="rj-icon-button__icon">
                <SpeakerIcon isMuted={isMuted} />
              </span>
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={handleVolumeInput}
              aria-label="Volume"
              className="rj-volume"
            />
            <span className="rj-expanded__counter">
              {totalTracks === 0 ? 0 : currentIndex + 1} / {totalTracks}
            </span>
          </div>
        </div>
      </div>

      <div className="rj-next-track">
        <span className="rj-next-track__label">Next</span>
        <button
          type="button"
          onClick={onPlayNext}
          disabled={!hasMultipleTracks}
          className="rj-next-track__button"
        >
          {nextTrack?.title ?? "No upcoming track"}
        </button>
      </div>
    </div>
  );
}
