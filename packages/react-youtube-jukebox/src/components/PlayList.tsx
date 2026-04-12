import { createPortal } from "react-dom";
import clsx from "clsx";

import { useClientMounted } from "../hooks/useClientMounted";
import { usePlayListMobile } from "../hooks/usePlayListMobile";
import { usePlayList } from "../hooks/usePlayList";
import { DEFAULT_PLAYLIST_THEME } from "../lib/constants";
import type { PlayListProps } from "../lib/types";
import { getPositionStyle } from "../lib/utils";
import { PlayListPlayer } from "./PlayListPlayer";
import {
  MainPanelHeader,
  MinimizeButton,
  NowPlaying,
  PlayListHeader,
  PlayListMiniBar,
  PlayListNav,
  PlayListTabs,
  PlayListTrackList,
  SizeToggleButton,
} from "./playlist/PlayListSections";
import "../styles/playlist.css";

export function PlayList({
  playlist,
  autoplay = false,
  showSeekBar = true,
  theme = DEFAULT_PLAYLIST_THEME,
  size,
  defaultSize,
  onSizeChange,
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

  const positionStyle = position
    ? getPositionStyle(position, offset, portal)
    : undefined;

  const dataSizeValue = (() => {
    if (resolvedSize === "mini") return "mini";
    if (resolvedSize === "expanded") return "expanded";
    return undefined;
  })();

  const content = (
    <div
      className={clsx("rp-root", className)}
      data-theme={theme}
      data-size={dataSizeValue}
      style={positionStyle}>
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
