import { DocsPage } from "../components/docs-page";
import { HomeComponentsSection } from "../components/home/home-components-section";
import { HomeHeroSection } from "../components/home/home-hero-section";
import { HomeHighlightsSection } from "../components/home/home-highlights-section";
import { getDocsCopy } from "../lib/i18n";
import { getCurrentLocale } from "../lib/locale";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title="react-youtube-jukebox"
      locale={locale}
      breadcrumbs={copy.home.breadcrumbs.map((label) => ({ label }))}
      toc={copy.home.toc}>
      <HomeHeroSection home={copy.home} />
      <HomeComponentsSection home={copy.home} />
      <HomeHighlightsSection home={copy.home} />
    </DocsPage>
  );
}
