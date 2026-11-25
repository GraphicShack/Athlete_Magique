// Responsabilité : regroupe les points gagnés par place sur la piste.

import { RANG_ARRIVEE, positionSurPiste } from '@/utils/piste/dispositionPiste.js';

// jetons : les pions dessinés (un éliminé en a pas). Renvoie [{ rang, colonne, rangee, gains }].
export function gainsSurPiste(gains, jetons) {
  const rangDe = ({ idJoueur }) => jetons.find(({ id }) => id === idJoueur)?.position;
  const rangs = [...new Set(gains.map(rangDe))].filter((rang) => rang !== undefined);

  return rangs.map((rang) => ({
    rang,
    ...positionSurPiste(Math.min(rang, RANG_ARRIVEE)),
    gains: gains.filter((gain) => rangDe(gain) === rang),
  }));
}
