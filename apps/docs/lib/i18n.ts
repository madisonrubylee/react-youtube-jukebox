export const DOCS_LOCALES = ["en", "ko"] as const;

export type DocsLocale = (typeof DOCS_LOCALES)[number];

type LocalizedText = Record<DocsLocale, string>;

type NavigationDefinition = {
  href: string;
  label: LocalizedText;
};

type SidebarSectionDefinition = {
  items: NavigationDefinition[];
  title: LocalizedText;
};

export const DEFAULT_DOCS_LOCALE: DocsLocale = "en";
export const DOCS_LOCALE_COOKIE_NAME = "docs-locale";

const topNavigationDefinitions: NavigationDefinition[] = [
  {
    href: "/",
    label: { en: "Home", ko: "홈" },
  },
  {
    href: "/installation",
    label: { en: "Installation", ko: "설치" },
  },
  {
    href: "/quick-start",
    label: { en: "Quick Start", ko: "빠른 시작" },
  },
  {
    href: "/api-playground",
    label: { en: "API & Playground", ko: "API & 플레이그라운드" },
  },
  {
    href: "/examples",
    label: { en: "Examples", ko: "예제" },
  },
];

const sidebarSectionDefinitions: SidebarSectionDefinition[] = [
  {
    title: { en: "Getting Started", ko: "시작하기" },
    items: [
      { href: "/", label: { en: "Overview", ko: "개요" } },
      { href: "/installation", label: { en: "Installation", ko: "설치" } },
      { href: "/quick-start", label: { en: "Quick Start", ko: "빠른 시작" } },
    ],
  },
  {
    title: { en: "Reference", ko: "레퍼런스" },
    items: [
      {
        href: "/api-playground",
        label: { en: "Jukebox API", ko: "Jukebox API" },
      },
      { href: "/examples", label: { en: "Examples", ko: "예제" } },
    ],
  },
];

