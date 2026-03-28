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
        { href: "#highlights", label: "Highlights" },
        { href: "#first-render", label: "First Render" },
      ]}
    >
      <section id="overview" className="docs-home-hero">
        <div className="docs-home-hero__content">
          <span className="docs-home-eyebrow">Floating player for React apps</span>
          <p className="docs-home-lead">
            Ship a YouTube jukebox that feels like product UI, not an embedded
            iframe afterthought. The package handles playback, queue rotation,
            theming, and portal rendering in one component.
          </p>
          <div className="docs-home-actions">
            <Link href="/installation" className="docs-home-button">
              Get Started
            </Link>
            <Link
              href="/examples"
              className="docs-home-button docs-home-button--secondary"
            >
              Browse Examples
            </Link>
          </div>
          <div className="docs-home-chip-row" aria-label="Highlights">
            <span className="docs-home-chip">Portal by default</span>
            <span className="docs-home-chip">Theme + chrome presets</span>
            <span className="docs-home-chip">Custom expanded panel</span>
          </div>
        </div>
        <div className="docs-home-hero__visual">
          <div className="docs-home-signal-card">
            <div className="docs-home-signal-card__top">
              <span className="docs-home-signal-card__badge">core package</span>
              <strong>@react-youtube-jukebox/core</strong>
            </div>
            <p>
              A focused package with one main export and a styles entrypoint
              that stays in sync with the docs app.
            </p>
            <div className="docs-home-metric-grid">
              <div className="docs-home-metric">
                <strong>1</strong>
                <span>Main component</span>
              </div>
              <div className="docs-home-metric">
                <strong>4</strong>
                <span>Corner positions</span>
              </div>
              <div className="docs-home-metric">
                <strong>3</strong>
                <span>UI chrome presets</span>
              </div>
            </div>
          </div>
          <CodeBlock>{`import "@react-youtube-jukebox/core/styles.css";
import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function Page() {
  return <Jukebox tracks={tracks} theme="ride" chrome="wallet" />;
}`}</CodeBlock>
        </div>
      </section>

      <section id="highlights">
        <h2>Highlights</h2>
        <div className="docs-home-feature-grid">
          <div className="docs-home-feature">
            <strong>Dock-first interaction</strong>
            <p>
              Start compact, expand on demand, and keep playback controls close
              to the viewport edge instead of inside page content.
            </p>
          </div>
          <div className="docs-home-feature">
            <strong>Theme without rewriting logic</strong>
            <p>
              Swap `theme` and `chrome` props to move from minimal glass to more
              character-heavy presets while keeping the same behavior.
            </p>
          </div>
          <div className="docs-home-feature">
            <strong>Replace the expanded panel</strong>
            <p>
              Use `renderExpandedContent` when the built-in player shell is not
              enough and you need a custom layout around the same controls.
            </p>
          </div>
        </div>
      </section>

      <section id="first-render">
        <h2>First Render</h2>
        <p>
          The fastest path is to install the package, import the stylesheet
          once, and render `Jukebox` with a small track list.
        </p>
        <div className="docs-home-split">
          <div className="docs-home-panel docs-home-panel--terminal">
            <span className="docs-home-panel__eyebrow">Install</span>
            <CodeBlock>{`pnpm add @react-youtube-jukebox/core
npm install @react-youtube-jukebox/core
yarn add @react-youtube-jukebox/core
bun add @react-youtube-jukebox/core`}</CodeBlock>
          </div>
          <div className="docs-home-panel">
            <span className="docs-home-panel__eyebrow">Render</span>
            <CodeBlock>{`import "@react-youtube-jukebox/core/styles.css";
import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function Page() {
  return <Jukebox tracks={tracks} />;
}`}</CodeBlock>
          </div>
        </div>
        <div className="docs-home-callout">
          <strong>Next steps</strong>
          <p>
            Continue with <Link href="/installation">Installation</Link> for the
            package setup details, move to{" "}
            <Link href="/quick-start">Quick Start</Link> for the minimal flow,
            or inspect <Link href="/api-playground">API &amp; Playground</Link>{" "}
            for prop-level control.
          </p>
        </div>
      </section>
    </DocsPage>
  );
}
