// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { flottement } from '@/styles/animations/flottement.js';

// La taille suit la largeur de l'écran (6vw), entre 2,25rem pis 4,5rem.
export const Titre = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`;

// Un mot du titre : un seul bloc, qui passe à la ligne en entier.
export const Mot = styled.span`
  display: inline-block;
`;

// Une lettre du titre, qui flotte (voir styles/animations/flottement.js).
export const Lettre = styled.span`
  display: inline-block;
  ${flottement}
`;
