import type { DocsLocale, LocalizedText } from "./i18n-types";

type NavigationDefinition = {
  href: string;
  label: LocalizedText;
};

type SidebarSectionDefinition = {
  items: NavigationDefinition[];
  title: LocalizedText;
};

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
    href: "/headless-hooks",
    label: { en: "Headless Hooks", ko: "Headless Hooks" },
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
      { href: "/changelog", label: { en: "Changelog", ko: "변경 이력" } },
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
    title: { en: "Headless", ko: "Headless" },
    items: [
      {
        href: "/headless-hooks",
        label: { en: "Hooks", ko: "Hooks" },
      },
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
