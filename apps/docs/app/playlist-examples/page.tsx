import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { PlaylistExamplesShowcase } from "../../components/playlist-examples-showcase";
import { getDocsCopy } from "../../lib/i18n";
import { getCurrentLocale } from "../../lib/locale";

export default async function PlaylistExamplesPage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title={copy.playlistExamples.title}
      locale={locale}
      breadcrumbs={copy.playlistExamples.breadcrumbs.map((label) => ({ label }))}
      toc={copy.playlistExamples.toc}>
      <section id="default">
        <p>{copy.playlistExamples.body.default}</p>
        <PlaylistExamplesShowcase locale={locale} />
      </section>

      <section id="themes">
        <h2>{copy.playlistExamples.sections.themes}</h2>
        <p>{copy.playlistExamples.body.themes}</p>
        <CodeBlock>{`<PlayList playlist={playlist} theme="dark" />
<PlayList playlist={playlist} theme="light" />`}</CodeBlock>
      </section>

      <section id="single-playlist">
        <h2>{copy.playlistExamples.sections.singlePlaylist}</h2>
        <p>{copy.playlistExamples.body.singlePlaylist}</p>
        <CodeBlock>{`const playlist = [
  {
    title: "Chill Vibes",
    image: "/images/chill.jpg",
    data: [
      { title: "Soul Below", artist: "Ljones", videoId: "yTg4v2Cnfyo" },
    ],
  },
];

<PlayList playlist={playlist} />`}</CodeBlock>
      </section>

      <section id="without-image">
        <h2>{copy.playlistExamples.sections.withoutImage}</h2>
        <p>{copy.playlistExamples.body.withoutImage}</p>
        <CodeBlock>{`const playlist = [
  {
    title: "Focus Flow",
    data: [
      { title: "Weightless", artist: "Marconi Union", videoId: "UfcAVejslrU" },
      { title: "Near Light", artist: "Olafur Arnalds", videoId: "oAhO5eegMfY" },
    ],
  },
];

<PlayList playlist={playlist} />`}</CodeBlock>
      </section>

      <section id="empty-tracks">
        <h2>{copy.playlistExamples.sections.emptyTracks}</h2>
        <p>{copy.playlistExamples.body.emptyTracks}</p>
        <CodeBlock>{`const playlist = [
  {
    title: "Coming Soon",
    data: [],
  },
];

<PlayList playlist={playlist} />`}</CodeBlock>
      </section>

      <section id="layout">
        <h2>{copy.playlistExamples.sections.layout}</h2>
        <p>{copy.playlistExamples.body.layout}</p>
        <CodeBlock>{`<PlayList playlist={playlist} className="playlist_sidebar" />

.playlist_sidebar {
  position: sticky;
  top: 80px;
}`}</CodeBlock>
      </section>
    </DocsPage>
  );
}
