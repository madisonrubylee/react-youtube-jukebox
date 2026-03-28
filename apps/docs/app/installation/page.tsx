import Link from "next/link";

import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";

export default function InstallationPage() {
  return (
    <DocsPage
      title="Installation"
      breadcrumbs={[{ label: "Docs" }, { label: "Installation" }]}
      toc={[
        { href: "#package", label: "Package" },
        { href: "#styles", label: "Styles" },
        { href: "#next-steps", label: "Next Steps" },
      ]}
    >
      <section id="package">
        <p>
          Install the published package and keep `react` / `react-dom` in your
          app. The docs app lives in this monorepo, but consumers only install
          the package below.
        </p>
        <CodeBlock>{`pnpm add @react-youtube-jukebox/core
npm install @react-youtube-jukebox/core
yarn add @react-youtube-jukebox/core
bun add @react-youtube-jukebox/core`}</CodeBlock>
      </section>

      <section id="styles">
        <h2>Styles</h2>
        <p>
          The package injects its default stylesheet automatically when you
          import the component.
        </p>
        <CodeBlock>{`import { Jukebox } from "@react-youtube-jukebox/core";`}</CodeBlock>
        <p>
          The default theme is `glass`. You can switch UI presets with{" "}
          <code>theme</code> and <code>chrome</code> without changing the core
          playback flow.
        </p>
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <p>
          Continue to <Link href="/quick-start">Quick Start</Link> for the
          minimal setup, or open{" "}
          <Link href="/api-playground">API &amp; Playground</Link> to inspect
          the available props and render hooks.
        </p>
      </section>
    </DocsPage>
  );
}
