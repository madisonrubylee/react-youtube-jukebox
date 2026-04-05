"use client";

import { useState } from "react";

import { Jukebox } from "react-youtube-jukebox";

import { getDocsCopy, type DocsLocale } from "../lib/i18n";
import { demoTracks } from "../lib/tracks";
import {
  DEFAULT_JUKEBOX_THEME,
  DEFAULT_JUKEBOX_CHROME,
  getJukeboxChromeOptions,
  getJukeboxThemeOptions,
} from "../lib/themes";
import {
  getResponsivePreviewPosition,
  useIsMobilePreview,
} from "../lib/use-mobile-preview";

type LivePreviewProps = {
  locale: DocsLocale;
};

export function LivePreview({ locale }: LivePreviewProps) {
  const [theme, setTheme] = useState(DEFAULT_JUKEBOX_THEME);
  const [chrome, setChrome] = useState(DEFAULT_JUKEBOX_CHROME);
  const isMobilePreview = useIsMobilePreview();
  const copy = getDocsCopy(locale);
  const themeOptions = getJukeboxThemeOptions(locale);
  const chromeOptions = getJukeboxChromeOptions(locale);
  const position = getResponsivePreviewPosition(
    "bottom-left",
    isMobilePreview,
  );

  return (
    <div className="docs-preview">
      <div className="docs-preview__toolbar">
        <span className="docs-preview__label">{copy.livePreview.themeLabel}</span>
        <div className="docs-segmented-control">
          {themeOptions.map((option) => (
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
        <span className="docs-preview__label">{copy.livePreview.chromeLabel}</span>
        <div className="docs-segmented-control">
          {chromeOptions.map((option) => (
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
          autoplay
          portal={false}
          position={position}
          offset={24}
          theme={theme}
          chrome={chrome}
        />
      </div>
    </div>
  );
}
