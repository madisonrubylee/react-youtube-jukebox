"use client";

import { useState } from "react";

import {
  Jukebox,
  type JukeboxPosition,
  type JukeboxTrack,
} from "@react-youtube-jukebox/core";

import { demoTracks, emptyDemoTracks, singleDemoTrack } from "../lib/tracks";
import {
  DEFAULT_JUKEBOX_THEME,
  DEFAULT_JUKEBOX_CHROME,
  jukeboxChromeOptions,
  jukeboxThemeOptions,
} from "../lib/themes";

type PreviewCardProps = {
  chrome: (typeof jukeboxChromeOptions)[number]["value"];
  description: string;
  position?: JukeboxPosition;
  title: string;
  tracks: JukeboxTrack[];
  theme: (typeof jukeboxThemeOptions)[number]["value"];
};

type PreviewControlRowProps = {
  label: string;
  onSelect: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
};

function PreviewControlRow({
  label,
  onSelect,
  options,
  value,
}: PreviewControlRowProps) {
  return (
    <div className="docs-preview__toolbar">
      <span className="docs-preview__label">{label}</span>
      <div className="docs-segmented-control" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className="docs-segmented-control__button"
            data-active={value === option.value}
            role="radio"
            aria-checked={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PreviewCard({
  chrome,
  description,
  position = "bottom-left",
  theme,
  title,
  tracks,
}: PreviewCardProps) {
  return (
    <div className="docs-example-card">
      <div className="docs-example-card__header">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <div className="docs-preview docs-preview--compact">
        <div className="docs-preview__stage">
          <Jukebox
            tracks={tracks}
            portal={false}
            position={position}
            offset={20}
            theme={theme}
            chrome={chrome}
            className="docs-preview__jukebox"
          />
        </div>
      </div>
    </div>
  );
}

export function ExamplesShowcase() {
  const [theme, setTheme] = useState(DEFAULT_JUKEBOX_THEME);
  const [chrome, setChrome] = useState(DEFAULT_JUKEBOX_CHROME);
  const selectedTheme = jukeboxThemeOptions.find((option) => option.value === theme);
  const selectedChrome = jukeboxChromeOptions.find(
    (option) => option.value === chrome,
  );

  return (
    <>
      <div className="docs-showcase-controls">
        <PreviewControlRow
          label="Theme"
          options={jukeboxThemeOptions}
          onSelect={(value) =>
            setTheme(value as (typeof jukeboxThemeOptions)[number]["value"])
          }
          value={theme}
        />
        <PreviewControlRow
          label="Chrome"
          options={jukeboxChromeOptions}
          onSelect={(value) =>
            setChrome(value as (typeof jukeboxChromeOptions)[number]["value"])
          }
          value={chrome}
        />
        <p className="docs-showcase-controls__description">
          {selectedTheme?.description} {selectedChrome?.description}
        </p>
      </div>

      <div className="docs-example-grid">
        <PreviewCard
          chrome={chrome}
          title="Bottom Left"
          description="Current theme applied to the default compact dock."
          tracks={demoTracks}
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title="Top Right"
          description="Same component, pinned to the opposite corner."
          tracks={demoTracks}
          position="top-right"
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title="Single Track"
          description="Previous and next controls stay disabled with one track."
          tracks={singleDemoTrack}
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title="Empty Tracks"
          description="Fallback state renders safely instead of crashing."
          tracks={emptyDemoTracks}
          theme={theme}
        />
      </div>
    </>
  );
}
