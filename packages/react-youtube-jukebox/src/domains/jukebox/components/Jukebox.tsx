import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

import { useClientMounted } from "../../../hooks/useClientMounted";
import { useJukebox } from "../hooks/useJukebox";
import { useJukeboxKeyboardShortcuts } from "../hooks/useJukeboxKeyboardShortcuts";
import {
  DEFAULT_CHROME,
  DEFAULT_POSITION,
  DEFAULT_THEME,
  LEVEL_BAR_ANIMATION_DELAY_MS,
  LEVEL_BAR_HEIGHTS,
  LEVEL_BAR_REST_HEIGHT,
} from "../../../lib/constants";
import type {
  JukeboxExpandedRenderProps,
  JukeboxProps,
  JukeboxTrack,
} from "../../../lib/types";
import { getEffectiveChrome, getPositionStyle } from "../../../lib/utils";
import "../../../styles/jukebox.css";
import { VolumeHighIcon } from "../../../components/icons";
import { JukeboxExpandedPlayer } from "./JukeboxExpandedPlayer";

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
  onError,
  keyboard = false,
  position = DEFAULT_POSITION,
  theme = DEFAULT_THEME,
  chrome = DEFAULT_CHROME,
  offset,
  portal = true,
  className,
  renderExpandedContent,
}: JukeboxProps) {
  const isMounted = useClientMounted();
  const {
    player,
    currentTrack,
    nextTrack,
    totalTracks,
    expanded,
    toggleExpanded,
  } = useJukebox({
    tracks,
    autoplay,
    onPlay,
    onPause,
    onTrackChange,
    onEnd,
    onError,
  });
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
  } = player;

  useJukeboxKeyboardShortcuts(keyboard, {
    togglePlay,
    playNext,
    playPrev,
    toggleMute,
  });

  const effectiveChrome = getEffectiveChrome(chrome);

  const expandedRenderProps: JukeboxExpandedRenderProps | undefined =
    currentTrack
      ? {
          currentIndex,
          currentTrack,
          isExpanded: expanded,
          isMuted,
          isPlaying,
          nextTrack,
          playerMountRef,
          totalTracks,
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

  const content = (
    <div
      className={clsx(
        "rj-root",
        {
          "rj-root--expanded": expanded,
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
        <ExpandedPanel isExpanded={expanded}>
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
            isExpanded={expanded}
            isPlaying={isPlaying}
            onToggleExpanded={toggleExpanded}
          />

          <button
            type="button"
            onClick={toggleMute}
            disabled={!currentTrack}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="rj-icon-button">
            <span className="rj-icon-button__icon">
              <VolumeHighIcon isMuted={isMuted} />
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
