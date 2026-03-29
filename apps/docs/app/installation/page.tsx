import Link from "next/link";

import { CodeBlock } from "../../components/code-block";
import { DocsPage } from "../../components/docs-page";
import { getDocsCopy } from "../../lib/i18n";
import { getCurrentLocale } from "../../lib/locale";

export default async function InstallationPage() {
  const locale = await getCurrentLocale();
  const copy = getDocsCopy(locale);

  return (
    <DocsPage
      title={copy.installation.title}
      locale={locale}
      breadcrumbs={copy.installation.breadcrumbs.map((label) => ({ label }))}
      toc={copy.installation.toc}
    >
      <section id="package">
        <p>{copy.installation.body.package}</p>
        <CodeBlock>{`pnpm add @react-youtube-jukebox/core
npm install @react-youtube-jukebox/core
yarn add @react-youtube-jukebox/core
bun add @react-youtube-jukebox/core`}</CodeBlock>
      </section>

      <section id="styles">
        <h2>{copy.installation.sections.styles}</h2>
        <p>{copy.installation.body.styles}</p>
        <CodeBlock>{`import { Jukebox } from "@react-youtube-jukebox/core";`}</CodeBlock>
        <p>{copy.installation.body.theme}</p>
      </section>

      <section id="next-steps">
        <h2>{copy.installation.sections.nextSteps}</h2>
        <p>
          {locale === "ko" ? (
            <>
              가장 간단한 설정은 <Link href="/quick-start">빠른 시작</Link>에서
              확인할 수 있고, 사용 가능한 props와 렌더 훅은{" "}
              <Link href="/api-playground">API &amp; 플레이그라운드</Link>에서
              바로 살펴볼 수 있습니다.
            </>
          ) : (
            <>
              Continue to <Link href="/quick-start">Quick Start</Link> for the
              minimal setup, or open{" "}
              <Link href="/api-playground">API &amp; Playground</Link> to inspect
              the available props and render hooks.
            </>
          )}
        </p>
      </section>
    </DocsPage>
  );
}
