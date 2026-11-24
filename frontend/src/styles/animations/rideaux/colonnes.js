// Responsabilité : découpe une page en colonnes avec un masque CSS (pour les rideaux à colonnes).

import { css } from 'styled-components';

// Le masque dit ce qu'on voit de la page : une couche par colonne, collée en haut ('0%') ou en bas ('100%').
// bords : le bord de chaque colonne, de gauche à droite.
export const masqueColonnes = (bords) => css`
  mask-image: ${bords.map(() => 'linear-gradient(#000 0 0)').join(', ')};
  mask-repeat: no-repeat;
  mask-position: ${bords.map((bord, rang) => `${(rang * 100) / (bords.length - 1)}% ${bord}`).join(', ')};
`;

// La taille de chaque colonne. hauteurs : 100 = colonne visible au complet, 0 = cachée.
// + 0,5 % de largeur pour pas voir de fente entre 2 colonnes.
export const tailleColonnes = (hauteurs) =>
  `mask-size: ${hauteurs.map((hauteur) => `${100 / hauteurs.length + 0.5}% ${hauteur.toFixed(1)}%`).join(', ')};`;
