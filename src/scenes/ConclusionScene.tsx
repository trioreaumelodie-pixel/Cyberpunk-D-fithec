import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { AgresteLogo } from '../components/AgresteLogo';
import { theme } from '../theme';

const keyPoints = [
  { icon: '📉', text: '−12 % d\'exploitations en 3 ans', color: theme.colors.red },
  { icon: '🌾', text: 'SAU stable à 3,9 millions ha', color: theme.colors.green },
  { icon: '📐', text: 'Surface moyenne : 60 → 68 ha', color: theme.colors.greenLight },
  { icon: '🐄', text: 'Cheptel en baisse : −4,2 % en UGB', color: theme.colors.red },
  { icon: '🏘️', text: '23 % de micro-exploitations (en recul)', color: theme.colors.blue },
  { icon: '👩‍🌾', text: '42 % des micro-fermes dirigées par des femmes', color: theme.colors.greenLight },
];

export const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const logoOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 55,
          left: 80,
          right: 80,
          opacity: titleOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.heading,
            fontWeight: 800,
            fontSize: 50,
            color: theme.colors.green,
          }}
        >
          Ce qu'il faut retenir
        </div>
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 22,
            color: theme.colors.grayDark,
            marginTop: 8,
          }}
        >
          ESEA 2023 — Nouvelle-Aquitaine
        </div>
        <div
          style={{
            width: 200,
            height: 4,
            background: `linear-gradient(90deg, ${theme.colors.green}, ${theme.colors.greenLight})`,
            borderRadius: 2,
            margin: '16px auto 0',
          }}
        />
      </div>

      {/* Key points grid */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 80,
          right: 80,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 24,
        }}
      >
        {keyPoints.map(({ icon, text, color }, i) => {
          const cardSpring = spring({
            frame: frame - (20 + i * 12),
            fps,
            config: { damping: 14 },
            from: 0,
            to: 1,
          });

          return (
            <div
              key={text}
              style={{
                transform: `scale(${cardSpring})`,
                background: theme.colors.white,
                borderRadius: 14,
                padding: '28px 24px',
                boxShadow: '0 4px 24px rgba(0,79,39,0.08)',
                borderTop: `5px solid ${color}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 12,
              }}
            >
              <div style={{ fontSize: 48 }}>{icon}</div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontWeight: 700,
                  fontSize: 20,
                  color: theme.colors.text,
                  lineHeight: 1.3,
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with logo and source */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 80px',
          opacity: logoOpacity,
        }}
      >
        <AgresteLogo size={90} />
        <div style={{ textAlign: 'right', fontFamily: theme.fonts.body, fontSize: 16, color: theme.colors.grayDark }}>
          <div style={{ fontWeight: 700 }}>Agreste Nouvelle-Aquitaine · Études · Mars 2026 · N°59</div>
          <div>Source : Agreste – ESEA 2023</div>
          <div style={{ marginTop: 4, color: theme.colors.blue }}>
            draaf.nouvelle-aquitaine.agriculture.gouv.fr
          </div>
        </div>
      </div>
    </div>
  );
};
