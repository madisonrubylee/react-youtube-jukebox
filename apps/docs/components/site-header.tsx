"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { topNavigation } from "../lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="docs-header">
      <div className="docs-brand">react-youtube-jukebox</div>
      <nav className="docs-nav" aria-label="Primary">
        {topNavigation.map((item) => {
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
      <div className="docs-search" aria-hidden="true">
        <span>Search documentation...</span>
        <code>⌘ K</code>
      </div>
    </header>
  );
}
