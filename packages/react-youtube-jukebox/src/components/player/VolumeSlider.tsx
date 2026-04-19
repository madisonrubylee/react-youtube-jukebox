import type { ChangeEvent } from "react";

type VolumeSliderProps = {
  volume: number;
  onVolumeChange: (nextVolume: number) => void;
  className?: string;
};

export function VolumeSlider({
  volume,
  onVolumeChange,
  className,
}: VolumeSliderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value));
  };

  return (
    <input
      type="range"
      min={0}
      max={100}
      step={1}
      value={volume}
      onChange={handleChange}
      aria-label="Volume"
      className={className}
    />
  );
}
