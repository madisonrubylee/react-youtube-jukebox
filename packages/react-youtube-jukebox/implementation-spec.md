# react-youtube-jukebox v1 Implementation Spec

## Goal

기존 블로그 결합형 주크박스를 독립 React 패키지 저장소로 추출한다. 배포 단위는 단일 React 컴포넌트 라이브러리 1개로 제한하고, 소비자는 `videoId`만 넘기면 되도록 YouTube iframe API 연동은 내부 구현에 유지한다.

## Package Naming

- 기본 패키지명 방향: `react-youtube-jukebox` 계열
- 기본 publish 형태: scoped package
- 현재 스캐폴드 예시: `@react-youtube-jukebox/core`
- 실제 배포 전에는 소유 scope 기준으로 최종 이름만 확정하면 된다

## Public API v1

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

v1 범위에서 허용하는 커스터마이징은 `className`, `position`, `offset`, `portal`까지만 둔다. 테마 확장과 다중 provider 추상화는 후속 범위다.

## Source Responsibilities

- `src/index.ts`
  - 공개 export만 담당
- `src/components/Jukebox.tsx`
  - 패키지 엔트리 컴포넌트
  - portal on/off 처리
  - 위치 preset 계산 적용
  - 요약 dock과 expanded panel 상태 관리
- `src/components/JukeboxExpandedPlayer.tsx`
  - 내부 프레젠테이션 컴포넌트 유지
  - 확장 패널 UI 전담
- `src/hooks/useJukeboxPlayer.ts`
  - `tracks`를 props로 받는 내부 훅
  - iframe API 상태와 재생 전환 관리
- `src/lib/youtube.ts`
  - YouTube iframe API 로더와 타입
- `src/lib/shared.ts`
  - 타입, 상수, 유틸만 유지
  - 기존 `TRACKS` 상수는 제거
- `src/styles/jukebox.css`
  - 기존 디자인과 애니메이션을 패키지 내부 CSS로 캡슐화

## Migration Rules From Existing Blog Code

- 블로그 전역 `globals.css` 의존 제거
- `jukeboxBounce` 같은 애니메이션은 패키지 내부 CSS로 이동
- `Jukebox.tsx`는 엔트리 컴포넌트로 승격
- `JukeboxExpandedPlayer.tsx`는 외부 export 없이 내부 presentation 역할 유지
- `useJukeboxPlayer.ts`는 더 이상 `shared.ts`의 `TRACKS`에 의존하지 않고 `tracks` 입력을 사용
- `shared.ts`는 타입, 위치 계산, 트랙 인덱스 유틸, 시각 상수만 보관

## Behavioral Requirements

- 기본 렌더링은 `document.body` 포털
- `portal={false}`이면 inline 렌더링
- inline 렌더링은 nearest positioned ancestor 기준 absolute positioning을 가정
- 위치 preset 계산은 패키지 내부에서 수행
- `tracks.length === 0`이면 오류 없이 fallback 상태 렌더링
- `tracks.length === 1`이면 이전/다음 버튼 비활성화
- 현재 곡 종료 시 다음 곡으로 자동 전환
- 여러 곡이면 이전/다음 곡 순환 이동

## Non-goals

- 데모 앱
- 다중 테마 시스템
- 멀티 provider 추상화
- 블로그 원본 코드 수정 또는 삭제

## Test Plan

- `tracks` 여러 개 입력 시 이전/다음 곡 순환이 정상 동작한다
- 현재 곡 종료 시 다음 곡으로 자동 전환된다
- `tracks`가 1개일 때 이전/다음 버튼이 비활성화된다
- `tracks`가 비어 있을 때 오류 없이 fallback 상태를 렌더링한다
- `portal` on/off에 따라 렌더 위치가 달라진다
- 각 `position` preset이 의도한 화면 모서리에 배치된다
- 공개 타입 import와 기본 JSX 사용 예시가 TypeScript에서 통과한다
- 패키지 내부 스타일만으로 UI가 유지되고 외부 `globals.css` 없이 깨지지 않는다

## Suggested Next Implementation Step

다음 AI 작업은 우선순위를 이렇게 가져가면 된다.

1. `useJukeboxPlayer.ts`를 테스트 가능하도록 player adapter 경계를 분리한다.
2. DOM 테스트에서 iframe API namespace를 mocking해 자동 전환과 버튼 상태를 검증한다.
3. `Jukebox.tsx`의 position/portal 렌더링 테스트를 추가한다.
4. 실제 패키지 배포 전 package name, repository URL, license를 확정한다.
