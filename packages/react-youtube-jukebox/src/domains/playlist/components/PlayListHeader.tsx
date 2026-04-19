import type { PlayListItem } from "../../../lib/types";
import { MusicNoteIcon } from "./PlayListIcons";

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
