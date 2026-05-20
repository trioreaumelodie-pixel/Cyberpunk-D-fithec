import React from 'react';
import { theme } from '../theme';

interface Props { size?: number; dark?: boolean }

export const AgresteLogo: React.FC<Props> = ({ size = 100, dark = true }) => {
  const c = dark ? theme.colors.greenDark : theme.colors.white;
  const a = dark ? theme.colors.green : theme.colors.greenLight;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 60 60" fill="none">
        <line x1="30" y1="55" x2="30" y2="14" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="19" cy="30" rx="9" ry="4.5" fill={a} transform="rotate(-30 19 30)"/>
        <ellipse cx="41" cy="30" rx="9" ry="4.5" fill={a} transform="rotate(30 41 30)"/>
        <ellipse cx="30" cy="14" rx="8" ry="4.5" fill={c}/>
        <ellipse cx="21" cy="20" rx="6" ry="3.2" fill={c} transform="rotate(-20 21 20)"/>
        <ellipse cx="39" cy="20" rx="6" ry="3.2" fill={c} transform="rotate(20 39 20)"/>
      </svg>
      <div style={{ fontFamily: theme.fontBody, fontWeight: 800, fontSize: size * 0.22, color: c, letterSpacing: '0.18em', lineHeight: 1 }}>
        agreste
      </div>
      <div style={{ fontFamily: theme.fontBody, fontSize: size * 0.1, color: dark ? theme.colors.textSub : 'rgba(255,255,255,0.7)', lineHeight: 1.2 }}>
        La statistique agricole
      </div>
    </div>
  );
};
