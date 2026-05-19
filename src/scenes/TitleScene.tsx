import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { AgresteLogo } from '../components/AgresteLogo';
import { theme } from '../theme';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, from: 0, to: 1 });
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [20, 45], [30, 0], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: 'clamp' });
  const lineWidth = interpolate(frame, [50, 80], [0, 460], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      {/* Left green panel */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 480,
          height: '100%',
          background: `linear-gradient(160deg, ${theme.colors.green} 0%, ${theme.colors.greenMid} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <div style={{ transform: `scale(${logoScale})` }}>
          <AgresteLogo size={160} light />
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 18,
            fontFamily: theme.fonts.body,
            textAlign: 'center',
            padding: '0 40px',
            lineHeight: 1.5,
          }}
        >
          Nouvelle-Aquitaine
          <br />
          Mars 2026 · N°59
        </div>
      </div>

      {/* Right content */}
      <div
        style={{
          position: 'absolute',
          left: 520,
          right: 80,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: badgeOpacity,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              background: theme.colors.greenLight,
              color: theme.colors.green,
              fontFamily: theme.fonts.body,
              fontWeight: 700,
              fontSize: 20,
              padding: '6px 18px',
              borderRadius: 4,
              letterSpacing: '0.05em',
            }}
          >
            ESEA 2023
          </div>
          <div
            style={{
              color: theme.colors.grayDark,
              fontFamily: theme.fonts.body,
              fontSize: 20,
            }}
          >
            Enquête sur la Structure des Exploitations Agricoles
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontFamily: theme.fonts.heading,
            fontWeight: 800,
            fontSize: 62,
            color: theme.colors.green,
            lineHeight: 1.15,
          }}
        >
          En 2023, les tendances
          <br />
          <span style={{ color: theme.colors.greenLight }}>2010–2020</span> se
          <br />
          poursuivent
        </div>

        {/* Separator line drawn */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            background: `linear-gradient(90deg, ${theme.colors.green}, ${theme.colors.greenLight})`,
            borderRadius: 2,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            fontFamily: theme.fonts.body,
            fontSize: 28,
            color: theme.colors.grayDark,
            lineHeight: 1.5,
          }}
        >
          Structures agricoles en Nouvelle-Aquitaine :
          <br />
          moins d'exploitations, des fermes plus grandes
        </div>
      </div>
    </div>
  );
};
