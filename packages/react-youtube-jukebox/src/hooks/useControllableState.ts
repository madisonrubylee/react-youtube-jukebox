import { useCallback, useState, type Dispatch, type SetStateAction } from "react";

type UseControllableStateOptions<T> = {
  value: T | undefined;
  defaultValue: T;
  onChange: ((value: T) => void) | undefined;
};

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): readonly [T, Dispatch<SetStateAction<T>>] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (nextValue) => {
      const resolvedNextValue =
        typeof nextValue === "function"
          ? (nextValue as (previousValue: T) => T)(resolvedValue)
          : nextValue;

      if (!isControlled) {
        setInternalValue(resolvedNextValue);
      }

      onChange?.(resolvedNextValue);
    },
    [isControlled, onChange, resolvedValue],
  );

  return [resolvedValue, setValue] as const;
}
