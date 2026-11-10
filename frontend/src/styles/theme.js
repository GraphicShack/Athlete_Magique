/*
 * Charte visuelle d'Athlète Magique.
 *
 * Style : « rétro de jeu de société » — piste noire, cases de couleurs vives,
 * contours noirs épais et ombres décalées, comme des pièces en carton.
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

// Teintes de base, réutilisées par plusieurs rôles ci-dessous.
const NOIR = '#1b1b1f';
const BLANC = '#ffffff';
const BLEU = '#4a93e0';

const couleurs = {
  // Neutres
  encre: NOIR, // texte, contours, boutons principaux
  encreDouce: '#34343b', // survol des boutons principaux
  gris700: '#4d4f57', // texte secondaire
  gris500: '#83868e', // texte discret, légendes
  gris300: '#d4d3cc', // bordures fines
  gris200: '#e6e4dc', // ligne mise en avant (événement le plus récent)
  gris100: '#f1efe8', // fonds de panneaux secondaires
  fond: '#f7f3e9', // fond des pages (crème, comme du carton)
  surface: BLANC, // fond des panneaux et des cartes
  table: '#5d635b', // fond de l'écran de course (la table de jeu)

  // Couleur d'accent : appels à l'action importants (« Jouer », « Lancer le dé »)
  accent: '#ee5b3a',
  accentFonce: '#cf4426',

  // États des personnages
  debout: '#2f9e4f',
  tombe: '#f28c1b',
  tombeFond: '#fff0dc',
  elimine: '#d63031',
  elimineFond: '#fde3e3',
};

// La piste de course
const piste = {
  fond: NOIR, // la bande noire qui porte les cases
  contour: BLANC, // le liseré blanc autour de la piste
  // Les cases régulières alternent ces quatre couleurs, dans cet ordre.
  cases: ['#f38cc8', '#f7a823', '#3fa34d', BLEU],
  texteCase: NOIR,
  // Une case sur cinq (5, 15, 25, 30) sert de repère et affiche son numéro.
  repere: '#ef5a3c',
  repereTexte: '#1d3f8f',
  depart: BLEU,
  departTexte: BLANC,
  arrivee: NOIR, // damier de la ligne d'arrivée
  arriveeDamier: BLANC,
  jetonContour: BLANC, // contour intérieur des jetons, visible sur toutes les cases
  etoile: '#ffd43b', // cases 10 et 20 (+1 pt)
  etoileTexte: NOIR,
  rocher: '#8a8073', // cases Rocher
  rocherTexte: BLANC,
};

// Une couleur par joueur, dans l'ordre des joueurs (jetons, liste des joueurs).
// Les jetons ont toujours un contour noir et blanc pour rester visibles sur toutes les cases.
const joueurs = ['#e0352b', '#7b3fe4', '#0fa3a0', '#f2c200'];

const polices = {
  titre: "'Fredoka', 'Inter', system-ui, sans-serif", // logo, titres, numéros de cases
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
  fine: `1px solid ${couleurs.gris300}`, // panneaux ordinaires
  contour: `2px solid ${NOIR}`, // boutons, étiquettes, avatars, dé, panneau mis en évidence
  lisere: `2px solid ${BLANC}`, // traits blancs sur la piste noire (podium, bannière)
};

const ombres = {
  douce: `0 2px 8px color-mix(in srgb, ${NOIR} 10%, transparent)`,
  // Ombre « carton » : décalée et sans flou
  bloc: `4px 4px 0 ${NOIR}`,
  blocPetit: `2px 2px 0 ${NOIR}`,
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
  couleurs,
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
