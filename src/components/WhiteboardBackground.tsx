import React from 'react';
import { theme } from '../theme';

export const WhiteboardBackground: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: theme.colors.offWhite,
      position: 'absolute',
      top: 0,
      left: 0,
    }}
  >
    {/* Subtle grid lines for whiteboard effect */}
    <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.06 }}>
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#004F27" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* Top bar */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        background: `linear-gradient(90deg, ${theme.colors.green} 0%, ${theme.colors.greenLight} 100%)`,
      }}
    />
    {/* Bottom bar */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        background: `linear-gradient(90deg, ${theme.colors.green} 0%, ${theme.colors.greenLight} 100%)`,
      }}
    />
  </div>
);