const docsCopy = {
  en: {
    metadataDescription: "Docs for the react-youtube-jukebox package.",
    header: {
      homeAriaLabel: "react-youtube-jukebox home",
      localeButtonLabel: "Language",
      localeOptions: {
        en: "English",
        ko: "Korean",
      },
      navigationAriaLabel: "Primary",
      searchPlaceholder: "Search documentation...",
    },
    sidebar: {
      ariaLabel: "Sidebar",
    },
    docsPage: {
      breadcrumbAriaLabel: "Breadcrumb",
      tocAriaLabel: "On this page",
      tocTitle: "On This Page",
    },
    home: {
      actions: {
        browseExamples: "Browse Examples",
        getStarted: "Get Started",
      },
      breadcrumbs: ["Home"],
      chips: [
        "11.5 KB gzip core",
        "Portal by default",
        "Custom expanded panel",
      ],
      eyebrow: "Floating player for React apps",
      features: [
        {
          body: "Start compact, expand on demand, and keep playback controls close to the viewport edge instead of inside page content.",
          title: "Dock-first interaction",
        },
        {
          body: "Keep React as a peer dependency, ship a small core bundle, and load the YouTube iframe API only when the player mounts.",
          title: "Small core, lazy-loaded player",
        },
        {
          body: 'Use "renderExpandedContent" when the built-in player shell is not enough and you need a custom layout around the same controls.',
          title: "Replace the expanded panel",
        },
      ],
      highlightsTitle: "Highlights",
      journey: {
        steps: [
          {
            body: "Add the package and stylesheet entry once.",
            href: "/installation",
            title: "Install the package",
          },
          {
            body: "Drop in tracks and mount the default player.",
            href: "/quick-start",
            title: "Render your first jukebox",
          },
          {
            body: "Compare themes, chrome, and custom expansions.",
            href: "/examples",
            title: "Explore presets and layouts",
          },
        ],
        subtitle: "Fastest route through the docs",
        title: "Start here",
      },
      lead: "Ship a YouTube jukebox that feels like product UI, not an embedded iframe afterthought. The package keeps the API small, the core bundle light, and the YouTube player script out of the critical path until the component mounts.",
      metrics: [
        { label: "Core bundle", value: "11.5 KB" },
        { label: "Main export", value: "1" },
        { label: "Edge presets", value: "6" },
      ],
      signalCard: {
        badge: "core package",
        body: "A focused package with one main export, automatic styles, and a small core bundle. React stays external, and the YouTube iframe API loads on demand.",
      },
      toc: [
        { href: "#overview", label: "Overview" },
        { href: "#highlights", label: "Highlights" },
      ],
    },
    installation: {
      body: {
        nextSteps: "Continue to Quick Start for the minimal setup, or open API & Playground to inspect the available props and render hooks.",
        package: 'Install the published package and keep "react" / "react-dom" in your app. The docs app lives in this monorepo, but consumers only install the package below.',
        styles: "The package injects its default stylesheet automatically when you import the component.",
        theme: 'The default theme is "glass". You can switch UI presets with "theme" and "chrome" without changing the core playback flow.',
      },
      breadcrumbs: ["Docs", "Installation"],
      sections: {
        nextSteps: "Next Steps",
        styles: "Styles",
      },
      title: "Installation",
      toc: [
        { href: "#package", label: "Package" },
        { href: "#styles", label: "Styles" },
        { href: "#next-steps", label: "Next Steps" },
      ],
    },
    quickStart: {
      body: {
        positioning: 'Default behavior is a viewport portal render. Use "position" to pin the jukebox to one of the available edge presets.',
        portal: 'Use "portal={false}" only when you want inline rendering inside a positioned container.',
        usage: 'By default the first track starts automatically in a muted state. Pass "autoplay={false}" when you want manual playback.',
      },
      breadcrumbs: ["Docs", "Quick Start"],
      sections: {
        positioning: "Positioning",
        usage: "Usage",
      },
      title: "Quick Start",
      toc: [
        { href: "#usage", label: "Usage" },
        { href: "#positioning", label: "Positioning" },
      ],
    },
    apiPlayground: {
      body: {
        interface: "The public API stays intentionally small in v1. Consumers pass track metadata plus a few playback and positioning props.",
        playground: "The live preview below renders inline for docs only. The package default remains portal rendering on the viewport, and you can switch themes and chrome presets here to compare the available combinations.",
      },
      breadcrumbs: ["Docs", "API & Playground"],
      sections: {
        playground: "Playground",
        props: "Props",
      },
      table: {
        headers: {
          notes: "Notes",
          prop: "Prop",
          type: "Type",
        },
        rows: {
          autoplay: 'Defaults to "true" and starts muted on first load.',
          chrome: 'Optional. Switches shell and control styling. Defaults to "classic".',
          className: "Root-level hook for limited customization in v1.",
          offset: "Applies spacing from the chosen edge preset.",
          portal: 'Defaults to "true". Inline mode is opt-in.',
          position: "Controls top/bottom placement and supports left, right, or center alignment.",
          theme: 'Optional. Defaults to "glass".',
          tracks: "Required. Empty and single-track cases are handled safely.",
        },
      },
      title: "API & Playground",
      toc: [
        { href: "#interface", label: "Interface" },
        { href: "#props", label: "Props" },
        { href: "#playground", label: "Playground" },
      ],
    },
    examples: {
      body: {
        chrome: 'The package currently exposes only the rebuilt "classic" chrome while the other presets are being reworked.',
        customExpanded: 'Keep the dock and player state from the library, but render your own expanded layout with "renderExpandedContent".',
        default: "The package default is a floating portal render. Inside docs we keep previews inline so they stay inside the page layout, but the API example below is the real default usage.",
        emptyTracks: "Passing an empty array is safe. The component renders a fallback dock instead of throwing and keeps playback controls disabled.",
        positions: 'Use "position" to pin the jukebox to any edge of the viewport. On mobile, prefer "bottom-center" or "top-center" so the dock stays aligned to the narrow screen. "offset" lets you nudge it from the chosen edge.',
        themes: 'Use "theme" when the default glass chrome does not match the page. If omitted, the component keeps the current default theme.',
      },
      breadcrumbs: ["Docs", "Examples"],
      sections: {
        chrome: "Chrome Presets",
        customExpanded: "Custom Expanded",
        emptyTracks: "Empty Tracks",
        positions: "Position Presets",
        singleTrack: "Single Track",
        themes: "Themes",
      },
      singleTrack: [
        "Pass a one-item array when you only need a single song.",
        "Previous and next controls are disabled automatically.",
        "Playback, mute, expand, and volume control still work normally.",
      ],
      title: "Examples",
      toc: [
        { href: "#default", label: "Default" },
        { href: "#themes", label: "Themes" },
        { href: "#chrome", label: "Chrome Presets" },
        { href: "#positions", label: "Position Presets" },
        { href: "#custom-expanded", label: "Custom Expanded" },
        { href: "#single-track", label: "Single Track" },
        { href: "#empty-tracks", label: "Empty Tracks" },
      ],
    },
    livePreview: {
      chromeLabel: "Chrome",
      themeLabel: "Theme",
    },
    showcase: {
      cards: {
        bottom: {
          description: "Current theme applied to the default compact dock.",
          mobileDescription: "Mobile preview stays centered on the bottom edge.",
          mobileTitle: "Bottom",
          title: "Bottom Left",
        },
        customExpanded: {
          description: "The dock stays the same while the expanded panel is rendered by your app.",
          title: "Custom Expanded",
        },
        emptyTracks: {
          description: "Fallback state renders safely instead of crashing.",
          title: "Empty Tracks",
        },
        singleTrack: {
          description: "Previous and next controls stay disabled with one track.",
          title: "Single Track",
        },
        top: {
          description: "Same component, pinned to the opposite corner.",
          mobileDescription: "Mobile preview stays centered on the top edge.",
          mobileTitle: "Top",
          title: "Top Right",
        },
      },
      customExpanded: {
        eyebrow: "Custom expanded",
        mute: "Mute",
        next: "Next",
        nextTrackPrefix: "Next",
        pause: "Pause",
        play: "Play",
        prev: "Prev",
        unknownArtist: "Unknown artist",
        unmute: "Unmute",
        volume: "Volume",
      },
      description: "Current default. Soft glass, blur, and floating chrome. Current default chrome. Floating glass dock with soft curves.",
      labels: {
        chrome: "Chrome",
        theme: "Theme",
      },
    },
  },
  ko: {
    metadataDescription: "react-youtube-jukebox 패키지 문서입니다.",
    header: {
      homeAriaLabel: "react-youtube-jukebox 홈",
      localeButtonLabel: "언어",
      localeOptions: {
        en: "영어",
        ko: "한국어",
      },
      navigationAriaLabel: "주요 메뉴",
      searchPlaceholder: "문서 검색...",
    },
    sidebar: {
      ariaLabel: "사이드바",
    },
    docsPage: {
      breadcrumbAriaLabel: "현재 위치",
      tocAriaLabel: "이 페이지에서",
      tocTitle: "이 페이지에서",
    },
    home: {
      actions: {
        browseExamples: "예제 보기",
        getStarted: "시작하기",
      },
      breadcrumbs: ["홈"],
      chips: [
        "11.5 KB gzip 코어",
        "기본 포털 렌더링",
        "확장 패널 커스텀 가능",
      ],
      eyebrow: "React 앱을 위한 플로팅 플레이어",
      features: [
        {
          body: "처음에는 컴팩트한 독으로 시작하고 필요할 때만 확장할 수 있습니다. 재생 컨트롤도 페이지 본문 안이 아니라 화면 가장자리 가까이에 유지됩니다.",
          title: "독 중심 인터랙션",
        },
        {
          body: "React는 peer dependency로 유지하고, 코어 번들은 가볍게 가져가며, YouTube iframe API는 플레이어가 마운트될 때만 불러옵니다.",
          title: "가벼운 코어, 지연 로드 플레이어",
        },
        {
          body: "기본 확장 플레이어 UI가 부족할 때는 renderExpandedContent로 같은 컨트롤 상태를 유지한 채 원하는 레이아웃을 직접 렌더할 수 있습니다.",
          title: "확장 패널 교체",
        },
      ],
      highlightsTitle: "핵심 포인트",
      journey: {
        steps: [
          {
            body: "패키지와 스타일 엔트리만 한 번 추가하면 됩니다.",
            href: "/installation",
            title: "패키지 설치",
          },
          {
            body: "트랙 배열을 넘기고 기본 플레이어를 마운트하세요.",
            href: "/quick-start",
            title: "첫 Jukebox 렌더링",
          },
          {
            body: "테마, 크롬, 커스텀 확장 레이아웃을 비교해보세요.",
            href: "/examples",
            title: "프리셋과 레이아웃 살펴보기",
          },
        ],
        subtitle: "문서를 가장 빠르게 훑는 순서",
        title: "여기서 시작하세요",
      },
      lead: "페이지 흐름에 자연스럽게 어우러지는 YouTube jukebox를 빠르게 추가할 수 있습니다. API는 작게 유지하고, 코어 번들은 가볍게 가져가며, YouTube 플레이어 스크립트는 컴포넌트가 마운트될 때까지 크리티컬 패스 밖에 둡니다.",
      metrics: [
        { label: "코어 번들", value: "11.5 KB" },
        { label: "메인 export", value: "1" },
        { label: "엣지 프리셋", value: "6" },
      ],
      signalCard: {
        badge: "core package",
        body: "메인 export 하나와 자동 스타일 주입에 집중한 패키지입니다. 코어 번들은 작게 유지하고, React는 외부에 두며, YouTube iframe API는 필요할 때만 로드합니다.",
      },
      toc: [
        { href: "#overview", label: "개요" },
        { href: "#highlights", label: "핵심 포인트" },
      ],
    },
    installation: {
      body: {
        nextSteps: "가장 간단한 설정은 빠른 시작에서 확인할 수 있고, 사용 가능한 props와 렌더 훅은 API & Playground에서 바로 살펴볼 수 있습니다.",
        package: '배포된 패키지를 설치하고 앱에는 "react" / "react-dom"을 유지하세요. docs 앱은 이 monorepo 안에 있지만, 실제 사용자는 아래 패키지만 설치하면 됩니다.',
        styles: "컴포넌트를 import하면 기본 스타일시트가 자동으로 주입됩니다.",
        theme: '기본 테마는 "glass"입니다. theme와 chrome prop으로 핵심 재생 흐름은 유지한 채 UI 프리셋만 바꿀 수 있습니다.',
      },
      breadcrumbs: ["문서", "설치"],
      sections: {
        nextSteps: "다음 단계",
        styles: "스타일",
      },
      title: "설치",
      toc: [
        { href: "#package", label: "패키지" },
        { href: "#styles", label: "스타일" },
        { href: "#next-steps", label: "다음 단계" },
      ],
    },
    quickStart: {
      body: {
        positioning: "기본 동작은 뷰포트 기준 포털 렌더링입니다. position으로 jukebox를 원하는 엣지 프리셋 위치에 고정할 수 있습니다.",
        portal: '위치가 잡힌 컨테이너 안에서 인라인으로 렌더해야 할 때만 "portal={false}"를 사용하세요.',
        usage: '기본값에서는 첫 번째 트랙이 음소거 상태로 자동 재생됩니다. 수동 재생으로 시작하고 싶다면 "autoplay={false}"를 넘기면 됩니다.',
      },
      breadcrumbs: ["문서", "빠른 시작"],
      sections: {
        positioning: "위치 지정",
        usage: "사용법",
      },
      title: "빠른 시작",
      toc: [
        { href: "#usage", label: "사용법" },
        { href: "#positioning", label: "위치 지정" },
      ],
    },
    apiPlayground: {
      body: {
        interface: "v1 공개 API는 의도적으로 작게 유지하고 있습니다. 사용자는 트랙 메타데이터와 재생/위치 관련 prop 몇 가지만 넘기면 됩니다.",
        playground: "아래 라이브 프리뷰는 문서 안에서만 인라인으로 렌더됩니다. 실제 패키지 기본값은 뷰포트 기준 포털 렌더링이며, 여기서는 테마와 크롬 프리셋을 바꿔가며 조합을 비교할 수 있습니다.",
      },
      breadcrumbs: ["문서", "API & 플레이그라운드"],
      sections: {
        playground: "플레이그라운드",
        props: "Props",
      },
      table: {
        headers: {
          notes: "설명",
          prop: "Prop",
          type: "타입",
        },
        rows: {
          autoplay: '기본값은 "true"이며, 첫 로드 시 음소거 상태로 시작합니다.',
          chrome: '선택값입니다. 플레이어 외형과 컨트롤 스타일을 바꿉니다. 기본값은 "classic"입니다.',
          className: "v1 기준으로 루트 레벨 커스터마이징에 사용할 수 있는 hook입니다.",
          offset: "선택한 엣지 프리셋으로부터의 간격을 적용합니다.",
          portal: '기본값은 "true"입니다. 인라인 모드는 opt-in입니다.',
          position: "상단/하단 배치와 좌/우/중앙 정렬을 제어합니다.",
          theme: '선택값이며 기본값은 "glass"입니다.',
          tracks: "필수값입니다. 빈 배열이나 단일 트랙도 안전하게 처리됩니다.",
        },
      },
      title: "API & 플레이그라운드",
      toc: [
        { href: "#interface", label: "인터페이스" },
        { href: "#props", label: "Props" },
        { href: "#playground", label: "플레이그라운드" },
      ],
    },
    examples: {
      body: {
        chrome: '현재 패키지에서 실제로 노출되는 크롬은 재구성한 "classic" 하나이며, 다른 프리셋은 다시 손보는 중입니다.',
        customExpanded: "라이브러리가 제공하는 독과 플레이어 상태는 그대로 쓰고, renderExpandedContent로 확장 레이아웃만 직접 렌더할 수 있습니다.",
        default: "패키지 기본값은 포털 기반 플로팅 렌더링입니다. 문서에서는 레이아웃 안에 프리뷰를 유지하기 위해 인라인으로 보여주지만, 아래 API 예시는 실제 기본 사용 방식 그대로입니다.",
        emptyTracks: "빈 배열을 넘겨도 안전합니다. 에러를 던지지 않고 fallback 독을 렌더하며, 재생 컨트롤은 비활성화된 상태로 유지됩니다.",
        positions: 'position으로 jukebox를 뷰포트의 원하는 가장자리에 고정할 수 있습니다. 모바일에서는 독이 좁은 화면 폭에 맞춰지도록 "bottom-center"나 "top-center"를 권장합니다. offset으로는 기준 가장자리에서의 간격을 조정할 수 있습니다.',
        themes: "기본 glass 크롬이 페이지와 어울리지 않을 때는 theme를 사용하세요. 지정하지 않으면 현재 기본 테마가 유지됩니다.",
      },
      breadcrumbs: ["문서", "예제"],
      sections: {
        chrome: "크롬 프리셋",
        customExpanded: "커스텀 확장 패널",
        emptyTracks: "빈 트랙",
        positions: "위치 프리셋",
        singleTrack: "단일 트랙",
        themes: "테마",
      },
      singleTrack: [
        "한 곡만 필요하다면 원소 하나짜리 배열을 넘기면 됩니다.",
        "이전 / 다음 컨트롤은 자동으로 비활성화됩니다.",
        "재생, 음소거, 확장, 볼륨 조절은 그대로 정상 동작합니다.",
      ],
      title: "예제",
      toc: [
        { href: "#default", label: "기본" },
        { href: "#themes", label: "테마" },
        { href: "#chrome", label: "크롬 프리셋" },
        { href: "#positions", label: "위치 프리셋" },
        { href: "#custom-expanded", label: "커스텀 확장 패널" },
        { href: "#single-track", label: "단일 트랙" },
        { href: "#empty-tracks", label: "빈 트랙" },
      ],
    },
    livePreview: {
      chromeLabel: "크롬",
      themeLabel: "테마",
    },
    showcase: {
      cards: {
        bottom: {
          description: "현재 테마를 기본 컴팩트 독에 적용한 상태입니다.",
          mobileDescription: "모바일 프리뷰에서는 하단 중앙에 맞춰집니다.",
          mobileTitle: "하단",
          title: "좌하단",
        },
        customExpanded: {
          description: "독은 그대로 유지하고, 확장 패널만 앱에서 직접 렌더합니다.",
          title: "커스텀 확장 패널",
        },
        emptyTracks: {
          description: "에러 없이 안전하게 fallback 상태를 렌더합니다.",
          title: "빈 트랙",
        },
        singleTrack: {
          description: "트랙이 하나면 이전 / 다음 컨트롤이 비활성화됩니다.",
          title: "단일 트랙",
        },
        top: {
          description: "같은 컴포넌트를 반대쪽 코너에 고정한 예시입니다.",
          mobileDescription: "모바일 프리뷰에서는 상단 중앙에 맞춰집니다.",
          mobileTitle: "상단",
          title: "우상단",
        },
      },
      customExpanded: {
        eyebrow: "커스텀 확장",
        mute: "음소거",
        next: "다음",
        nextTrackPrefix: "다음",
        pause: "일시정지",
        play: "재생",
        prev: "이전",
        unknownArtist: "아티스트 정보 없음",
        unmute: "음소거 해제",
        volume: "볼륨",
      },
      description: "현재 기본값입니다. 부드러운 글래스 질감, 블러, 플로팅 크롬 스타일을 제공합니다. 기본 크롬 역시 둥근 유리 독 형태입니다.",
      labels: {
        chrome: "크롬",
        theme: "테마",
      },
    },
  },
} as const;

export function isDocsLocale(value: string | undefined): value is DocsLocale {
  return value === "en" || value === "ko";
}

export function getDocsCopy(locale: DocsLocale) {
  return docsCopy[locale];
}

export function getTopNavigation(locale: DocsLocale) {
  return topNavigationDefinitions.map((item) => ({
    href: item.href,
    label: item.label[locale],
  }));
}

export function getSidebarSections(locale: DocsLocale) {
  return sidebarSectionDefinitions.map((section) => ({
    items: section.items.map((item) => ({
      href: item.href,
      label: item.label[locale],
    })),
    title: section.title[locale],
  }));
}
