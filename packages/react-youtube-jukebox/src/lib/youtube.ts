export const PLAYER_STATE_ENDED = 0;
export const PLAYER_STATE_PLAYING = 1;
export const PLAYER_STATE_PAUSED = 2;

export type YouTubePlayerStateEvent = {
  data: number;
};

export type YouTubePlayerErrorEvent = {
  data: number;
};

export type YouTubePlayer = {
  cueVideoById(videoId: string): void;
  destroy(): void;
  getCurrentTime(): number;
  getDuration(): number;
  loadVideoById(videoId: string): void;
  mute(): void;
  pauseVideo(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  unMute(): void;
};

export type YouTubePlayerOptions = {
  events: {
    onError: (event: YouTubePlayerErrorEvent) => void;
    onReady: () => void;
    onStateChange: (event: YouTubePlayerStateEvent) => void;
  };
  height: string;
  playerVars: {
    controls: 0 | 1;
    origin?: string;
    playsinline: 0 | 1;
    rel: 0 | 1;
  };
  videoId: string;
  width: string;
};

export type YouTubeNamespace = {
  Player: new (
    element: HTMLDivElement,
    options: YouTubePlayerOptions,
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeIframeApiPromise: Promise<YouTubeNamespace> | null = null;

export function canControlPlayer(
  player: YouTubePlayer | null,
): player is YouTubePlayer {
  return (
    player !== null &&
    typeof player.pauseVideo === "function" &&
    typeof player.playVideo === "function"
  );
}

export function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube iframe API requires a browser."));
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeIframeApiPromise) {
    return youtubeIframeApiPromise;
  }

  youtubeIframeApiPromise = new Promise<YouTubeNamespace>((resolve, reject) => {
    const resetPromise = () => {
      youtubeIframeApiPromise = null;
    };
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    const script = existingScript ?? document.createElement("script");

    if (!existingScript) {
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.append(script);
    }

    const handleError = () => {
      resetPromise();
      reject(new Error("Failed to load the YouTube iframe API."));
    };

    script.addEventListener("error", handleError, { once: true });

    const previousReadyHandler = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      script.removeEventListener("error", handleError);

      if (!window.YT?.Player) {
        resetPromise();
        reject(new Error("YouTube iframe API loaded without a player."));
        return;
      }

      resolve(window.YT);
    };
  });

  return youtubeIframeApiPromise;
}
