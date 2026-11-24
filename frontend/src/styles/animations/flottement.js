// Responsabilité : le petit va-et-vient vertical en boucle (titres, cartes).

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
`;

// Donne à un élément sa durée pis son départ, selon sa position (0, 1, 2…).
export function rythmeFlottement(position) {
  const duree = 2.2 + ((position * 0.37) % 1); // entre 2,2 s et 3,2 s
  const depart = -((position * 0.61) % duree); // négatif : l'animation est déjà en cours au départ
  return { animationDuration: `${duree}s`, animationDelay: `${depart}s` };
}
