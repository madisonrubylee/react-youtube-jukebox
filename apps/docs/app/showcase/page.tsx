import { DocsPage } from "../../components/docs-page";

export default function ShowcasePage() {
  return (
    <DocsPage
      title="Showcase"
      breadcrumbs={[{ label: "Docs" }, { label: "Showcase" }]}
      toc={[
        { href: "#future", label: "Future Showcase" },
        { href: "#submit", label: "Submit a Site" },
      ]}
    >
      <section id="future">
        <p>
          Keep this page for production adopters once the package is published.
          Early on, it can also host annotated screenshots from demo projects.
        </p>
      </section>

      <section id="submit">
        <h2>Submit a Site</h2>
        <p>
          Add a PR later with a screenshot, short description, and link to the
          repository or live site.
        </p>
      </section>
    </DocsPage>
  );
}
