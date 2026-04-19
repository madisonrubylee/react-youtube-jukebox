import type { JukeboxPlayerState, PlayListTrack } from "../../../lib/types";
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  VolumeLowIcon as VolumeIcon,
} from "../../../components/icons";
import { ProgressSlider } from "../../../components/player/ProgressSlider";
import { VolumeSlider } from "../../../components/player/VolumeSlider";

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
          <ProgressSlider
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
            disabled={!canSeek}
            className="rp-player__progress-slider"
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
          <VolumeSlider
            volume={volume}
            onVolumeChange={setVolume}
            className="rp-player__volume"
          />
        </div>
      </div>
    </div>
  );
}
