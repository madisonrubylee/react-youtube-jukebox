import type { ChangeEvent } from "react";

import type { JukeboxExpandedRenderProps } from "../lib/shared";

type JukeboxExpandedPlayerProps = JukeboxExpandedRenderProps;

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
  isMuted,
  isPlaying,
  nextTrack,
  playerMountRef,
  totalTracks,
  volume,
  playNext,
  playPrev,
  togglePlay,
  toggleMute,
  setVolume,
}: JukeboxExpandedPlayerProps) {
  const hasMultipleTracks = totalTracks > 1;
  const hasNextTrack = nextTrack !== undefined;

  const handleVolumeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return (
    <>
      <div className="rj-expanded__shell">
        <div className="rj-expanded__screen-frame">
          <div className="rj-expanded__screen">
            <div ref={playerMountRef} className="rj-expanded__player" />
          </div>
        </div>

        <div className="rj-expanded__meta">
          <div className="rj-expanded__controls">
            <div className="rj-expanded__transport">
              <button
                type="button"
                onClick={playPrev}
                disabled={!hasMultipleTracks}
                className="rj-chip-button">
                ◀
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="rj-chip-button rj-chip-button--primary">
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={playNext}
                disabled={!hasMultipleTracks}
                className="rj-chip-button">
                ▶
              </button>
            </div>

            <div className="rj-expanded__utility">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="rj-icon-button">
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
              {hasMultipleTracks ? (
                <span className="rj-expanded__counter">
                  {currentIndex + 1} / {totalTracks}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {hasNextTrack ? (
        <div className="rj-next-track">
          <span className="rj-next-track__label">Next</span>
          <button
            type="button"
            onClick={playNext}
            disabled={!hasMultipleTracks}
            className="rj-next-track__button">
            {nextTrack.title}
          </button>
        </div>
      ) : null}
    </>
  );
}
