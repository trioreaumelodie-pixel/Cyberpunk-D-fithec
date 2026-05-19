import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { FarmCountScene } from './scenes/FarmCountScene';
import { LandScene } from './scenes/LandScene';
import { LivestockScene } from './scenes/LivestockScene';
import { MicroFarmsScene } from './scenes/MicroFarmsScene';
import { ConclusionScene } from './scenes/ConclusionScene';

// Total: ~3600 frames at 30fps = 2 minutes
// Timing (frames at 30fps):
// Title:      0–150   (5s)
// FarmCount: 150–450  (10s)
// Land:      450–750  (10s)
// Livestock: 750–1050 (10s)
// Micro:    1050–1350 (10s)
// Conclusion:1350–1590 (8s) + outro 1590–1650 (2s)

const FPS = 30;
const s = (seconds: number) => Math.round(seconds * FPS);

const SCENES = [
  { from: s(0),   duration: s(5),  Scene: TitleScene },
  { from: s(5),   duration: s(12), Scene: FarmCountScene },
  { from: s(17),  duration: s(12), Scene: LandScene },
  { from: s(29),  duration: s(12), Scene: LivestockScene },
  { from: s(41),  duration: s(12), Scene: MicroFarmsScene },
  { from: s(53),  duration: s(10), Scene: ConclusionScene },
];

export const VideoESEA: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#F8F8F0' }}>
      {SCENES.map(({ from, duration, Scene }, i) => (
        <Sequence key={i} from={from} durationInFrames={duration}>
          <Scene />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
