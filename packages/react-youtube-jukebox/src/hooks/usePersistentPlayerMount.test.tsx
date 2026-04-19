// @vitest-environment jsdom

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useState } from "react";

import { usePersistentPlayerMount } from "./usePersistentPlayerMount";

describe("usePersistentPlayerMount", () => {
  afterEach(() => {
    cleanup();
  });

  it("creates the persistent wrapper only once across re-renders", () => {
    const wrappers: (HTMLDivElement | null)[] = [];

    function Harness() {
      const [, setTick] = useState(0);
      const { persistentWrapper } = usePersistentPlayerMount();

      wrappers.push(persistentWrapper);

      return (
        <button type="button" onClick={() => setTick((t) => t + 1)}>
          rerender
        </button>
      );
    }

    const { rerender } = render(<Harness />);

    rerender(<Harness />);
    rerender(<Harness />);

    expect(wrappers).toHaveLength(3);
    expect(wrappers[0]).not.toBeNull();
    expect(wrappers[0]).toBe(wrappers[1]);
    expect(wrappers[1]).toBe(wrappers[2]);
  });

  it("attaches the wrapper to the slot via playerMountRef", () => {
    function Harness() {
      const { playerMountRef } = usePersistentPlayerMount();
      return <div data-testid="slot" ref={playerMountRef} />;
    }

    const { getByTestId } = render(<Harness />);
    const slot = getByTestId("slot");

    expect(slot.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});
