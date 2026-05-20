import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';

const bars = [
  { year: '2010', val: 100, label: '~73 000', color: theme.colors.barC },
  { year: '2020', val: 87,  label: '~64 000', color: theme.colors.barB },
  { year: '2023', val: 77,  label: '56 552',  color: theme.colors.barA },
];

export const FarmCountScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi  = (f: number) => interpolate(frame, [f, f + 20], [0, 1], { extrapolateRight: 'clamp' });
  const bw  = (f: number, pct: number) => interpolate(frame, [f, f + 35], [0, pct * 6.8], { extrapolateRight: 'clamp' });
  const sc  = (f: number) => spring({ frame: frame - f, fps, config: { damping: 15 }, from: 0, to: 1 });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* En-tête */}
      <div style={{ position: 'absolute', top: 55, left: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: fi(0) }}>
        <div style={{ width: 7, height: 64, background: theme.colors.greenDark, borderRadius: 4 }}/>
        <div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 48, color: theme.colors.text, lineHeight: 1.05 }}>
            Nombre d'exploitations agricoles
          </div>
          <div style={{ fontFamily: theme.fontBody, fontSize: 21, color: theme.colors.textSub, marginTop: 5 }}>
            Nouvelle-Aquitaine — hors micro-exploitations
          </div>
        </div>
      </div>

      {/* Grand chiffre */}
      <div style={{ position: 'absolute', top: 185, left: 80, opacity: fi(10) }}>
        <div style={{ fontFamily: theme.fontTitle, fontSize: 110, color: theme.colors.greenDark, lineHeight: 1 }}>
          56 552
        </div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 22, color: theme.colors.textSub, marginTop: 4 }}>
          exploitations en 2023
        </div>
      </div>

      {/* Barres horizontales */}
      <div style={{ position: 'absolute', bottom: 110, left: 80, width: 760 }}>
        <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 16, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>
          Évolution du nombre d'exploitations
        </div>
        {bars.map(({ year, val, label, color }, i) => (
          <div key={year} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 20, color: theme.colors.textSub, width: 54, flexShrink: 0 }}>{year}</div>
            <div style={{
              height: 46, width: bw(15 + i * 12, val),
              background: color, borderRadius: '0 6px 6px 0',
              display: 'flex', alignItems: 'center', paddingRight: 14, justifyContent: 'flex-end', minWidth: 12,
            }}>
              <span style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 18, color: color === theme.colors.barA ? '#fff' : theme.colors.text }}>{label}</span>
            </div>
          </div>
        ))}
        <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: 4 }}>
          Source : Agreste – RA 2010, RA 2020, ESEA 2023
        </div>
      </div>

      {/* Cartes stats */}
      <div style={{ position: 'absolute', top: 175, right: 80, display: 'flex', flexDirection: 'column', gap: 22, width: 380 }}>
        {[
          { f: 20, val: '−12 %', label: 'en 3 ans', sub: 'rythme national similaire', border: '#C1292E' },
          { f: 40, val: '−10,9 %/an', label: 'micro-exploitations', sub: 'recul accéléré lié à la PAC 2023', border: '#C1292E' },
          { f: 60, val: '+0,1 %/an', label: 'grandes exploitations', sub: 'effectifs stables', border: theme.colors.green },
        ].map(({ f, val, label, sub, border }) => (
          <div key={label} style={{
            transform: `scale(${sc(f)})`,
            background: theme.colors.white, borderRadius: 12, padding: '18px 24px',
            boxShadow: '0 3px 18px rgba(75,118,81,0.13)', borderLeft: `6px solid ${border}`,
          }}>
            <div style={{ fontFamily: theme.fontTitle, fontSize: 40, color: border, lineHeight: 1 }}>{val}</div>
            <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 17, color: theme.colors.text, marginTop: 3 }}>{label}</div>
            <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: 3 }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
