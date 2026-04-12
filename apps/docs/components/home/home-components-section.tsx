import Link from "next/link";

import type { DocsCopy } from "../../lib/docs-copy";

type HomeComponentsSectionProps = {
  home: DocsCopy["home"];
};

function JukeboxIllustration() {
  return (
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
      <circle cx="32" cy="20" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="42" cy="20" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="52" cy="20" r="3" fill="currentColor" opacity="0.2" />
      <rect
        x="130"
        y="115"
        width="160"
        height="44"
        rx="22"
        className="docs-home-components__dock"
      />
      <circle cx="152" cy="137" r="10" fill="currentColor" opacity="0.15" />
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
      <circle cx="260" cy="137" r="8" fill="currentColor" opacity="0.1" />
      <path d="M257 134v6l5-3-5-3z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PlayListIllustration() {
  return (
    <svg
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="docs-home-components__illustration"
      aria-hidden="true">
      <rect
        x="70"
        y="4"
        width="140"
        height="152"
        rx="10"
        fill="currentColor"
        opacity="0.06"
      />
      <defs>
        <linearGradient id="plHdrGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.4" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.06" />
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
      <rect
        x="80"
        y="34"
        width="64"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.3"
      />
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
      <rect
        x="70"
        y="142"
        width="140"
        height="14"
        rx="0 0 10 10"
        fill="currentColor"
        opacity="0.05"
      />
      <circle cx="124" cy="149" r="4" fill="currentColor" opacity="0.1" />
      <path d="M123 147v4l3.5-2-3.5-2z" fill="currentColor" opacity="0.25" />
      <circle cx="140" cy="149" r="3.5" fill="currentColor" opacity="0.08" />
      <circle cx="108" cy="149" r="3.5" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

export function HomeComponentsSection({ home }: HomeComponentsSectionProps) {
  return (
    <section id="components" className="docs-home-components">
      <h2>{home.components.title}</h2>
      <div className="docs-home-components__grid">
        <div className="docs-home-components__card docs-home-components__card--jukebox">
          <div className="docs-home-components__card-visual">
            <JukeboxIllustration />
          </div>
          <div className="docs-home-components__card-body">
            <strong>{home.components.jukebox.title}</strong>
            <p>{home.components.jukebox.body}</p>
            <Link href="/api-playground" className="docs-home-components__link">
              {home.components.jukebox.linkLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="docs-home-components__card docs-home-components__card--playlist">
          <div className="docs-home-components__card-visual docs-home-components__card-visual--playlist">
            <PlayListIllustration />
          </div>
          <div className="docs-home-components__card-body">
            <strong>{home.components.playlist.title}</strong>
            <p>{home.components.playlist.body}</p>
            <Link href="/playlist" className="docs-home-components__link">
              {home.components.playlist.linkLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
