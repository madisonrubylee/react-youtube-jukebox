import type { ReactNode } from "react";

type Breadcrumb = {
  href?: string;
  label: string;
};

type TocItem = {
  href: string;
  label: string;
};

type DocsPageProps = {
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
  title: string;
  toc: TocItem[];
};

export function DocsPage({ breadcrumbs, children, title, toc }: DocsPageProps) {
  return (
    <>
      <div className="docs-main">
        <div className="docs-breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
        <article className="docs-article">
          <h1>{title}</h1>
          {children}
        </article>
      </div>
      <aside className="docs-toc" aria-label="On this page">
        <h2 className="docs-toc__title">On This Page</h2>
        {toc.map((item) => (
          <a key={item.href} href={item.href} className="docs-toc__link">
            {item.label}
          </a>
        ))}
      </aside>
    </>
  );
}
