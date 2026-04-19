import type { ChangeEvent } from "react";

const PROGRESS_STEP_SECONDS = 0.1;

type ProgressSliderProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  disabled?: boolean;
  className?: string;
};

export function ProgressSlider({
  currentTime,
  duration,
  onSeek,
  disabled = false,
  className,
}: ProgressSliderProps) {
  const progressMax = duration > 0 ? duration : 1;
  const isUnseekable = disabled || !duration;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(event.target.value));
  };

  return (
    <input
      type="range"
      min={0}
      max={progressMax}
      step={PROGRESS_STEP_SECONDS}
      value={Math.min(currentTime, progressMax)}
      onChange={handleChange}
      aria-label="Playback position"
      className={className}
      disabled={isUnseekable}
    />
  );
}
