import { NextResponse } from "next/server";

import {
  DEFAULT_DOCS_LOCALE,
  DOCS_LOCALE_COOKIE_NAME,
  isDocsLocale,
} from "../../../lib/i18n";

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as {
    locale?: string;
  };
  const locale = isDocsLocale(payload.locale)
    ? payload.locale
    : DEFAULT_DOCS_LOCALE;
  const response = NextResponse.json({ ok: true });

  response.cookies.set(DOCS_LOCALE_COOKIE_NAME, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
