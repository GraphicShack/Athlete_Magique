// Responsabilité : regroupe les transitions entre 2 pages (pour en ajouter une : un fichier pis 2 lignes ici).

import { css } from 'styled-components';
import { rideauArrondi } from './rideauArrondi.js';
import { rideauBalayage } from './rideauBalayage.js';
import { rideauCascade } from './rideauCascade.js';
import { rideauVolets } from './rideauVolets.js';

// Les noms possibles de <html data-rideau="…"> (voir hooks/useRideauAuHasard.js).
export const RIDEAUX = ['arrondi', 'volets', 'balayage', 'cascade'];

export const transitionsDePage = css`
  /* La couleur du rideau, visible entre l'ancienne page pis la nouvelle. */
  ::view-transition-group(root) {
    background-color: ${({ theme }) => theme.couleurs.accent};
  }

  ${rideauArrondi}
  ${rideauVolets}
  ${rideauBalayage}
  ${rideauCascade}

  /* « Réduire les animations » : pas de rideau. */
  html[data-animations='reduites']::view-transition-group(*),
  html[data-animations='reduites']::view-transition-old(*),
  html[data-animations='reduites']::view-transition-new(*) {
    animation: none !important;
    mask: none !important;
  }
`;
