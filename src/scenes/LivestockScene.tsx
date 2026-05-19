import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { theme } from '../theme';

const AnimatedBar: React.FC<{
  label: string;
  value2020: number;
  value2023: number;
  delay: number;
  maxVal: number;
}> = ({ label, value2020, value2023, delay, maxVal }) => {
  const frame = useCurrentFrame();
  const barMax = 480;
  const bar2020 = interpolate(frame, [delay, delay + 30], [0, (value2020 / maxVal) * barMax], {
    extrapolateRight: 'clamp',
  });
  const bar2023 = interpolate(frame, [delay + 10, delay + 40], [0, (value2023 / maxVal) * barMax], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontWeight: 700,
          fontSize: 20,
          color: theme.colors.text,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 50, fontSize: 15, color: theme.colors.grayDark }}>2020</div>
          <div
            style={{
              height: 36,
              width: bar2020,
              background: theme.colors.gray,
              borderRadius: '0 6px 6px 0',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
              minWidth: 10,
            }}
          >
            <span style={{ fontFamily: theme.fonts.body, fontSize: 15, color: theme.colors.grayDark }}>
              {value2020.toLocaleString('fr-FR')}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 50, fontSize: 15, color: theme.colors.grayDark }}>2023</div>
          <div
            style={{
              height: 36,
              width: bar2023,
              background: value2023 < value2020 ? theme.colors.red + '99' : theme.colors.green,
              borderRadius: '0 6px 6px 0',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
              minWidth: 10,
            }}
          >
            <span
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 15,
                color: theme.colors.white,
                fontWeight: 700,
              }}
            >
              {value2023.toLocaleString('fr-FR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LivestockScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const statScale = spring({ frame: frame - 10, fps, config: { damping: 14 }, from: 0, to: 1 });
  const noteOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp' });

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
        <div style={{ width: 8, height: 60, background: theme.colors.red, borderRadius: 4 }} />
        <div>
          <div
            style={{ fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: 44, color: theme.colors.green }}
          >
            L'élevage recule
          </div>
          <div style={{ fontFamily: theme.fonts.body, fontSize: 22, color: theme.colors.grayDark, marginTop: 6 }}>
            Baisse du cheptel et des exploitations spécialisées
          </div>
        </div>
      </div>

      {/* Big stat */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          right: 80,
          transform: `scale(${statScale})`,
          textAlign: 'center',
          background: theme.colors.white,
          borderRadius: 16,
          padding: '32px 48px',
          boxShadow: '0 4px 24px rgba(0,79,39,0.10)',
          borderTop: `6px solid ${theme.colors.red}`,
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.heading,
            fontWeight: 800,
            fontSize: 86,
            color: theme.colors.red,
            lineHeight: 1,
          }}
        >
          −4,2 %
        </div>
        <div style={{ fontFamily: theme.fonts.body, fontSize: 22, color: theme.colors.text, marginTop: 8 }}>
          cheptel en UGB (2020→2023)
        </div>
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 17,
            color: theme.colors.grayDark,
            marginTop: 16,
            lineHeight: 1.5,
          }}
        >
          Part des élevages : <strong>38–39 %</strong> (2010)
          <br />
          → <strong>34,9 %</strong> des exploitations (2023)
        </div>
      </div>

      {/* Bar charts */}
      <div style={{ position: 'absolute', left: 80, top: 200, width: 700 }}>
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontWeight: 700,
            fontSize: 18,
            color: theme.colors.grayDark,
            marginBottom: 24,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Cheptel (têtes)
        </div>
        <AnimatedBar label="Toutes espèces" value2020={7331212} value2023={6871056} delay={20} maxVal={8300000} />
        <AnimatedBar label="Bovins (estimation)" value2020={4200000} value2023={3900000} delay={40} maxVal={8300000} />
      </div>

      {/* Key message */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 80,
          right: 80,
          opacity: noteOpacity,
          background: `${theme.colors.green}15`,
          borderLeft: `6px solid ${theme.colors.green}`,
          borderRadius: '0 8px 8px 0',
          padding: '20px 28px',
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 22,
            color: theme.colors.text,
            lineHeight: 1.5,
          }}
        >
          <strong>Baisse prononcée des bovins mixtes</strong> — orientation la plus touchée.
          Les grandes cultures aussi en repli : <strong>−8 %</strong> depuis 2020.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 80,
          opacity: noteOpacity,
          fontFamily: theme.fonts.body,
          fontSize: 16,
          color: theme.colors.grayDark,
        }}
      >
        Source : Agreste – ESEA 2023 / SAA
      </div>
    </div>
  );
};
