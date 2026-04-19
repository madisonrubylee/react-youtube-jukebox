import type { PlayListItem, PlayListSize, PlayListTrack } from "../../../lib/types";
import { CompactIcon, ExpandIcon, MinimizeIcon, MusicNoteIcon } from "./PlayListIcons";

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
        <div className="rp-main__header-meta">
          {playlistItem.data.length} tracks
        </div>
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
