import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@react-youtube-jukebox/core/styles.css";
import { DocsSidebar } from "../components/docs-sidebar";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "react-youtube-jukebox",
  description: "Docs for the react-youtube-jukebox package.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="docs-site">
          <SiteHeader />
          <div className="docs-shell">
            <DocsSidebar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
