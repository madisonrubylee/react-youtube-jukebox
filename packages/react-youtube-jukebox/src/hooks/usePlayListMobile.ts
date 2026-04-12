import { useEffect, useState } from "react";

const PLAYLIST_MOBILE_MEDIA_QUERY =
  "(hover: none) and (pointer: coarse), (max-width: 640px)";

function getIsPlayListMobile() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(PLAYLIST_MOBILE_MEDIA_QUERY).matches;
}

export function usePlayListMobile() {
  const [isMobile, setIsMobile] = useState(getIsPlayListMobile);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(PLAYLIST_MOBILE_MEDIA_QUERY);

    const syncIsMobile = (event?: MediaQueryListEvent) => {
      setIsMobile(event?.matches ?? mediaQueryList.matches);
    };

    syncIsMobile();
    mediaQueryList.addEventListener("change", syncIsMobile);

    return () => {
      mediaQueryList.removeEventListener("change", syncIsMobile);
    };
  }, []);

  return isMobile;
}
