import React from 'react';
import { Composition } from 'remotion';
import { VideoESEA } from './VideoESEA';
import { TOTAL_S, theme } from './theme';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ESEA2023"
    component={VideoESEA}
    durationInFrames={TOTAL_S * theme.fps}
    fps={theme.fps}
    width={theme.w}
    height={theme.h}
    defaultProps={{}}
  />
);
