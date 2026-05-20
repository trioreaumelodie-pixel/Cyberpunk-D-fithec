import React from 'react';
import { Video, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../theme';

// L'outro dure 4.24s. À 30fps notre Sequence dure 5s (150 frames).
// On affiche la vidéo Ministry puis un fondu au blanc.
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', background: theme.colors.white, position: 'relative' }}>
      <Video
        src={staticFile('outro.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        startFrom={0}
        volume={1}
      />
      {/* Fondu au blanc en fin */}
      <div style={{
        position: 'absolute', inset: 0,
        background: theme.colors.white,
        opacity: fadeOut,
        pointerEvents: 'none',
      }} />
    </div>
  );
};
