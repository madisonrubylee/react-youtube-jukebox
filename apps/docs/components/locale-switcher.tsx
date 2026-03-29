"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  type DocsLocale,
} from "../lib/i18n";

type LocaleSwitcherProps = {
  label: string;
  locale: DocsLocale;
  options: {
    ariaLabel: string;
    label: string;
    value: DocsLocale;
  }[];
};

export function LocaleSwitcher({
  label,
  locale,
  options,
}: LocaleSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSelect = async (nextLocale: DocsLocale) => {
    if (nextLocale === locale) {
      return;
    }

    const response = await fetch("/api/locale", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ locale: nextLocale }),
    });

    if (!response.ok) {
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="docs-locale-switch">
      <span className="docs-locale-switch__label">{label}</span>
      <div className="docs-segmented-control" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => void handleSelect(option.value)}
            className="docs-segmented-control__button"
            data-active={locale === option.value}
            role="radio"
            aria-checked={locale === option.value}
            aria-label={option.ariaLabel}
            disabled={isPending}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
