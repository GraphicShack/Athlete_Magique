/*
 * defilementFond.js : le glissement en boucle du motif de fond (voir FondAnime.jsx).
 *
 * Responsabilités :
 *   - faire glisser un motif qui se répète comme un carrelage, en diagonale, sans fin ;
 *   - laisser le fond immobile si le joueur a demandé moins d'animations.
 *
 * Le truc de la boucle : le calque glisse d'exactement un carreau (TAILLE_MOTIF), puis
 * recommence. Comme le motif se répète, la position d'arrivée est identique à celle de
 * départ : on ne voit jamais le saut.
 *
 * On déplace le calque avec « transform » (et pas « background-position ») : c'est la carte
 * graphique qui fait le travail, sans redessiner la page à chaque image.
 */
import { css, keyframes } from 'styled-components';

// Côté d'un carreau du motif, en pixels.
export const TAILLE_MOTIF = 800;

// Un carreau vers la droite et un carreau vers le haut : le motif monte en diagonale.
const glisser = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(${TAILLE_MOTIF}px, -${TAILLE_MOTIF}px);
  }
`;

// Le style à mettre dans le calque du motif : un carreau toutes les 60 secondes, à vitesse régulière.
export const defilementFond = css`
  animation: ${glisser} 60s linear infinite;

  /* Le joueur a demandé moins d'animations : le motif reste affiché, mais immobile. */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
