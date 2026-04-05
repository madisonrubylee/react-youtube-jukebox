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

---

# 한국어

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

기본 동작은 viewport 기준 포털 렌더링입니다. 레이아웃 안에서 직접 배치해야 할 때만 `portal={false}`를 사용합니다. `position="bottom-center"` 또는 `position="top-center"`를 사용하면 x축
은 가운데 정렬되고, `offset`은 top/bottom 여백에 그대로 적용됩니다. `autoplay`는 기본값이 `true`이며 첫 진입 시 무음 상태로 자동 재생합니다. 자동 재생을 끄려면 `autoplay={false}`를 전달합니다.
