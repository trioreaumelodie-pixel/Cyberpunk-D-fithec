import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';
import { SLIDE_LIVESTOCK } from '../slides';
import { couleur } from '../colorMap';

export const LivestockScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi  = (f: number) => interpolate(frame, [f, f + 22], [0, 1], { extrapolateRight: 'clamp' });
  const sc  = (f: number) => spring({ frame: frame - f, fps, config: { damping: 15 }, from: 0, to: 1 });
  const bw  = (f: number, v: number) => interpolate(frame, [f, f + 35], [0, (v / 8300) * 580], { extrapolateRight: 'clamp' });

  const detailLignes = SLIDE_LIVESTOCK.grandeStat.detail.split('\n');

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      <div style={{ position: 'absolute', top: 55, left: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: fi(0) }}>
        <div style={{ width: 7, height: 64, background: '#C1292E', borderRadius: 4 }} />
        <div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 48, color: theme.colors.text, lineHeight: 1.05 }}>{SLIDE_LIVESTOCK.titre}</div>
          <div style={{ fontFamily: theme.fontBody, fontSize: 21, color: theme.colors.textSub, marginTop: 5 }}>{SLIDE_LIVESTOCK.sousTitre}</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 185, left: 80, transform: `scale(${sc(8)})`, background: theme.colors.white, borderRadius: 16, padding: '28px 40px', boxShadow: '0 4px 24px rgba(193,41,46,0.12)', borderTop: '6px solid #C1292E', width: 420 }}>
        <div style={{ fontFamily: theme.fontTitle, fontSize: 90, color: '#C1292E', lineHeight: 1 }}>{SLIDE_LIVESTOCK.grandeStat.valeur}</div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 20, color: theme.colors.text, marginTop: 6 }}>{SLIDE_LIVESTOCK.grandeStat.label}</div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 16, color: theme.colors.textSub, marginTop: 14, lineHeight: 1.6 }}>
          {detailLignes.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 140, left: 80, width: 740 }}>
        <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 16, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
          Cheptel (milliers de têtes)
        </div>
        {SLIDE_LIVESTOCK.barres.map(({ label, v2020, v2023, unite }, i) => (
          <div key={label} style={{ marginBottom: 26 }}>
            <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 19, color: theme.colors.text, marginBottom: 8 }}>{label}</div>
            {[
              { year: '2020', v: v2020, color: theme.colors.barC, f: 20 + i * 15 },
              { year: '2023', v: v2023, color: theme.colors.barA, f: 30 + i * 15 },
            ].map(({ year, v, color, f }) => (
              <div key={year} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                <div style={{ fontFamily: theme.fontBody, fontSize: 15, color: theme.colors.textSub, width: 44 }}>{year}</div>
                <div style={{ height: 38, width: bw(f, v), background: color, borderRadius: '0 5px 5px 0', display: 'flex', alignItems: 'center', paddingLeft: 10, minWidth: 12 }}>
                  <span style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 15, color: color === theme.colors.barA ? '#fff' : theme.colors.text }}>{v.toLocaleString('fr-FR')} {unite}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ fontFamily: theme.fontBody, fontSize: 13, color: theme.colors.textSub }}>{SLIDE_LIVESTOCK.source}</div>
      </div>

      <div style={{ position: 'absolute', top: 200, right: 80, display: 'flex', flexDirection: 'column', gap: 20, width: 390 }}>
        {SLIDE_LIVESTOCK.cartes.map(({ valeur, label, detail, couleur: c }, i) => (
          <div key={label} style={{ transform: `scale(${sc(28 + i * 20)})`, background: theme.colors.white, borderRadius: 12, padding: '16px 22px', boxShadow: '0 3px 16px rgba(75,118,81,0.10)', borderLeft: `6px solid ${couleur(c)}` }}>
            <div style={{ fontFamily: theme.fontTitle, fontSize: 36, color: couleur(c), lineHeight: 1 }}>{valeur}</div>
            <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 16, color: theme.colors.text, marginTop: 3 }}>{label}</div>
            <div style={{ fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: 2 }}>{detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
