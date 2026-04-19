import { useCallback, useRef, useState } from "react";

type UsePersistentPlayerMountResult = {
  isContainerMounted: boolean;
  persistentWrapper: HTMLDivElement | null;
  playerMountRef: (slotNode: HTMLDivElement | null) => void;
};

function createPersistentWrapper(): HTMLDivElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  return wrapper;
}

export function usePersistentPlayerMount(): UsePersistentPlayerMountResult {
  const [persistentWrapper] = useState<HTMLDivElement | null>(
    createPersistentWrapper,
  );
  const mountedSlotRef = useRef<HTMLDivElement | null>(null);
  const [isContainerMounted, setIsContainerMounted] = useState(false);

  const playerMountRef = useCallback(
    (slotNode: HTMLDivElement | null) => {
      if (!persistentWrapper) {
        return;
      }

      const previousSlot = mountedSlotRef.current;

      if (
        previousSlot &&
        previousSlot !== slotNode &&
        previousSlot.contains(persistentWrapper)
      ) {
        previousSlot.removeChild(persistentWrapper);
      }

      mountedSlotRef.current = slotNode;

      if (!slotNode) {
        setIsContainerMounted(false);
        return;
      }

      slotNode.appendChild(persistentWrapper);
      setIsContainerMounted(true);
    },
    [persistentWrapper],
  );

  return {
    isContainerMounted,
    persistentWrapper,
    playerMountRef,
  };
}
