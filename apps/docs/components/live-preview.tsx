"use client";

import { useState } from "react";

import { Jukebox } from "@react-youtube-jukebox/core";

import { demoTracks } from "../lib/tracks";
import {
  DEFAULT_JUKEBOX_THEME,
  jukeboxThemeOptions,
} from "../lib/themes";

export function LivePreview() {
  const [theme, setTheme] = useState(DEFAULT_JUKEBOX_THEME);

  return (
    <div className="docs-preview">
      <div className="docs-preview__toolbar">
        <span className="docs-preview__label">Theme</span>
        <div className="docs-segmented-control">
          {jukeboxThemeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className="docs-segmented-control__button"
              data-active={theme === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="docs-preview__stage">
        <Jukebox
          tracks={demoTracks}
          portal={false}
          position="bottom-left"
          offset={24}
          theme={theme}
        />
      </div>
    </div>
  );
}
