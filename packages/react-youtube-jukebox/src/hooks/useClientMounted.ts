import { useSyncExternalStore } from "react";

function subscribeToClientRender() {
  return () => undefined;
}

function getClientRenderSnapshot() {
  return true;
}

function getServerRenderSnapshot() {
  return false;
}

export function useClientMounted(): boolean {
  return useSyncExternalStore(
    subscribeToClientRender,
    getClientRenderSnapshot,
    getServerRenderSnapshot,
  );
}
