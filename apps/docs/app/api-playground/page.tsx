import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { LivePreview } from "../../components/live-preview";

export default function ApiPlaygroundPage() {
  return (
    <DocsPage
      title="API & Playground"
      breadcrumbs={[{ label: "Docs" }, { label: "API & Playground" }]}
      toc={[
        { href: "#interface", label: "Interface" },
        { href: "#props", label: "Props" },
        { href: "#playground", label: "Playground" },
      ]}
    >
      <section id="interface">
        <p>
          The public API stays intentionally small in v1. Consumers pass track
          metadata plus a few playback and positioning props.
        </p>
        <CodeBlock>{`type JukeboxTrack = {
  videoId: string;
  title: string;
  artist?: string;
};

type JukeboxTheme = "glass" | "simple" | "sunset";
type JukeboxChrome = "classic" | "wallet" | "ride";

type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: JukeboxTheme;
  chrome?: JukeboxChrome;
  offset?: number | { x: number; y: number };
  portal?: boolean;
  className?: string;
};`}</CodeBlock>
      </section>

      <section id="props">
        <h2>Props</h2>
        <table className="docs-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tracks</code></td>
              <td><code>JukeboxTrack[]</code></td>
              <td>Required. Empty and single-track cases are handled safely.</td>
            </tr>
            <tr>
              <td><code>position</code></td>
              <td>corner preset</td>
              <td>Controls top/bottom and left/right placement.</td>
            </tr>
            <tr>
              <td><code>theme</code></td>
              <td><code>"glass" | "simple" | "sunset"</code></td>
              <td>Optional. Defaults to <code>"glass"</code>.</td>
            </tr>
            <tr>
              <td><code>chrome</code></td>
              <td><code>"classic" | "wallet" | "ride"</code></td>
              <td>
                Optional. Switches shell and control styling. Defaults to{" "}
                <code>"classic"</code>.
              </td>
            </tr>
            <tr>
              <td><code>autoplay</code></td>
              <td><code>boolean</code></td>
              <td>Defaults to `true` and starts muted on first load.</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number | {"{ x, y }"}</code></td>
              <td>Applies spacing from the chosen edge preset.</td>
            </tr>
            <tr>
              <td><code>portal</code></td>
              <td><code>boolean</code></td>
              <td>Defaults to `true`. Inline mode is opt-in.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td>Root-level hook for limited customization in v1.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="playground">
        <h2>Playground</h2>
        <p>
          The live preview below renders inline for docs only. The package
          default remains portal rendering on the viewport, and you can switch
          themes and chrome presets here to compare the available combinations.
        </p>
        <LivePreview />
      </section>
    </DocsPage>
  );
}
