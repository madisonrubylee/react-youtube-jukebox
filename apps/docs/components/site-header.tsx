"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LocaleSwitcher } from "./locale-switcher";
import { SearchDialog } from "./search-dialog";
import { getDocsCopy, getTopNavigation, type DocsLocale } from "../lib/i18n";

type SiteHeaderProps = {
  locale: DocsLocale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const copy = getDocsCopy(locale);
  const navigationItems = getTopNavigation(locale);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isModifier = event.metaKey || event.ctrlKey;
      if (isModifier && event.key === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      <Link
        href="/"
        className="docs-brand"
        aria-label={copy.header.homeAriaLabel}>
        <svg
          className="docs-brand__icon"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <rect x="4" y="4" width="120" height="120" rx="32" fill="#4F46E5" />
          <rect x="24" y="24" width="80" height="14" rx="7" fill="#E0E7FF" />
          <circle cx="44" cy="76" r="20" fill="#E0E7FF" />
          <path d="M39 66V86L55 76L39 66Z" fill="#4F46E5" />
          <rect x="72" y="59" width="6" height="34" rx="3" fill="#E0E7FF" />
          <rect x="84" y="51" width="6" height="50" rx="3" fill="#E0E7FF" />
          <rect x="96" y="63" width="6" height="26" rx="3" fill="#E0E7FF" />
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
              className={`docs-nav__link${isActive ? " docs-nav__link--active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="docs-header__actions">
        <button
          type="button"
          className="docs-search"
          onClick={openSearch}
          aria-label={copy.header.searchPlaceholder}>
          <span>{copy.header.searchPlaceholder}</span>
          <code>⌘ K</code>
        </button>
        {searchOpen ? (
          <SearchDialog locale={locale} open={searchOpen} onClose={closeSearch} />
        ) : null}
        <a
          href="https://github.com/madisonrubylee/react-youtube-jukebox"
          target="_blank"
          rel="noopener noreferrer"
          className="docs-github-link"
          aria-label="GitHub Repository">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="docs-github-link__label">GitHub</span>
        </a>
        <LocaleSwitcher
          label={copy.header.localeButtonLabel}
          locale={locale}
          options={localeOptions}
        />
      </div>
    </header>
  );
}
