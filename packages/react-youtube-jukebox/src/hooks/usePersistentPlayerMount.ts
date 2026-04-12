import { useCallback, useRef, useState, type RefObject } from "react";

function createPersistentWrapper(): HTMLDivElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  return wrapper;
}

type UsePersistentPlayerMountResult = {
  isContainerMounted: boolean;
  persistentWrapperRef: RefObject<HTMLDivElement | null>;
  playerMountRef: (slotNode: HTMLDivElement | null) => void;
};

export function usePersistentPlayerMount(): UsePersistentPlayerMountResult {
  const persistentWrapperRef = useRef<HTMLDivElement | null>(
    createPersistentWrapper(),
  );
  const mountedSlotRef = useRef<HTMLDivElement | null>(null);
  const [isContainerMounted, setIsContainerMounted] = useState(false);

  const playerMountRef = useCallback((slotNode: HTMLDivElement | null) => {
    const wrapper = persistentWrapperRef.current;

    if (!wrapper) {
      return;
    }

    const previousSlot = mountedSlotRef.current;

    if (previousSlot && previousSlot !== slotNode && previousSlot.contains(wrapper)) {
      previousSlot.removeChild(wrapper);
    }

    mountedSlotRef.current = slotNode;

    if (!slotNode) {
      setIsContainerMounted(false);
      return;
    }

    slotNode.appendChild(wrapper);
    setIsContainerMounted(true);
  }, []);

  return {
    isContainerMounted,
    persistentWrapperRef,
    playerMountRef,
  };
}
