// Responsabilité : la charte visuelle (couleurs, polices, tailles, bordures…).

// Couleurs relevées dans le livret How-to-play-MAGICAL-ATHLETE.pdf.
export const PALETTE = {
  noir: '#000000',
  blanc: '#ffffff',
  rouge: '#ef3a1f',
  orange: '#f37215',
  jaune: '#f8dd04',
  or: '#f8b418',
  vert: '#278e3e',
  vertPiste: '#46a337',
  bleu: '#649ad7',
  cyan: '#7dc9e5',
  rose: '#d967b9',
  magenta: '#ed2b9e',
  violet: '#a67ec5',
  violetFonce: '#8141a5',
  gris: '#b2b0b2',
};

// Comment la palette est utilisée : - noir : fond des pages ; texte des cartes blanches - blanc : cartes, et texte posé directement sur le fond noir - orange et rose : liserés du cadre rétro autour des panneaux - toutes les couleurs : lettres des grands titres (titre arc-en-ciel) - or (très dilué) : fonds secondaires à l'intérieur des cartes - une couleur par sujet: bandeau de titre des panneaux (voir « teintes ») - rouge : action principale et rideau entre les pages - rose, or, vert de piste, bleu, jaune, gris : réservés à la piste - magenta, violet, cyan, orange : réservés aux pions des joueurs.

// Mélange une couleur avec du blanc (ou une autre couleur de fond).
const melange = (couleur, proportion, fond = PALETTE.blanc) =>
  `color-mix(in srgb, ${couleur} ${proportion}%, ${fond})`;

// Couleurs de l'interface (texte, fonds, actions).
const couleurs = {
  encre: PALETTE.noir, // texte sur les cartes blanches
  gris700: melange(PALETTE.noir, 75), // texte secondaire sur carte blanche
  gris500: melange(PALETTE.noir, 60), // texte discret (message vide, indice)
  gris300: PALETTE.gris, // étapes à venir, traits
  gris100: melange(PALETTE.or, 15), // fond léger (survol d'un bouton, interrupteur éteint)
  page: PALETTE.noir, // fond des pages, comme le livret
  texteSurPage: PALETTE.blanc, // texte posé directement sur le fond noir
  texteSurPageDoux: PALETTE.gris, // texte secondaire sur le fond noir
  surface: PALETTE.blanc, // fond des cartes
  accent: PALETTE.rouge, // action principale (bouton rouge), rideau entre les pages
  accentFonce: melange(PALETTE.rouge, 92, PALETTE.noir), // bouton rouge survolé
};

// Couleurs de la piste de course.
const piste = {
  fond: PALETTE.noir,
  contour: PALETTE.blanc,
  cases: [PALETTE.rose, PALETTE.or, PALETTE.vertPiste, PALETTE.bleu], // couleurs des cases, en boucle
  texteCase: PALETTE.noir,
  repere: PALETTE.rouge, // une case sur cinq, avec son numéro
  repereTexte: PALETTE.noir,
  depart: PALETTE.bleu,
  departTexte: PALETTE.noir,
  arrivee: PALETTE.noir, // damier de l'arrivée : noir…
  arriveeDamier: PALETTE.blanc, // … et blanc
  jetonContour: PALETTE.blanc,
  jetonTexte: PALETTE.noir,
  etoile: PALETTE.jaune,
  etoileTexte: PALETTE.noir,
  rocher: PALETTE.gris,
  rocherTexte: PALETTE.noir,
};

// Une couleur par joueur, choisie parmi celles que la piste n'utilise pas : un pion ne se confond jamais avec la case sur laquelle il se trouve.
const joueurs = [PALETTE.magenta, PALETTE.violet, PALETTE.cyan, PALETTE.orange];

// Teinte de chaque sujet : la couleur du bandeau de titre des panneaux (voir Panneau.jsx).
const teintes = {
  apercu: PALETTE.rose, // vue d'ensemble
  preparation: PALETTE.bleu, // mise en place, avant la course
  piste: PALETTE.vertPiste, // la piste et ses cases
  tour: PALETTE.or, // le tour en cours
  joueurs: PALETTE.cyan, // les joueurs et leur ordre
  journal: PALETTE.violet, // l'historique des événements
  personnages: PALETTE.magenta, // les personnages et leurs pouvoirs
  pointage: PALETTE.orange, // points, résultats, classement
  definitions: PALETTE.gris, // vocabulaire, informations neutres
  regles: PALETTE.rouge, // la fenêtre des règles et son bouton
  parametres: PALETTE.jaune, // la fenêtre des paramètres et son bouton
  son: PALETTE.violet, // paramètres : musique et effets sonores
  affichage: PALETTE.rose, // paramètres : animations, taille du texte
  partie: PALETTE.or, // paramètres : déroulement d'une partie
  compte: PALETTE.bleu, // paramètres : pseudo, langue (même bleu que la connexion)
};

