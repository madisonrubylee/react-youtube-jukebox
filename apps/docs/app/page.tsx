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
      ]}>
      <section id="overview" className="docs-home-hero">
        <div className="docs-home-hero__summary">
          <span className="docs-home-eyebrow">
            Floating player for React apps
          </span>
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
              className="docs-home-button docs-home-button--secondary">
              Browse Examples
            </Link>
          </div>
          <div className="docs-home-chip-row" aria-label="Highlights">
            <span className="docs-home-chip">Portal by default</span>
            <span className="docs-home-chip">Theme + chrome presets</span>
            <span className="docs-home-chip">Custom expanded panel</span>
          </div>
        </div>

        <div className="docs-home-signal-card">
          <div className="docs-home-signal-card__top">
            <span className="docs-home-signal-card__badge">core package</span>
            <strong>@react-youtube-jukebox/core</strong>
          </div>
          <p>
            A focused package with one main export and a styles entrypoint that
            stays in sync with the docs app.
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

        <div className="docs-home-journey">
          <div className="docs-home-journey__header">
            <strong>Start here</strong>
            <span>Fastest route through the docs</span>
          </div>
          <div className="docs-home-journey__steps">
            <Link
              href="/installation"
              className="docs-home-journey__step">
              <span className="docs-home-journey__index">01</span>
              <span className="docs-home-journey__body">
                <strong>Install the package</strong>
                <span>Add the package and stylesheet entry once.</span>
              </span>
            </Link>
            <Link href="/quick-start" className="docs-home-journey__step">
              <span className="docs-home-journey__index">02</span>
              <span className="docs-home-journey__body">
                <strong>Render your first jukebox</strong>
                <span>Drop in tracks and mount the default player.</span>
              </span>
            </Link>
            <Link href="/examples" className="docs-home-journey__step">
              <span className="docs-home-journey__index">03</span>
              <span className="docs-home-journey__body">
                <strong>Explore presets and layouts</strong>
                <span>Compare themes, chrome, and custom expansions.</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="docs-home-code-panel">
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
    </DocsPage>
  );
}
