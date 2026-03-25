import { Jukebox, type JukeboxTrack } from "../index";

const PLAYGROUND_TRACKS: JukeboxTrack[] = [
  {
    videoId: "yTg4v2Cnfyo",
    title: "Soul Below",
    artist: "Ljones",
  },
  {
    videoId: "s4MQku9Mkwc",
    title: "Something About Us",
    artist: "Daft Punk",
  },
  {
    videoId: "YnP8RwZqUUM",
    title: "Pick Your Poison",
    artist: "KiLLOWEN",
  },
  {
    videoId: "BdM2Og839o0",
    title: "Dong",
    artist: "Se So Neon",
  },
];

export function PlaygroundApp() {
  return (
    <main className="rj-playground">
      <section className="rj-playground__hero">
        <p className="rj-playground__eyebrow">react-youtube-jukebox</p>
        <h1 className="rj-playground__title">Local playground for the package</h1>
        <p className="rj-playground__body">
          The default behavior is a floating portal render on the viewport. Use
          the position presets to pin it to each corner, and use{" "}
          <code>portal=&#123;false&#125;</code> only when you want to render it
          inline inside your own layout container.
        </p>
      </section>

      <Jukebox tracks={PLAYGROUND_TRACKS} />
    </main>
  );
}
