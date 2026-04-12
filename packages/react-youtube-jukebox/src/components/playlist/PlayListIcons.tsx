export function MusicNoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}>
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
    </svg>
  );
}

export function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 1H1v5M10 1h5v5M6 15H1v-5M10 15h5v-5" />
    </svg>
  );
}

export function CompactIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 1 1 1 1 5M11 1l4 0 0 4M5 15l-4 0 0-4M11 15l4 0 0-4" />
      <rect x="4" y="4" width="8" height="8" rx="1" />
    </svg>
  );
}

export function MinimizeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M4 12h8" />
    </svg>
  );
}

export function PlayingIndicator() {
  return (
    <div className="rp-track__playing-icon">
      <div className="rp-track__playing-bar" />
      <div className="rp-track__playing-bar" />
      <div className="rp-track__playing-bar" />
    </div>
  );
}
