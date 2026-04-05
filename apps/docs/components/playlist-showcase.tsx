"use client";

import { useState } from "react";

import {
  PlayList,
  type PlayListSize,
  type PlayListTheme,
} from "react-youtube-jukebox";

import { getDocsCopy, type DocsLocale } from "../lib/i18n";
import { demoPlaylist } from "../lib/tracks";

type PlayListThemeOption = {
  label: string;
  value: PlayListTheme;
};

type PlayListSizeOption = {
  label: string;
  value: PlayListSize;
};

const PLAYLIST_THEME_OPTIONS: Record<DocsLocale, PlayListThemeOption[]> = {
  en: [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
  ],
  ko: [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
  ],
};

const PLAYLIST_SIZE_OPTIONS: Record<DocsLocale, PlayListSizeOption[]> = {
  en: [
    { label: "Mini", value: "mini" },
    { label: "Compact", value: "compact" },
    { label: "Expanded", value: "expanded" },
  ],
  ko: [
    { label: "Mini", value: "mini" },
    { label: "Compact", value: "compact" },
    { label: "Expanded", value: "expanded" },
  ],
};

type PlayListShowcaseProps = {
  locale: DocsLocale;
};

export function PlayListShowcase({ locale }: PlayListShowcaseProps) {
  const [theme, setTheme] = useState<PlayListTheme>("dark");
  const [size, setSize] = useState<PlayListSize>("compact");
  const copy = getDocsCopy(locale);
  const themeOptions = PLAYLIST_THEME_OPTIONS[locale];
  const sizeOptions = PLAYLIST_SIZE_OPTIONS[locale];

  return (
    <div className="docs-playlist-showcase">
      <div className="docs-playlist-showcase__toolbar">
        <span className="docs-preview__label">
          {copy.playlist.showcase.themeLabel}
        </span>
        <div
          className="docs-segmented-control"
          role="radiogroup"
          aria-label={copy.playlist.showcase.themeLabel}>
          {themeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className="docs-segmented-control__button"
              data-active={theme === option.value}
              role="radio"
              aria-checked={theme === option.value}>
              {option.label}
            </button>
          ))}
        </div>

        <span className="docs-preview__label">
          {copy.playlist.showcase.sizeLabel}
        </span>
        <div
          className="docs-segmented-control"
          role="radiogroup"
          aria-label={copy.playlist.showcase.sizeLabel}>
          {sizeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSize(option.value)}
              className="docs-segmented-control__button"
              data-active={size === option.value}
              role="radio"
              aria-checked={size === option.value}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="docs-playlist-showcase__preview">
        <PlayList
          playlist={demoPlaylist}
          autoplay
          theme={theme}
          size={size}
          onSizeChange={setSize}
          className="docs-playlist-showcase__player"
        />
      </div>
    </div>
  );
}
