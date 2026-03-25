"use client";

import { Jukebox } from "@react-youtube-jukebox/core";

import { demoTracks } from "../lib/tracks";

export function LivePreview() {
  return (
    <div className="docs-preview">
      <div className="docs-preview__stage">
        <Jukebox
          tracks={demoTracks}
          portal={false}
          position="bottom-left"
          offset={24}
        />
      </div>
    </div>
  );
}
