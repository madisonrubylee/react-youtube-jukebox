import { DocsPage } from "../../components/docs-page";
import {
  getChangelogCopy,
  type ChangelogRelease,
  type ChangelogSection,
} from "../../lib/changelog";
import { getCurrentLocale } from "../../lib/locale";

function toVersionAnchor(version: string) {
  return `v${version.replace(/\./g, "-")}`;
}

function ReleaseSectionView({ section }: { section: ChangelogSection }) {
  return (
    <>
      <h3>{section.heading}</h3>
      <ul>
        {section.entries.map((entry) => (
          <li key={entry.title}>
            <strong>{entry.title}</strong>
            {" — "}
            {entry.body}
          </li>
        ))}
      </ul>
    </>
  );
}

function ReleaseView({ release }: { release: ChangelogRelease }) {
  const { breaking, added, changed, removed } = release.sections;

  return (
    <section id={toVersionAnchor(release.version)}>
      <h2>
        v{release.version}{" "}
        <span style={{ color: "var(--docs-text-muted)", fontWeight: 400 }}>
          — {release.date}
        </span>
      </h2>
      {breaking ? <ReleaseSectionView section={breaking} /> : null}
      {added ? <ReleaseSectionView section={added} /> : null}
      {changed ? <ReleaseSectionView section={changed} /> : null}
      {removed ? <ReleaseSectionView section={removed} /> : null}
    </section>
  );
}

export default async function ChangelogPage() {
  const locale = await getCurrentLocale();
  const copy = getChangelogCopy(locale);

  const toc = copy.releases.map((release) => ({
    href: `#${toVersionAnchor(release.version)}`,
    label: `v${release.version}`,
  }));

  return (
    <DocsPage
      title={copy.title}
      locale={locale}
      breadcrumbs={copy.breadcrumbs.map((label) => ({ label }))}
      toc={toc}
    >
      <section id="intro">
        <p>{copy.intro}</p>
        <p>
          <a
            href={copy.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.sourceLabel}
          </a>
          {" · "}
          <a
            href={copy.githubReleaseLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.githubReleaseLabel}
          </a>
        </p>
      </section>

      {copy.releases.map((release) => (
        <ReleaseView key={release.version} release={release} />
      ))}
    </DocsPage>
  );
}
