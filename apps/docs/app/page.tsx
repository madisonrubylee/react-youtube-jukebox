import Link from "next/link";

import { CodeBlock } from "../components/code-block";
import { DocsPage } from "../components/docs-page";

export default function HomePage() {
  return (
    <DocsPage
      title="react-youtube-jukebox"
      breadcrumbs={[{ label: "Home" }]}
      toc={[
        { href: "#overview", label: "Overview" },
        { href: "#package", label: "Package" },
        { href: "#why-monorepo", label: "Why Monorepo" },
      ]}
    >
      <section id="overview">
        <p>
          A floating YouTube jukebox component for React apps. The package stays
          focused on one exported component, while this repo keeps docs and
          package source in the same pnpm workspace.
        </p>
        <div className="docs-card-grid">
          <div className="docs-card">
            <strong>Package</strong>
            <p>`@react-youtube-jukebox/core` is the only npm publish target.</p>
          </div>
          <div className="docs-card">
            <strong>Docs</strong>
            <p>
              This site is a separate Next.js app inside the same repo, so docs
              and package versions stay in sync.
            </p>
          </div>
        </div>
      </section>

      <section id="package">
        <h2>Package</h2>
        <p>
          The component keeps YouTube iframe loading, playback control, next
          track rotation, and styling inside the package.
        </p>
        <CodeBlock>{`import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function Page() {
  return <Jukebox tracks={tracks} />;
}`}</CodeBlock>
      </section>

      <section id="why-monorepo">
        <h2>Why Monorepo</h2>
        <p>
          The monorepo layout does not increase the consumer bundle size. npm
          consumers only install the built package from{" "}
          <code>packages/react-youtube-jukebox</code>. The Next.js docs app is
          not published with it.
        </p>
        <p>
          Continue with <Link href="/quick-start">Quick Start</Link> or jump to{" "}
          <Link href="/api-playground">API &amp; Playground</Link>.
        </p>
      </section>
    </DocsPage>
  );
}
