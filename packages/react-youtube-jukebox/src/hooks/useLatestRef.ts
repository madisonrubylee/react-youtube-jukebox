import { useEffect, useRef, type RefObject } from "react";

export function useLatestRef<T>(value: T): RefObject<T> {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref;
}
