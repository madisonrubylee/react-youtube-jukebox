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
  {
    href: "/playlist",
    label: { en: "PlayList", ko: "플레이리스트" },
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
    title: { en: "Jukebox", ko: "Jukebox" },
    items: [
      {
        href: "/api-playground",
        label: { en: "API & Playground", ko: "API & 플레이그라운드" },
      },
      { href: "/examples", label: { en: "Examples", ko: "예제" } },
    ],
  },
  {
    title: { en: "PlayList", ko: "PlayList" },
    items: [
      {
        href: "/playlist",
        label: { en: "API & Playground", ko: "API & 플레이그라운드" },
      },
      {
        href: "/playlist-examples",
        label: { en: "Examples", ko: "예제" },
      },
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
      searchDialogTitle: "Search documentation",
      searchInputPlaceholder: "Type to search...",
      searchNoResults: "No results found.",
      searchClose: "Close",
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
          {
            body: "Group tracks into tabbed playlists with built-in playback.",
            href: "/playlist",
            title: "Build a playlist",
          },
        ],
        subtitle: "Fastest route through the docs",
        title: "Start here",
      },
      lead: "A YouTube jukebox that feels like product UI. Small API, light bundle, and lazy-loaded player.",
      metrics: [
        { label: "Core bundle", value: "11.5 KB" },
        { label: "Main exports", value: "2" },
        { label: "Edge presets", value: "6" },
      ],
      signalCard: {
        badge: "core package",
        body: "Two main exports — Jukebox for floating playback and PlayList for inline panels — with automatic styles and a small core bundle. React stays external, and the YouTube iframe API loads on demand.",
      },
      toc: [
        { href: "#overview", label: "Overview" },
        { href: "#components", label: "Two Ways to Play" },
        { href: "#highlights", label: "Highlights" },
      ],
      components: {
        title: "Two Ways to Play",
        jukebox: {
          title: "Jukebox",
          body: "A floating player fixed to the viewport edge. Stays compact by default, expands on demand, and follows the user across page navigation.",
          linkLabel: "Jukebox API",
        },
        playlist: {
          title: "PlayList",
          body: "An inline music panel that lives inside your page layout. Grouped tabs, cover art, and a built-in player — no portal, no overlay.",
          linkLabel: "PlayList API",
        },
      },
    },
    installation: {
      body: {
        nextSteps:
          "Continue to Quick Start for the minimal setup, or open API & Playground to inspect the available props and render hooks.",
        package:
          'Install the published package and keep "react" / "react-dom" in your app. The docs app lives in this monorepo, but consumers only install the package below.',
        styles:
          "The package injects its default stylesheet automatically when you import the component.",
        theme:
          'The default theme is "glass". You can switch UI presets with "theme" and "chrome" without changing the core playback flow.',
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
        positioning:
          'Default behavior is a viewport portal render. Use "position" to pin the jukebox to one of the available edge presets.',
        portal:
          'Use "portal={false}" only when you want inline rendering inside a positioned container.',
        usage:
          'By default the first track starts automatically in a muted state. Pass "autoplay={false}" when you want manual playback.',
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
        interface:
          "The public API stays intentionally small in v1. Consumers pass track metadata plus a few playback and positioning props.",
        playground:
          "The live preview below renders inline for docs only. The package default remains portal rendering on the viewport, and you can switch themes and chrome presets here to compare the available combinations.",
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
          chrome:
            'Optional. Switches shell and control styling. Defaults to "classic".',
          className: "Root-level hook for limited customization in v1.",
          offset: "Applies spacing from the chosen edge preset.",
          portal: 'Defaults to "true". Inline mode is opt-in.',
          position:
            "Controls top/bottom placement and supports left, right, or center alignment.",
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
        chrome:
          'The package currently exposes only the rebuilt "classic" chrome while the other presets are being reworked.',
        customExpanded:
          'Keep the dock and player state from the library, but render your own expanded layout with "renderExpandedContent".',
        default:
          "The package default is a floating portal render. Inside docs we keep previews inline so they stay inside the page layout, but the API example below is the real default usage.",
        emptyTracks:
          "Passing an empty array is safe. The component renders a fallback dock instead of throwing and keeps playback controls disabled.",
        positions:
          'Use "position" to pin the jukebox to any edge of the viewport. On mobile, prefer "bottom-center" or "top-center" so the dock stays aligned to the narrow screen. "offset" lets you nudge it from the chosen edge.',
        themes:
          'Use "theme" when the default glass chrome does not match the page. If omitted, the component keeps the current default theme.',
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
    playlist: {
      breadcrumbs: ["Docs", "PlayList", "API & Playground"],
      title: "API & Playground",
      body: {
        interface:
          "The PlayList API stays intentionally focused. Pass grouped tracks by mood or category, then adjust autoplay, theme, or layout hooks without wiring Jukebox yourself.",
        playground:
          "The live preview below renders inline for docs only. Use it to compare the available light and dark themes while keeping the built-in tab navigation and player controls visible.",
      },
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
          autoplay:
            'Optional. Defaults to "false" and starts from the active tab\'s first track when enabled.',
          className:
            "Optional. Use it to attach layout classes for inline, fixed, or custom positioned rendering.",
          playlist:
            "Required. Each item becomes a tab with an optional cover image and its own track list.",
          theme: 'Optional. Supports "dark" and "light". Defaults to "dark".',
        },
      },
      toc: [
        { href: "#interface", label: "Interface" },
        { href: "#props", label: "Props" },
        { href: "#playground", label: "Playground" },
      ],
      showcase: {
        themeLabel: "Theme",
        sizeLabel: "Size",
      },
    },
    playlistExamples: {
      breadcrumbs: ["Docs", "PlayList", "Examples"],
      title: "Examples",
      body: {
        default:
          "Compare the most common PlayList setups below. Unlike Jukebox, PlayList always renders as an inline panel, so the examples focus on theme, tab count, and content states instead of viewport positions.",
        emptyTracks:
          "A playlist item can safely contain an empty data array. The list renders an empty message and playback controls stay disabled until real tracks are provided.",
        layout:
          "Use className when the panel needs to match your page layout. Sticky sidebars, dashboard columns, and custom spacing are all handled from your app styles.",
        singlePlaylist:
          "Pass a one-item playlist with a single track when you only need one song. The tab row stays hidden automatically and the previous / next controls are disabled, keeping a focused single-track view.",
        themes:
          'Use theme to switch between "dark" and "light" surfaces without changing the playlist structure or player behavior.',
        withoutImage:
          "The cover image is optional. When image is omitted, PlayList renders a built-in fallback header instead of leaving the header area empty.",
      },
      sections: {
        emptyTracks: "Empty Tracks",
        layout: "Layout",
        singlePlaylist: "Single Playlist",
        themes: "Themes",
        withoutImage: "Optional Cover Image",
      },
      showcase: {
        cards: {
          defaultDark: {
            description:
              "The default dark panel with multiple tabs and cover images.",
            title: "Default Dark",
          },
          emptyTracks: {
            description:
              "Empty track arrays render safely with disabled playback controls.",
            title: "Empty Tracks",
          },
          lightTheme: {
            description:
              "Same playlist structure with the lighter surface treatment.",
            title: "Light Theme",
          },
          singlePlaylist: {
            description:
              "One playlist with a single track hides the tab row and disables skip controls.",
            title: "Single Playlist",
          },
          withoutImage: {
            description:
              "The header falls back to the built-in gradient artwork when no cover image is passed.",
            title: "Without Cover Image",
          },
        },
      },
      toc: [
        { href: "#default", label: "Default" },
        { href: "#themes", label: "Themes" },
        { href: "#single-playlist", label: "Single Playlist" },
        { href: "#without-image", label: "Optional Cover Image" },
        { href: "#empty-tracks", label: "Empty Tracks" },
        { href: "#layout", label: "Layout" },
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
          mobileDescription:
            "Mobile preview stays centered on the bottom edge.",
          mobileTitle: "Bottom",
          title: "Bottom Left",
        },
        customExpanded: {
          description:
            "The dock stays the same while the expanded panel is rendered by your app.",
          title: "Custom Expanded",
        },
        emptyTracks: {
          description: "Fallback state renders safely instead of crashing.",
          title: "Empty Tracks",
        },
        singleTrack: {
          description:
            "Previous and next controls stay disabled with one track.",
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
      description:
        "Current default. Soft glass, blur, and floating chrome. Current default chrome. Floating glass dock with soft curves.",
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
      searchDialogTitle: "문서 검색",
      searchInputPlaceholder: "검색어를 입력하세요...",
      searchNoResults: "검색 결과가 없습니다.",
      searchClose: "닫기",
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
      chips: ["11.5 KB gzip 코어", "기본 포털 렌더링", "확장 패널 커스텀 가능"],
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
          {
            body: "트랙을 탭으로 묶고 내장 플레이어로 바로 재생할 수 있습니다.",
            href: "/playlist",
            title: "플레이리스트 만들기",
          },
        ],
        subtitle: "문서를 가장 빠르게 훑는 순서",
        title: "여기서 시작하세요",
      },
      lead: "제품 UI처럼 자연스러운 YouTube jukebox. 작은 API, 가벼운 번들, 지연 로드 플레이어.",
      metrics: [
        { label: "코어 번들", value: "11.5 KB" },
        { label: "메인 export", value: "2" },
        { label: "엣지 프리셋", value: "6" },
      ],
      signalCard: {
        badge: "core package",
        body: "플로팅 재생을 위한 Jukebox와 인라인 패널을 위한 PlayList, 두 가지 메인 export를 제공합니다. 자동 스타일 주입과 작은 코어 번들을 유지하며, React는 외부에 두고 YouTube iframe API는 필요할 때만 로드합니다.",
      },
      toc: [
        { href: "#overview", label: "개요" },
        { href: "#components", label: "두 가지 재생 방식" },
        { href: "#highlights", label: "핵심 포인트" },
      ],
      components: {
        title: "두 가지 재생 방식",
        jukebox: {
          title: "Jukebox",
          body: "뷰포트 가장자리에 고정되는 플로팅 플레이어입니다. 기본은 컴팩트 상태이고, 필요할 때 확장하며, 페이지 이동에도 유지됩니다.",
          linkLabel: "Jukebox API",
        },
        playlist: {
          title: "PlayList",
          body: "페이지 레이아웃 안에 임베드되는 인라인 음악 패널입니다. 탭 그룹, 커버 아트, 내장 플레이어를 제공하며 포털이나 오버레이 없이 동작합니다.",
          linkLabel: "PlayList API",
        },
      },
    },
    installation: {
      body: {
        nextSteps:
          "가장 간단한 설정은 빠른 시작에서 확인할 수 있고, 사용 가능한 props와 렌더 훅은 API & Playground에서 바로 살펴볼 수 있습니다.",
        package:
          '배포된 패키지를 설치하고 앱에는 "react" / "react-dom"을 유지하세요. docs 앱은 이 monorepo 안에 있지만, 실제 사용자는 아래 패키지만 설치하면 됩니다.',
        styles: "컴포넌트를 import하면 기본 스타일시트가 자동으로 주입됩니다.",
        theme:
          '기본 테마는 "glass"입니다. theme와 chrome prop으로 핵심 재생 흐름은 유지한 채 UI 프리셋만 바꿀 수 있습니다.',
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
        positioning:
          "기본 동작은 뷰포트 기준 포털 렌더링입니다. position으로 jukebox를 원하는 엣지 프리셋 위치에 고정할 수 있습니다.",
        portal:
          '위치가 잡힌 컨테이너 안에서 인라인으로 렌더해야 할 때만 "portal={false}"를 사용하세요.',
        usage:
          '기본값에서는 첫 번째 트랙이 음소거 상태로 자동 재생됩니다. 수동 재생으로 시작하고 싶다면 "autoplay={false}"를 넘기면 됩니다.',
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
        interface:
          "v1 공개 API는 의도적으로 작게 유지하고 있습니다. 사용자는 트랙 메타데이터와 재생/위치 관련 prop 몇 가지만 넘기면 됩니다.",
        playground:
          "아래 라이브 프리뷰는 문서 안에서만 인라인으로 렌더됩니다. 실제 패키지 기본값은 뷰포트 기준 포털 렌더링이며, 여기서는 테마와 크롬 프리셋을 바꿔가며 조합을 비교할 수 있습니다.",
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
          chrome:
            '선택값입니다. 플레이어 외형과 컨트롤 스타일을 바꿉니다. 기본값은 "classic"입니다.',
          className:
            "v1 기준으로 루트 레벨 커스터마이징에 사용할 수 있는 hook입니다.",
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
        chrome:
          '현재 패키지에서 실제로 노출되는 크롬은 재구성한 "classic" 하나이며, 다른 프리셋은 다시 손보는 중입니다.',
        customExpanded:
          "라이브러리가 제공하는 독과 플레이어 상태는 그대로 쓰고, renderExpandedContent로 확장 레이아웃만 직접 렌더할 수 있습니다.",
        default:
          "패키지 기본값은 포털 기반 플로팅 렌더링입니다. 문서에서는 레이아웃 안에 프리뷰를 유지하기 위해 인라인으로 보여주지만, 아래 API 예시는 실제 기본 사용 방식 그대로입니다.",
        emptyTracks:
          "빈 배열을 넘겨도 안전합니다. 에러를 던지지 않고 fallback 독을 렌더하며, 재생 컨트롤은 비활성화된 상태로 유지됩니다.",
        positions:
          'position으로 jukebox를 뷰포트의 원하는 가장자리에 고정할 수 있습니다. 모바일에서는 독이 좁은 화면 폭에 맞춰지도록 "bottom-center"나 "top-center"를 권장합니다. offset으로는 기준 가장자리에서의 간격을 조정할 수 있습니다.',
        themes:
          "기본 glass 크롬이 페이지와 어울리지 않을 때는 theme를 사용하세요. 지정하지 않으면 현재 기본 테마가 유지됩니다.",
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
    playlist: {
      breadcrumbs: ["문서", "플레이리스트", "API & 플레이그라운드"],
      title: "API & 플레이그라운드",
      body: {
        interface:
          "PlayList API도 의도적으로 단순하게 유지했습니다. 무드나 카테고리별로 묶은 트랙 배열을 넘기고, autoplay, theme, className 정도만 조정하면 자체 탭 네비게이션과 플레이어를 바로 사용할 수 있습니다.",
        playground:
          "아래 라이브 프리뷰는 문서 안에서만 인라인으로 렌더됩니다. light / dark 테마를 바꿔보면서 기본 탭 구조와 플레이어 UI를 함께 확인할 수 있습니다.",
      },
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
          autoplay:
            '선택값입니다. 기본값은 "false"이며, 활성 탭의 첫 트랙부터 재생을 시작합니다.',
          className:
            "선택값입니다. 인라인, fixed, absolute 등 원하는 레이아웃 클래스를 연결할 때 사용합니다.",
          playlist:
            "필수값입니다. 각 항목은 선택적 커버 이미지와 트랙 목록을 가진 탭으로 렌더됩니다.",
          theme:
            '선택값입니다. "dark"와 "light"를 지원하며 기본값은 "dark"입니다.',
        },
      },
      toc: [
        { href: "#interface", label: "인터페이스" },
        { href: "#props", label: "Props" },
        { href: "#playground", label: "플레이그라운드" },
      ],
      showcase: {
        themeLabel: "테마",
        sizeLabel: "크기",
      },
    },
    playlistExamples: {
      breadcrumbs: ["문서", "플레이리스트", "예제"],
      title: "예제",
      body: {
        default:
          "아래에서 PlayList의 대표적인 구성들을 한 번에 비교할 수 있습니다. Jukebox와 달리 PlayList는 항상 인라인 패널로 렌더되기 때문에, 이 예제들은 뷰포트 위치보다 테마, 탭 개수, 콘텐츠 상태 차이에 집중합니다.",
        emptyTracks:
          "플레이리스트 항목의 data 배열이 비어 있어도 안전합니다. 목록에는 빈 상태 메시지가 렌더되고, 실제 트랙이 들어오기 전까지 재생 컨트롤은 비활성화됩니다.",
        layout:
          "패널을 페이지 레이아웃에 맞추고 싶다면 className을 사용하세요. sticky 사이드바, 대시보드 컬럼, 커스텀 여백 같은 배치는 앱 스타일에서 제어하면 됩니다.",
        singlePlaylist:
          "트랙 하나짜리 플레이리스트만 넘기면 탭 행은 자동으로 숨겨지고, 이전 / 다음 컨트롤도 비활성화되어 한 곡에 집중하는 형태로 동작합니다.",
        themes:
          'theme로 "dark"와 "light"를 전환할 수 있습니다. 플레이리스트 구조나 플레이어 동작은 그대로 유지한 채 표면 스타일만 바뀝니다.',
        withoutImage:
          "커버 이미지는 선택값입니다. image 없이 넘기면 헤더 영역이 비어 있는 대신 기본 fallback 아트워크가 렌더됩니다.",
      },
      sections: {
        emptyTracks: "빈 트랙",
        layout: "레이아웃",
        singlePlaylist: "단일 플레이리스트",
        themes: "테마",
        withoutImage: "커버 이미지 선택값",
      },
      showcase: {
        cards: {
          defaultDark: {
            description:
              "여러 탭과 커버 이미지를 포함한 기본 다크 패널 구성입니다.",
            title: "기본 다크",
          },
          emptyTracks: {
            description:
              "빈 트랙 배열도 안전하게 렌더되며 재생 컨트롤은 비활성화됩니다.",
            title: "빈 트랙",
          },
          lightTheme: {
            description:
              "같은 플레이리스트 구조를 더 밝은 표면 스타일로 보여주는 예시입니다.",
            title: "라이트 테마",
          },
          singlePlaylist: {
            description:
              "트랙 한 곡 + 탭 하나면 탭 행이 사라지고 이전/다음 컨트롤도 비활성화됩니다.",
            title: "단일 플레이리스트",
          },
          withoutImage: {
            description:
              "커버 이미지가 없으면 기본 그라데이션 fallback 헤더가 렌더됩니다.",
            title: "커버 이미지 없음",
          },
        },
      },
      toc: [
        { href: "#default", label: "기본" },
        { href: "#themes", label: "테마" },
        { href: "#single-playlist", label: "단일 플레이리스트" },
        { href: "#without-image", label: "커버 이미지 선택값" },
        { href: "#empty-tracks", label: "빈 트랙" },
        { href: "#layout", label: "레이아웃" },
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
          description:
            "독은 그대로 유지하고, 확장 패널만 앱에서 직접 렌더합니다.",
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
      description:
        "현재 기본값입니다. 부드러운 글래스 질감, 블러, 플로팅 크롬 스타일을 제공합니다. 기본 크롬 역시 둥근 유리 독 형태입니다.",
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
