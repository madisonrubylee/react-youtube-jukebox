import type { PlayListTrack } from "../../../lib/types";
import { PauseIcon, PlayIcon, VolumeLowIcon } from "../../../components/icons";
import { VolumeSlider } from "../../../components/player/VolumeSlider";
import { ExpandIcon, PlayingIndicator } from "./PlayListIcons";

type PlayListMiniBarProps = {
  currentTrack: PlayListTrack | undefined;
  isMuted: boolean;
  isPlaying: boolean;
  onRestore: () => void;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  onVolumeChange: (nextVolume: number) => void;
  volume: number;
};

export function PlayListMiniBar({
  currentTrack,
  isMuted,
  isPlaying,
  onRestore,
  onToggleMute,
  onTogglePlay,
  onVolumeChange,
  volume,
}: PlayListMiniBarProps) {
  return (
    <div className="rp-mini">
      {isPlaying ? (
        <div className="rp-mini__indicator">
          <PlayingIndicator />
        </div>
      ) : null}
      <div className="rp-mini__info">
        {currentTrack ? (
          <>
            <div className="rp-mini__title">{currentTrack.title}</div>
            <div className="rp-mini__artist">{currentTrack.artist}</div>
          </>
        ) : (
          <div className="rp-mini__empty">No track playing</div>
        )}
      </div>
      <div className="rp-mini__volume">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="rp-mini__button rp-mini__button--volume">
          <VolumeLowIcon isMuted={isMuted} />
        </button>
        <VolumeSlider
          volume={volume}
          onVolumeChange={onVolumeChange}
          className="rp-mini__volume-slider"
        />
      </div>
      <button
        type="button"
        onClick={onTogglePlay}
        disabled={!currentTrack}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="rp-mini__button">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        onClick={onRestore}
        aria-label="Expand"
        className="rp-mini__button rp-mini__expand">
        <ExpandIcon />
      </button>
    </div>
  );
}
