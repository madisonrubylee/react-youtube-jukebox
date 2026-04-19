import { useEffect } from "react";

import { useLatestRef } from "../../../hooks/useLatestRef";

type JukeboxKeyboardActions = {
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  toggleMute: () => void;
};

function shouldIgnoreKeyboardShortcut(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  if (target.closest("input, textarea, select, [contenteditable='true']")) {
    return true;
  }

  if (target instanceof HTMLElement && target.isContentEditable) {
    return true;
  }

  return false;
}

/**
 * Binds global keyboard shortcuts for controlling the jukebox.
 * Actions are read via a latest-ref so the listener never re-registers
 * when the caller recreates callbacks between renders.
 */
export function useJukeboxKeyboardShortcuts(
  enabled: boolean,
  actions: JukeboxKeyboardActions,
): void {
  const actionsRef = useLatestRef(actions);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreKeyboardShortcut(event.target)) {
        return;
      }

      const { togglePlay, playNext, playPrev, toggleMute } = actionsRef.current;

      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
        return;
      }

      if (event.code === "ArrowRight") {
        event.preventDefault();
        playNext();
        return;
      }

      if (event.code === "ArrowLeft") {
        event.preventDefault();
        playPrev();
        return;
      }

      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, actionsRef]);
}
