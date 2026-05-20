import React from 'react';
import { Composition } from 'remotion';
import { VideoESEA } from './VideoESEA';
import { theme } from './theme';
import { TOTAL_S } from './generatedTimings';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ESEA2023"
    component={VideoESEA}
    durationInFrames={Math.round(TOTAL_S * theme.fps)}
    fps={theme.fps}
    width={theme.w}
    height={theme.h}
    defaultProps={{}}
  />
);
