"use client";

import { useEffect, useState } from "react";

import type { JukeboxPosition } from "@react-youtube-jukebox/core";

const MOBILE_PREVIEW_MEDIA_QUERY = "(max-width: 640px)";

export function useIsMobilePreview() {
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(MOBILE_PREVIEW_MEDIA_QUERY);

    const syncIsMobilePreview = () => {
      setIsMobilePreview(mediaQueryList.matches);
    };

    syncIsMobilePreview();
    mediaQueryList.addEventListener("change", syncIsMobilePreview);

    return () => {
      mediaQueryList.removeEventListener("change", syncIsMobilePreview);
    };
  }, []);

  return isMobilePreview;
}

export function getResponsivePreviewPosition(
  position: JukeboxPosition,
  isMobilePreview: boolean,
): JukeboxPosition {
  if (!isMobilePreview) {
    return position;
  }

  if (position.startsWith("top")) {
    return "top-center";
  }

  return "bottom-center";
}
