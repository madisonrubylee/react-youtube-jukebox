"use client";

import { Jukebox, type JukeboxPosition, type JukeboxTrack } from "@react-youtube-jukebox/core";

import { demoTracks, emptyDemoTracks, singleDemoTrack } from "../lib/tracks";

type PreviewCardProps = {
  description: string;
  position?: JukeboxPosition;
  title: string;
  tracks: JukeboxTrack[];
};

function PreviewCard({
  description,
  position = "bottom-left",
  title,
  tracks,
}: PreviewCardProps) {
  return (
    <div className="docs-example-card">
      <div className="docs-example-card__header">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <div className="docs-preview docs-preview--compact">
        <div className="docs-preview__stage">
          <Jukebox tracks={tracks} portal={false} position={position} offset={20} />
        </div>
      </div>
    </div>
  );
}

export function ExamplesShowcase() {
  return (
    <div className="docs-example-grid">
      <PreviewCard
        title="Bottom Left"
        description="Inline preview of the default compact dock."
        tracks={demoTracks}
      />
      <PreviewCard
        title="Top Right"
        description="Same component, but pinned to the opposite corner."
        tracks={demoTracks}
        position="top-right"
      />
      <PreviewCard
        title="Single Track"
        description="Previous and next controls stay disabled with one track."
        tracks={singleDemoTrack}
      />
      <PreviewCard
        title="Empty Tracks"
        description="Fallback state renders safely instead of crashing."
        tracks={emptyDemoTracks}
      />
    </div>
  );
}
