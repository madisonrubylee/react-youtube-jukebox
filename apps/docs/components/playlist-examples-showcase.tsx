"use client";

import { PlayList, type PlayListItem, type PlayListTheme } from "react-youtube-jukebox";

import { getDocsCopy, type DocsLocale } from "../lib/i18n";
import {
  demoPlaylist,
  emptyPlaylistDemo,
  playlistWithoutImageDemo,
  singlePlaylistDemo,
} from "../lib/tracks";

type PlaylistExamplesShowcaseProps = {
  locale: DocsLocale;
};

type PlaylistExampleCardProps = {
  description: string;
  playlist: PlayListItem[];
  theme: PlayListTheme;
  title: string;
};

function PlaylistExampleCard({
  description,
  playlist,
  theme,
  title,
}: PlaylistExampleCardProps) {
  return (
    <div className="docs-example-card">
      <div className="docs-example-card__header">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <div className="docs-playlist-example-card__preview" data-theme={theme}>
        <PlayList
          playlist={playlist}
          theme={theme}
          className="docs-playlist-example-card__player"
        />
      </div>
    </div>
  );
}

export function PlaylistExamplesShowcase({
  locale,
}: PlaylistExamplesShowcaseProps) {
  const copy = getDocsCopy(locale);
  const cards = [
    {
      description: copy.playlistExamples.showcase.cards.defaultDark.description,
      playlist: demoPlaylist,
      theme: "dark" as const,
      title: copy.playlistExamples.showcase.cards.defaultDark.title,
    },
    {
      description: copy.playlistExamples.showcase.cards.lightTheme.description,
      playlist: demoPlaylist,
      theme: "light" as const,
      title: copy.playlistExamples.showcase.cards.lightTheme.title,
    },
    {
      description: copy.playlistExamples.showcase.cards.singlePlaylist.description,
      playlist: singlePlaylistDemo,
      theme: "dark" as const,
      title: copy.playlistExamples.showcase.cards.singlePlaylist.title,
    },
    {
      description: copy.playlistExamples.showcase.cards.withoutImage.description,
      playlist: playlistWithoutImageDemo,
      theme: "dark" as const,
      title: copy.playlistExamples.showcase.cards.withoutImage.title,
    },
    {
      description: copy.playlistExamples.showcase.cards.emptyTracks.description,
      playlist: emptyPlaylistDemo,
      theme: "dark" as const,
      title: copy.playlistExamples.showcase.cards.emptyTracks.title,
    },
  ];

  return (
    <div className="docs-example-grid">
      {cards.map((card) => (
        <PlaylistExampleCard
          key={card.title}
          description={card.description}
          playlist={card.playlist}
          theme={card.theme}
          title={card.title}
        />
      ))}
    </div>
  );
}
