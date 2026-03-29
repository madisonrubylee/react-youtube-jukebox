"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LocaleSwitcher } from "./locale-switcher";
import {
  getDocsCopy,
  getTopNavigation,
  type DocsLocale,
} from "../lib/i18n";

type SiteHeaderProps = {
  locale: DocsLocale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const copy = getDocsCopy(locale);
  const navigationItems = getTopNavigation(locale);
  const localeOptions = [
    {
      ariaLabel: copy.header.localeOptions.en,
      label: "EN",
      value: "en" as const,
    },
    {
      ariaLabel: copy.header.localeOptions.ko,
      label: "KO",
      value: "ko" as const,
    },
  ];

  return (
    <header className="docs-header">
      <Link href="/" className="docs-brand" aria-label={copy.header.homeAriaLabel}>
        <svg
          className="docs-brand__icon"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="120" height="120" rx="32" fill="#0F1115" />
          <rect x="24" y="24" width="80" height="14" rx="7" fill="#F3F4F6" />
          <circle cx="44" cy="76" r="20" fill="#F3F4F6" />
          <path d="M39 66V86L55 76L39 66Z" fill="#0F1115" />
          <rect x="72" y="59" width="6" height="34" rx="3" fill="#F3F4F6" />
          <rect x="84" y="51" width="6" height="50" rx="3" fill="#F3F4F6" />
          <rect x="96" y="63" width="6" height="26" rx="3" fill="#F3F4F6" />
        </svg>
        <span>react-youtube-jukebox</span>
      </Link>
      <nav className="docs-nav" aria-label={copy.header.navigationAriaLabel}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`docs-nav__link${isActive ? " docs-nav__link--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="docs-header__actions">
        <div className="docs-search" aria-hidden="true">
          <span>{copy.header.searchPlaceholder}</span>
          <code>⌘ K</code>
        </div>
        <LocaleSwitcher
          label={copy.header.localeButtonLabel}
          locale={locale}
          options={localeOptions}
        />
      </div>
    </header>
  );
}
