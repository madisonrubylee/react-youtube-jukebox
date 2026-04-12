import { useCallback, useRef } from "react";

import { DEFAULT_PLAYLIST_SIZE } from "../lib/constants";
import type { PlayListSize } from "../lib/types";
import { useControllableState } from "./useControllableState";

type UsePlayListSizeOptions = {
  size: PlayListSize | undefined;
  defaultSize: PlayListSize | undefined;
  onSizeChange: ((size: PlayListSize) => void) | undefined;
};

export function usePlayListSize({
  size,
  defaultSize = DEFAULT_PLAYLIST_SIZE,
  onSizeChange,
}: UsePlayListSizeOptions) {
  const [resolvedSize, setResolvedSize] = useControllableState({
    value: size,
    defaultValue: defaultSize,
    onChange: onSizeChange,
  });
  const previousSizeRef = useRef<PlayListSize>("compact");

  const toggleSize = useCallback(() => {
    setResolvedSize((currentSize) =>
      currentSize === "compact" ? "expanded" : "compact",
    );
  }, [setResolvedSize]);

  const minimize = useCallback(() => {
    if (resolvedSize !== "mini") {
      previousSizeRef.current = resolvedSize;
    }

    setResolvedSize("mini");
  }, [resolvedSize, setResolvedSize]);

  const restore = useCallback(() => {
    const nextSize =
      previousSizeRef.current === "mini" ? "compact" : previousSizeRef.current;
    setResolvedSize(nextSize);
  }, [setResolvedSize]);

  return { resolvedSize, toggleSize, minimize, restore } as const;
}
