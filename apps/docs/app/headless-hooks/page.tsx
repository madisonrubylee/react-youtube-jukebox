import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { getDocsCopy } from "../../lib/i18n";
import { getCurrentLocale } from "../../lib/locale";

export default async function HeadlessHooksPage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title={copy.headlessHooks.title}
      locale={locale}
      breadcrumbs={copy.headlessHooks.breadcrumbs.map((label) => ({ label }))}
      toc={copy.headlessHooks.toc}>
      <section id="interface">
        <h2>{copy.headlessHooks.sections.interface}</h2>
        <p>{copy.headlessHooks.body.interface}</p>
      </section>

      <section id="use-jukebox">
        <h2>{copy.headlessHooks.sections.useJukebox}</h2>
        <p>{copy.headlessHooks.body.useJukebox}</p>
        <CodeBlock>{`import { useJukebox } from "react-youtube-jukebox";

function CustomJukebox({ tracks }: { tracks: JukeboxTrack[] }) {
  const { player, currentTrack, expanded, toggleExpanded } = useJukebox({
    tracks,
    autoplay: false,
  });

  return (
    <section>
      <button onClick={toggleExpanded}>
        {expanded ? "Collapse" : "Expand"}
      </button>
      <button onClick={player.togglePlay}>
        {player.isPlaying ? "Pause" : "Play"}
      </button>
      <div>{currentTrack?.title ?? "No track selected"}</div>
      <div ref={player.playerMountRef} style={{ aspectRatio: "16 / 9" }} />
    </section>
  );
}`}</CodeBlock>
      </section>

      <section id="use-playlist">
        <h2>{copy.headlessHooks.sections.usePlayList}</h2>
        <p>{copy.headlessHooks.body.usePlayList}</p>
        <CodeBlock>{`import { usePlayList } from "react-youtube-jukebox";

function CustomPlayList({ playlist }: { playlist: PlayListItem[] }) {
  const { player, activeTracks, currentTrack, setActiveTabIndex, selectTrack } =
    usePlayList({
      playlist,
      autoplay: false,
    });

  return (
    <section>
      <button onClick={() => setActiveTabIndex(0)}>First playlist</button>
      <ul>
        {activeTracks.map((track, index) => (
          <li key={track.videoId}>
            <button onClick={() => selectTrack(index)}>{track.title}</button>
          </li>
        ))}
      </ul>
      <button onClick={player.togglePlay}>
        {player.isPlaying ? "Pause" : "Play"}
      </button>
      <div>{currentTrack?.title ?? "No track selected"}</div>
      <div ref={player.playerMountRef} style={{ aspectRatio: "16 / 9" }} />
    </section>
  );
}`}</CodeBlock>
      </section>
    </DocsPage>
  );
}
