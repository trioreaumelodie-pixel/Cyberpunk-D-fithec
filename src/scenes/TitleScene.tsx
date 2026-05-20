import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { WhiteboardBackground } from '../components/WhiteboardBackground';
import { AgresteLogo } from '../components/AgresteLogo';
import { theme } from '../theme';
import { SLIDE_TITLE } from '../slides';

function highlightAccents(text: string, accents: string[]): React.ReactNode {
  let result: React.ReactNode = text;
  accents.forEach((word) => {
    if (typeof result !== 'string') return;
    const parts = result.split(word);
    result = parts.flatMap((p, i) =>
      i < parts.length - 1
        ? [p, <span key={i} style={{ color: theme.colors.greenDark }}>{word}</span>]
        : [p]
    );
  });
  return result;
}

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fi     = (f: number) => interpolate(frame, [f, f + 22], [0, 1], { extrapolateRight: 'clamp' });
  const slideUp = (f: number) => interpolate(frame, [f, f + 22], [28, 0], { extrapolateRight: 'clamp' });
  const lineW  = interpolate(frame, [45, 75], [0, 560], { extrapolateRight: 'clamp' });
  const logoSc = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 100 }, from: 0, to: 1 });

  const accents = SLIDE_TITLE.accent.split('|');
  const lignes  = SLIDE_TITLE.titre.split('\n');

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <WhiteboardBackground />

      <div style={{ position: 'absolute', top: 52, left: 80, transform: `scale(${logoSc})`, transformOrigin: 'top left' }}>
        <AgresteLogo size={110} dark />
      </div>

      <div style={{ position: 'absolute', top: 52, right: 80, opacity: fi(30), display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <div style={{ background: theme.colors.greenDark, color: '#fff', fontFamily: theme.fontBody, fontWeight: 700, fontSize: 17, padding: '5px 16px', borderRadius: 4, letterSpacing: '0.06em' }}>
          {SLIDE_TITLE.badge}
        </div>
        <div style={{ fontFamily: theme.fontBody, fontSize: 16, color: theme.colors.textSub }}>{SLIDE_TITLE.region}</div>
      </div>

      <div style={{ position: 'absolute', top: 210, left: 80, right: 80 }}>
        <div style={{ opacity: fi(18), transform: `translateY(${slideUp(18)}px)`, fontFamily: theme.fontTitle, fontSize: 82, color: theme.colors.text, lineHeight: 1.12, maxWidth: 1100 }}>
          {lignes.map((ligne, i) => (
            <div key={i}>{highlightAccents(ligne, accents)}</div>
          ))}
        </div>
        <div style={{ width: lineW, height: 4, background: `linear-gradient(90deg, ${theme.colors.greenDark}, ${theme.colors.green})`, borderRadius: 2, marginTop: 32 }} />
        <div style={{ opacity: fi(50), transform: `translateY(${slideUp(50)}px)`, marginTop: 24, fontFamily: theme.fontBody, fontSize: 26, color: theme.colors.textSub, lineHeight: 1.5 }}>
          {SLIDE_TITLE.sousTitre}
        </div>
        <div style={{ opacity: fi(60), marginTop: 10, fontFamily: theme.fontBody, fontSize: 20, color: theme.colors.textSub }}>
          {SLIDE_TITLE.complement}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 36, right: 80, opacity: fi(70), fontFamily: theme.fontBody, fontSize: 15, color: theme.colors.textSub }}>
        {SLIDE_TITLE.source}
      </div>
    </div>
  );
};
