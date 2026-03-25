# react-youtube-jukebox Monorepo

`react-youtube-jukebox` 라이브러리 패키지와 Next.js 기반 docs 사이트를 함께 관리하는 pnpm workspace입니다.

## Workspace Layout

```text
apps/
  docs/                       # Next.js docs site
packages/
  react-youtube-jukebox/      # npm publish target
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm publish:check
```

## Publish Target

실제 npm 배포 대상은 `packages/react-youtube-jukebox` 하나입니다. docs 앱과 workspace 루트는 publish 대상이 아닙니다.

## Docs App

문서 앱은 `apps/docs` 아래 Next.js App Router 구조로 두었습니다. 기본 정보구조는 `Home`, `Quick Start`, `API & Playground`, `Examples`, `Showcase`입니다.

## Release Notes

- monorepo plan: `docs/monorepo-plan.md`
- publish flow: `docs/publish-flow.md`