// Couleurs des lettres des grands titres, dans l'ordre (voir TitreArcEnCiel.jsx).
const arcEnCiel = [
  PALETTE.violet,
  PALETTE.rose,
  PALETTE.jaune,
  PALETTE.cyan,
  PALETTE.vertPiste,
  PALETTE.orange,
  PALETTE.rouge,
  PALETTE.bleu,
  PALETTE.or,
  PALETTE.magenta,
];

const polices = {
  titre: "'Poppins', 'Inter', system-ui, sans-serif", // logo, titres, numéros de cases (très gras)
  texte: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // tout le reste
};

// Tailles de texte.
const texte = {
  xs: '0.75rem', // 12 px : étiquettes, aide
  sm: '0.875rem', // 14 px : légendes, journal
  md: '1rem', // 16 px : texte courant
  lg: '1.25rem', // 20 px : titres de panneaux
  xl: '1.75rem', // 28 px : titres de fenêtres, logo
};

// Épaisseurs de texte.
const graisses = {
  normale: 400,
  moyenne: 500,
  forte: 600,
  tresForte: 700,
};

// Espacements, par pas de 0,25rem : espace(1) = 0.25rem, espace(4) = 1rem, espace(6) = 1.5rem…
const espace = (n) => `${n * 0.25}rem`;

// Arrondis des coins.
const rayons = {
  sm: '0.375rem',
  md: '0.75rem',
  lg: '1.25rem',
  rond: '999px', // forme de pilule ou de cercle
};

const bordures = {
  fine: `1px solid ${PALETTE.gris}`, // séparateurs discrets (tableaux, réglages)
  contour: `2px solid ${PALETTE.noir}`, // boutons, étiquettes, avatars, dé, cartes
};

const ombres = {
  douce: `0 2px 8px color-mix(in srgb, ${PALETTE.noir} 10%, transparent)`, // cartes du carrousel
  // Ombre « carton » : décalée pis sans flou (boutons flottants, bulle).
  bloc: `4px 4px 0 ${PALETTE.noir}`,
  blocPetit: `2px 2px 0 ${PALETTE.noir}`,
  // Même ombre, réduite à rien : bouton enfoncé (voir Bouton.jsx).
  blocEnfonce: `0 0 0 ${PALETTE.noir}`,
  // Cadre rétro du livret : fins liserés de couleur autour d'une carte, séparés par du noir.
  cadre: `0 0 0 3px ${PALETTE.noir}, 0 0 0 5px ${PALETTE.orange}, 0 0 0 7px ${PALETTE.noir}, 0 0 0 9px ${PALETTE.rose}`,
  // Cadre de la carte la plus importante de l'écran : un liseré jaune de plus.
  cadreFort: `0 0 0 3px ${PALETTE.noir}, 0 0 0 5px ${PALETTE.orange}, 0 0 0 7px ${PALETTE.noir}, 0 0 0 9px ${PALETTE.rose}, 0 0 0 11px ${PALETTE.noir}, 0 0 0 13px ${PALETTE.jaune}`,
};

// Largeurs d'écran où la mise en page change ; les mêmes que Bootstrap, pour que tout s'accorde.
const ecrans = {
  sm: '576px', // grand téléphone
  md: '768px', // tablette
  lg: '992px', // ordinateur portable
  xl: '1200px', // grand écran
};

// Durée pis courbe des petites transitions (survol, changement de couleur).
const transition = '150ms ease';

// Le thème complet, fourni par ThemeProvider.
const theme = {
  palette: PALETTE, // couleurs brutes, quand aucun rôle de « couleurs » ne convient (ex. focus clavier)
  couleurs,
  teintes,
  arcEnCiel,
  piste,
  joueurs,
  polices,
  texte,
  graisses,
  espace,
  rayons,
  bordures,
  ombres,
  ecrans,
  transition,
};

export default theme;
