import clsx from "clsx";

import type { PlayListItem } from "../../../lib/types";

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
