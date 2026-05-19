import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';

export const LandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const mapScale = spring({ frame: frame - 10, fps, config: { damping: 16 }, from: 0.6, to: 1 });
  const mapOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });
  const card1 = spring({ frame: frame - 40, fps, config: { damping: 14 }, from: 0, to: 1 });
  const card2 = spring({ frame: frame - 60, fps, config: { damping: 14 }, from: 0, to: 1 });
  const card3 = spring({ frame: frame - 80, fps, config: { damping: 14 }, from: 0, to: 1 });

  // Circle fill animation for SAU
  const sauFill = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 80,
          opacity: titleOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div style={{ width: 8, height: 60, background: theme.colors.greenLight, borderRadius: 4 }} />
        <div>
          <div
            style={{
              fontFamily: theme.fonts.heading,
              fontWeight: 800,
              fontSize: 44,
              color: theme.colors.green,
            }}
          >
            Surface Agricole Utile (SAU)
          </div>
          <div style={{ fontFamily: theme.fonts.body, fontSize: 22, color: theme.colors.grayDark, marginTop: 6 }}>
            Un foncier stable malgré la baisse du nombre de fermes
          </div>
        </div>
      </div>

      {/* Central donut / circle visualization */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 200,
          width: 460,
          height: 460,
          opacity: mapOpacity,
          transform: `scale(${mapScale})`,
        }}
      >
        <svg width="460" height="460" viewBox="0 0 460 460">
          {/* Background circle */}
          <circle cx="230" cy="230" r="210" fill={theme.colors.gray} />
          {/* SAU fill - sweeping arc */}
          <circle
            cx="230"
            cy="230"
            r="210"
            fill="none"
            stroke={theme.colors.green}
            strokeWidth="50"
            strokeDasharray={`${2 * Math.PI * 185 * sauFill} ${2 * Math.PI * 185}`}
            strokeLinecap="round"
            transform="rotate(-90 230 230)"
          />
          {/* Inner circle */}
          <circle cx="230" cy="230" r="155" fill={theme.colors.offWhite} />
          {/* Center text */}
          <text
            x="230"
            y="215"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="56"
            fill={theme.colors.green}
          >
            3,9M
          </text>
          <text
            x="230"
            y="255"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="22"
            fill={theme.colors.grayDark}
          >
            hectares
          </text>
          <text
            x="230"
            y="285"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="18"
            fill={theme.colors.grayDark}
          >
            SAU régionale
          </text>
        </svg>
      </div>

      {/* Cards */}
      <div
        style={{
          position: 'absolute',
          right: 80,
          top: 180,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          width: 760,
        }}
      >
        {[
          {
            scale: card1,
            icon: '📐',
            title: 'SAU stable',
            value: '3,9 millions ha',
            detail: 'maintenue malgré la baisse des exploitations (−4,7 %)',
            color: theme.colors.green,
          },
          {
            scale: card2,
            icon: '📏',
            title: 'Surface moyenne en hausse',
            value: '60 ha → 68 ha',
            detail: 'entre 2020 et 2023 — agrandissement des fermes',
            color: theme.colors.greenLight,
          },
          {
            scale: card3,
            icon: '🚜',
            title: 'Plus de prestataires extérieurs',
            value: 'Main-d\'œuvre non familiale',
            detail: 'recours croissant aux ETA, CUMA et travailleurs salariés',
            color: theme.colors.blue,
          },
        ].map(({ scale, icon, title, value, detail, color }) => (
          <div
            key={title}
            style={{
              transform: `scale(${scale})`,
              background: theme.colors.white,
              borderRadius: 14,
              padding: '24px 32px',
              boxShadow: '0 4px 24px rgba(0,79,39,0.08)',
              display: 'flex',
              gap: 24,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontSize: 44, lineHeight: 1 }}>{icon}</div>
            <div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 18,
                  color: theme.colors.grayDark,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontWeight: 800,
                  fontSize: 36,
                  color,
                  marginTop: 4,
                  lineHeight: 1.1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 18,
                  color: theme.colors.grayDark,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                {detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
