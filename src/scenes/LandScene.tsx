import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';
import { SLIDE_LAND } from '../slides';
import { couleur } from '../colorMap';

export const LandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi    = (f: number) => interpolate(frame, [f, f + 22], [0, 1], { extrapolateRight: 'clamp' });
  const sc    = (f: number) => spring({ frame: frame - f, fps, config: { damping: 15 }, from: 0, to: 1 });
  const r     = 168;
  const circ  = 2 * Math.PI * r;
  const fill  = interpolate(frame, [18, 70], [0, 1], { extrapolateRight: 'clamp' });
  const arrowW = interpolate(frame, [55, 85], [0, 320], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      <div style={{ position: 'absolute', top: 55, left: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: fi(0) }}>
        <div style={{ width: 7, height: 64, background: theme.colors.green, borderRadius: 4 }} />
        <div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 48, color: theme.colors.text, lineHeight: 1.05 }}>{SLIDE_LAND.titre}</div>
          <div style={{ fontFamily: theme.fontBody, fontSize: 21, color: theme.colors.textSub, marginTop: 5 }}>{SLIDE_LAND.sousTitre}</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 80, top: 195, opacity: fi(12) }}>
        <svg width="420" height="420" viewBox="0 0 420 420">
          <circle cx="210" cy="210" r={r} fill={theme.colors.greenPale} />
          <circle cx="210" cy="210" r={r} fill="none" stroke={theme.colors.greenDark} strokeWidth={r * 0.58}
            strokeDasharray={`${circ * fill} ${circ}`} strokeLinecap="round" transform="rotate(-90 210 210)" />
          <circle cx="210" cy="210" r={r * 0.56} fill={theme.colors.white} />
          <text x="210" y="198" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="800" fontSize="52" fill={theme.colors.greenDark}>{SLIDE_LAND.donut.valeur}</text>
          <text x="210" y="234" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="20" fill={theme.colors.textSub}>{SLIDE_LAND.donut.unite}</text>
          <text x="210" y="262" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fill={theme.colors.textSub}>{SLIDE_LAND.donut.label}</text>
        </svg>
        <div style={{ textAlign: 'center', fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: -8 }}>{SLIDE_LAND.source}</div>
      </div>

      <div style={{ position: 'absolute', top: 200, left: 560, opacity: fi(40) }}>
        <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 17, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
          {SLIDE_LAND.fleche.titre}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 80, color: theme.colors.barC, lineHeight: 1 }}>{SLIDE_LAND.fleche.avant}</div>
          <div style={{ fontSize: 36, color: theme.colors.textSub }}>→</div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 80, color: theme.colors.greenDark, lineHeight: 1 }}>{SLIDE_LAND.fleche.apres}</div>
        </div>
        <div style={{ position: 'relative', height: 14, background: theme.colors.greenPale, borderRadius: 7, width: 560, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: arrowW, background: `linear-gradient(90deg, ${theme.colors.barC}, ${theme.colors.greenDark})`, borderRadius: 7 }} />
        </div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 16, color: theme.colors.textSub, marginTop: 8 }}>{SLIDE_LAND.fleche.detail}</div>
      </div>

      <div style={{ position: 'absolute', bottom: 90, right: 80, display: 'flex', flexDirection: 'column', gap: 20, width: 680 }}>
        {SLIDE_LAND.cartes.map(({ icone, titre, valeur, detail, couleur: c }, i) => (
          <div key={titre} style={{ transform: `scale(${sc(50 + i * 18)})`, background: theme.colors.white, borderRadius: 12, padding: '18px 24px', boxShadow: '0 3px 18px rgba(75,118,81,0.10)', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 40, lineHeight: 1 }}>{icone}</div>
            <div>
              <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 16, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{titre}</div>
              <div style={{ fontFamily: theme.fontTitle, fontSize: 30, color: couleur(c), marginTop: 3, lineHeight: 1.1 }}>{valeur}</div>
              <div style={{ fontFamily: theme.fontBody, fontSize: 15, color: theme.colors.textSub, marginTop: 4 }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
