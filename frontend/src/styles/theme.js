/*
 * Charte visuelle d'Athlète Magique.
 *
 * Style : celui du livret de règles — pages noires, grands titres en capitales très grasses
 * dont chaque lettre a sa couleur, cartes blanches à bandeau de couleur entourées de fins
 * liserés colorés (cadre rétro), accroches en italique gras.
 *
 * Toutes les couleurs, polices et tailles de l'interface sont définies ici, une seule fois.
 * Dans un composant styled-components, on les lit avec la prop `theme` :
 *
 *   const Titre = styled.h2`
 *     color: ${({ theme }) => theme.couleurs.encre};
 *     font-size: ${({ theme }) => theme.texte.lg};
 *   `;
 *
 * On n'écrit jamais une couleur ou une taille directement dans un composant.
 */

// Palette échantillonnée en sRGB dans How-to-play-MAGICAL-ATHLETE.pdf.
// Couverture : rouge ; p. 2 : violet ; p. 4-6 : jaune, orange, magenta ;
// p. 10-11 : couleurs de piste ; p. 12 et 27 : noir, blanc, gris et violet foncé.
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

/*
 * Comment la palette est utilisée (pour garder une interface cohérente) :
 *   - noir                 : fond des pages (comme le livret) ; texte des cartes blanches
 *   - blanc                : cartes, et texte posé directement sur le fond noir
 *   - orange et rose       : liserés du cadre rétro autour des panneaux
 *   - toutes les couleurs  : lettres des grands titres (titre arc-en-ciel)
 *   - or (très dilué)      : fonds secondaires à l'intérieur des cartes
 *   - une couleur par sujet: bandeau de titre des panneaux (voir « teintes » plus bas)
 *   - rouge                : action principale et rideau entre les pages
 *   - rose, or, vert de piste, bleu, jaune, gris : réservés à la piste
 *   - magenta, violet, cyan, orange : réservés aux pions des joueurs
 *   - vert, orange, rouge  : états des personnages (debout, tombé, éliminé)
 * Ainsi, une couleur garde toujours le même sens d'un écran à l'autre.
 */

// Les nuances d'interface sont dérivées de la palette du livret.
// melange(couleur, 20) = 20 % de la couleur et 80 % de blanc (un « lavis »).
const melange = (couleur, proportion, fond = PALETTE.blanc) =>
  `color-mix(in srgb, ${couleur} ${proportion}%, ${fond})`;

const couleurs = {
  encre: PALETTE.noir,
  encreDouce: melange(PALETTE.noir, 80),
  gris700: melange(PALETTE.noir, 75),
  gris500: melange(PALETTE.noir, 60),
  gris300: PALETTE.gris,
  gris200: melange(PALETTE.or, 30), // fond un peu plus marqué (ligne mise en avant)
  gris100: melange(PALETTE.or, 15), // fond secondaire léger (survol, panneau intérieur)
  fond: melange(PALETTE.or, 12), // fond crème clair (intérieur de certaines cartes)
  page: PALETTE.noir, // fond des pages, comme le livret
  texteSurPage: PALETTE.blanc, // texte posé directement sur le fond noir
  texteSurPageDoux: PALETTE.gris, // texte secondaire sur le fond noir
  surface: PALETTE.blanc,
  table: PALETTE.noir,

  accent: PALETTE.rouge,
  accentFonce: melange(PALETTE.rouge, 92, PALETTE.noir),

  debout: PALETTE.vert,
  tombe: PALETTE.orange,
  tombeFond: melange(PALETTE.orange, 15),
  elimine: PALETTE.rouge,
  elimineFond: melange(PALETTE.rouge, 12),
};

const piste = {
  fond: PALETTE.noir,
  contour: PALETTE.blanc,
  cases: [PALETTE.rose, PALETTE.or, PALETTE.vertPiste, PALETTE.bleu],
  texteCase: PALETTE.noir,
  repere: PALETTE.rouge,
  repereTexte: PALETTE.noir,
  depart: PALETTE.bleu,
  departTexte: PALETTE.noir,
  arrivee: PALETTE.noir,
  arriveeDamier: PALETTE.blanc,
  jetonContour: PALETTE.blanc,
  jetonTexte: PALETTE.noir,
  etoile: PALETTE.jaune,
  etoileTexte: PALETTE.noir,
  rocher: PALETTE.gris,
  rocherTexte: PALETTE.noir,
};

