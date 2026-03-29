import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { ExamplesShowcase } from "../../components/examples-showcase";
import { getDocsCopy } from "../../lib/i18n";
import { getCurrentLocale } from "../../lib/locale";

export default async function ExamplesPage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title={copy.examples.title}
      locale={locale}
      breadcrumbs={copy.examples.breadcrumbs.map((label) => ({ label }))}
      toc={copy.examples.toc}>
      <section id="default">
        <p>{copy.examples.body.default}</p>
        <ExamplesShowcase locale={locale} />
      </section>

      <section id="themes">
        <h2>{copy.examples.sections.themes}</h2>
        <p>{copy.examples.body.themes}</p>
        <CodeBlock>{`<Jukebox tracks={tracks} theme="glass" />
<Jukebox tracks={tracks} theme="simple" />
<Jukebox tracks={tracks} theme="sunset" />`}</CodeBlock>
      </section>

      <section id="chrome">
        <h2>{copy.examples.sections.chrome}</h2>
        <p>{copy.examples.body.chrome}</p>
        <CodeBlock>{`<Jukebox tracks={tracks} chrome="classic" />`}</CodeBlock>
      </section>

      <section id="positions">
        <h2>{copy.examples.sections.positions}</h2>
        <p>{copy.examples.body.positions}</p>
        <CodeBlock>{`<Jukebox tracks={tracks} position="bottom-center" offset={20} />
<Jukebox tracks={tracks} position="top-center" offset={20} />
<Jukebox tracks={tracks} position="bottom-left" offset={20} />
<Jukebox tracks={tracks} position="top-left" offset={{ x: 24, y: 24 }} />
<Jukebox tracks={tracks} position="top-right" offset={{ x: 24, y: 24 }} />`}</CodeBlock>
      </section>

      <section id="custom-expanded">
        <h2>{copy.examples.sections.customExpanded}</h2>
        <p>{copy.examples.body.customExpanded}</p>
        <CodeBlock>{`function CustomExpandedPanel({
  currentTrack,
  isPlaying,
  playerMountRef,
  togglePlay,
}: JukeboxExpandedRenderProps) {
  return (
    <section>
      <div ref={playerMountRef} style={{ aspectRatio: "16 / 9" }} />
      <strong>{currentTrack.title}</strong>
      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </section>
  );
}

<Jukebox
  tracks={tracks}
  renderExpandedContent={(props) => <CustomExpandedPanel {...props} />}
/>`}</CodeBlock>
      </section>

      <section id="single-track">
        <h2>{copy.examples.sections.singleTrack}</h2>
        <ul>
          {copy.examples.singleTrack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CodeBlock>{`<Jukebox
  tracks={[
    { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  ]}
/>`}</CodeBlock>
      </section>

      <section id="empty-tracks">
        <h2>{copy.examples.sections.emptyTracks}</h2>
        <p>{copy.examples.body.emptyTracks}</p>
        <CodeBlock>{`<Jukebox tracks={[]} />`}</CodeBlock>
      </section>
    </DocsPage>
  );
}
