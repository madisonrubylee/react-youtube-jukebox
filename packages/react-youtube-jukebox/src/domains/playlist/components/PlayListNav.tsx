import clsx from "clsx";

import type { PlayListItem } from "../../../lib/types";
import { MusicNoteIcon } from "./PlayListIcons";

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
