import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';
import { SLIDE_FARM_COUNT } from '../slides';
import { couleur } from '../colorMap';

const BAR_COLORS = [theme.colors.barC, theme.colors.barB, theme.colors.barA];

export const FarmCountScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi = (f: number) => interpolate(frame, [f, f + 20], [0, 1], { extrapolateRight: 'clamp' });
  const bw = (f: number, pct: number) => interpolate(frame, [f, f + 35], [0, pct * 6.8], { extrapolateRight: 'clamp' });
  const sc = (f: number) => spring({ frame: frame - f, fps, config: { damping: 15 }, from: 0, to: 1 });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      <div style={{ position: 'absolute', top: 55, left: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: fi(0) }}>
        <div style={{ width: 7, height: 64, background: theme.colors.greenDark, borderRadius: 4 }} />
        <div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 48, color: theme.colors.text, lineHeight: 1.05 }}>{SLIDE_FARM_COUNT.titre}</div>
          <div style={{ fontFamily: theme.fontBody, fontSize: 21, color: theme.colors.textSub, marginTop: 5 }}>{SLIDE_FARM_COUNT.sousTitre}</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 185, left: 80, opacity: fi(10) }}>
        <div style={{ fontFamily: theme.fontTitle, fontSize: 110, color: theme.colors.greenDark, lineHeight: 1 }}>{SLIDE_FARM_COUNT.grandChiffre}</div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 22, color: theme.colors.textSub, marginTop: 4 }}>{SLIDE_FARM_COUNT.labelChiffre}</div>
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 80, width: 760 }}>
        <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 16, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>
          {SLIDE_FARM_COUNT.labelGraphe}
        </div>
        {SLIDE_FARM_COUNT.barres.map(({ annee, valeur, etiquette }, i) => {
          const color = BAR_COLORS[i] ?? theme.colors.barA;
          return (
            <div key={annee} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 20, color: theme.colors.textSub, width: 54, flexShrink: 0 }}>{annee}</div>
              <div style={{ height: 46, width: bw(15 + i * 12, valeur), background: color, borderRadius: '0 6px 6px 0', display: 'flex', alignItems: 'center', paddingRight: 14, justifyContent: 'flex-end', minWidth: 12 }}>
                <span style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 18, color: color === theme.colors.barA ? '#fff' : theme.colors.text }}>{etiquette}</span>
              </div>
            </div>
          );
        })}
        <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: 4 }}>{SLIDE_FARM_COUNT.source}</div>
      </div>

      <div style={{ position: 'absolute', top: 175, right: 80, display: 'flex', flexDirection: 'column', gap: 22, width: 380 }}>
        {SLIDE_FARM_COUNT.cartes.map(({ valeur, label, detail, couleur: c }, i) => (
          <div key={label} style={{ transform: `scale(${sc(20 + i * 20)})`, background: theme.colors.white, borderRadius: 12, padding: '18px 24px', boxShadow: '0 3px 18px rgba(75,118,81,0.13)', borderLeft: `6px solid ${couleur(c)}` }}>
            <div style={{ fontFamily: theme.fontTitle, fontSize: 40, color: couleur(c), lineHeight: 1 }}>{valeur}</div>
            <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 17, color: theme.colors.text, marginTop: 3 }}>{label}</div>
            <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: 3 }}>{detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
