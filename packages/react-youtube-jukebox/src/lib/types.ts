import type { ReactNode } from "react";

export type JukeboxTrack = {
  videoId: string;
  title: string;
  artist?: string;
};

export type JukeboxPosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left"
  | "top-center";

export type JukeboxTheme = "glass" | "simple" | "sunset" | "ride";
export type JukeboxChrome = "classic" | "wallet" | "ride";

export type JukeboxOffset = number | { x: number; y: number };

export type RepeatMode = "none" | "all" | "one";

export type JukeboxProps = {
  tracks: JukeboxTrack[];
  autoplay?: boolean;
  showSeekBar?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onTrackChange?: (track: JukeboxTrack, index: number) => void;
  onEnd?: () => void;
  keyboard?: boolean;
  position?: JukeboxPosition;
  theme?: JukeboxTheme;
  chrome?: JukeboxChrome;
  offset?: JukeboxOffset;
  portal?: boolean;
  className?: string;
  renderExpandedContent?: (props: JukeboxExpandedRenderProps) => ReactNode;
};

export type UseJukeboxOptions = {
  tracks: JukeboxTrack[];
  autoplay?: boolean | undefined;
  defaultIndex?: number | undefined;
  currentIndex?: number | undefined;
  onCurrentIndexChange?: ((index: number) => void) | undefined;
  onPlay?: (() => void) | undefined;
  onPause?: (() => void) | undefined;
  onTrackChange?: ((track: JukeboxTrack, index: number) => void) | undefined;
  onEnd?: (() => void) | undefined;
  defaultExpanded?: boolean | undefined;
  expanded?: boolean | undefined;
  onExpandedChange?: ((expanded: boolean) => void) | undefined;
};

export type JukeboxPlayerState = {
  currentIndex: number;
  isMuted: boolean;
  isPlaying: boolean;
  playerMountRef: (node: HTMLDivElement | null) => void;
  volume: number;
  setVolume: (nextVolume: number) => void;
  toggleMute: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  playTrackAt: (index: number) => void;
  shuffle: boolean;
  toggleShuffle: () => void;
  repeat: RepeatMode;
  cycleRepeat: () => void;
  progress: number;
  duration: number;
  currentTime: number;
  seek: (seconds: number) => void;
};

export type JukeboxExpandedRenderProps = Omit<
  JukeboxPlayerState,
  "shuffle" | "toggleShuffle" | "repeat" | "cycleRepeat"
> & {
  currentTrack: JukeboxTrack;
  isExpanded: boolean;
  nextTrack: JukeboxTrack | undefined;
  totalTracks: number;
};

export type UseJukeboxResult = {
  player: JukeboxPlayerState;
  currentTrack: JukeboxTrack | undefined;
  nextTrack: JukeboxTrack | undefined;
  totalTracks: number;
  hasTracks: boolean;
  hasMultipleTracks: boolean;
  expanded: boolean;
  openExpanded: () => void;
  closeExpanded: () => void;
  toggleExpanded: () => void;
};

export type PlayListTrack = {
  title: string;
  artist: string;
  videoId: string;
};

export type PlayListItem = {
  title: string;
  image?: string;
  data: PlayListTrack[];
};

export type PlayListTheme = "light" | "dark";
export type PlayListSize = "mini" | "compact" | "expanded";

export type PlayListPosition = JukeboxPosition;
export type PlayListOffset = JukeboxOffset;

export type PlayListProps = {
  playlist: PlayListItem[];
  autoplay?: boolean;
  showSeekBar?: boolean;
  accentColor?: string;
  theme?: PlayListTheme;
  size?: PlayListSize;
  defaultSize?: PlayListSize;
  onSizeChange?: (size: PlayListSize) => void;
  position?: PlayListPosition;
  offset?: PlayListOffset;
  portal?: boolean;
  className?: string;
};

export type UsePlayListOptions = {
  playlist: PlayListItem[];
  autoplay?: boolean | undefined;
  defaultTabIndex?: number | undefined;
  activeTabIndex?: number | undefined;
  onActiveTabIndexChange?: ((index: number) => void) | undefined;
  defaultSize?: PlayListSize | undefined;
  size?: PlayListSize | undefined;
  onSizeChange?: ((size: PlayListSize) => void) | undefined;
  defaultIndex?: number | undefined;
  currentIndex?: number | undefined;
  onCurrentIndexChange?: ((index: number) => void) | undefined;
  onPlay?: (() => void) | undefined;
  onPause?: (() => void) | undefined;
  onTrackChange?: ((track: PlayListTrack, index: number) => void) | undefined;
  onEnd?: (() => void) | undefined;
};

export type UsePlayListResult = {
  player: JukeboxPlayerState;
  activeTabIndex: number;
  activePlaylist: PlayListItem | undefined;
  activeTracks: PlayListTrack[];
  currentTrack: PlayListTrack | undefined;
  size: PlayListSize;
  isMini: boolean;
  isExpanded: boolean;
  setActiveTabIndex: (index: number) => void;
  selectTrack: (index: number) => void;
  toggleSize: () => void;
  minimize: () => void;
  restore: () => void;
};
