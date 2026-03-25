# Publish Flow

## Local Checks

```bash
pnpm install
pnpm build
pnpm lint
pnpm typecheck
pnpm publish:check
```

## What Gets Published

publish 대상은 `packages/react-youtube-jukebox` 패키지 하나다. workspace 루트와 `apps/docs`는 npm 배포에 포함되지 않는다.

## Actual Publish

```bash
cd packages/react-youtube-jukebox
npm publish
```

## Pre-publish Checklist

- package name 사용 가능 여부 확인
- version bump
- `dist/` 생성 확인
- README / repository / license 정리
- docs 사이트의 install 예시 버전 동기화
