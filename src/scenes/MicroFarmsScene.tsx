import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';

export const MicroFarmsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi = (f: number) => interpolate(frame, [f, f + 22], [0, 1], { extrapolateRight: 'clamp' });
  const sc = (f: number) => spring({ frame: frame - f, fps, config: { damping: 15 }, from: 0, to: 1 });

  // Camembert 23%
  const r = 160;
  const circ = 2 * Math.PI * r;
  const pct  = interpolate(frame, [18, 65], [0, 0.23], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* En-tête */}
      <div style={{ position: 'absolute', top: 55, left: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: fi(0) }}>
        <div style={{ width: 7, height: 64, background: theme.colors.mariBlue, borderRadius: 4 }}/>
        <div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 48, color: theme.colors.text, lineHeight: 1.05 }}>Les micro-exploitations</div>
          <div style={{ fontFamily: theme.fontBody, fontSize: 21, color: theme.colors.textSub, marginTop: 5 }}>
            Un quart des fermes, une part en recul
          </div>
        </div>
      </div>

      {/* Camembert */}
      <div style={{ position: 'absolute', left: 80, top: 185, opacity: fi(12) }}>
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r={r} fill={theme.colors.greenPale} />
          <circle cx="200" cy="200" r={r} fill="none"
            stroke={theme.colors.mariBlue} strokeWidth={r * 0.9}
            strokeDasharray={`${circ * pct} ${circ}`}
            strokeLinecap="butt" transform="rotate(-90 200 200)"
          />
          <circle cx="200" cy="200" r={r * 0.5} fill={theme.colors.white} />
          <text x="200" y="192" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="800" fontSize="44" fill={theme.colors.mariBlue}>23 %</text>
          <text x="200" y="224" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fill={theme.colors.textSub}>micro-exploit.</text>
        </svg>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: -12 }}>
          {[{ c: theme.colors.mariBlue, l: 'Micro (<25k€ PBS)' }, { c: theme.colors.greenPale, l: 'Autres exploit.' }].map(({ c, l }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 16, height: 16, background: c, borderRadius: 3, border: `1px solid ${theme.colors.greenLight}` }}/>
              <span style={{ fontFamily: theme.fontBody, fontSize: 15, color: theme.colors.text }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparaison 2020 vs 2023 */}
      <div style={{ position: 'absolute', top: 190, left: 540, opacity: fi(30) }}>
        <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 17, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>
          Part dans le total des exploitations
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
          {[{ val: '29 %', year: '2020', col: theme.colors.barC, h: 130 }, { val: '23 %', year: '2023', col: theme.colors.mariBlue, h: 100 }].map(({ val, year, col, h }) => (
            <div key={year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: theme.fontTitle, fontSize: 38, color: col }}>{val}</div>
              <div style={{ width: 80, height: h, background: col, borderRadius: '6px 6px 0 0' }}/>
              <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 18, color: theme.colors.textSub }}>{year}</div>
            </div>
          ))}
          <div style={{ marginBottom: 50, fontSize: 32, color: '#C1292E' }}>↓</div>
        </div>
      </div>

      {/* Cartes profil */}
      <div style={{ position: 'absolute', bottom: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 18, width: 680 }}>
        {[
          { f: 35, icon: '🏘️', val: '13 220', lbl: 'micro-exploitations (2023)', sub: '23 % du total · superficie moyenne 14 ha', col: theme.colors.mariBlue },
          { f: 55, icon: '👴', val: '57 ans', lbl: 'âge moyen des dirigeants', sub: 'souvent pluriactifs (vs 49 ans pour les autres)', col: theme.colors.textSub },
          { f: 72, icon: '👩‍🌾', val: '42 %', lbl: 'dirigées par des femmes', sub: 'contre 25 % pour les autres exploitations', col: theme.colors.green },
        ].map(({ f, icon, val, lbl, sub, col }) => (
          <div key={lbl} style={{
            transform: `scale(${sc(f)})`, background: theme.colors.white,
            borderRadius: 12, padding: '14px 22px',
            boxShadow: '0 3px 16px rgba(75,118,81,0.10)',
            display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <div style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{icon}</div>
            <div>
              <div style={{ fontFamily: theme.fontTitle, fontSize: 34, color: col, lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 16, color: theme.colors.text, marginTop: 2 }}>{lbl}</div>
              <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: 2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
