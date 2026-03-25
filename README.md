# react-youtube-jukebox

독립 React 패키지 저장소를 전제로 한 YouTube 주크박스 컴포넌트 라이브러리 초안입니다. v1 공개 API는 의도적으로 작게 유지하고, YouTube iframe API 로드와 재생 제어는 패키지 내부 구현으로 캡슐화합니다.

## Install

```bash
pnpm add @react-youtube-jukebox/core
```

`react`와 `react-dom`은 peer dependency입니다.

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

위치 프리셋 변경:

```tsx
<Jukebox tracks={tracks} position="top-left" offset={{ x: 20, y: 20 }} />
```

기본값은 viewport 기준 플로팅 포털 렌더링입니다. `position`으로 네 모서리 중 하나를 고를 수 있습니다.

인라인 렌더링이 필요한 경우에만:

```tsx
<section style={{ position: "relative", minHeight: 400 }}>
  <Jukebox tracks={tracks} portal={false} position="bottom-left" offset={16} />
</section>
```

`portal={false}`일 때는 가장 가까운 positioned ancestor 기준으로 배치됩니다. 즉 v1 기준으로는:

- 일반적인 사용: 포털 렌더링 + `position` 프리셋
- 레이아웃 안에서 직접 배치가 필요할 때만: `portal={false}`

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

## Behavior Notes

- `tracks.length === 0`이면 오류 없이 fallback 상태를 렌더링합니다.
- `tracks.length === 1`이면 이전/다음 이동 버튼을 비활성화합니다.
- 기본 렌더링은 `document.body` 포털입니다.
- 소비자는 `videoId`만 전달하면 되고, iframe API 로드와 곡 종료 후 다음 곡 전환은 내부에서 처리합니다.
- 스타일은 패키지 내부 CSS로 캡슐화되어 블로그 `globals.css`에 의존하지 않습니다.

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

`pnpm dev`는 로컬 확인용 playground 앱을 띄웁니다.

## Repository Shape

```text
src/
  components/
    Jukebox.tsx
    JukeboxExpandedPlayer.tsx
  hooks/
    useJukeboxPlayer.ts
  lib/
    shared.ts
    youtube.ts
  styles/
    jukebox.css
  index.ts
```

상세 구현 메모와 테스트 범위는 `docs/implementation-spec.md`에 정리했습니다.
