# @react-youtube-jukebox/core

YouTube jukebox component for React apps.

## Install

```bash
pnpm add @react-youtube-jukebox/core
```

## Usage

```tsx
import "@react-youtube-jukebox/core/styles.css";
import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" }
];

export function Page() {
  return <Jukebox tracks={tracks} />;
}
```

패키지 스타일은 별도 CSS export로 제공됩니다. 앱 엔트리에서 `@react-youtube-jukebox/core/styles.css`를 함께 import 해야 합니다.

## Props

```ts
type JukeboxTrack = {
  videoId: string;
  title: string;
  artist?: string;
};

type JukeboxProps = {
  tracks: JukeboxTrack[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  offset?: number | { x: number; y: number };
  portal?: boolean;
  className?: string;
};
```

기본 사용은 viewport 기준 포털 렌더링입니다. 레이아웃 안에서 직접 배치가 필요할 때만 `portal={false}`를 사용합니다.
