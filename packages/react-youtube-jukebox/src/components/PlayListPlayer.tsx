import type { ChangeEvent } from "react";

import type { JukeboxPlayerState, PlayListTrack } from "../lib/shared";
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  VolumeLowIcon as VolumeIcon,
} from "./icons";

type PlayListPlayerProps = {
  playerState: JukeboxPlayerState;
  currentTrack: PlayListTrack | undefined;
  totalTracks: number;
  canSeek?: boolean;
  showSeekBar?: boolean;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function PlayListPlayer({
  playerState,
  currentTrack,
  totalTracks,
  canSeek = true,
  showSeekBar = true,
}: PlayListPlayerProps) {
  const {
    currentIndex,
    isMuted,
    isPlaying,
    volume,
    setVolume,
    toggleMute,
    togglePlay,
    playNext,
    playPrev,
    duration,
    currentTime,
    seek,
  } = playerState;

  const hasMultipleTracks = totalTracks > 1;
  const progressMax = duration > 0 ? duration : 1;

  const handleVolumeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleProgressInput = (event: ChangeEvent<HTMLInputElement>) => {
    seek(Number(event.target.value));
  };

  return (
    <div className="rp-player">
      {currentTrack ? (
        <div className="rp-player__track">
          <div className="rp-player__track-info">
            <div className="rp-player__track-title">{currentTrack.title}</div>
            <div className="rp-player__track-artist">{currentTrack.artist}</div>
          </div>
          <div className="rp-player__counter">
            {currentIndex + 1} / {totalTracks}
          </div>
        </div>
      ) : null}

      {showSeekBar ? (
        <div className="rp-player__progress">
          <span className="rp-player__time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={progressMax}
            step={0.1}
            value={Math.min(currentTime, progressMax)}
            onChange={handleProgressInput}
            aria-label="Playback position"
            className="rp-player__progress-slider"
            disabled={!canSeek || !duration}
          />
          <span className="rp-player__time">{formatTime(duration)}</span>
        </div>
      ) : null}

      <div className="rp-player__controls">
        <div className="rp-player__transport">
          <button
            type="button"
            onClick={playPrev}
            disabled={!hasMultipleTracks}
            aria-label="Previous"
            className="rp-player__button">
            <PrevIcon />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            disabled={!currentTrack}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="rp-player__button rp-player__button--play">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            onClick={playNext}
            disabled={!hasMultipleTracks}
            aria-label="Next"
            className="rp-player__button">
            <NextIcon />
          </button>
        </div>

        <div className="rp-player__utility">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="rp-player__button">
            <VolumeIcon isMuted={isMuted} />
          </button>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={handleVolumeInput}
            aria-label="Volume"
            className="rp-player__volume"
          />
        </div>
      </div>
    </div>
  );
}
