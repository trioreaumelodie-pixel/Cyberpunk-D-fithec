import React from 'react';
import { theme } from '../theme';

// Forme organique "feuille" extraite du PPTX (image4.svg simplifié)
const LeafPath =
  'M306.41,145.7c-42.51-21.65-87.38-38.96-130.52-59.49c-32.69-16.61-64.97-34.3-99.88-45.95' +
  'C62.06,34.4,38.37,30.47,45.65,9.9c9.13-18.83,27.72-5.86,41.59-1.1c34.68,11.81,67.35,28.39,99.58,45.64' +
  'c41.01,18.78,82.24,37.07,123.48,55.35c4.52,2.11,8.79,4.39,12.72,6.98C342.19,127.78,325.84,156.68,306.41,145.7z' +
  'M16.63,275.77c-14.36,0.39-22.35-18.58-11.8-28.47c8.66-8.53,22.02-3.29,32.87-4.48' +
  'c22.76,0.11,45.52-0.32,68.27-0.87c68.61-0.14,137.58-4.47,205.33-8.25l-0.01,0.01' +
  'c16.01,4.39,14.36,27.62-1.62,30.81c-16.47,3.74-34.06,3.51-50.73,4.89C178.35,274.95,97.39,276.1,16.63,275.77z' +
  'M86.81,491.93c-4.76-7.63-2.02-18.36,5.73-22.88c9-5.72,17.64-12.08,27.16-16.92' +
  'c24.91-15.9,50.55-30.59,76.12-45.39c26.26-15.87,52.8-31.28,79.38-46.63c14.6-8.58,28.82-17.81,43.21-26.74' +
  'c6.02-3.36,11.76-8.22,18.73-9.27c8.87-1.45,16.62,8.24,12.91,16.59c-1.98,5.07-6.67,8.26-10.71,11.6' +
  'c-34.51,26.17-72.58,47-109.41,69.63c-28.7,18.14-58.67,34.22-86.76,53.3c-5.47,4.13-14.34,9.45-19.27,12.73' +
  'C112.36,496.4,97.97,508.08,86.81,491.93z';

interface Props {
  accent?: string;
}

export const WhiteboardBackground: React.FC<Props> = ({ accent = theme.colors.greenPale }) => (
  <div style={{ width: '100%', height: '100%', background: theme.colors.white, position: 'absolute', inset: 0 }}>
    {/* Formes organiques décoratives (coin haut-gauche) */}
    <svg
      style={{ position: 'absolute', top: -40, left: -20, opacity: 0.12, pointerEvents: 'none' }}
      width="420" height="620" viewBox="-5.7 -8.9 359.5 517"
    >
      <path fill={theme.colors.greenDark} d={LeafPath} />
    </svg>
    {/* Coin bas-droite */}
    <svg
      style={{ position: 'absolute', bottom: -60, right: -30, opacity: 0.09, transform: 'rotate(180deg)', pointerEvents: 'none' }}
      width="380" height="560" viewBox="-5.7 -8.9 359.5 517"
    >
      <path fill={theme.colors.green} d={LeafPath} />
    </svg>
    {/* Bande colorée en haut */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 7,
      background: `linear-gradient(90deg, ${theme.colors.greenDark}, ${theme.colors.green} 60%, ${theme.colors.greenLight})`,
    }} />
  </div>
);
