export const DOCS_LOCALES = ["en", "ko"] as const;

export type DocsLocale = (typeof DOCS_LOCALES)[number];
export type LocalizedText = Record<DocsLocale, string>;

export const DEFAULT_DOCS_LOCALE: DocsLocale = "en";
export const DOCS_LOCALE_COOKIE_NAME = "docs-locale";

export function isDocsLocale(value: string | undefined): value is DocsLocale {
  return value === "en" || value === "ko";
}
