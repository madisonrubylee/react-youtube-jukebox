import { cookies } from "next/headers";

import {
  DEFAULT_DOCS_LOCALE,
  DOCS_LOCALE_COOKIE_NAME,
  isDocsLocale,
} from "./i18n";

export async function getCurrentLocale() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(DOCS_LOCALE_COOKIE_NAME)?.value;

  if (!isDocsLocale(locale)) {
    return DEFAULT_DOCS_LOCALE;
  }

  return locale;
}
