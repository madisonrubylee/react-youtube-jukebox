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
  jukeboxThemeOptions,
} from "../lib/themes";

type PreviewCardProps = {
  description: string;
  position?: JukeboxPosition;
  title: string;
  tracks: JukeboxTrack[];
  theme: (typeof jukeboxThemeOptions)[number]["value"];
};

function PreviewCard({
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
          />
        </div>
      </div>
    </div>
  );
}

export function ExamplesShowcase() {
  const [theme, setTheme] = useState(DEFAULT_JUKEBOX_THEME);
  const selectedTheme = jukeboxThemeOptions.find((option) => option.value === theme);

  return (
    <>
      <div className="docs-showcase-controls">
        <div className="docs-preview__toolbar">
          <span className="docs-preview__label">Theme</span>
          <div className="docs-segmented-control" role="radiogroup" aria-label="Theme">
            {jukeboxThemeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className="docs-segmented-control__button"
                data-active={theme === option.value}
                role="radio"
                aria-checked={theme === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <p className="docs-showcase-controls__description">
          {selectedTheme?.description}
        </p>
      </div>

      <div className="docs-example-grid">
        <PreviewCard
          title="Bottom Left"
          description="Current theme applied to the default compact dock."
          tracks={demoTracks}
          theme={theme}
        />
        <PreviewCard
          title="Top Right"
          description="Same component, pinned to the opposite corner."
          tracks={demoTracks}
          position="top-right"
          theme={theme}
        />
        <PreviewCard
          title="Single Track"
          description="Previous and next controls stay disabled with one track."
          tracks={singleDemoTrack}
          theme={theme}
        />
        <PreviewCard
          title="Empty Tracks"
          description="Fallback state renders safely instead of crashing."
          tracks={emptyDemoTracks}
          theme={theme}
        />
      </div>
    </>
  );
}
