import { theme } from './theme';

/** Résout les noms de couleur lisibles vers les valeurs hex */
export const couleur = (nom: string): string =>
  ({
    vert:      theme.colors.green,
    vertFonce: theme.colors.greenDark,
    vertClair: theme.colors.greenLight,
    rouge:     '#C1292E',
    bleu:      theme.colors.mariBlue,
    gris:      theme.colors.textSub,
  }[nom] ?? nom);
