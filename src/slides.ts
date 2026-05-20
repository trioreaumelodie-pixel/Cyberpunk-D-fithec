// ═══════════════════════════════════════════════════════════════
//  CONTENU DES DIAPOSITIVES — éditez librement ce fichier
//  Puis commitez sur GitHub pour relancer le rendu automatique.
// ═══════════════════════════════════════════════════════════════

// ── Diapositive 1 : Titre ───────────────────────────────────────
export const SLIDE_TITLE = {
  badge:        "MARS 2026 · N°59",
  region:       "Nouvelle-Aquitaine",
  /** Texte principal — utilisez \n pour les sauts de ligne */
  titre:        "En 2023, les tendances\n2010–2020 se poursuivent\nen Nouvelle-Aquitaine",
  /** Mot(s) mis en couleur verte dans le titre (séparés par |) */
  accent:       "2010–2020|Nouvelle-Aquitaine",
  sousTitre:    "Enquête sur la structure des exploitations agricoles en 2023",
  complement:   "En comparaison aux recensements agricoles de 2010 et 2020",
  source:       "Source : Agreste – ESEA 2023",
};

// ── Diapositive 2 : Nombre d'exploitations ──────────────────────
export const SLIDE_FARM_COUNT = {
  titre:        "Nombre d'exploitations agricoles",
  sousTitre:    "Nouvelle-Aquitaine — hors micro-exploitations",
  grandChiffre: "56 552",
  labelChiffre: "exploitations en 2023",
  labelGraphe:  "Évolution du nombre d'exploitations",
  barres: [
    { annee: "2010", valeur: 100, etiquette: "~73 000" },
    { annee: "2020", valeur: 87,  etiquette: "~64 000" },
    { annee: "2023", valeur: 77,  etiquette: "56 552"  },
  ],
  cartes: [
    { valeur: "−12 %",     label: "en 3 ans",               detail: "rythme national similaire",            couleur: "rouge" },
    { valeur: "−10,9 %/an", label: "micro-exploitations",   detail: "recul accéléré lié à la PAC 2023",     couleur: "rouge" },
    { valeur: "+0,1 %/an", label: "grandes exploitations",  detail: "effectifs stables",                    couleur: "vert"  },
  ],
  source: "Source : Agreste – RA 2010, RA 2020, ESEA 2023",
};

// ── Diapositive 3 : Surface Agricole Utile ──────────────────────
export const SLIDE_LAND = {
  titre:        "Surface Agricole Utile (SAU)",
  sousTitre:    "Un foncier stable malgré la baisse du nombre de fermes",
  donut: {
    valeur:  "3,9M",
    unite:   "hectares",
    label:   "SAU régionale",
  },
  fleche: {
    avant:   "60 ha",
    apres:   "68 ha",
    titre:   "Surface moyenne par exploitation",
    detail:  "Entre 2020 et 2023 — agrandissement continu des fermes",
  },
  cartes: [
    { icone: "🌾", titre: "SAU totale stable",       valeur: "3,9 millions ha",        detail: "malgré −4,7 % d'exploitations",                   couleur: "vertFonce" },
    { icone: "🚜", titre: "Plus de prestataires",    valeur: "Main-d'œuvre non familiale", detail: "recours croissant aux ETA, CUMA, salariés",    couleur: "vert"     },
  ],
  source: "Source : Agreste – ESEA 2023",
};

// ── Diapositive 4 : Élevage ─────────────────────────────────────
export const SLIDE_LIVESTOCK = {
  titre:        "L'élevage recule",
  sousTitre:    "Baisse du cheptel et des exploitations spécialisées",
  grandeStat: {
    valeur:  "−4,2 %",
    label:   "cheptel en UGB (2020 → 2023)",
    detail:  "Part des élevages :\n38–39 % (2010) → 34,9 % (2023)",
  },
  barres: [
    { label: "Toutes espèces", v2020: 7331, v2023: 6871, unite: "k têtes" },
    { label: "Bovins (SAA)",   v2020: 4600, v2023: 4200, unite: "k têtes" },
  ],
  cartes: [
    { valeur: "−8 %",       label: "grandes cultures",       detail: "depuis 2020",                             couleur: "rouge" },
    { valeur: "Bovin mixte", label: "baisse la plus forte",  detail: "parmi toutes les OTEX",                   couleur: "rouge" },
    { valeur: "+4,9 %",     label: "UGB moyen/exploitation", detail: "les fermes restantes s'agrandissent",     couleur: "vert"  },
  ],
  source: "Source : Agreste – ESEA 2023 / SAA",
};

// ── Diapositive 5 : Micro-exploitations ─────────────────────────
export const SLIDE_MICRO = {
  titre:        "Les micro-exploitations",
  sousTitre:    "Un quart des fermes, une part en recul",
  camembert: {
    pct2020: 29,
    pct2023: 23,
    label:   "micro-exploit.",
  },
  cartes: [
    { icone: "🏘️", valeur: "13 220",  label: "micro-exploitations (2023)",    detail: "23 % du total · superficie moyenne 14 ha",             couleur: "bleu"  },
    { icone: "👴",  valeur: "57 ans",  label: "âge moyen des dirigeants",      detail: "souvent pluriactifs (vs 49 ans pour les autres)",       couleur: "gris"  },
    { icone: "👩‍🌾", valeur: "42 %",    label: "dirigées par des femmes",      detail: "contre 25 % pour les autres exploitations",             couleur: "vert"  },
  ],
  source: "Source : Agreste – ESEA 2023",
};

// ── Diapositive 6 : Conclusion ──────────────────────────────────
export const SLIDE_CONCLUSION = {
  titre:    "Ce qu'il faut retenir",
  sousTitre: "ESEA 2023 · Nouvelle-Aquitaine",
  points: [
    { icone: "📉", texte: "−12 % d'exploitations en 3 ans",            couleur: "rouge"    },
    { icone: "🌾", texte: "SAU stable : 3,9 millions ha",              couleur: "vertFonce" },
    { icone: "📐", texte: "Surface moyenne : 60 → 68 ha",              couleur: "vert"     },
    { icone: "🐄", texte: "Cheptel en baisse : −4,2 % en UGB",        couleur: "rouge"    },
    { icone: "🏘️", texte: "23 % de micro-exploitations (en recul)",   couleur: "bleu"     },
    { icone: "👩‍🌾", texte: "42 % des micro-fermes dirigées par des femmes", couleur: "vert" },
  ],
  footer: {
    publication: "Agreste Nouvelle-Aquitaine · Études · Mars 2026 · N°59",
    url1:        "draaf.nouvelle-aquitaine.agriculture.gouv.fr",
    url2:        "agreste.agriculture.gouv.fr",
  },
};
