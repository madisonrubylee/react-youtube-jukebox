import Image from "next/image";
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
        </div>

        <div className="docs-home-signal-card">
          <div className="docs-home-signal-card__top">
            <span className="docs-home-signal-card__badge">
              {copy.home.signalCard.badge}
            </span>
            <strong>react-youtube-jukebox</strong>
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

        <div className="docs-home-preview-image">
          <Image
            src="/react-youtube-jukebox-sample.png"
            alt="React YouTube Jukebox demo"
            width={1044}
            height={598}
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

      <section id="components" className="docs-home-components">
        <h2>{copy.home.components.title}</h2>
        <div className="docs-home-components__grid">
          <div className="docs-home-components__card docs-home-components__card--jukebox">
            <div className="docs-home-components__card-visual">
              <svg
                viewBox="0 0 280 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="docs-home-components__illustration"
                aria-hidden="true">
                <rect
                  x="20"
                  y="10"
                  width="240"
                  height="140"
                  rx="16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.25"
                />
                <rect
                  x="20"
                  y="10"
                  width="240"
                  height="20"
                  rx="4"
                  opacity="0.08"
                  fill="currentColor"
                />
                <circle
                  cx="32"
                  cy="20"
                  r="3"
                  fill="currentColor"
                  opacity="0.2"
                />
                <circle
                  cx="42"
                  cy="20"
                  r="3"
                  fill="currentColor"
                  opacity="0.2"
                />
                <circle
                  cx="52"
                  cy="20"
                  r="3"
                  fill="currentColor"
                  opacity="0.2"
                />
                <rect
                  x="130"
                  y="115"
                  width="160"
                  height="44"
                  rx="22"
                  className="docs-home-components__dock"
                />
                <circle
                  cx="152"
                  cy="137"
                  r="10"
                  fill="currentColor"
                  opacity="0.15"
                />
                <rect
                  x="170"
                  y="130"
                  width="60"
                  height="5"
                  rx="2.5"
                  fill="currentColor"
                  opacity="0.2"
                />
                <rect
                  x="170"
                  y="139"
                  width="40"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  opacity="0.12"
                />
                <circle
                  cx="260"
                  cy="137"
                  r="8"
                  fill="currentColor"
                  opacity="0.1"
                />
                <path
                  d="M257 134v6l5-3-5-3z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
            </div>
            <div className="docs-home-components__card-body">
              <strong>{copy.home.components.jukebox.title}</strong>
              <p>{copy.home.components.jukebox.body}</p>
              <Link
                href="/api-playground"
                className="docs-home-components__link">
                {copy.home.components.jukebox.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="docs-home-components__card docs-home-components__card--playlist">
            <div className="docs-home-components__card-visual docs-home-components__card-visual--playlist">
              <svg
                viewBox="0 0 280 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="docs-home-components__illustration"
                aria-hidden="true">
                {/* card shell */}
                <rect
                  x="70"
                  y="4"
                  width="140"
                  height="152"
                  rx="10"
                  fill="currentColor"
                  opacity="0.06"
                />

                {/* header image area with gradient */}
                <defs>
                  <linearGradient id="plHdrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0.4"
                      stopColor="currentColor"
                      stopOpacity="0"
                    />
                    <stop
                      offset="1"
                      stopColor="currentColor"
                      stopOpacity="0.06"
                    />
                  </linearGradient>
                </defs>
                <rect
                  x="70"
                  y="4"
                  width="140"
                  height="44"
                  rx="10"
                  fill="currentColor"
                  opacity="0.1"
                />
                <rect
                  x="70"
                  y="4"
                  width="140"
                  height="44"
                  rx="10"
                  fill="url(#plHdrGrad)"
                />
                {/* title over header */}
                <rect
                  x="80"
                  y="34"
                  width="64"
                  height="6"
                  rx="3"
                  fill="currentColor"
                  opacity="0.3"
                />

                {/* pill tabs */}
                <rect
                  x="76"
                  y="54"
                  width="36"
                  height="10"
                  rx="5"
                  className="docs-home-components__tab-active"
                />
                <rect
                  x="117"
                  y="54"
                  width="30"
                  height="10"
                  rx="5"
                  fill="currentColor"
                  opacity="0.06"
                />
                <rect
                  x="152"
                  y="54"
                  width="36"
                  height="10"
                  rx="5"
                  fill="currentColor"
                  opacity="0.06"
                />

                {/* track row 1 - active */}
                <rect
                  x="76"
                  y="70"
                  width="128"
                  height="20"
                  rx="4"
                  fill="currentColor"
                  opacity="0.04"
                />
                <rect
                  x="82"
                  y="76"
                  width="8"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  opacity="0.12"
                />
                <rect
                  x="96"
                  y="74"
                  width="56"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  opacity="0.22"
                />
                <rect
                  x="96"
                  y="81"
                  width="34"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  opacity="0.1"
                />

                {/* track row 2 */}
                <rect
                  x="76"
                  y="94"
                  width="128"
                  height="20"
                  rx="4"
                  fill="currentColor"
                  opacity="0.02"
                />
                <rect
                  x="82"
                  y="100"
                  width="8"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  opacity="0.1"
                />
                <rect
                  x="96"
                  y="98"
                  width="48"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  opacity="0.15"
                />
                <rect
                  x="96"
                  y="105"
                  width="28"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  opacity="0.08"
                />

                {/* track row 3 */}
                <rect
                  x="76"
                  y="118"
                  width="128"
                  height="20"
                  rx="4"
                  fill="currentColor"
                  opacity="0.02"
                />
                <rect
                  x="82"
                  y="124"
                  width="8"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  opacity="0.1"
                />
                <rect
                  x="96"
                  y="122"
                  width="52"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  opacity="0.15"
                />
                <rect
                  x="96"
                  y="129"
                  width="32"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                  opacity="0.08"
                />

                {/* player bar */}
                <rect
                  x="70"
                  y="142"
                  width="140"
                  height="14"
                  rx="0 0 10 10"
                  fill="currentColor"
                  opacity="0.05"
                />
                <circle
                  cx="124"
                  cy="149"
                  r="4"
                  fill="currentColor"
                  opacity="0.1"
                />
                <path
                  d="M123 147v4l3.5-2-3.5-2z"
                  fill="currentColor"
                  opacity="0.25"
                />
                <circle
                  cx="140"
                  cy="149"
                  r="3.5"
                  fill="currentColor"
                  opacity="0.08"
                />
                <circle
                  cx="108"
                  cy="149"
                  r="3.5"
                  fill="currentColor"
                  opacity="0.08"
                />
              </svg>
            </div>
            <div className="docs-home-components__card-body">
              <strong>{copy.home.components.playlist.title}</strong>
              <p>{copy.home.components.playlist.body}</p>
              <Link href="/playlist" className="docs-home-components__link">
                {copy.home.components.playlist.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
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
