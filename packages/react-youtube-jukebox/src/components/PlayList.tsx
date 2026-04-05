import { useMemo, useState } from "react";
import clsx from "clsx";

import { useJukeboxPlayer } from "../hooks/useJukeboxPlayer";
import {
  DEFAULT_PLAYLIST_SIZE,
  DEFAULT_PLAYLIST_THEME,
  type JukeboxTrack,
  type PlayListItem,
  type PlayListProps,
  type PlayListSize,
  type PlayListTrack,
} from "../lib/shared";
import { PlayListPlayer } from "./PlayListPlayer";
import "../styles/playlist.css";

function MusicNoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}>
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 1H1v5M10 1h5v5M6 15H1v-5M10 15h5v-5" />
    </svg>
  );
}

function CompactIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 1 1 1 1 5M11 1l4 0 0 4M5 15l-4 0 0-4M11 15l4 0 0-4" />
      <rect x="4" y="4" width="8" height="8" rx="1" />
    </svg>
  );
}

function PlayingIndicator() {
  return (
    <div className="rp-track__playing-icon">
      <div className="rp-track__playing-bar" />
      <div className="rp-track__playing-bar" />
      <div className="rp-track__playing-bar" />
    </div>
  );
}

function SizeToggleButton({
  currentSize,
  onToggle,
}: {
  currentSize: PlayListSize;
  onToggle: () => void;
}) {
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

function PlayListHeader({
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

function PlayListNav({
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

function MainPanelHeader({
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
        <div className="rp-main__header-meta">
          {playlistItem.data.length} tracks
        </div>
      </div>
    </div>
  );
}

function NowPlaying({
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

function PlayListTabs({
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

function PlayListTrackList({
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

function toJukeboxTracks(playlistTracks: PlayListTrack[]): JukeboxTrack[] {
  return playlistTracks.map((track) => ({
    videoId: track.videoId,
    title: track.title,
    artist: track.artist,
  }));
}

function usePlayListSize({
  size: controlledSize,
  defaultSize = DEFAULT_PLAYLIST_SIZE,
  onSizeChange,
}: {
  size: PlayListSize | undefined;
  defaultSize: PlayListSize | undefined;
  onSizeChange: ((size: PlayListSize) => void) | undefined;
}) {
  const [internalSize, setInternalSize] = useState<PlayListSize>(defaultSize);
  const isControlled = controlledSize !== undefined;
  const resolvedSize = isControlled ? controlledSize : internalSize;

  const toggleSize = () => {
    const nextSize: PlayListSize =
      resolvedSize === "compact" ? "expanded" : "compact";

    if (!isControlled) {
      setInternalSize(nextSize);
    }

    onSizeChange?.(nextSize);
  };

  return { resolvedSize, toggleSize } as const;
}

export function PlayList({
  playlist,
  autoplay = false,
  theme = DEFAULT_PLAYLIST_THEME,
  size,
  defaultSize,
  onSizeChange,
  className,
}: PlayListProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { resolvedSize, toggleSize } = usePlayListSize({
    size,
    defaultSize,
    onSizeChange,
  });

  const isExpanded = resolvedSize === "expanded";

  const safeTabIndex =
    playlist.length > 0 ? Math.min(activeTabIndex, playlist.length - 1) : 0;

  const activePlaylist = playlist[safeTabIndex];
  const activeTracks = useMemo(
    () => activePlaylist?.data ?? [],
    [activePlaylist],
  );

  const jukeboxTracks = useMemo(
    () => toJukeboxTracks(activeTracks),
    [activeTracks],
  );

  const playerState = useJukeboxPlayer({
    autoplay,
    tracks: jukeboxTracks,
  });

  const {
    currentIndex,
    isPlaying,
    playerMountRef,
    togglePlay,
    playNext,
    playPrev,
  } = playerState;

  const currentTrack = activeTracks[currentIndex];

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleTrackSelect = (trackIndex: number) => {
    const isAlreadyPlaying = trackIndex === currentIndex;

    if (isAlreadyPlaying) {
      togglePlay();
      return;
    }

    const stepsForward = trackIndex - currentIndex;

    if (stepsForward > 0) {
      for (let i = 0; i < stepsForward; i++) {
        playNext();
      }
    } else {
      const stepsBack = Math.abs(stepsForward);
      for (let i = 0; i < stepsBack; i++) {
        playPrev();
      }
    }
  };

  if (isExpanded) {
    return (
      <div
        className={clsx("rp-root", className)}
        data-theme={theme}
        data-size="expanded">
        <SizeToggleButton currentSize={resolvedSize} onToggle={toggleSize} />
        <div className="rp-content">
          <div className="rp-panel rp-panel--nav">
            <PlayListNav
              playlist={playlist}
              activeIndex={safeTabIndex}
              onSelect={handleTabChange}
            />
          </div>
          <div className="rp-panel rp-panel--main">
            <MainPanelHeader playlistItem={activePlaylist} />
            <PlayListTrackList
              tracks={activeTracks}
              currentGlobalIndex={currentIndex}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
            />
          </div>
          <div className="rp-panel rp-panel--now-playing">
            <div className="rp-now-playing__video">
              <div
                ref={playerMountRef}
                className="rp-now-playing__video-mount"
              />
            </div>
            <NowPlaying currentTrack={currentTrack} />
          </div>
        </div>
        <PlayListPlayer
          playerState={playerState}
          currentTrack={currentTrack}
          totalTracks={activeTracks.length}
          hideMount
        />
      </div>
    );
  }

  return (
    <div className={clsx("rp-root", className)} data-theme={theme}>
      <SizeToggleButton currentSize={resolvedSize} onToggle={toggleSize} />
      <PlayListHeader playlistItem={activePlaylist} />
      <div className="rp-content">
        <PlayListTabs
          playlist={playlist}
          activeIndex={safeTabIndex}
          onTabChange={handleTabChange}
        />
        <PlayListTrackList
          tracks={activeTracks}
          currentGlobalIndex={currentIndex}
          isPlaying={isPlaying}
          onTrackSelect={handleTrackSelect}
        />
        <PlayListPlayer
          playerState={playerState}
          currentTrack={currentTrack}
          totalTracks={activeTracks.length}
        />
      </div>
    </div>
  );
}
