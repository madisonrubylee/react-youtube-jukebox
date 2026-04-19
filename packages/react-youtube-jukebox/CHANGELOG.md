# Changelog

All notable changes to `react-youtube-jukebox` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-04-19

### BREAKING CHANGES

- Removed `shuffle` / `toggleShuffle` / `repeat` / `cycleRepeat` from
  `JukeboxPlayerState` and the corresponding props on `JukeboxExpandedRenderProps`.
  If you relied on the built-in shuffle/repeat controls, manage that state in
  your app and drive `currentIndex` yourself.
- Removed the `RepeatMode` type export. The type is no longer part of the
  public API.
- `JukeboxExpandedRenderProps` no longer `Omit`s the removed fields. Custom
  expanded renderers should drop references to `shuffle`, `toggleShuffle`,
  `repeat`, and `cycleRepeat`.
- Internal module layout changed: components moved to
  `src/domains/<feature>/components/*` and shared types now live in
  `src/lib/types.ts` (the old `src/lib/shared.ts` barrel is gone). Deep
  imports that bypassed the package entry point will break — import from
  `react-youtube-jukebox` only.

### Added

- `onError` callback on `Jukebox`, `PlayList`, `useJukebox`, and `usePlayList`
  for surfacing YouTube player errors.
- `accentColor` prop on `PlayList` for theming the active track highlight.
- `ProgressSlider` and `VolumeSlider` building blocks used by the default
  player UI.
- `useJukeboxKeyboardShortcuts` and `useYouTubePlayerLifecycle` hooks extracted
  from `useJukeboxPlayer` for clearer responsibilities.
- New playlist layout pieces: `PlayListHeader`, `PlayListMiniBar`, `PlayListNav`,
  `PlayListTabs`, and `PlayListSectionsCommon`.

### Changed

- Reorganized source tree by feature/domain: `src/domains/jukebox/*` and
  `src/domains/playlist/*`.
- Split the monolithic `useJukeboxPlayer` into focused hooks; YouTube IFrame
  lifecycle now lives in `useYouTubePlayerLifecycle`.
- `PlayListTrackList` renders through a dedicated `TrackRow` component for
  better list performance.
- Track list scroll position is now reset when switching between playlists.

### Removed

- Legacy `PlayListSections.tsx` (replaced by `PlayListSectionsCommon` plus the
  new layout components).
- `src/lib/shared.ts` barrel file (use `src/lib/types.ts` internally; public
  API continues to be re-exported from the package entry).

## [1.0.4] - earlier

- See commit history prior to 2.0.0.

[2.0.0]: https://github.com/madisonrubylee/react-youtube-jukebox/releases/tag/v2.0.0
[1.0.4]: https://github.com/madisonrubylee/react-youtube-jukebox/releases/tag/v1.0.4
