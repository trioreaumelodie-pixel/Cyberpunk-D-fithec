import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';

const CountUp: React.FC<{ value: number; suffix?: string; prefix?: string; color?: string }> = ({
  value,
  suffix = '',
  prefix = '',
  color = theme.colors.green,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 10, fps, config: { damping: 30, stiffness: 40 }, from: 0, to: 1 });
  const displayed = Math.round(progress * value);

  return (
    <span style={{ color, fontWeight: 800 }}>
      {prefix}
      {displayed.toLocaleString('fr-FR')}
      {suffix}
    </span>
  );
};

export const FarmCountScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const card1Scale = spring({ frame: frame - 15, fps, config: { damping: 14 }, from: 0, to: 1 });
  const card2Scale = spring({ frame: frame - 35, fps, config: { damping: 14 }, from: 0, to: 1 });
  const card3Scale = spring({ frame: frame - 55, fps, config: { damping: 14 }, from: 0, to: 1 });
  const arrowOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' });

  // Bar chart animation
  const barWidth2010 = interpolate(frame, [20, 60], [0, 100], { extrapolateRight: 'clamp' });
  const barWidth2020 = interpolate(frame, [30, 65], [0, 88], { extrapolateRight: 'clamp' });
  const barWidth2023 = interpolate(frame, [40, 70], [0, 78], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* Section badge */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 80,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 8,
              height: 60,
              background: theme.colors.green,
              borderRadius: 4,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontWeight: 800,
                fontSize: 44,
                color: theme.colors.green,
                lineHeight: 1.1,
              }}
            >
              Nombre d'exploitations
            </div>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 22,
                color: theme.colors.grayDark,
                marginTop: 6,
              }}
            >
              Nouvelle-Aquitaine — hors micro-exploitations
            </div>
          </div>
        </div>
      </div>

      {/* Big number */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 80,
          fontFamily: theme.fonts.heading,
          fontSize: 120,
          lineHeight: 1,
          color: theme.colors.text,
        }}
      >
        <CountUp value={56552} color={theme.colors.green} />
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 24,
            color: theme.colors.grayDark,
            fontWeight: 400,
            marginTop: 8,
          }}
        >
          exploitations agricoles en 2023
        </div>
      </div>

      {/* Bar chart */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 80,
          width: 700,
        }}
      >
        {[
          { year: '2010', width: barWidth2010, pct: '~73 000', color: theme.colors.gray },
          { year: '2020', width: barWidth2020, pct: '~64 000', color: theme.colors.accent },
          { year: '2023', width: barWidth2023, pct: '56 552', color: theme.colors.green },
        ].map(({ year, width, pct, color }) => (
          <div key={year} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontWeight: 700,
                fontSize: 22,
                color: theme.colors.grayDark,
                width: 60,
              }}
            >
              {year}
            </div>
            <div
              style={{
                height: 44,
                width: `${width * 5}px`,
                background: color,
                borderRadius: '0 6px 6px 0',
                transition: 'width 0.1s',
                display: 'flex',
                alignItems: 'center',
                paddingRight: 12,
                justifyContent: 'flex-end',
                minWidth: 20,
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.body,
                  fontWeight: 700,
                  fontSize: 18,
                  color: color === theme.colors.green ? theme.colors.white : theme.colors.text,
                }}
              >
                {pct}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats cards */}
      <div
        style={{
          position: 'absolute',
          top: 340,
          right: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {[
          {
            scale: card1Scale,
            label: 'recul en 3 ans',
            value: '−12 %',
            sub: '(proche du rythme national)',
            color: theme.colors.red,
          },
          {
            scale: card2Scale,
            label: 'micro-exploitations/an',
            value: '−10,9 %',
            sub: 'recul accéléré lié à la PAC',
            color: theme.colors.red,
          },
          {
            scale: card3Scale,
            label: 'grandes exploitations/an',
            value: '+0,1 %',
            sub: 'effectifs stables',
            color: theme.colors.greenLight,
          },
        ].map(({ scale, label, value, sub, color }) => (
          <div
            key={label}
            style={{
              transform: `scale(${scale})`,
              background: theme.colors.white,
              borderRadius: 12,
              padding: '20px 28px',
              width: 340,
              boxShadow: '0 4px 24px rgba(0,79,39,0.10)',
              borderLeft: `6px solid ${color}`,
            }}
          >
            <div
              style={{
                fontFamily: theme.fonts.heading,
                fontWeight: 800,
                fontSize: 42,
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
              }}
            >
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* Source note */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 80,
          opacity: textOpacity,
          fontFamily: theme.fonts.body,
          fontSize: 16,
          color: theme.colors.grayDark,
        }}
      >
        Source : Agreste – RA 2010, RA 2020, ESEA 2023
      </div>
    </div>
  );
};
