// Responsabilité : le dessin animé d'un chargement (3 barres).

import styled from 'styled-components';
import { barresChargement } from '@/styles/animations/barresChargement.js';

const Chargement = styled.div.attrs({ 'aria-hidden': true })`
  width: 4rem;
  aspect-ratio: 1;
  ${barresChargement}
`;

export default Chargement;
