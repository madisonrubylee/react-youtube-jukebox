# react-youtube-jukebox

<p align="center">
  <a href="https://react-youtube-jukebox.com/">
    <img src="https://raw.githubusercontent.com/madisonrubylee/react-youtube-jukebox/main/apps/docs/public/react-youtube-sample.gif" alt="react-youtube-jukebox demo" width="720" />
  </a>
</p>

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

Use `showSeekBar={false}` when you want to hide the seek slider from the built-in expanded player UI.

## PlayList

```tsx
import { PlayList } from "react-youtube-jukebox";

const playlist = [
  {
    id: "focus",
    title: "Focus Flow",
    data: [
      { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
      { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
    ],
  },
  {
    id: "night",
    title: "Night Drive",
    data: [{ videoId: "UfcAVejslrU", title: "Weightless", artist: "Marconi Union" }],
  },
];

export function Page() {
  return (
    <PlayList
      playlist={playlist}
      autoplay
    />
  );
}
```

`PlayList` stays inline in your layout and includes a built-in seek bar so users can scrub playback without opening a separate player view.

## Headless Hooks

If you want to build your own UI, use the headless hooks and render the controls yourself.

```tsx
import { useJukebox } from "react-youtube-jukebox";

function CustomJukebox({ tracks }) {
  const { player, currentTrack, expanded, toggleExpanded } = useJukebox({
    tracks,
    autoplay: false,
  });

  return (
    <section>
      <button onClick={toggleExpanded}>
        {expanded ? "Collapse" : "Expand"}
      </button>
      <button onClick={player.togglePlay}>
        {player.isPlaying ? "Pause" : "Play"}
      </button>
      <div>{currentTrack?.title ?? "No track selected"}</div>
      <div ref={player.playerMountRef} style={{ aspectRatio: "16 / 9" }} />
    </section>
  );
}
```

```tsx
import { usePlayList } from "react-youtube-jukebox";

function CustomPlayList({ playlist }) {
  const { player, activeTracks, currentTrack, setActiveTabIndex, selectTrack } =
    usePlayList({
      playlist,
      autoplay: false,
    });

  return (
    <section>
      <button onClick={() => setActiveTabIndex(0)}>First playlist</button>
      <ul>
        {activeTracks.map((track, index) => (
          <li key={track.videoId}>
            <button onClick={() => selectTrack(index)}>{track.title}</button>
          </li>
        ))}
      </ul>
      <button onClick={player.togglePlay}>
        {player.isPlaying ? "Pause" : "Play"}
      </button>
      <div>{currentTrack?.title ?? "No track selected"}</div>
      <div ref={player.playerMountRef} style={{ aspectRatio: "16 / 9" }} />
    </section>
  );
}
```

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
  playTrackAt: (index: number) => void;
  progress: number;
  duration: number;
  currentTime: number;
  seek: (seconds: number) => void;
};

type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  showSeekBar?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onTrackChange?: (track: JukeboxTrack, index: number) => void;
  onEnd?: () => void;
  keyboard?: boolean;
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

```ts
type UseJukeboxOptions = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  defaultIndex?: number;
  currentIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onTrackChange?: (track: JukeboxTrack, index: number) => void;
  onEnd?: () => void;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};
```

By default, the player renders through a portal positioned relative to the viewport. Use `portal={false}` only when you need to place it inline within your layout. With `position="bottom-center"` or `position="top-center"`, the player is centered horizontally and `offset` applies to the top or bottom margin as-is. `autoplay` defaults to `true` and starts playback muted on first visit. Pass `autoplay={false}` to disable it. If you need to hide the built-in progress slider, pass `showSeekBar={false}`.

## PlayList Props

```ts
type PlayListTrack = {
  title: string;
  artist: string;
  videoId: string;
};

type PlayListItem = {
  title: string;
  image?: string;
  data: PlayListTrack[];
};

type PlayListTheme = "light" | "dark";
type PlayListSize = "mini" | "compact" | "expanded";

type PlayListProps = {
  playlist: PlayListItem[];
  autoplay?: boolean;
  showSeekBar?: boolean;
  theme?: PlayListTheme;
  size?: PlayListSize;
  defaultSize?: PlayListSize;
  onSizeChange?: (size: PlayListSize) => void;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  offset?: number | { x: number; y: number };
  portal?: boolean;
  className?: string;
};
```

```ts
type UsePlayListOptions = {
  playlist: PlayListItem[];
  autoplay?: boolean;
  defaultTabIndex?: number;
  activeTabIndex?: number;
  onActiveTabIndexChange?: (index: number) => void;
  defaultSize?: PlayListSize;
  size?: PlayListSize;
  onSizeChange?: (size: PlayListSize) => void;
  defaultIndex?: number;
  currentIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onTrackChange?: (track: PlayListTrack, index: number) => void;
  onEnd?: () => void;
};
```

`playlist` is an array of playlist groups, and each group renders its own track list with a shared embedded player. Use `size` when you want to fully control the UI mode from outside, or `defaultSize` when you want the component to manage the initial mode internally. `onSizeChange` fires whenever the built-in size toggle changes between `mini`, `compact`, and `expanded`.

