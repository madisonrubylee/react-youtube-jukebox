import type { ChangeEvent } from "react";

import type { JukeboxExpandedRenderProps } from "../lib/shared";
import { VolumeLowIcon } from "./icons";

type JukeboxExpandedPlayerViewProps = JukeboxExpandedRenderProps & {
  showSeekBar?: boolean;
};

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
  duration,
  currentTime,
  seek,
  showSeekBar = true,
}: JukeboxExpandedPlayerViewProps) {
  const hasMultipleTracks = totalTracks > 1;
  const hasNextTrack = nextTrack !== undefined;
  const progressMax = duration > 0 ? duration : 1;

  const handleVolumeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleProgressInput = (event: ChangeEvent<HTMLInputElement>) => {
    seek(Number(event.target.value));
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
            {showSeekBar ? (
              <div className="rj-expanded__progress-row">
                <input
                  type="range"
                  min={0}
                  max={progressMax}
                  step={0.1}
                  value={Math.min(currentTime, progressMax)}
                  onChange={handleProgressInput}
                  aria-label="Playback position"
                  className="rj-progress"
                  disabled={!duration}
                />
              </div>
            ) : null}

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
                  <VolumeLowIcon isMuted={isMuted} />
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
