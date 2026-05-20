// Charte graphique PPTX Agreste / MAASA
export const theme = {
  colors: {
    // Verts issus du PPTX
    greenDark:  '#4b7651',
    green:      '#39a96b',
    greenLight: '#bfe6d6',
    greenPale:  '#e8f5ef',
    // Texte
    text:       '#1D1D1D',
    textSub:    '#555555',
    // Fond
    white:      '#FFFFFF',
    offWhite:   '#FAFAFA',
    // Accents Marianne
    mariBlue:   '#003189',
    mariRed:    '#C1292E',
    // Données
    barA:       '#4b7651',
    barB:       '#39a96b',
    barC:       '#bfe6d6',
  },
  // Polices PPTX
  fontTitle:  '"Yeseva One", Georgia, serif',
  fontBody:   '"DM Sans", "Helvetica Neue", Arial, sans-serif',
  fps: 30,
  w: 1920,
  h: 1080,
};

// Timings des scènes (en secondes)
export const TIMINGS = {
  title:      { start: 0,  dur: 6 },
  farmCount:  { start: 6,  dur: 13 },
  land:       { start: 19, dur: 13 },
  livestock:  { start: 32, dur: 12 },
  micro:      { start: 44, dur: 12 },
  conclusion: { start: 56, dur: 10 },
  outro:      { start: 66, dur: 5 },  // 4.24s arrondi
};

export const TOTAL_S = 71;
