import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { useJukeboxPlayer } from "../hooks/useJukeboxPlayer";
import {
  DEFAULT_CHROME,
  DEFAULT_POSITION,
  DEFAULT_THEME,
  getEffectiveChrome,
  getNextTrackIndex,
  getPositionStyle,
  LEVEL_BAR_ANIMATION_DELAY_MS,
  LEVEL_BAR_HEIGHTS,
  LEVEL_BAR_REST_HEIGHT,
  type JukeboxExpandedRenderProps,
  type JukeboxProps,
  type JukeboxTrack,
} from "../lib/shared";

function shouldIgnoreKeyboardShortcut(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  if (target.closest("input, textarea, select, [contenteditable='true']")) {
    return true;
  }

  if (target instanceof HTMLElement && target.isContentEditable) {
    return true;
  }

  return false;
}
import { JukeboxExpandedPlayer } from "./JukeboxExpandedPlayer";
import "../styles/jukebox.css";

function subscribeToClientRender() {
  return () => undefined;
}

function getClientRenderSnapshot() {
  return true;
}

function getServerRenderSnapshot() {
  return false;
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
      <path d="M11.9 3.62a.75.75 0 0 1 1.06 0 5.84 5.84 0 0 1 0 8.76.75.75 0 1 1-1.06-1.06 4.34 4.34 0 0 0 0-6.64.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={clsx("rj-chevron__icon", {
        "rj-chevron__icon--expanded": isExpanded,
      })}>
      <path
        d="M4 6.5 8 10l4-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrackSummary({
  currentTrack,
  isExpanded,
  isPlaying,
  onToggleExpanded,
}: {
  currentTrack: JukeboxTrack | undefined;
  isExpanded: boolean;
  isPlaying: boolean;
  onToggleExpanded: () => void;
}) {
  if (!currentTrack) {
    return (
      <div className="rj-track-summary rj-track-summary--empty">
        <div className="rj-track-summary__copy">
          <div className="rj-track-summary__title">No tracks</div>
          <div className="rj-track-summary__artist">
            Pass at least one YouTube video to start playback.
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggleExpanded}
      aria-expanded={isExpanded}
      className="rj-track-summary">
      <div className="rj-level-meter">
        {LEVEL_BAR_HEIGHTS.map((height, index) => {
          const animationDelayMs = index * LEVEL_BAR_ANIMATION_DELAY_MS;

          return (
            <div
              key={`${height}-${index}`}
              aria-hidden="true"
              className={clsx("rj-level-bar", {
                "rj-level-bar--playing": isPlaying,
              })}
              style={
                {
                  minHeight: `${LEVEL_BAR_REST_HEIGHT}px`,
                  height: `${isPlaying ? height : LEVEL_BAR_REST_HEIGHT}px`,
                  animationDelay: `${animationDelayMs}ms`,
                } satisfies CSSProperties
              }
            />
          );
        })}
      </div>
      <div className="rj-track-summary__copy">
        <div className="rj-track-summary__title">{currentTrack.title}</div>
        <div className="rj-track-summary__artist">
          {currentTrack.artist ?? "Unknown artist"}
        </div>
      </div>
      <span className="rj-chevron">
        <ChevronIcon isExpanded={isExpanded} />
      </span>
    </button>
  );
}

function ExpandedPanel({
  children,
  isExpanded,
}: {
  children: ReactNode;
  isExpanded: boolean;
}) {
  return (
    <div
      aria-hidden={!isExpanded}
      className={clsx("rj-expanded", {
        "rj-expanded--hidden": !isExpanded,
      })}>
      {children}
    </div>
  );
}

export function Jukebox({
  tracks,
  autoplay = true,
  showSeekBar = true,
  onPlay,
  onPause,
  onTrackChange,
  onEnd,
  keyboard = false,
  position = DEFAULT_POSITION,
  theme = DEFAULT_THEME,
  chrome = DEFAULT_CHROME,
  offset,
  portal = true,
  className,
  renderExpandedContent,
}: JukeboxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMounted = useSyncExternalStore(
    subscribeToClientRender,
    getClientRenderSnapshot,
    getServerRenderSnapshot,
  );
  const {
    playerMountRef,
    currentIndex,
    isMuted,
    isPlaying,
    volume,
    setVolume,
    toggleMute,
    togglePlay,
    playNext,
    playPrev,
    playTrackAt,
    progress,
    duration,
    currentTime,
    seek,
  } = useJukeboxPlayer({
    autoplay,
    tracks,
    ...(onPlay !== undefined ? { onPlay } : {}),
    ...(onPause !== undefined ? { onPause } : {}),
    ...(onTrackChange !== undefined ? { onTrackChange } : {}),
    ...(onEnd !== undefined ? { onEnd } : {}),
  });

  useEffect(() => {
    if (!keyboard) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreKeyboardShortcut(event.target)) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
        return;
      }

      if (event.code === "ArrowRight") {
        event.preventDefault();
        playNext();
        return;
      }

      if (event.code === "ArrowLeft") {
        event.preventDefault();
        playPrev();
        return;
      }

      const key = event.key.toLowerCase();

      if (key === "m") {
        event.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    keyboard,
    togglePlay,
    playNext,
    playPrev,
    toggleMute,
  ]);
  const effectiveChrome = getEffectiveChrome(chrome);

  const currentTrack = tracks[currentIndex];
  const nextTrack =
    tracks.length > 1
      ? tracks[getNextTrackIndex(currentIndex, 1, tracks.length)]
      : undefined;
  const effectiveIsExpanded = currentTrack ? isExpanded : false;
  const expandedRenderProps: JukeboxExpandedRenderProps | undefined =
    currentTrack
      ? {
          currentIndex,
          currentTrack,
          isExpanded: effectiveIsExpanded,
          isMuted,
          isPlaying,
          nextTrack,
          playerMountRef,
          totalTracks: tracks.length,
          volume,
          setVolume,
          toggleMute,
          togglePlay,
          playNext,
          playPrev,
          playTrackAt,
          progress,
          duration,
          currentTime,
          seek,
        }
      : undefined;

  const handleToggleExpanded = () => {
    if (!currentTrack) {
      return;
    }

    setIsExpanded((expanded) => !expanded);
  };

  const content = (
    <div
      className={clsx(
        "rj-root",
        {
          "rj-root--expanded": effectiveIsExpanded,
          "rj-root--portal": portal,
          "rj-root--inline": !portal,
        },
        className,
      )}
      data-position={position}
      data-theme={theme}
      data-chrome={effectiveChrome}
      style={getPositionStyle(position, offset, portal)}>
      {expandedRenderProps ? (
        <ExpandedPanel isExpanded={effectiveIsExpanded}>
          {renderExpandedContent ? (
            renderExpandedContent(expandedRenderProps)
          ) : (
            <JukeboxExpandedPlayer
              {...expandedRenderProps}
              showSeekBar={showSeekBar}
            />
          )}
        </ExpandedPanel>
      ) : null}

      <div className="rj-dock">
        <div className="rj-dock__inner">
          <TrackSummary
            currentTrack={currentTrack}
            isExpanded={effectiveIsExpanded}
            isPlaying={isPlaying}
            onToggleExpanded={handleToggleExpanded}
          />

          <button
            type="button"
            onClick={toggleMute}
            disabled={!currentTrack}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="rj-icon-button">
            <span className="rj-icon-button__icon">
              <VolumeIcon isMuted={isMuted} />
            </span>
          </button>
        </div>
      </div>
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
