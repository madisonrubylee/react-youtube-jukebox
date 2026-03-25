"use client";

import { useState } from "react";

import { Jukebox } from "@react-youtube-jukebox/core";

import { demoTracks } from "../lib/tracks";
import {
  DEFAULT_JUKEBOX_THEME,
  DEFAULT_JUKEBOX_CHROME,
  jukeboxChromeOptions,
  jukeboxThemeOptions,
} from "../lib/themes";

export function LivePreview() {
  const [theme, setTheme] = useState(DEFAULT_JUKEBOX_THEME);
  const [chrome, setChrome] = useState(DEFAULT_JUKEBOX_CHROME);

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
      <div className="docs-preview__toolbar">
        <span className="docs-preview__label">Chrome</span>
        <div className="docs-segmented-control">
          {jukeboxChromeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setChrome(option.value)}
              className="docs-segmented-control__button"
              data-active={chrome === option.value}
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
          chrome={chrome}
        />
      </div>
    </div>
  );
}
