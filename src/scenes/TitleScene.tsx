import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { AgresteLogo } from '../components/AgresteLogo';
import { theme } from '../theme';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn   = (f: number) => interpolate(frame, [f, f + 22], [0, 1], { extrapolateRight: 'clamp' });
  const slideUp  = (f: number) => interpolate(frame, [f, f + 22], [28, 0], { extrapolateRight: 'clamp' });
  const lineW    = interpolate(frame, [45, 75], [0, 560], { extrapolateRight: 'clamp' });
  const logoSc   = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 100 }, from: 0, to: 1 });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* Logo Agreste haut-gauche */}
      <div style={{ position: 'absolute', top: 52, left: 80, transform: `scale(${logoSc})`, transformOrigin: 'top left' }}>
        <AgresteLogo size={110} dark />
      </div>

      {/* Badge étude */}
      <div style={{ position: 'absolute', top: 52, right: 80, opacity: fadeIn(30), display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <div style={{ background: theme.colors.greenDark, color: '#fff', fontFamily: theme.fontBody, fontWeight: 700, fontSize: 17, padding: '5px 16px', borderRadius: 4, letterSpacing: '0.06em' }}>
          MARS 2026 · N°59
        </div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 16, color: theme.colors.textSub }}>
          Nouvelle-Aquitaine
        </div>
      </div>

      {/* Titre principal */}
      <div style={{ position: 'absolute', top: 210, left: 80, right: 80 }}>
        <div style={{
          opacity: fadeIn(18), transform: `translateY(${slideUp(18)}px)`,
          fontFamily: theme.fontTitle,
          fontSize: 82,
          color: theme.colors.text,
          lineHeight: 1.12,
          maxWidth: 1100,
        }}>
          En 2023, les tendances{' '}
          <span style={{ color: theme.colors.greenDark }}>2010–2020</span>
          <br/>se poursuivent en<br/>
          <span style={{ color: theme.colors.greenDark }}>Nouvelle-Aquitaine</span>
        </div>

        {/* Ligne animée */}
        <div style={{ width: lineW, height: 4, background: `linear-gradient(90deg, ${theme.colors.greenDark}, ${theme.colors.green})`, borderRadius: 2, marginTop: 32 }} />

        <div style={{ opacity: fadeIn(50), transform: `translateY(${slideUp(50)}px)`, marginTop: 24, fontFamily: theme.fontBody, fontSize: 26, color: theme.colors.textSub, lineHeight: 1.5 }}>
          Enquête sur la structure des exploitations agricoles en 2023
        </div>
        <div style={{ opacity: fadeIn(60), marginTop: 10, fontFamily: theme.fontBody, fontSize: 20, color: theme.colors.textSub }}>
          En comparaison aux recensements agricoles de 2010 et 2020
        </div>
      </div>

      {/* Source bas-droite */}
      <div style={{ position: 'absolute', bottom: 36, right: 80, opacity: fadeIn(70), fontFamily: theme.fontBody, fontSize: 15, color: theme.colors.textSub }}>
        Source : Agreste – ESEA 2023
      </div>
    </div>
  );
};
