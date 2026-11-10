/*
 * Icônes originales des 10 personnages, dessinées en SVG (grille de 48 × 48).
 * Chaque icône a une couleur de fond et un dessin qui évoque le pouvoir du personnage.
 * Les couleurs viennent de la palette de la charte (theme.palette) : elles ne changent pas
 * si on modifie les couleurs de la piste ou des joueurs.
 *
 * Utilisées par AvatarPersonnage, à partir de l'identifiant du personnage (donnees/personnages.js).
 */

const trait = (t, epaisseur = 2.5) => ({
  stroke: t.couleurs.encre,
  strokeWidth: epaisseur,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

const ICONES = {
  // Une peau de banane : on glisse dessus.
  banana: {
    fond: (t) => t.palette.rose,
    dessin: (t) => (
      <>
        <path d="M20 21 c-6 2 -10 8 -11 15 c4 -3 8 -6 11 -7 z" fill={t.palette.jaune} {...trait(t)} />
        <path d="M28 21 c6 2 10 8 11 15 c-4 -3 -8 -6 -11 -7 z" fill={t.palette.jaune} {...trait(t)} />
        <path d="M20 21 h8 l-1 16 c-1 2 -5 2 -6 0 z" fill={t.palette.jaune} {...trait(t)} />
        <path d="M24 9 c3 0 4 5 4 12 h-8 c0 -7 1 -12 4 -12 z" fill={t.couleurs.surface} {...trait(t)} />
      </>
    ),
  },

  // Une tête de lièvre avec des traits de vitesse.
  lievre: {
    fond: (t) => t.palette.bleu,
    dessin: (t) => (
      <>
        <ellipse cx="19" cy="15" rx="4" ry="10" fill={t.couleurs.surface} {...trait(t)} />
        <ellipse cx="29" cy="15" rx="4" ry="10" fill={t.couleurs.surface} {...trait(t)} />
        <circle cx="24" cy="31" r="10" fill={t.couleurs.surface} {...trait(t)} />
        <circle cx="20.5" cy="29" r="1.6" fill={t.couleurs.encre} />
        <circle cx="27.5" cy="29" r="1.6" fill={t.couleurs.encre} />
        <path d="M22.5 34 h3 l-1.5 2 z" fill={t.palette.rose} {...trait(t, 1.5)} />
        <path d="M5 26 h5 M4 31 h6 M5 36 h5" fill="none" stroke={t.couleurs.surface} strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },

  // Un fer à cheval.
  centaure: {
    fond: (t) => t.palette.vertPiste,
    dessin: (t) => (
      <>
        <path d="M15 11 v13 a9 9 0 0 0 18 0 v-13" fill="none" stroke={t.couleurs.encre} strokeWidth="10" strokeLinecap="round" />
        <path d="M15 11 v13 a9 9 0 0 0 18 0 v-13" fill="none" stroke={t.couleurs.gris300} strokeWidth="5" strokeLinecap="round" />
        <circle cx="15" cy="17" r="1.2" fill={t.couleurs.encre} />
        <circle cx="33" cy="17" r="1.2" fill={t.couleurs.encre} />
        <circle cx="17" cy="29" r="1.2" fill={t.couleurs.encre} />
        <circle cx="31" cy="29" r="1.2" fill={t.couleurs.encre} />
      </>
    ),
  },

  // Deux flèches qui échangent leur place.
  flipflop: {
    fond: (t) => t.palette.orange,
    dessin: (t) => (
      <>
        <path d="M11 18 h24 M29 12 l6 6 l-6 6" fill="none" {...trait(t, 3.5)} />
        <path d="M37 31 h-24 M19 25 l-6 6 l6 6" fill="none" {...trait(t, 3.5)} />
      </>
    ),
  },

  // Une spirale hypnotique.
  hypnotiste: {
    fond: (t) => t.palette.violetFonce,
    dessin: (t) => (
      <path
        d="M24 24 m0 -2 a2 2 0 1 1 -2 2 a4 4 0 1 1 4 4 a6 6 0 1 1 -6 -6 a8 8 0 1 1 8 8 a10 10 0 1 1 -10 -10 a12 12 0 1 1 12 12"
        fill="none"
        stroke={t.couleurs.surface}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    ),
  },

  // Un chapeau de fête et des confettis.
  partyanimal: {
    fond: (t) => t.palette.magenta,
    dessin: (t) => (
      <>
        <path d="M24 10 l10 27 h-20 z" fill={t.palette.jaune} {...trait(t)} />
        <path d="M20 21 l9 -3 M17 29 l14 -4" fill="none" stroke={t.palette.rose} strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="9" r="3" fill={t.couleurs.surface} {...trait(t, 2)} />
        <rect x="8" y="12" width="3" height="3" rx="0.5" fill={t.couleurs.surface} transform="rotate(20 9.5 13.5)" />
        <rect x="37" y="15" width="3" height="3" rx="0.5" fill={t.palette.jaune} transform="rotate(-20 38.5 16.5)" />
        <rect x="35" y="38" width="3" height="3" rx="0.5" fill={t.couleurs.surface} />
        <rect x="9" y="36" width="3" height="3" rx="0.5" fill={t.palette.bleu} transform="rotate(30 10.5 37.5)" />
      </>
    ),
  },

  // Un chapeau haut-de-forme et une étoile.
  magicien: {
    fond: (t) => t.palette.cyan,
    dessin: (t) => (
      <>
        <rect x="15" y="17" width="18" height="17" rx="1.5" fill={t.couleurs.encre} {...trait(t)} />
        <rect x="15" y="28" width="18" height="4" fill={t.palette.rouge} />
        <ellipse cx="24" cy="35" rx="14" ry="3.5" fill={t.couleurs.encre} {...trait(t)} />
        <path d="M35 6 l1.6 3.4 l3.6 0.5 l-2.7 2.5 l0.7 3.6 l-3.2 -1.8 l-3.2 1.8 l0.7 -3.6 l-2.7 -2.5 l3.6 -0.5 z" fill={t.palette.jaune} {...trait(t, 1.5)} />
      </>
    ),
  },

  // Une fusée qui décolle.
  scientifique: {
    fond: (t) => t.palette.violet,
    dessin: (t) => (
      <>
        <path d="M20 34 l4 8 l4 -8 z" fill={t.palette.jaune} {...trait(t, 2)} />
        <path d="M24 6 c6 5 8 13 7 28 h-14 c-1 -15 1 -23 7 -28 z" fill={t.couleurs.surface} {...trait(t)} />
        <path d="M17 26 l-5 8 h6 M31 26 l5 8 h-6" fill={t.palette.rouge} {...trait(t, 2)} />
        <circle cx="24" cy="19" r="3.5" fill={t.palette.bleu} {...trait(t, 2)} />
      </>
    ),
  },

  // Une grande bouche qui croque.
  bouche: {
    fond: (t) => t.palette.rouge,
    dessin: (t) => (
      <>
        <path d="M8 20 q16 -8 32 0 q-4 16 -16 16 q-12 0 -16 -16 z" fill={t.couleurs.encre} {...trait(t)} />
        <path d="M11 20 l3 5 l3 -6 l3 6 l4 -7 l4 7 l3 -6 l3 6 l3 -5" fill={t.couleurs.surface} {...trait(t, 1.5)} />
        <ellipse cx="24" cy="31" rx="6" ry="3" fill={t.palette.rose} />
      </>
    ),
  },

  // Deux épées croisées.
  duelliste: {
    fond: (t) => t.palette.jaune,
    dessin: (t) => (
      <>
        <path d="M11 11 l22 22" fill="none" stroke={t.couleurs.encre} strokeWidth="5.5" strokeLinecap="round" />
        <path d="M11 11 l22 22" fill="none" stroke={t.couleurs.surface} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M37 11 l-22 22" fill="none" stroke={t.couleurs.encre} strokeWidth="5.5" strokeLinecap="round" />
        <path d="M37 11 l-22 22" fill="none" stroke={t.couleurs.surface} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M27 35 l8 -8 M13 27 l8 8" fill="none" {...trait(t, 3.5)} />
        <path d="M34 34 l4 4 M14 34 l-4 4" fill="none" stroke={t.palette.rouge} strokeWidth="3.5" strokeLinecap="round" />
      </>
    ),
  },
};

export default ICONES;
