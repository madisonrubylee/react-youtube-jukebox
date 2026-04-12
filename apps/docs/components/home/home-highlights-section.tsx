import type { DocsCopy } from "../../lib/docs-copy";

type HomeHighlightsSectionProps = {
  home: DocsCopy["home"];
};

export function HomeHighlightsSection({
  home,
}: HomeHighlightsSectionProps) {
  return (
    <section id="highlights">
      <h2>{home.highlightsTitle}</h2>
      <div className="docs-home-feature-grid">
        {home.features.map((feature) => (
          <div key={feature.title} className="docs-home-feature">
            <strong>{feature.title}</strong>
            <p>{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
