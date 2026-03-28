"use client";

import { useState } from "react";

import {
  Jukebox,
  type JukeboxExpandedRenderProps,
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
import {
  getResponsivePreviewPosition,
  useIsMobilePreview,
} from "../lib/use-mobile-preview";

type PreviewCardProps = {
  chrome: (typeof jukeboxChromeOptions)[number]["value"];
  description: string;
  isMobilePreview: boolean;
  mobileDescription?: string;
  mobileTitle?: string;
  position?: JukeboxPosition;
  renderExpandedContent?: (
    props: JukeboxExpandedRenderProps,
  ) => React.ReactNode;
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
  isMobilePreview,
  mobileDescription,
  mobileTitle,
  position = "bottom-left",
  renderExpandedContent,
  theme,
  title,
  tracks,
}: PreviewCardProps) {
  const resolvedPosition = getResponsivePreviewPosition(position, isMobilePreview);
  const resolvedTitle = isMobilePreview && mobileTitle ? mobileTitle : title;
  const resolvedDescription =
    isMobilePreview && mobileDescription ? mobileDescription : description;

  return (
    <div className="docs-example-card">
      <div className="docs-example-card__header">
        <strong>{resolvedTitle}</strong>
        <p>{resolvedDescription}</p>
      </div>
      <div className="docs-preview docs-preview--compact">
        <div className="docs-preview__stage">
          <Jukebox
            tracks={tracks}
            portal={false}
            position={resolvedPosition}
            offset={20}
            theme={theme}
            chrome={chrome}
            className="docs-preview__jukebox"
            {...(renderExpandedContent
              ? { renderExpandedContent }
              : undefined)}
          />
        </div>
      </div>
    </div>
  );
}

function CustomExpandedPreview({
  currentIndex,
  currentTrack,
  isExpanded,
  isMuted,
  isPlaying,
  nextTrack,
  playerMountRef,
  totalTracks,
  volume,
  setVolume,
  toggleMute,
  togglePlay,
  playNext,
  playPrev,
}: JukeboxExpandedRenderProps) {
  return (
    <section className="docs-custom-expanded" data-open={isExpanded}>
      <div className="docs-custom-expanded__player" ref={playerMountRef} />
      <div className="docs-custom-expanded__meta">
        <span className="docs-custom-expanded__eyebrow">
          Custom expanded · {currentIndex + 1}/{totalTracks}
        </span>
        <strong>{currentTrack.title}</strong>
        <p>
          {currentTrack.artist ?? "Unknown artist"}
          {nextTrack ? ` · Next: ${nextTrack.title}` : ""}
        </p>
      </div>
      <div className="docs-custom-expanded__controls">
        <button type="button" onClick={playPrev}>
          Prev
        </button>
        <button type="button" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button type="button" onClick={playNext}>
          Next
        </button>
        <button type="button" onClick={toggleMute}>
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
      <label className="docs-custom-expanded__volume">
        <span>Volume</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
    </section>
  );
}

export function ExamplesShowcase() {
  const [theme, setTheme] = useState(DEFAULT_JUKEBOX_THEME);
  const [chrome, setChrome] = useState(DEFAULT_JUKEBOX_CHROME);
  const isMobilePreview = useIsMobilePreview();
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
          isMobilePreview={isMobilePreview}
          mobileTitle="Bottom"
          mobileDescription="Mobile preview stays centered on the bottom edge."
          tracks={demoTracks}
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title="Top Right"
          description="Same component, pinned to the opposite corner."
          isMobilePreview={isMobilePreview}
          mobileTitle="Top"
          mobileDescription="Mobile preview stays centered on the top edge."
          tracks={demoTracks}
          position="top-right"
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title="Single Track"
          description="Previous and next controls stay disabled with one track."
          isMobilePreview={isMobilePreview}
          tracks={singleDemoTrack}
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title="Custom Expanded"
          description="The dock stays the same while the expanded panel is rendered by your app."
          isMobilePreview={isMobilePreview}
          tracks={demoTracks}
          theme={theme}
          renderExpandedContent={(props) => <CustomExpandedPreview {...props} />}
        />
        <PreviewCard
          chrome={chrome}
          title="Empty Tracks"
          description="Fallback state renders safely instead of crashing."
          isMobilePreview={isMobilePreview}
          tracks={emptyDemoTracks}
          theme={theme}
        />
      </div>
    </>
  );
}
