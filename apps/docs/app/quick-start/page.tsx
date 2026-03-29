import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { getDocsCopy } from "../../lib/i18n";
import { getCurrentLocale } from "../../lib/locale";

export default async function QuickStartPage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title={copy.quickStart.title}
      locale={locale}
      breadcrumbs={copy.quickStart.breadcrumbs.map((label) => ({ label }))}
      toc={copy.quickStart.toc}>
      <section id="usage">
        <h2>{copy.quickStart.sections.usage}</h2>
        <CodeBlock>{`import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function App() {
  return <Jukebox tracks={tracks} />;
}`}</CodeBlock>
        <p>{copy.quickStart.body.usage}</p>
      </section>

      <section id="positioning">
        <h2>{copy.quickStart.sections.positioning}</h2>
        <p>{copy.quickStart.body.positioning}</p>
        <CodeBlock>{`<Jukebox tracks={tracks} position="top-left" offset={{ x: 20, y: 20 }} />`}</CodeBlock>
        <p>{copy.quickStart.body.portal}</p>
      </section>
    </DocsPage>
  );
}
