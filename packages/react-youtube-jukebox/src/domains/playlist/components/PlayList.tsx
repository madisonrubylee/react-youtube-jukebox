import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import { useClientMounted } from "../../../hooks/useClientMounted";
import { DEFAULT_PLAYLIST_THEME } from "../../../lib/constants";
import type { PlayListProps, PlayListSize } from "../../../lib/types";
import { buildAccentOverrides, getPositionStyle } from "../../../lib/utils";
import { usePlayList } from "../hooks/usePlayList";
import { usePlayListMobile } from "../hooks/usePlayListMobile";
import { PlayListHeader } from "./PlayListHeader";
import { PlayListMiniBar } from "./PlayListMiniBar";
import { PlayListNav } from "./PlayListNav";
import { PlayListPlayer } from "./PlayListPlayer";
import {
  MainPanelHeader,
  MinimizeButton,
  NowPlaying,
  SizeToggleButton,
} from "./PlayListSectionsCommon";
import { PlayListTabs } from "./PlayListTabs";
import { PlayListTrackList } from "./PlayListTrackList";
import "../../../styles/playlist.css";

const SIZE_DATA_ATTRIBUTE: Record<
  PlayListSize,
  "mini" | "expanded" | undefined
> = {
  mini: "mini",
  compact: undefined,
  expanded: "expanded",
};

export function PlayList({
  playlist,
  autoplay = false,
  showSeekBar = true,
  accentColor,
  theme = DEFAULT_PLAYLIST_THEME,
  size,
  defaultSize,
  onSizeChange,
  onError,
  position,
  offset,
  portal = false,
  className,
}: PlayListProps) {
  const isMounted = useClientMounted();
  const isMobile = usePlayListMobile();
  const {
    player: playerState,
    activeTabIndex,
    activePlaylist,
    activeTracks,
    currentTrack,
    size: resolvedSize,
    isExpanded,
    setActiveTabIndex,
    selectTrack,
    toggleSize,
    minimize,
    restore,
  } = usePlayList({
    playlist,
    autoplay,
    defaultSize,
    size,
    onSizeChange,
    onError,
  });

  const {
    isMuted,
    isPlaying,
    volume,
    setVolume,
    toggleMute,
    playerMountRef,
    togglePlay,
  } = playerState;

  const accentOverrides = accentColor
    ? buildAccentOverrides(accentColor)
    : undefined;

  const positionStyle = position
    ? getPositionStyle(position, offset, portal)
    : undefined;
  const rootStyle: CSSProperties & Record<`--${string}`, string> = {
    ...(positionStyle ?? {}),
    ...(accentOverrides ?? {}),
  };

  const dataSizeValue = SIZE_DATA_ATTRIBUTE[resolvedSize];

  const content = (
    <div
      className={clsx("rp-root", className)}
      data-theme={theme}
      data-size={dataSizeValue}
      style={rootStyle}>
      <PlayListMiniBar
        currentTrack={currentTrack}
        isMuted={isMuted}
        isPlaying={isPlaying}
        onRestore={restore}
        onToggleMute={toggleMute}
        onTogglePlay={togglePlay}
        onVolumeChange={setVolume}
        volume={volume}
      />

      {/* Full view (compact + expanded) */}
      <div className="rp-toolbar">
        <MinimizeButton onMinimize={minimize} />
        {(!isMobile || isExpanded) && (
          <SizeToggleButton currentSize={resolvedSize} onToggle={toggleSize} />
        )}
      </div>
      <PlayListHeader playlistItem={activePlaylist} />
      <div className="rp-content">
        <div className="rp-panel rp-panel--nav">
          <PlayListNav
            playlist={playlist}
            activeIndex={activeTabIndex}
            onSelect={setActiveTabIndex}
          />
        </div>
        <div className="rp-panel rp-panel--main">
          <PlayListTabs
            playlist={playlist}
            activeIndex={activeTabIndex}
            onTabChange={setActiveTabIndex}
          />
          <MainPanelHeader playlistItem={activePlaylist} />
          <PlayListTrackList
            tracks={activeTracks}
            activePlaylistIndex={activeTabIndex}
            currentGlobalIndex={playerState.currentIndex}
            isPlaying={isPlaying}
            onTrackSelect={selectTrack}
          />
        </div>
        <div className="rp-panel rp-panel--now-playing">
          <div className="rp-now-playing__video">
            <div ref={playerMountRef} className="rp-now-playing__video-mount" />
          </div>
          <NowPlaying currentTrack={currentTrack} />
        </div>
      </div>
      <PlayListPlayer
        playerState={playerState}
        currentTrack={currentTrack}
        totalTracks={activeTracks.length}
        canSeek={Boolean(currentTrack)}
        showSeekBar={showSeekBar}
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
