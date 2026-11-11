/*
 * flottement.js : l'animation « flottante » (petit va-et-vient vertical en boucle), pour
 * n'importe quel élément : les lettres des titres, les cartes des personnages…
 *
 * Responsabilités :
 *   - définir le mouvement (monter un peu, puis redescendre) ;
 *   - donner à chaque élément un rythme différent, pour qu'ils ne bougent pas tous ensemble ;
 *   - laisser les éléments immobiles si le joueur a demandé moins d'animations.
 *
 * L'animation ne touche pas à la mise en page (display, taille…) de l'élément animé.
 *
 * Utilisation (voir TitreArcEnCiel.jsx et SelectionPage.jsx) :
 *   const Lettre = styled.span` ${flottement} `;
 *   <Lettre style={rythmeFlottement(position)}>A</Lettre>
 *
 * Hauteur du mouvement : -0.06em par défaut (bien pour du texte). Pour un autre élément,
 * on la change avec la variable CSS --hauteur-flottement, ex. --hauteur-flottement: -6px;
 */
import { css, keyframes } from 'styled-components';

// Monter un peu, puis redescendre (l'animation tourne en boucle).
const flotter = keyframes`
  50% {
    transform: translateY(var(--hauteur-flottement, -0.06em));
  }
`;

// Le style à mettre dans un élément pour le faire flotter.
export const flottement = css`
  animation: ${flotter} ease-in-out infinite;

  /* Le joueur a demandé moins d'animations : l'élément reste immobile. */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Donne à un élément sa durée et son départ, selon sa position (0, 1, 2…).
// Les nombres (0,37 et 0,61) servent juste à « mélanger » : le résultat est toujours le même
// pour une même position, donc l'affichage ne change pas d'une fois à l'autre.
// À mettre dans l'attribut style de l'élément.
export function rythmeFlottement(position) {
  const duree = 2.2 + ((position * 0.37) % 1); // entre 2,2 s et 3,2 s
  const depart = -((position * 0.61) % duree); // négatif : l'animation est déjà en cours au départ
  return { animationDuration: `${duree}s`, animationDelay: `${depart}s` };
}
