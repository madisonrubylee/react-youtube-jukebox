import type { JukeboxExpandedRenderProps } from "../../../lib/types";
import { VolumeLowIcon } from "../../../components/icons";
import { ProgressSlider } from "../../../components/player/ProgressSlider";
import { VolumeSlider } from "../../../components/player/VolumeSlider";

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
                <ProgressSlider
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={seek}
                  className="rj-progress"
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
              <VolumeSlider
                volume={volume}
                onVolumeChange={setVolume}
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
