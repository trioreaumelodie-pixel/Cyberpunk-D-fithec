import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { AgresteLogo } from '../components/AgresteLogo';
import { theme } from '../theme';

const KEY_POINTS = [
  { icon: '📉', text: '−12 % d\'exploitations en 3 ans',             color: '#C1292E' },
  { icon: '🌾', text: 'SAU stable : 3,9 millions ha',               color: theme.colors.greenDark },
  { icon: '📐', text: 'Surface moyenne : 60 → 68 ha',               color: theme.colors.green },
  { icon: '🐄', text: 'Cheptel en baisse : −4,2 % en UGB',          color: '#C1292E' },
  { icon: '🏘️', text: '23 % de micro-exploitations (en recul)',     color: theme.colors.mariBlue },
  { icon: '👩‍🌾', text: '42 % des micro-fermes dirigées par des femmes', color: theme.colors.green },
];

export const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi = (f: number) => interpolate(frame, [f, f + 22], [0, 1], { extrapolateRight: 'clamp' });
  const sc = (f: number) => spring({ frame: frame - f, fps, config: { damping: 15 }, from: 0, to: 1 });
  const lineW = interpolate(frame, [20, 50], [0, 300], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* Titre */}
      <div style={{ position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center', opacity: fi(0) }}>
        <div style={{ fontFamily: theme.fontTitle, fontSize: 54, color: theme.colors.text }}>Ce qu'il faut retenir</div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 20, color: theme.colors.textSub, marginTop: 6 }}>
          ESEA 2023 · Nouvelle-Aquitaine
        </div>
        <div style={{ width: lineW, height: 4, background: `linear-gradient(90deg, ${theme.colors.greenDark}, ${theme.colors.green})`, borderRadius: 2, margin: '14px auto 0' }} />
      </div>

      {/* Grille 3×2 */}
      <div style={{
        position: 'absolute', top: 190, left: 80, right: 80,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22,
      }}>
        {KEY_POINTS.map(({ icon, text, color }, i) => (
          <div key={text} style={{
            transform: `scale(${sc(18 + i * 10)})`,
            background: theme.colors.white, borderRadius: 14, padding: '24px 20px',
            boxShadow: '0 3px 18px rgba(75,118,81,0.10)',
            borderTop: `5px solid ${color}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10,
          }}>
            <div style={{ fontSize: 44 }}>{icon}</div>
            <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 19, color: theme.colors.text, lineHeight: 1.3 }}>{text}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 36, left: 80, right: 80,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        opacity: fi(75),
      }}>
        <AgresteLogo size={85} dark />
        <div style={{ textAlign: 'right', fontFamily: theme.fontBody, fontSize: 15, color: theme.colors.textSub, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700 }}>Agreste Nouvelle-Aquitaine · Études · Mars 2026 · N°59</div>
          <div>draaf.nouvelle-aquitaine.agriculture.gouv.fr</div>
          <div style={{ color: theme.colors.mariBlue }}>agreste.agriculture.gouv.fr</div>
        </div>
      </div>
    </div>
  );
};
