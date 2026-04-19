// @vitest-environment jsdom

import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useLatestRef } from "./useLatestRef";

describe("useLatestRef", () => {
  afterEach(() => {
    cleanup();
  });

  it("returns the same ref object across renders", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useLatestRef(value),
      { initialProps: { value: 1 } },
    );

    const initialRef = result.current;

    rerender({ value: 2 });
    expect(result.current).toBe(initialRef);

    rerender({ value: 3 });
    expect(result.current).toBe(initialRef);
  });

  it("has the latest value by the time effects run after commit", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useLatestRef(value),
      { initialProps: { value: 10 } },
    );

    expect(result.current.current).toBe(10);

    rerender({ value: 42 });
    expect(result.current.current).toBe(42);

    rerender({ value: 7 });
    expect(result.current.current).toBe(7);
  });
});
