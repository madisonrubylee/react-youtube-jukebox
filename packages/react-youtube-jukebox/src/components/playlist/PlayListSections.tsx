import clsx from "clsx";

import type { PlayListItem, PlayListSize, PlayListTrack } from "../../lib/types";
import { PauseIcon, PlayIcon, VolumeLowIcon } from "../icons";
import {
  CompactIcon,
  ExpandIcon,
  MinimizeIcon,
  MusicNoteIcon,
  PlayingIndicator,
} from "./PlayListIcons";

type SizeToggleButtonProps = {
  currentSize: PlayListSize;
  onToggle: () => void;
};

export function SizeToggleButton({
  currentSize,
  onToggle,
}: SizeToggleButtonProps) {
  const isExpanded = currentSize === "expanded";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="rp-size-toggle"
      aria-label={isExpanded ? "Compact view" : "Expanded view"}>
      {isExpanded ? <CompactIcon /> : <ExpandIcon />}
    </button>
  );
}

export function MinimizeButton({ onMinimize }: { onMinimize: () => void }) {
  return (
    <button
      type="button"
      onClick={onMinimize}
      className="rp-minimize-toggle"
      aria-label="Minimize">
      <MinimizeIcon />
    </button>
  );
}

export function PlayListHeader({
  playlistItem,
}: {
  playlistItem: PlayListItem | undefined;
}) {
  if (!playlistItem) {
    return null;
  }

  return (
    <div className="rp-header">
      {playlistItem.image ? (
        <>
          <img
            src={playlistItem.image}
            alt={playlistItem.title}
            className="rp-header__image"
          />
          <div className="rp-header__gradient" />
        </>
      ) : (
        <div className="rp-header__fallback">
          <MusicNoteIcon className="rp-header__fallback-icon" />
          <div className="rp-header__gradient" />
        </div>
      )}
      <div className="rp-header__title">{playlistItem.title}</div>
    </div>
  );
}

function PlayListNavItem({
  item,
  isActive,
  onClick,
}: {
  item: PlayListItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("rp-nav-item", {
        "rp-nav-item--active": isActive,
      })}>
      {item.image ? (
        <img src={item.image} alt={item.title} className="rp-nav-item__image" />
      ) : (
        <div className="rp-nav-item__fallback">
          <MusicNoteIcon />
        </div>
      )}
      <div className="rp-nav-item__info">
        <div className="rp-nav-item__title">{item.title}</div>
        <div className="rp-nav-item__meta">{item.data.length} tracks</div>
      </div>
    </button>
  );
}

export function PlayListNav({
  playlist,
  activeIndex,
  onSelect,
}: {
  playlist: PlayListItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="rp-nav">
      <div className="rp-nav__label">Playlists</div>
      <div className="rp-nav__list">
        {playlist.map((item, index) => (
          <PlayListNavItem
            key={`${item.title}-${index}`}
            item={item}
            isActive={index === activeIndex}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

export function MainPanelHeader({
  playlistItem,
}: {
  playlistItem: PlayListItem | undefined;
}) {
  if (!playlistItem) {
    return null;
  }

  return (
    <div className="rp-main__header">
      {playlistItem.image ? (
        <img
          src={playlistItem.image}
          alt={playlistItem.title}
          className="rp-main__header-image"
        />
      ) : (
        <div className="rp-main__header-fallback">
          <MusicNoteIcon />
        </div>
      )}
      <div className="rp-main__header-info">
        <div className="rp-main__header-title">{playlistItem.title}</div>
        <div className="rp-main__header-meta">{playlistItem.data.length} tracks</div>
      </div>
    </div>
  );
}

export function NowPlaying({
  currentTrack,
}: {
  currentTrack: PlayListTrack | undefined;
}) {
  return (
    <div className="rp-now-playing">
      {currentTrack ? (
        <div className="rp-now-playing__info">
          <div className="rp-now-playing__title">{currentTrack.title}</div>
          <div className="rp-now-playing__artist">{currentTrack.artist}</div>
        </div>
      ) : (
        <div className="rp-now-playing__empty">No track selected</div>
      )}
    </div>
  );
}

export function PlayListTabs({
  playlist,
  activeIndex,
  onTabChange,
}: {
  playlist: PlayListItem[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}) {
  if (playlist.length <= 1) {
    return null;
  }

  return (
    <div className="rp-tabs" role="tablist">
      {playlist.map((item, index) => (
        <button
          key={`${item.title}-${index}`}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          onClick={() => onTabChange(index)}
          className={clsx("rp-tab", {
            "rp-tab--active": index === activeIndex,
          })}>
          {item.title}
        </button>
      ))}
    </div>
  );
}

export function PlayListTrackList({
  tracks,
  currentGlobalIndex,
  isPlaying,
  onTrackSelect,
}: {
  tracks: PlayListTrack[];
  currentGlobalIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
}) {
  if (tracks.length === 0) {
    return (
      <div className="rp-track-list">
        <div className="rp-track-list__empty">No tracks in this playlist</div>
      </div>
    );
  }

  return (
    <div className="rp-track-list" role="list">
      {tracks.map((track, index) => {
        const isActive = index === currentGlobalIndex;

        return (
          <button
            key={`${track.videoId}-${index}`}
            type="button"
            role="listitem"
            onClick={() => onTrackSelect(index)}
            className={clsx("rp-track", {
              "rp-track--active": isActive,
            })}>
            <div className="rp-track__index">
              {isActive && isPlaying ? <PlayingIndicator /> : index + 1}
            </div>
            <div className="rp-track__info">
              <div className="rp-track__title">{track.title}</div>
              <div className="rp-track__artist">{track.artist}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

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
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          aria-label="Volume"
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
