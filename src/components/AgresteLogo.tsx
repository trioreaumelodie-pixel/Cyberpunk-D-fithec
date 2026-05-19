import React from 'react';
import { theme } from '../theme';

interface Props {
  size?: number;
  light?: boolean;
}

export const AgresteLogo: React.FC<Props> = ({ size = 120, light = false }) => {
  const color = light ? theme.colors.white : theme.colors.green;
  const accent = theme.colors.greenLight;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      {/* Stylized wheat/plant icon */}
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 60 60" fill="none">
        {/* Stem */}
        <line x1="30" y1="55" x2="30" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />
        {/* Left grain */}
        <ellipse cx="20" cy="30" rx="9" ry="5" fill={accent} transform="rotate(-30 20 30)" />
        {/* Right grain */}
        <ellipse cx="40" cy="30" rx="9" ry="5" fill={accent} transform="rotate(30 40 30)" />
        {/* Top grain */}
        <ellipse cx="30" cy="15" rx="8" ry="5" fill={color} />
        {/* Small left */}
        <ellipse cx="22" cy="20" rx="6" ry="3.5" fill={color} transform="rotate(-20 22 20)" />
        {/* Small right */}
        <ellipse cx="38" cy="20" rx="6" ry="3.5" fill={color} transform="rotate(20 38 20)" />
      </svg>
      {/* AGRESTE wordmark */}
      <div
        style={{
          fontFamily: theme.fonts.heading,
          fontWeight: 800,
          fontSize: size * 0.28,
          color,
          letterSpacing: '0.15em',
          lineHeight: 1,
        }}
      >
        agreste
      </div>
      {/* Subtitle */}
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontSize: size * 0.1,
          color: light ? 'rgba(255,255,255,0.8)' : theme.colors.grayDark,
          letterSpacing: '0.05em',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: size * 1.8,
        }}
      >
        La statistique agricole
      </div>
    </div>
  );
};
