# react-youtube-jukebox

A floating YouTube jukebox and playlist player component for React.

It wraps the YouTube IFrame Player API with a dock-style player UI, queue rotation, portal rendering, and a customizable expanded panel.

For full documentation and live demos, visit **[react-youtube-jukebox.com](https://react-youtube-jukebox.com/)**.

## Install

```bash
pnpm add react-youtube-jukebox
```

```bash
npm i react-youtube-jukebox
```

## Usage

```tsx
import { Jukebox } from "react-youtube-jukebox";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function Page() {
  return <Jukebox tracks={tracks} position="bottom-center" offset={20} />;
}
```

Default styles are injected automatically when you import the component. The default theme is `glass` — pass `theme="simple"`, `theme="sunset"`, or `theme="ride"` to switch it up. The shell appearance is controlled by the `chrome` prop, which defaults to `classic`. Use the `wallet` or `ride` presets to apply a different UI chrome on top of the same underlying logic.

## Custom Expanded Panel

```tsx
import {
  Jukebox,
  type JukeboxExpandedRenderProps,
} from "react-youtube-jukebox";

function CustomExpandedPanel({
  currentTrack,
  isExpanded,
  playerMountRef,
  togglePlay,
}: JukeboxExpandedRenderProps) {
  return (
    <section data-open={isExpanded}>
      <div ref={playerMountRef} style={{ aspectRatio: "16 / 9" }} />
      <strong>{currentTrack.title}</strong>
      <button onClick={togglePlay}>Toggle</button>
    </section>
  );
}

export function Page() {
  return (
    <Jukebox
      tracks={tracks}
      renderExpandedContent={(props) => <CustomExpandedPanel {...props} />}
    />
  );
}
```

When you pass `renderExpandedContent`, the library swaps out the default expanded design for your custom render. Toggle animations and container visibility are still managed internally — you only need to define the inner layout and controls.

## Props

```ts
type JukeboxTrack = {
  videoId: string;
  title: string;
  artist?: string;
};

type JukeboxTheme = "glass" | "simple" | "sunset" | "ride";
type JukeboxChrome = "classic" | "wallet" | "ride";
type JukeboxExpandedRenderProps = {
  currentIndex: number;
  currentTrack: JukeboxTrack;
  isExpanded: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  nextTrack: JukeboxTrack | undefined;
  playerMountRef: (node: HTMLDivElement | null) => void;
  totalTracks: number;
  volume: number;
  setVolume: (nextVolume: number) => void;
  toggleMute: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
};

type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  theme?: JukeboxTheme;
  chrome?: JukeboxChrome;
  offset?: number | { x: number; y: number };
  portal?: boolean;
  className?: string;
  renderExpandedContent?: (
    props: JukeboxExpandedRenderProps,
  ) => React.ReactNode;
};
```

By default, the player renders through a portal positioned relative to the viewport. Use `portal={false}` only when you need to place it inline within your layout. With `position="bottom-center"` or `position="top-center"`, the player is centered horizontally and `offset` applies to the top or bottom margin as-is. `autoplay` defaults to `true` and starts playback muted on first visit. Pass `autoplay={false}` to disable it.
