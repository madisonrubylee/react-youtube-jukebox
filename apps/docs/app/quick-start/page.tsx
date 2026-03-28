import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";

export default function QuickStartPage() {
  return (
    <DocsPage
      title="Quick Start"
      breadcrumbs={[{ label: "Docs" }, { label: "Quick Start" }]}
      toc={[
        { href: "#install", label: "Install" },
        { href: "#usage", label: "Usage" },
        { href: "#positioning", label: "Positioning" },
      ]}>
      <section id="usage">
        <h2>Usage</h2>
        <CodeBlock>{`import "@react-youtube-jukebox/core/styles.css";
import { Jukebox } from "@react-youtube-jukebox/core";

const tracks = [
  { videoId: "yTg4v2Cnfyo", title: "Soul Below", artist: "Ljones" },
  { videoId: "s4MQku9Mkwc", title: "Something About Us", artist: "Daft Punk" },
];

export function App() {
  return <Jukebox tracks={tracks} />;
}`}</CodeBlock>
        <p>
          By default the first track starts automatically in a muted state. Pass{" "}
          <code>autoplay={"{false}"}</code> when you want manual playback.
        </p>
      </section>

      <section id="positioning">
        <h2>Positioning</h2>
        <p>
          Default behavior is a viewport portal render. Use `position` to pin
          the jukebox to one of the four corners.
        </p>
        <CodeBlock>{`<Jukebox tracks={tracks} position="top-left" offset={{ x: 20, y: 20 }} />`}</CodeBlock>
        <p>
          Use `portal={"{false}"}` only when you want inline rendering inside a
          positioned container.
        </p>
      </section>
    </DocsPage>
  );
}
