# @react-youtube-jukebox/core

YouTube jukebox component for React apps.

## Install

```bash
pnpm add @react-youtube-jukebox/core
```

## Usage

```tsx
import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function Page() {
  return <Jukebox tracks={tracks} />;
}
```

기본 스타일은 컴포넌트 import 시 자동으로 주입됩니다.
기본 테마는 `glass`이며, 필요하면 `theme="simple"`, `theme="sunset"`, `theme="ride"`를 전달할 수 있습니다.
쉘 형태는 `chrome` prop으로 제어하며 기본값은 `classic`입니다. `wallet`과 `ride` 프리셋으로 같은 로직 위에 다른 UI chrome을 적용할 수 있습니다.

## Custom Expanded Panel

```tsx
import {
  Jukebox,
  type JukeboxExpandedRenderProps,
} from "@react-youtube-jukebox/core";

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

`renderExpandedContent`를 전달하면 기본 expanded 디자인 대신 사용자 렌더를 사용합니다. 토글 애니메이션과 컨테이너 visibility는 라이브러리가 계속 관리하고, 소비자는 내부 레이아웃과 컨트롤만 정의하면 됩니다.

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
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
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

기본 사용은 viewport 기준 포털 렌더링입니다. 레이아웃 안에서 직접 배치가 필요할 때만 `portal={false}`를 사용합니다.
`autoplay`는 기본값이 `true`이며, 첫 진입 시 무음 상태로 자동 재생합니다. 자동 재생을 끄려면 `autoplay={false}`를 전달합니다.