// Une couleur par joueur, choisie parmi celles que la piste n'utilise pas :
// un pion ne se confond jamais avec la case sur laquelle il se trouve.
// Toutes sont assez claires pour que les initiales en noir restent lisibles.
const joueurs = [PALETTE.magenta, PALETTE.violet, PALETTE.cyan, PALETTE.orange];

/*
 * Teinte de chaque sujet : la couleur du bandeau de titre des panneaux.
 * Un même sujet garde la même couleur sur tous les écrans
 * (ex. tout ce qui parle du tour est or, de l'ordre des joueurs est cyan).
 * Toutes ces couleurs restent lisibles avec un titre noir.
 */
const teintes = {
  apercu: PALETTE.rose, // vue d'ensemble
  preparation: PALETTE.bleu, // mise en place, avant la course
  piste: PALETTE.vertPiste, // la piste et ses cases
  tour: PALETTE.or, // le tour en cours, son déroulement
  joueurs: PALETTE.cyan, // les joueurs et leur ordre
  journal: PALETTE.violet, // l'historique des événements
  personnages: PALETTE.magenta, // les personnages et leurs pouvoirs
  pointage: PALETTE.orange, // points, résultats, classement
  definitions: PALETTE.gris, // vocabulaire, informations neutres
  regles: PALETTE.rouge, // la fenêtre des règles
};

// Couleurs des lettres des grands titres, dans l'ordre (voir TitreArcEnCiel).
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
  texte: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
};

const texte = {
  xs: '0.75rem', // 12 px : étiquettes
  sm: '0.875rem', // 14 px : légendes, journal
  md: '1rem', // 16 px : texte courant
  lg: '1.25rem', // 20 px : titres de panneaux
  xl: '1.75rem', // 28 px : titres de pages
  xxl: '2.75rem', // 44 px : accroche de l'accueil, logo
};

const graisses = {
  normale: 400,
  moyenne: 500,
  forte: 600,
  tresForte: 700,
};

// espace(1) = 0.25rem, espace(4) = 1rem, espace(6) = 1.5rem…
const espace = (n) => `${n * 0.25}rem`;

const rayons = {
  sm: '0.375rem',
  md: '0.75rem',
  lg: '1.25rem',
  piste: '2.5rem', // coins arrondis de la piste
  rond: '999px',
};

const bordures = {
  fine: `1px solid ${PALETTE.gris}`, // séparateurs discrets (tableaux, cartes)
  contour: `2px solid ${PALETTE.noir}`, // boutons, étiquettes, avatars, dé, panneau mis en évidence
  lisere: `2px solid ${PALETTE.blanc}`, // traits blancs sur la piste noire (podium, bannière)
};

const ombres = {
  douce: `0 2px 8px color-mix(in srgb, ${PALETTE.noir} 10%, transparent)`,
  // Ombre « carton » : décalée et sans flou
  bloc: `4px 4px 0 ${PALETTE.noir}`,
  blocPetit: `2px 2px 0 ${PALETTE.noir}`,
  // Cadre rétro du livret : fins liserés de couleur autour d'une carte, séparés par du noir.
  cadre: `0 0 0 3px ${PALETTE.noir}, 0 0 0 5px ${PALETTE.orange}, 0 0 0 7px ${PALETTE.noir}, 0 0 0 9px ${PALETTE.rose}`,
  // Cadre de la carte la plus importante de l'écran : un liseré jaune de plus.
  cadreFort: `0 0 0 3px ${PALETTE.noir}, 0 0 0 5px ${PALETTE.orange}, 0 0 0 7px ${PALETTE.noir}, 0 0 0 9px ${PALETTE.rose}, 0 0 0 11px ${PALETTE.noir}, 0 0 0 13px ${PALETTE.jaune}`,
};

// Points de rupture identiques à ceux de Bootstrap, pour que la grille et les composants s'accordent.
const ecrans = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const transition = '150ms ease';

const theme = {
  palette: PALETTE, // couleurs brutes, pour les illustrations (ex. icônes des personnages)
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
