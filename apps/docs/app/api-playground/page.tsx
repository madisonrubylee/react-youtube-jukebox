import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { LivePreview } from "../../components/live-preview";
import { getDocsCopy } from "../../lib/i18n";
import { getCurrentLocale } from "../../lib/locale";

export default async function ApiPlaygroundPage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title={copy.apiPlayground.title}
      locale={locale}
      breadcrumbs={copy.apiPlayground.breadcrumbs.map((label) => ({ label }))}
      toc={copy.apiPlayground.toc}
    >
      <section id="interface">
        <p>{copy.apiPlayground.body.interface}</p>
        <CodeBlock>{`type JukeboxTrack = {
  videoId: string;
  title: string;
  artist?: string;
};

type JukeboxTheme = "glass" | "simple" | "sunset" | "ride";
type JukeboxChrome = "classic" | "wallet" | "ride";

type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  theme?: JukeboxTheme;
  chrome?: JukeboxChrome;
  offset?: number | { x: number; y: number };
  portal?: boolean;
  className?: string;
};`}</CodeBlock>
      </section>

      <section id="props">
        <h2>{copy.apiPlayground.sections.props}</h2>
        <table className="docs-table">
          <thead>
            <tr>
              <th>{copy.apiPlayground.table.headers.prop}</th>
              <th>{copy.apiPlayground.table.headers.type}</th>
              <th>{copy.apiPlayground.table.headers.notes}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tracks</code></td>
              <td><code>JukeboxTrack[]</code></td>
              <td>{copy.apiPlayground.table.rows.tracks}</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td>edge preset</td>
              <td>{copy.apiPlayground.table.rows.position}</td>
            </tr>
            <tr>
              <td><code>theme</code></td>
              <td><code>"glass" | "simple" | "sunset" | "ride"</code></td>
              <td>{copy.apiPlayground.table.rows.theme}</td>
            </tr>
            <tr>
              <td><code>chrome</code></td>
              <td><code>"classic" | "wallet" | "ride"</code></td>
              <td>{copy.apiPlayground.table.rows.chrome}</td>
            </tr>
            <tr>
              <td><code>autoplay</code></td>
              <td><code>boolean</code></td>
              <td>{copy.apiPlayground.table.rows.autoplay}</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number | {"{ x, y }"}</code></td>
              <td>{copy.apiPlayground.table.rows.offset}</td>
            </tr>
            <tr>
              <td><code>portal</code></td>
              <td><code>boolean</code></td>
              <td>{copy.apiPlayground.table.rows.portal}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td>{copy.apiPlayground.table.rows.className}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="playground">
        <h2>{copy.apiPlayground.sections.playground}</h2>
        <p>{copy.apiPlayground.body.playground}</p>
        <LivePreview locale={locale} />
      </section>
    </DocsPage>
  );
}
