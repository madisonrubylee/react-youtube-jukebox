import type { ReactNode } from "react";

import { getDocsCopy, type DocsLocale } from "../lib/i18n";

type Breadcrumb = {
  href?: string;
  label: string;
};

type TocItem = {
  href: string;
  label: string;
};

type DocsPageProps = {
  breadcrumbs: readonly Breadcrumb[];
  children: ReactNode;
  locale: DocsLocale;
  title: string;
  toc: readonly TocItem[];
};

export function DocsPage({
  breadcrumbs,
  children,
  locale,
  title,
  toc,
}: DocsPageProps) {
  const copy = getDocsCopy(locale);

  return (
    <>
      <div className="docs-main">
        <div
          className="docs-breadcrumbs"
          aria-label={copy.docsPage.breadcrumbAriaLabel}
        >
          {breadcrumbs.map((item) => (
            <span key={item.href ?? item.label}>{item.label}</span>
          ))}
        </div>
        <article className="docs-article">
          <h1>{title}</h1>
          {children}
        </article>
      </div>
      <aside className="docs-toc" aria-label={copy.docsPage.tocAriaLabel}>
        <h2 className="docs-toc__title">{copy.docsPage.tocTitle}</h2>
        {toc.map((item) => (
          <a key={item.href} href={item.href} className="docs-toc__link">
            {item.label}
          </a>
        ))}
      </aside>
    </>
  );
}
