"use client";

import { useState } from "react";

import {
  Jukebox,
  type JukeboxChrome,
  type JukeboxExpandedRenderProps,
  type JukeboxPosition,
  type JukeboxTrack,
  type JukeboxTheme,
} from "react-youtube-jukebox";

import { getDocsCopy, type DocsLocale } from "../lib/i18n";
import { demoTracks, emptyDemoTracks, singleDemoTrack } from "../lib/tracks";
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

type PreviewCardProps = {
  chrome: JukeboxChrome;
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
  theme: JukeboxTheme;
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

type CustomExpandedPreviewProps = JukeboxExpandedRenderProps & {
  locale: DocsLocale;
};

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
  locale,
}: CustomExpandedPreviewProps) {
  const copy = getDocsCopy(locale);
  const customExpandedCopy = copy.showcase.customExpanded;

  return (
    <section className="docs-custom-expanded" data-open={isExpanded}>
      <div className="docs-custom-expanded__player" ref={playerMountRef} />
      <div className="docs-custom-expanded__meta">
        <span className="docs-custom-expanded__eyebrow">
          {customExpandedCopy.eyebrow} · {currentIndex + 1}/{totalTracks}
        </span>
        <strong>{currentTrack.title}</strong>
        <p>
          {currentTrack.artist ?? customExpandedCopy.unknownArtist}
          {nextTrack
            ? ` · ${customExpandedCopy.nextTrackPrefix}: ${nextTrack.title}`
            : ""}
        </p>
      </div>
      <div className="docs-custom-expanded__controls">
        <button type="button" onClick={playPrev}>
          {customExpandedCopy.prev}
        </button>
        <button type="button" onClick={togglePlay}>
          {isPlaying ? customExpandedCopy.pause : customExpandedCopy.play}
        </button>
        <button type="button" onClick={playNext}>
          {customExpandedCopy.next}
        </button>
        <button type="button" onClick={toggleMute}>
          {isMuted ? customExpandedCopy.unmute : customExpandedCopy.mute}
        </button>
      </div>
      <label className="docs-custom-expanded__volume">
        <span>{customExpandedCopy.volume}</span>
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

type ExamplesShowcaseProps = {
  locale: DocsLocale;
};

export function ExamplesShowcase({ locale }: ExamplesShowcaseProps) {
  const [theme, setTheme] = useState(DEFAULT_JUKEBOX_THEME);
  const [chrome, setChrome] = useState(DEFAULT_JUKEBOX_CHROME);
  const isMobilePreview = useIsMobilePreview();
  const copy = getDocsCopy(locale);
  const themeOptions = getJukeboxThemeOptions(locale);
  const chromeOptions = getJukeboxChromeOptions(locale);
  const selectedTheme = themeOptions.find((option) => option.value === theme);
  const selectedChrome = chromeOptions.find(
    (option) => option.value === chrome,
  );

  return (
    <>
      <div className="docs-showcase-controls">
        <PreviewControlRow
          label={copy.showcase.labels.theme}
          options={themeOptions}
          onSelect={(value) =>
            setTheme(value as JukeboxTheme)
          }
          value={theme}
        />
        <PreviewControlRow
          label={copy.showcase.labels.chrome}
          options={chromeOptions}
          onSelect={(value) =>
            setChrome(value as JukeboxChrome)
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
          title={copy.showcase.cards.bottom.title}
          description={copy.showcase.cards.bottom.description}
          isMobilePreview={isMobilePreview}
          mobileTitle={copy.showcase.cards.bottom.mobileTitle}
          mobileDescription={copy.showcase.cards.bottom.mobileDescription}
          tracks={demoTracks}
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title={copy.showcase.cards.top.title}
          description={copy.showcase.cards.top.description}
          isMobilePreview={isMobilePreview}
          mobileTitle={copy.showcase.cards.top.mobileTitle}
          mobileDescription={copy.showcase.cards.top.mobileDescription}
          tracks={demoTracks}
          position="top-right"
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title={copy.showcase.cards.singleTrack.title}
          description={copy.showcase.cards.singleTrack.description}
          isMobilePreview={isMobilePreview}
          tracks={singleDemoTrack}
          theme={theme}
        />
        <PreviewCard
          chrome={chrome}
          title={copy.showcase.cards.customExpanded.title}
          description={copy.showcase.cards.customExpanded.description}
          isMobilePreview={isMobilePreview}
          tracks={demoTracks}
          theme={theme}
          renderExpandedContent={(props) => (
            <CustomExpandedPreview {...props} locale={locale} />
          )}
        />
        <PreviewCard
          chrome={chrome}
          title={copy.showcase.cards.emptyTracks.title}
          description={copy.showcase.cards.emptyTracks.description}
          isMobilePreview={isMobilePreview}
          tracks={emptyDemoTracks}
          theme={theme}
        />
      </div>
    </>
  );
}
