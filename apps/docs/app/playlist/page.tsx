import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { PlayListShowcase } from "../../components/playlist-showcase";
import { getDocsCopy } from "../../lib/i18n";
import { getCurrentLocale } from "../../lib/locale";

export default async function PlayListPage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title={copy.playlist.title}
      locale={locale}
      breadcrumbs={copy.playlist.breadcrumbs.map((label) => ({ label }))}
      toc={copy.playlist.toc}>
      <section id="interface">
        <p>{copy.playlist.body.interface}</p>
        <CodeBlock>{`type PlayListTrack = {
  title: string;
  artist: string;
  videoId: string;
};

type PlayListItem = {
  title: string;
  image?: string;
  data: PlayListTrack[];
};

type PlayListProps = {
  playlist: PlayListItem[];
  autoplay?: boolean;
  theme?: "light" | "dark";
  className?: string;
};`}</CodeBlock>
      </section>

      <section id="props">
        <h2>{copy.playlist.sections.props}</h2>
        <table className="docs-table">
          <thead>
            <tr>
              <th>{copy.playlist.table.headers.prop}</th>
              <th>{copy.playlist.table.headers.type}</th>
              <th>{copy.playlist.table.headers.notes}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>playlist</code></td>
              <td><code>PlayListItem[]</code></td>
              <td>{copy.playlist.table.rows.playlist}</td>
            </tr>
            <tr>
              <td><code>autoplay</code></td>
              <td><code>boolean</code></td>
              <td>{copy.playlist.table.rows.autoplay}</td>
            </tr>
            <tr>
              <td><code>theme</code></td>
              <td><code>"dark" | "light"</code></td>
              <td>{copy.playlist.table.rows.theme}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td>{copy.playlist.table.rows.className}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="playground">
        <h2>{copy.playlist.sections.playground}</h2>
        <p>{copy.playlist.body.playground}</p>
        <PlayListShowcase locale={locale} />
      </section>
    </DocsPage>
  );
}
