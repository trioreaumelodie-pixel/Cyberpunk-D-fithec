import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';

export const LandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi = (f: number) => interpolate(frame, [f, f + 22], [0, 1], { extrapolateRight: 'clamp' });
  const sc = (f: number) => spring({ frame: frame - f, fps, config: { damping: 15 }, from: 0, to: 1 });

  // Anneau donut animé
  const r = 168;
  const circ = 2 * Math.PI * r;
  const fillPct = interpolate(frame, [18, 70], [0, 1], { extrapolateRight: 'clamp' });

  // Flèche surface (60→68 ha)
  const arrowW = interpolate(frame, [55, 85], [0, 320], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* En-tête */}
      <div style={{ position: 'absolute', top: 55, left: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: fi(0) }}>
        <div style={{ width: 7, height: 64, background: theme.colors.green, borderRadius: 4 }}/>
        <div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 48, color: theme.colors.text, lineHeight: 1.05 }}>
            Surface Agricole Utile (SAU)
          </div>
          <div style={{ fontFamily: theme.fontBody, fontSize: 21, color: theme.colors.textSub, marginTop: 5 }}>
            Un foncier stable malgré la baisse du nombre de fermes
          </div>
        </div>
      </div>

      {/* Donut SAU */}
      <div style={{ position: 'absolute', left: 80, top: 195, opacity: fi(12) }}>
        <svg width="420" height="420" viewBox="0 0 420 420">
          <circle cx="210" cy="210" r={r} fill={theme.colors.greenPale} />
          <circle cx="210" cy="210" r={r} fill="none"
            stroke={theme.colors.greenDark} strokeWidth={r * 0.58}
            strokeDasharray={`${circ * fillPct} ${circ}`}
            strokeLinecap="round" transform="rotate(-90 210 210)"
          />
          <circle cx="210" cy="210" r={r * 0.56} fill={theme.colors.white} />
          <text x="210" y="198" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="800" fontSize="52" fill={theme.colors.greenDark}>3,9M</text>
          <text x="210" y="234" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fill={theme.colors.textSub}>hectares</text>
          <text x="210" y="262" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill={theme.colors.textSub}>SAU régionale</text>
        </svg>
        <div style={{ textAlign: 'center', fontFamily: theme.fontBody, fontSize: 14, color: theme.colors.textSub, marginTop: -8 }}>
          Source : Agreste – ESEA 2023
        </div>
      </div>

      {/* Surface moyenne animée */}
      <div style={{ position: 'absolute', top: 200, left: 560, opacity: fi(40) }}>
        <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 17, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
          Surface moyenne par exploitation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 80, color: theme.colors.barC, lineHeight: 1 }}>60 ha</div>
          <div style={{ fontSize: 36, color: theme.colors.textSub }}>→</div>
          <div style={{ fontFamily: theme.fontTitle, fontSize: 80, color: theme.colors.greenDark, lineHeight: 1 }}>68 ha</div>
        </div>
        {/* Barre de progression */}
        <div style={{ position: 'relative', height: 14, background: theme.colors.greenPale, borderRadius: 7, width: 560, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: arrowW, background: `linear-gradient(90deg, ${theme.colors.barC}, ${theme.colors.greenDark})`, borderRadius: 7 }}/>
        </div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 16, color: theme.colors.textSub, marginTop: 8 }}>
          Entre 2020 et 2023 — agrandissement continu des fermes
        </div>
      </div>

      {/* Cartes */}
      <div style={{ position: 'absolute', bottom: 90, right: 80, display: 'flex', flexDirection: 'column', gap: 20, width: 680 }}>
        {[
          { f: 50, icon: '🌾', title: 'SAU totale stable', val: '3,9 millions ha', sub: 'malgré −4,7 % d\'exploitations', col: theme.colors.greenDark },
          { f: 68, icon: '🚜', title: 'Plus de prestataires', val: 'Main-d\'œuvre non familiale', sub: 'recours croissant aux ETA, CUMA, salariés', col: theme.colors.green },
        ].map(({ f, icon, title, val, sub, col }) => (
          <div key={title} style={{
            transform: `scale(${sc(f)})`,
            background: theme.colors.white, borderRadius: 12, padding: '18px 24px',
            boxShadow: '0 3px 18px rgba(75,118,81,0.10)',
            display: 'flex', gap: 18, alignItems: 'flex-start',
          }}>
            <div style={{ fontSize: 40, lineHeight: 1 }}>{icon}</div>
            <div>
              <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 16, color: theme.colors.textSub, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</div>
              <div style={{ fontFamily: theme.fontTitle, fontSize: 30, color: col, marginTop: 3, lineHeight: 1.1 }}>{val}</div>
              <div style={{ fontFamily: theme.fontBody, fontSize: 15, color: theme.colors.textSub, marginTop: 4 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
