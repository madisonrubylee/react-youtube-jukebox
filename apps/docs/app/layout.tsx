import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsSidebar } from "../components/docs-sidebar";
import { SiteHeader } from "../components/site-header";
import { getDocsCopy } from "../lib/i18n";
import { getCurrentLocale } from "../lib/locale";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return {
    title: "react-youtube-jukebox",
    description: copy.metadataDescription,
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getCurrentLocale();

  return (
    <html lang={locale}>
      <body>
        <div className="docs-site">
          <SiteHeader locale={locale} />
          <div className="docs-shell">
            <DocsSidebar locale={locale} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
