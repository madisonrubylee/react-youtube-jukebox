import Link from "next/link";

import { CodeBlock } from "../components/code-block";
import { DocsPage } from "../components/docs-page";
import { getDocsCopy } from "../lib/i18n";
import { getCurrentLocale } from "../lib/locale";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title="react-youtube-jukebox"
      locale={locale}
      breadcrumbs={copy.home.breadcrumbs.map((label) => ({ label }))}
      toc={copy.home.toc}>
      <section id="overview" className="docs-home-hero">
        <div className="docs-home-hero__summary">
          <span className="docs-home-eyebrow">{copy.home.eyebrow}</span>
          <p className="docs-home-lead">{copy.home.lead}</p>
          <div className="docs-home-actions">
            <Link href="/installation" className="docs-home-button">
              {copy.home.actions.getStarted}
            </Link>
            <Link
              href="/examples"
              className="docs-home-button docs-home-button--secondary">
              {copy.home.actions.browseExamples}
            </Link>
          </div>
          <div className="docs-home-chip-row" aria-label="Highlights">
            {copy.home.chips.map((chip) => (
              <span key={chip} className="docs-home-chip">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="docs-home-signal-card">
          <div className="docs-home-signal-card__top">
            <span className="docs-home-signal-card__badge">
              {copy.home.signalCard.badge}
            </span>
            <strong>@react-youtube-jukebox/core</strong>
          </div>
          <p>{copy.home.signalCard.body}</p>
          <div className="docs-home-metric-grid">
            {copy.home.metrics.map((metric) => (
              <div key={metric.label} className="docs-home-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="docs-home-journey">
          <div className="docs-home-journey__header">
            <strong>{copy.home.journey.title}</strong>
            <span>{copy.home.journey.subtitle}</span>
          </div>
          <div className="docs-home-journey__steps">
            {copy.home.journey.steps.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="docs-home-journey__step">
                <span className="docs-home-journey__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="docs-home-journey__body">
                  <strong>{step.title}</strong>
                  <span>{step.body}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="docs-home-code-panel">
          <CodeBlock>{`import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function Page() {
  return <Jukebox tracks={tracks} theme="ride" chrome="classic" />;
}`}</CodeBlock>
        </div>
      </section>

      <section id="highlights">
        <h2>{copy.home.highlightsTitle}</h2>
        <div className="docs-home-feature-grid">
          {copy.home.features.map((feature) => (
            <div key={feature.title} className="docs-home-feature">
              <strong>{feature.title}</strong>
              <p>{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </DocsPage>
  );
}
