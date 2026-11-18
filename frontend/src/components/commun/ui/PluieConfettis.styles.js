// Responsabilité : définir le style d'un morceau de pluie. Sa forme est la même que pour
// Utilisé dans : PluieConfettis

import styled from 'styled-components';
import { pluie } from '@/styles/animations/confettis.js';
import { formeConfetti } from './Confettis.styles.js';

// Un morceau de pluie : part tout en haut, à la position --x sur la largeur, puis tombe.
export const Goutte = styled.span`
  ${formeConfetti}
  top: 0;
  left: var(--x);
  ${pluie}
`;
