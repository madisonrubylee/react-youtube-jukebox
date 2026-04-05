import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { useJukeboxPlayer } from "../hooks/useJukeboxPlayer";
import {
  DEFAULT_PLAYLIST_SIZE,
  DEFAULT_PLAYLIST_THEME,
  getPositionStyle,
  type JukeboxTrack,
  type PlayListItem,
  type PlayListProps,
  type PlayListSize,
  type PlayListTrack,
} from "../lib/shared";
import { PlayListPlayer } from "./PlayListPlayer";
import "../styles/playlist.css";

function subscribeToClientRender() {
  return () => undefined;
}

function getClientRenderSnapshot() {
  return true;
}

function getServerRenderSnapshot() {
  return false;
}

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

function MinimizeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M4 12h8" />
    </svg>
  );
}

function MiniPlayIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713Z" />
    </svg>
  );
}

function MiniPauseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7Zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6Z" />
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

function MinimizeButton({ onMinimize }: { onMinimize: () => void }) {
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

const MOBILE_QUERY = "(hover: none) and (pointer: coarse), (max-width: 640px)";

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
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
  const previousSizeRef = useRef<PlayListSize>("compact");
  const isControlled = controlledSize !== undefined;
  const resolvedSize = isControlled ? controlledSize : internalSize;

  const applySize = (nextSize: PlayListSize) => {
    if (!isControlled) {
      setInternalSize(nextSize);
    }

    onSizeChange?.(nextSize);
  };

  const toggleSize = () => {
    const nextSize: PlayListSize =
      resolvedSize === "compact" ? "expanded" : "compact";
    applySize(nextSize);
  };

  const minimize = () => {
    if (resolvedSize !== "mini") {
      previousSizeRef.current = resolvedSize;
    }

    applySize("mini");
  };

  const restore = () => {
    const target =
      previousSizeRef.current === "mini" ? "compact" : previousSizeRef.current;
    applySize(target);
  };

  return { resolvedSize, toggleSize, minimize, restore } as const;
}

function MiniVolumeIcon({ isMuted }: { isMuted: boolean }) {
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

export function PlayList({
  playlist,
  autoplay = false,
  theme = DEFAULT_PLAYLIST_THEME,
  size,
  defaultSize,
  onSizeChange,
  position,
  offset,
  portal = false,
  className,
}: PlayListProps) {
  const isMounted = useSyncExternalStore(
    subscribeToClientRender,
    getClientRenderSnapshot,
    getServerRenderSnapshot,
  );
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { resolvedSize, toggleSize, minimize, restore } = usePlayListSize({
    size,
    defaultSize,
    onSizeChange,
  });
  const isMobile = useIsMobile();

  const isMini = resolvedSize === "mini";
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
    isMuted,
    isPlaying,
    volume,
    setVolume,
    toggleMute,
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

  const positionStyle = position
    ? getPositionStyle(position, offset, portal)
    : undefined;

  const dataSizeValue = (() => {
    if (isMini) return "mini";
    if (isExpanded) return "expanded";
    return undefined;
  })();

  const content = (
    <div
      className={clsx("rp-root", className)}
      data-theme={theme}
      data-size={dataSizeValue}
      style={positionStyle}>
      {/* Mini overlay */}
      <div className="rp-mini">
        {isPlaying && (
          <div className="rp-mini__indicator">
            <div className="rp-track__playing-bar" />
            <div className="rp-track__playing-bar" />
            <div className="rp-track__playing-bar" />
          </div>
        )}
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
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="rp-mini__button rp-mini__button--volume">
            <MiniVolumeIcon isMuted={isMuted} />
          </button>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="rp-mini__volume-slider"
          />
        </div>
        <button
          type="button"
          onClick={togglePlay}
          disabled={!currentTrack}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="rp-mini__button">
          {isPlaying ? <MiniPauseIcon /> : <MiniPlayIcon />}
        </button>
        <button
          type="button"
          onClick={restore}
          aria-label="Expand"
          className="rp-mini__button rp-mini__expand">
          <ExpandIcon />
        </button>
      </div>

      {/* Full view (compact + expanded) */}
      <div className="rp-toolbar">
        <MinimizeButton onMinimize={minimize} />
        {(!isMobile || isExpanded) && (
          <SizeToggleButton
            currentSize={resolvedSize}
            onToggle={toggleSize}
          />
        )}
      </div>
      <PlayListHeader playlistItem={activePlaylist} />
      <div className="rp-content">
        <div className="rp-panel rp-panel--nav">
          <PlayListNav
            playlist={playlist}
            activeIndex={safeTabIndex}
            onSelect={handleTabChange}
          />
        </div>
        <div className="rp-panel rp-panel--main">
          <PlayListTabs
            playlist={playlist}
            activeIndex={safeTabIndex}
            onTabChange={handleTabChange}
          />
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
      />
    </div>
  );

  if (!portal) {
    return content;
  }

  if (!isMounted) {
    return null;
  }

  return createPortal(content, document.body);
}
