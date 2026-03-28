import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { ExamplesShowcase } from "../../components/examples-showcase";

export default function ExamplesPage() {
  return (
    <DocsPage
      title="Examples"
      breadcrumbs={[{ label: "Docs" }, { label: "Examples" }]}
      toc={[
        { href: "#default", label: "Default" },
        { href: "#themes", label: "Themes" },
        { href: "#chrome", label: "Chrome Presets" },
        { href: "#positions", label: "Position Presets" },
        { href: "#custom-expanded", label: "Custom Expanded" },
        { href: "#single-track", label: "Single Track" },
        { href: "#empty-tracks", label: "Empty Tracks" },
      ]}>
      <section id="default">
        <p>
          The package default is a floating portal render. Inside docs we keep
          previews inline so they stay inside the page layout, but the API
          example below is the real default usage.
        </p>
        <ExamplesShowcase />
      </section>

      <section id="themes">
        <h2>Themes</h2>
        <p>
          Use <code>theme</code> when the default glass chrome does not match
          the page. If omitted, the component keeps the current default theme.
        </p>
        <CodeBlock>{`<Jukebox tracks={tracks} theme="glass" />
<Jukebox tracks={tracks} theme="simple" />
<Jukebox tracks={tracks} theme="sunset" />`}</CodeBlock>
      </section>

      <section id="chrome">
        <h2>Chrome Presets</h2>
        <p>
          The package currently exposes only the rebuilt{" "}
          <code>"classic"</code> chrome while the other presets are being
          reworked.
        </p>
        <CodeBlock>{`<Jukebox tracks={tracks} chrome="classic" />`}</CodeBlock>
      </section>

      <section id="positions">
        <h2>Position Presets</h2>
        <p>
          Use <code>position</code> to pin the jukebox to any corner of the
          viewport. On mobile, prefer <code>bottom-center</code> or{" "}
          <code>top-center</code> so the dock stays aligned to the narrow
          screen. <code>offset</code> lets you nudge it from the chosen edge.
        </p>
        <CodeBlock>{`<Jukebox tracks={tracks} position="bottom-center" offset={20} />
<Jukebox tracks={tracks} position="top-center" offset={20} />
<Jukebox tracks={tracks} position="bottom-left" offset={20} />
<Jukebox tracks={tracks} position="top-left" offset={{ x: 24, y: 24 }} />
<Jukebox tracks={tracks} position="top-right" offset={{ x: 24, y: 24 }} />`}</CodeBlock>
      </section>

      <section id="custom-expanded">
        <h2>Custom Expanded</h2>
        <p>
          Keep the dock and player state from the library, but render your own{" "}
          expanded layout with <code>renderExpandedContent</code>.
        </p>
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
        <h2>Single Track</h2>
        <ul>
          <li>Pass a one-item array when you only need a single song.</li>
          <li>Previous and next controls are disabled automatically.</li>
          <li>
            Playback, mute, expand, and volume control still work normally.
          </li>
        </ul>
        <CodeBlock>{`<Jukebox
  tracks={[
    { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  ]}
/>`}</CodeBlock>
      </section>

      <section id="empty-tracks">
        <h2>Empty Tracks</h2>
        <p>
          Passing an empty array is safe. The component renders a fallback dock
          instead of throwing and keeps playback controls disabled.
        </p>
        <CodeBlock>{`<Jukebox tracks={[]} />`}</CodeBlock>
      </section>
    </DocsPage>
  );
}
