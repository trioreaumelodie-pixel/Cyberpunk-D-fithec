import React from 'react';
import { Composition } from 'remotion';
import { VideoESEA } from './VideoESEA';

// Total duration: 63 seconds × 30fps
const DURATION_IN_FRAMES = 63 * 30;
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ESEA2023"
        component={VideoESEA}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
