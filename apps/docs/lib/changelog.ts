import type { DocsLocale } from "./i18n-types";

type ChangelogEntry = {
  title: string;
  body: string;
};

type ChangelogSection = {
  heading: string;
  entries: ChangelogEntry[];
};

type ChangelogRelease = {
  version: string;
  date: string;
  sections: {
    breaking?: ChangelogSection;
    added?: ChangelogSection;
    changed?: ChangelogSection;
    removed?: ChangelogSection;
  };
};

type ChangelogCopy = {
  breadcrumbs: readonly string[];
  title: string;
  intro: string;
  sourceLink: string;
  githubReleaseLink: string;
  sourceLabel: string;
  githubReleaseLabel: string;
  tocLabel: string;
  releases: ChangelogRelease[];
};

const CHANGELOG_COPY: Record<DocsLocale, ChangelogCopy> = {
  en: {
    breadcrumbs: ["Docs", "Changelog"],
    title: "Changelog",
    intro:
      "Release history for the react-youtube-jukebox package. This page mirrors the CHANGELOG.md shipped inside the npm tarball and the GitHub Releases page.",
    sourceLabel: "CHANGELOG.md (source of truth)",
    sourceLink:
      "https://github.com/madisonrubylee/react-youtube-jukebox/blob/main/packages/react-youtube-jukebox/CHANGELOG.md",
    githubReleaseLabel: "GitHub Releases",
    githubReleaseLink:
      "https://github.com/madisonrubylee/react-youtube-jukebox/releases",
    tocLabel: "On This Page",
    releases: [
      {
        version: "2.0.0",
        date: "2026-04-19",
        sections: {
          breaking: {
            heading: "Breaking changes",
            entries: [
              {
                title: "shuffle / repeat controls removed",
                body: "shuffle, toggleShuffle, repeat, and cycleRepeat were removed from JukeboxPlayerState and the expanded render props. If you relied on the built-in controls, manage that state in your app and drive currentIndex yourself.",
              },
              {
                title: "RepeatMode type no longer exported",
                body: "The RepeatMode type is no longer part of the public API.",
              },
              {
                title: "JukeboxExpandedRenderProps no longer omits fields",
                body: "Custom expanded renderers should drop references to shuffle, toggleShuffle, repeat, and cycleRepeat.",
              },
              {
                title: "Internal module layout reorganized",
                body: "Components moved to src/domains/<feature>/components/*, and shared types now live in src/lib/types.ts (the old src/lib/shared.ts barrel is gone). Only import from the package entry point — deep imports will break.",
              },
            ],
          },
          added: {
            heading: "Added",
            entries: [
              {
                title: "onError callback",
                body: "Jukebox, PlayList, useJukebox, and usePlayList now accept onError for surfacing YouTube player errors.",
              },
              {
                title: "accentColor prop on PlayList",
                body: "Theme the active track highlight without overriding the whole palette.",
              },
              {
                title: "ProgressSlider and VolumeSlider",
                body: "Building blocks used by the default player UI are now available for reuse.",
              },
              {
                title: "Focused hooks extracted from useJukeboxPlayer",
                body: "useJukeboxKeyboardShortcuts and useYouTubePlayerLifecycle isolate keyboard behavior and the YouTube IFrame lifecycle.",
              },
              {
                title: "New playlist layout pieces",
                body: "PlayListHeader, PlayListMiniBar, PlayListNav, PlayListTabs, and PlayListSectionsCommon replace the old monolithic sections component.",
              },
            ],
          },
          changed: {
            heading: "Changed",
            entries: [
              {
                title: "Feature/domain directory layout",
                body: "Source is now organized under src/domains/jukebox/* and src/domains/playlist/* for clearer cohesion.",
              },
              {
                title: "useJukeboxPlayer split by responsibility",
                body: "The YouTube IFrame lifecycle was moved to useYouTubePlayerLifecycle; useJukeboxPlayer became significantly smaller.",
              },
              {
                title: "PlayListTrackList uses TrackRow",
                body: "The track row was extracted into its own component to avoid re-rendering the entire list on small updates.",
              },
              {
                title: "Track list scroll resets on playlist switch",
                body: "Switching between playlists no longer preserves the stale scroll offset from the previous list.",
              },
            ],
          },
          removed: {
            heading: "Removed",
            entries: [
              {
                title: "Legacy PlayListSections.tsx",
                body: "Replaced by PlayListSectionsCommon plus the new layout components.",
              },
              {
                title: "src/lib/shared.ts",
                body: "Internal barrel removed. The public API continues to be re-exported from the package entry.",
              },
            ],
          },
        },
      },
    ],
  },
  ko: {
    breadcrumbs: ["문서", "변경 이력"],
    title: "변경 이력",
    intro:
      "react-youtube-jukebox의 릴리즈 노트입니다. npm 패키지에 포함된 CHANGELOG.md, GitHub Releases와 같은 내용을 담고 있어요.",
    sourceLabel: "CHANGELOG.md (원본)",
    sourceLink:
      "https://github.com/madisonrubylee/react-youtube-jukebox/blob/main/packages/react-youtube-jukebox/CHANGELOG.md",
    githubReleaseLabel: "GitHub Releases",
    githubReleaseLink:
      "https://github.com/madisonrubylee/react-youtube-jukebox/releases",
    tocLabel: "이 페이지에서",
    releases: [
      {
        version: "2.0.0",
        date: "2026-04-19",
        sections: {
          breaking: {
            heading: "호환성 주의 (Breaking)",
            entries: [
              {
                title: "shuffle / repeat 컨트롤을 들어냈어요",
                body: "JukeboxPlayerState와 확장 렌더 props에서 shuffle · toggleShuffle · repeat · cycleRepeat를 전부 제거했습니다. 내장 컨트롤을 쓰고 있었다면, 이제 앱에서 상태를 직접 관리하고 currentIndex로 제어해 주세요.",
              },
              {
                title: "RepeatMode 타입은 더 이상 export 되지 않아요",
                body: "공개 API에서 빠졌으니 타입 import를 제거해 주세요.",
              },
              {
                title: "JukeboxExpandedRenderProps의 Omit 제거",
                body: "커스텀 확장 렌더러를 쓰고 있다면 shuffle · toggleShuffle · repeat · cycleRepeat 참조만 지우면 됩니다.",
              },
              {
                title: "내부 모듈 구조를 갈아엎었어요",
                body: "컴포넌트는 src/domains/<feature>/components/* 로, 공유 타입은 src/lib/types.ts 로 옮기면서 기존 src/lib/shared.ts 배럴 파일은 삭제했습니다. 반드시 패키지 엔트리(react-youtube-jukebox)에서만 import 해 주세요. 내부 경로를 직접 import 하던 코드는 더 이상 동작하지 않습니다.",
              },
            ],
          },
          added: {
            heading: "새로 추가",
            entries: [
              {
                title: "onError 콜백",
                body: "Jukebox, PlayList, useJukebox, usePlayList에서 YouTube 플레이어 에러를 onError 콜백으로 받아볼 수 있습니다.",
              },
              {
                title: "PlayList의 accentColor prop",
                body: "전체 팔레트를 덮어쓰지 않고도 현재 재생 중인 트랙의 강조 색상만 바꿀 수 있어요.",
              },
              {
                title: "ProgressSlider · VolumeSlider 단독 노출",
                body: "기본 플레이어 UI에 묻혀 있던 진행 슬라이더와 볼륨 슬라이더를 독립 컴포넌트로 꺼내 가져다 쓸 수 있습니다.",
              },
              {
                title: "책임 단위로 쪼갠 훅",
                body: "키보드 단축키는 useJukeboxKeyboardShortcuts로, YouTube IFrame 라이프사이클은 useYouTubePlayerLifecycle로 분리했습니다.",
              },
              {
                title: "플레이리스트 레이아웃 구성 요소",
                body: "PlayListHeader, PlayListMiniBar, PlayListNav, PlayListTabs, PlayListSectionsCommon이 덩치 큰 기존 sections 컴포넌트를 대체합니다.",
              },
            ],
          },
          changed: {
            heading: "변경 · 개선",
            entries: [
              {
                title: "기능/도메인 기준으로 디렉터리 정리",
                body: "소스를 src/domains/jukebox/*, src/domains/playlist/* 아래로 모아 한 기능에 필요한 파일이 한곳에 있습니다.",
              },
              {
                title: "useJukeboxPlayer 책임 분리",
                body: "YouTube IFrame 라이프사이클을 useYouTubePlayerLifecycle로 빼내면서 useJukeboxPlayer가 훨씬 가벼워졌습니다.",
              },
              {
                title: "PlayListTrackList가 TrackRow 사용",
                body: "트랙 한 줄을 TrackRow 컴포넌트로 분리해, 작은 업데이트에서 리스트 전체가 리렌더되던 문제를 줄였습니다.",
              },
              {
                title: "플레이리스트 전환 시 스크롤 리셋",
                body: "다른 플레이리스트로 바꾸면 이전 리스트의 스크롤 위치를 물려받지 않고 맨 위부터 다시 보여줘요.",
              },
            ],
          },
          removed: {
            heading: "제거",
            entries: [
              {
                title: "레거시 PlayListSections.tsx",
                body: "PlayListSectionsCommon과 새 레이아웃 컴포넌트로 대체했습니다.",
              },
              {
                title: "src/lib/shared.ts",
                body: "내부 배럴 파일만 제거했고, 공개 API는 지금처럼 패키지 엔트리에서 그대로 export 됩니다.",
              },
            ],
          },
        },
      },
    ],
  },
};

export function getChangelogCopy(locale: DocsLocale): ChangelogCopy {
  return CHANGELOG_COPY[locale];
}

export type { ChangelogCopy, ChangelogRelease, ChangelogSection };
