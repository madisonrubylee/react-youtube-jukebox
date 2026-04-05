import type { ChangeEvent } from "react";

import type { JukeboxPlayerState, PlayListTrack } from "../lib/shared";

type PlayListPlayerProps = {
  playerState: JukeboxPlayerState;
  currentTrack: PlayListTrack | undefined;
  totalTracks: number;
};

function PrevIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.15-5.27a.7.7 0 0 1 1.05.6v11.64a.7.7 0 0 1-1.05.6L4 9.15V14.3a.7.7 0 0 1-1.4 0V1.7a.7.7 0 0 1 .7-.7Z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.85 1.58A.7.7 0 0 0 1.8 2.18v11.64a.7.7 0 0 0 1.05.6L12 9.15V14.3a.7.7 0 0 0 1.4 0V1.7a.7.7 0 0 0-.7-.7Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7Zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6Z" />
    </svg>
  );
}

function VolumeIcon({ isMuted }: { isMuted: boolean }) {
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

export function PlayListPlayer({
  playerState,
  currentTrack,
  totalTracks,
}: PlayListPlayerProps) {
  const {
    isMuted,
    isPlaying,
    volume,
    setVolume,
    toggleMute,
    togglePlay,
    playNext,
    playPrev,
  } = playerState;

  const hasMultipleTracks = totalTracks > 1;

  const handleVolumeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return (
    <div className="rp-player">

      {currentTrack ? (
        <div className="rp-player__track">
          <div className="rp-player__track-info">
            <div className="rp-player__track-title">{currentTrack.title}</div>
            <div className="rp-player__track-artist">{currentTrack.artist}</div>
          </div>
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
