"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getDocsCopy,
  getSidebarSections,
  type DocsLocale,
} from "../lib/i18n";

type DocsSidebarProps = {
  locale: DocsLocale;
};

export function DocsSidebar({ locale }: DocsSidebarProps) {
  const pathname = usePathname();
  const copy = getDocsCopy(locale);
  const sections = getSidebarSections(locale);

  return (
    <aside className="docs-sidebar" aria-label={copy.sidebar.ariaLabel}>
      {sections.map((section) => (
        <section key={section.title} className="docs-sidebar__section">
          <h2 className="docs-sidebar__title">{section.title}</h2>
          {section.items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`docs-sidebar__link${isActive ? " docs-sidebar__link--active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </section>
      ))}
    </aside>
  );
}
