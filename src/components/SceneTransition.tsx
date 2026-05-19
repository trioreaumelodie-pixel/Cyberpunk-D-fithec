import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { theme } from '../theme';

interface Props {
  label: string;
  number: number;
}

export const SceneTransition: React.FC<Props> = ({ label, number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Slide in from left, hold, slide out to right
  const totalFrames = durationInFrames;
  const slideIn = interpolate(frame, [0, 12], [-100, 0], { extrapolateRight: 'clamp' });
  const slideOut = interpolate(frame, [totalFrames - 12, totalFrames], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tx = frame < totalFrames - 12 ? slideIn : slideOut;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: theme.colors.green,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateX(${tx}%)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.2em',
            marginBottom: 16,
          }}
        >
          0{number}
        </div>
        <div
          style={{
            fontFamily: theme.fonts.heading,
            fontWeight: 800,
            fontSize: 64,
            color: theme.colors.white,
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: 80,
            height: 4,
            background: theme.colors.greenLight,
            margin: '24px auto 0',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};
