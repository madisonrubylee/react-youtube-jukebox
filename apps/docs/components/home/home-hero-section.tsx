import Image from "next/image";
import Link from "next/link";

import { CodeBlock } from "../code-block";
import type { DocsCopy } from "../../lib/docs-copy";

type HomeHeroSectionProps = {
  home: DocsCopy["home"];
};

export function HomeHeroSection({ home }: HomeHeroSectionProps) {
  return (
    <section id="overview" className="docs-home-hero">
      <div className="docs-home-hero__summary">
        <p className="docs-home-lead">{home.lead}</p>
        <div className="docs-home-actions">
          <Link href="/installation" className="docs-home-button">
            {home.actions.getStarted}
          </Link>
          <Link
            href="/examples"
            className="docs-home-button docs-home-button--secondary">
            {home.actions.browseExamples}
          </Link>
        </div>
      </div>

      <div className="docs-home-signal-card">
        <div className="docs-home-signal-card__top">
          <span className="docs-home-signal-card__badge">
            {home.signalCard.badge}
          </span>
          <strong>react-youtube-jukebox</strong>
        </div>
        <p>{home.signalCard.body}</p>
        <div className="docs-home-metric-grid">
          {home.metrics.map((metric) => (
            <div key={metric.label} className="docs-home-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="docs-home-journey">
        <div className="docs-home-journey__header">
          <strong>{home.journey.title}</strong>
          <span>{home.journey.subtitle}</span>
        </div>
        <div className="docs-home-journey__steps">
          {home.journey.steps.map((step, index) => (
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

      <div className="docs-home-preview-image">
        <Image
          src="/react-playlist-sample.gif"
          alt="React YouTube Jukebox demo"
          width={800}
          height={396}
          className="docs-home-preview-image__img"
        />
      </div>

      <div className="docs-home-code-panel">
        <CodeBlock>{`import { Jukebox } from "react-youtube-jukebox";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function Page() {
  return <Jukebox tracks={tracks} theme="ride" chrome="classic" />;
}`}</CodeBlock>
      </div>
    </section>
  );
}
