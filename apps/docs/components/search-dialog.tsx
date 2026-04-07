"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getDocsCopy,
  getSidebarSections,
  getTopNavigation,
  type DocsLocale,
} from "../lib/i18n";

type SearchDialogProps = {
  locale: DocsLocale;
  open: boolean;
  onClose: () => void;
};

type SearchItem = {
  href: string;
  label: string;
  section?: string;
};

function buildSearchItems(locale: DocsLocale): SearchItem[] {
  const topNav = getTopNavigation(locale);
  const sidebarSections = getSidebarSections(locale);

  const seen = new Set<string>();
  const items: SearchItem[] = [];

  for (const section of sidebarSections) {
    for (const item of section.items) {
      if (!seen.has(item.href)) {
        seen.add(item.href);
        items.push({ href: item.href, label: item.label, section: section.title });
      }
    }
  }

  for (const item of topNav) {
    if (!seen.has(item.href)) {
      seen.add(item.href);
      items.push({ href: item.href, label: item.label });
    }
  }

  return items;
}

export function SearchDialog({ locale, open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const copy = getDocsCopy(locale);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const allItems = useMemo(() => buildSearchItems(locale), [locale]);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length === 0) return allItems;

    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(trimmed) ||
        item.section?.toLowerCase().includes(trimmed) ||
        item.href.toLowerCase().includes(trimmed)
    );
  }, [query, allItems]);

  const activeItemIndex =
    filteredItems.length === 0
      ? -1
      : Math.min(activeIndex, filteredItems.length - 1);
  const activeItem =
    activeItemIndex === -1 ? undefined : filteredItems[activeItemIndex];

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (activeItem) {
            navigate(activeItem.href);
          }
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
      }
    },
    [activeItem, filteredItems.length, navigate, onClose]
  );

  useEffect(() => {
    const activeElement = listRef.current?.children[activeItemIndex] as
      | HTMLElement
      | undefined;
    activeElement?.scrollIntoView({ block: "nearest" });
  }, [activeItemIndex]);

  if (!open) return null;

  return (
    <div className="docs-search-overlay" onClick={onClose}>
      <div
        className="docs-search-dialog"
        role="dialog"
        aria-label={copy.header.searchDialogTitle}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}>
        <div className="docs-search-dialog__header">
          <svg
            className="docs-search-dialog__icon"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className="docs-search-dialog__input"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder={copy.header.searchInputPlaceholder}
            aria-label={copy.header.searchDialogTitle}
          />
          <button
            className="docs-search-dialog__close"
            type="button"
            onClick={onClose}
            aria-label={copy.header.searchClose}>
            <kbd>ESC</kbd>
          </button>
        </div>
        <ul ref={listRef} className="docs-search-dialog__results" role="listbox">
          {filteredItems.length === 0 ? (
            <li className="docs-search-dialog__empty">
              {copy.header.searchNoResults}
            </li>
          ) : (
            filteredItems.map((item, index) => (
              <li
                key={item.href}
                className={`docs-search-dialog__item${index === activeItemIndex ? " docs-search-dialog__item--active" : ""}`}
                role="option"
                aria-selected={index === activeItemIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => navigate(item.href)}>
                <span className="docs-search-dialog__item-label">
                  {item.label}
                </span>
                {item.section && (
                  <span className="docs-search-dialog__item-section">
                    {item.section}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
