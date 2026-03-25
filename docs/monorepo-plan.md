# Monorepo Plan

## Structure

```text
apps/
  docs/
packages/
  react-youtube-jukebox/
```

## Responsibilities

- `apps/docs`
  - Next.js docs site
  - API reference, examples, playground, publish guidance
- `packages/react-youtube-jukebox`
  - npm publish target
  - source, build config, README, package metadata

## Why This Layout

- docs와 라이브러리 버전을 한 repo에서 맞출 수 있다
- npm publish 대상이 명확하게 한 패키지로 고정된다
- docs 앱이 커져도 라이브러리 번들 크기에 영향을 주지 않는다
