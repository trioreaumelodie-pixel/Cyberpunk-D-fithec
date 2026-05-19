import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';

export const MicroFarmsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const pieProgress = interpolate(frame, [20, 70], [0, 1], { extrapolateRight: 'clamp' });
  const card1 = spring({ frame: frame - 50, fps, config: { damping: 14 }, from: 0, to: 1 });
  const card2 = spring({ frame: frame - 70, fps, config: { damping: 14 }, from: 0, to: 1 });
  const card3 = spring({ frame: frame - 90, fps, config: { damping: 14 }, from: 0, to: 1 });

  // Pie chart: 23% micro, 77% others
  const r = 160;
  const cx = 200;
  const cy = 200;
  const circumference = 2 * Math.PI * r;
  const microShare = 0.23 * pieProgress;
  const microArc = microShare * circumference;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

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
        <div style={{ width: 8, height: 60, background: theme.colors.blue, borderRadius: 4 }} />
        <div>
          <div
            style={{ fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: 44, color: theme.colors.green }}
          >
            Les micro-exploitations
          </div>
          <div style={{ fontFamily: theme.fonts.body, fontSize: 22, color: theme.colors.grayDark, marginTop: 6 }}>
            Un quart des fermes, mais une part décroissante
          </div>
        </div>
      </div>

      {/* Pie */}
      <div style={{ position: 'absolute', left: 80, top: 190 }}>
        <svg width="400" height="400" viewBox="0 0 400 400">
          {/* Full circle - others */}
          <circle cx={cx} cy={cy} r={r} fill={theme.colors.accent} />
          {/* Micro arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={theme.colors.blue}
            strokeWidth={r * 2}
            strokeDasharray={`${microArc} ${circumference}`}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
          {/* Inner white */}
          <circle cx={cx} cy={cy} r={r * 0.55} fill={theme.colors.offWhite} />
          {/* Center label */}
          <text
            x={cx}
            y={cy - 10}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="42"
            fill={theme.colors.blue}
          >
            23 %
          </text>
          <text
            x={cx}
            y={cy + 24}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="16"
            fill={theme.colors.grayDark}
          >
            micro-exploitations
          </text>
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 24, marginTop: 8, paddingLeft: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, background: theme.colors.blue, borderRadius: 3 }} />
            <span style={{ fontFamily: theme.fonts.body, fontSize: 17, color: theme.colors.text }}>
              Micro (&lt;25k€ PBS)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, background: theme.colors.accent, borderRadius: 3 }} />
            <span style={{ fontFamily: theme.fonts.body, fontSize: 17, color: theme.colors.text }}>
              Autres exploitations
            </span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          position: 'absolute',
          right: 80,
          top: 180,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: 740,
        }}
      >
        {[
          {
            scale: card1,
            value: '13 220',
            label: 'micro-exploitations en 2023',
            sub: '(23 % du total régional, contre 29 % en 2020)',
            color: theme.colors.blue,
            icon: '🏘️',
          },
          {
            scale: card2,
            value: '14 ha',
            label: 'superficie moyenne',
            sub: '5 % de la SAU — dirigeants souvent pluriactifs, âge moyen 57 ans',
            color: theme.colors.grayDark,
            icon: '📐',
          },
          {
            scale: card3,
            value: '42 %',
            label: 'dirigées par des femmes',
            sub: '(contre 25 % pour les autres exploitations)',
            color: theme.colors.greenLight,
            icon: '👩‍🌾',
          },
        ].map(({ scale, value, label, sub, color, icon }) => (
          <div
            key={label}
            style={{
              transform: `scale(${scale})`,
              background: theme.colors.white,
              borderRadius: 14,
              padding: '20px 28px',
              boxShadow: '0 4px 24px rgba(0,79,39,0.08)',
              display: 'flex',
              gap: 20,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontSize: 40, lineHeight: 1 }}>{icon}</div>
            <div>
              <div
                style={{
                  fontFamily: theme.fonts.heading,
                  fontWeight: 800,
                  fontSize: 40,
                  color,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontWeight: 700,
                  fontSize: 18,
                  color: theme.colors.text,
                  marginTop: 4,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 15,
                  color: theme.colors.grayDark,
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
