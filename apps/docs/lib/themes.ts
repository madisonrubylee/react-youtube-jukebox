import type {
  JukeboxChrome,
  JukeboxTheme,
} from "@react-youtube-jukebox/core";

import type { DocsLocale } from "./i18n";

type JukeboxThemeOption = {
  description: string;
  label: string;
  value: JukeboxTheme;
};

type JukeboxChromeOption = {
  description: string;
  label: string;
  value: JukeboxChrome;
};

type LocalizedOptionText = Record<DocsLocale, string>;

type JukeboxThemeOptionDefinition = {
  description: LocalizedOptionText;
  label: LocalizedOptionText;
  value: JukeboxTheme;
};

type JukeboxChromeOptionDefinition = {
  description: LocalizedOptionText;
  label: LocalizedOptionText;
  value: JukeboxChrome;
};

export const DEFAULT_JUKEBOX_THEME: JukeboxTheme = "glass";
export const DEFAULT_JUKEBOX_CHROME: JukeboxChrome = "classic";

const jukeboxThemeOptionDefinitions: JukeboxThemeOptionDefinition[] = [
  {
    value: "glass",
    label: {
      en: "Glass",
      ko: "Glass",
    },
    description: {
      en: "Current default. Soft glass, blur, and floating chrome.",
      ko: "현재 기본값입니다. 부드러운 글래스 질감과 블러, 플로팅 스타일이 특징입니다.",
    },
  },
  {
    value: "simple",
    label: {
      en: "Simple",
      ko: "Simple",
    },
    description: {
      en: "Minimal neutral surface for calmer product UI.",
      ko: "조용하고 차분한 제품 UI에 어울리는 미니멀한 중성 톤입니다.",
    },
  },
  {
    value: "sunset",
    label: {
      en: "Sunset",
      ko: "Sunset",
    },
    description: {
      en: "Warm gradient theme for louder, more playful embeds.",
      ko: "더 경쾌하고 존재감 있는 임베드에 어울리는 따뜻한 그라디언트 테마입니다.",
    },
  },
  {
    value: "ride",
    label: {
      en: "Ride",
      ko: "Ride",
    },
    description: {
      en: "The previous ride palette, now available as a reusable theme.",
      ko: "기존 ride 팔레트를 재사용 가능한 테마로 정리한 옵션입니다.",
    },
  },
];

const jukeboxChromeOptionDefinitions: JukeboxChromeOptionDefinition[] = [
  {
    value: "classic",
    label: {
      en: "Classic",
      ko: "Classic",
    },
    description: {
      en: "Current default chrome. Floating glass dock with soft curves.",
      ko: "현재 기본 크롬입니다. 부드러운 곡선의 플로팅 글래스 독 스타일입니다.",
    },
  },
];

export function getJukeboxThemeOptions(locale: DocsLocale): JukeboxThemeOption[] {
  return jukeboxThemeOptionDefinitions.map((option) => ({
    description: option.description[locale],
    label: option.label[locale],
    value: option.value,
  }));
}

export function getJukeboxChromeOptions(
  locale: DocsLocale,
): JukeboxChromeOption[] {
  return jukeboxChromeOptionDefinitions.map((option) => ({
    description: option.description[locale],
    label: option.label[locale],
    value: option.value,
  }));
}