`showSeekBar` defaults to `true` and controls whether the built-in bottom seek bar is visible. `portal` defaults to `false` for `PlayList`, so it stays inline in your layout unless you explicitly opt into portal rendering. `position` and `offset` only matter when the player is rendered as a floating layer.

---

# 한국어

<p align="center">
  <a href="https://react-youtube-jukebox.com/">
    <img src="https://raw.githubusercontent.com/madisonrubylee/react-youtube-jukebox/main/apps/docs/public/react-youtube-sample.gif" alt="react-youtube-jukebox 데모" width="720" />
  </a>
</p>

React용 플로팅 YouTube 주크박스 & 플레이리스트 플레이어 컴포넌트입니다.

YouTube IFrame Player API를 래핑하여 독(dock) 스타일 플레이어 UI, 큐 로테이션, 포털 렌더링, 커스텀 확장 패널을 제공합니다.

전체 문서와 라이브 데모는 **[react-youtube-jukebox.com](https://react-youtube-jukebox.com/)**에서 확인할 수 있습니다.

## 설치

```bash
pnpm add react-youtube-jukebox
```

```bash
npm i react-youtube-jukebox
```

## 사용법

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

기본 스타일은 컴포넌트를 import하면 자동으로 주입됩니다. 기본 테마는 `glass`이며, `theme="simple"`, `theme="sunset"`, `theme="ride"`를 전달해 변경할 수 있습니다. 쉘 형태는 `chrome` prop으로 제어하며 기본값은 `classic`입니다. `wallet`과 `ride` 프리셋으로 같은 로직 위에 다른 UI chrome을 적용할 수 있습니다.

기본 확장 플레이어 UI의 seek 슬라이더를 숨기고 싶다면 `showSeekBar={false}`를 전달하면 됩니다.

## PlayList

```tsx
import { PlayList } from "react-youtube-jukebox";

const playlist = [
  {
    id: "focus",
    title: "Focus Flow",
    data: [
      { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
      { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
    ],
  },
  {
    id: "night",
    title: "Night Drive",
    data: [{ videoId: "UfcAVejslrU", title: "Weightless", artist: "Marconi Union" }],
  },
];

export function Page() {
  return (
    <PlayList
      playlist={playlist}
      autoplay
    />
  );
}
```

`PlayList`는 페이지 레이아웃 안에 직접 배치되는 컴포넌트이며, 기본 플레이어 하단에서 바로 탐색할 수 있는 seek 바를 제공합니다.

## 커스텀 확장 패널

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

`renderExpandedContent`를 전달하면 기본 확장 디자인 대신 사용자 정의 렌더를 사용합니다. 토글 애니메이션과 컨테이너 visibility는 라이브러리가 계속 관리하므로, 내부 레이아웃과 컨트롤만 정의하면 됩니다.

## 속성

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
  playTrackAt: (index: number) => void;
  progress: number;
  duration: number;
  currentTime: number;
  seek: (seconds: number) => void;
};

type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  showSeekBar?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onTrackChange?: (track: JukeboxTrack, index: number) => void;
  onEnd?: () => void;
  keyboard?: boolean;
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

기본 동작은 viewport 기준 포털 렌더링입니다. 레이아웃 안에서 직접 배치해야 할 때만 `portal={false}`를 사용합니다. `position="bottom-center"` 또는 `position="top-center"`를 사용하면 x축
은 가운데 정렬되고, `offset`은 top/bottom 여백에 그대로 적용됩니다. `autoplay`는 기본값이 `true`이며 첫 진입 시 무음 상태로 자동 재생합니다. 자동 재생을 끄려면 `autoplay={false}`를 전달합니다. 기본 progress slider를 숨기려면 `showSeekBar={false}`를 사용하세요.

## PlayList 속성

```ts
type PlayListTrack = {
  title: string;
  artist: string;
  videoId: string;
};

type PlayListItem = {
  title: string;
  image?: string;
  data: PlayListTrack[];
};

type PlayListTheme = "light" | "dark";
type PlayListSize = "mini" | "compact" | "expanded";

type PlayListProps = {
  playlist: PlayListItem[];
  autoplay?: boolean;
  showSeekBar?: boolean;
  theme?: PlayListTheme;
  size?: PlayListSize;
  defaultSize?: PlayListSize;
  onSizeChange?: (size: PlayListSize) => void;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  offset?: number | { x: number; y: number };
  portal?: boolean;
  className?: string;
};
```

`playlist`는 플레이리스트 묶음 배열이며, 각 묶음은 자체 트랙 목록을 가지면서 하나의 내장 플레이어를 공유합니다. 외부 상태에서 크기를 완전히 제어하고 싶다면 `size`를 사용하고, 초기값만 주고 내부 상태에 맡기고 싶다면 `defaultSize`를 사용하면 됩니다. `onSizeChange`는 내장 크기 토글로 `mini`, `compact`, `expanded`가 바뀔 때마다 호출됩니다.

`showSeekBar`의 기본값은 `true`이며, 하단 기본 seek bar 노출 여부를 제어합니다. `PlayList`의 `portal` 기본값은 `false`라서 별도 설정이 없으면 레이아웃 안에 직접 렌더링됩니다. `position`과 `offset`은 플로팅 레이어처럼 띄워서 렌더링할 때 의미가 있습니다.
