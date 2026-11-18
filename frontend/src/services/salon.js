// Responsabilité : donne le salon (code, joueurs, hôte).
// Utilisé dans : ConfigurationPage

import SALON_EXEMPLE from '@/data/exemples/salonExemple.js';
import { genererCode } from '@/utils/salon/genererCode.js';

// Le code du salon, tiré au hasard une seule fois (il change quand on recharge la page).
const CODE = genererCode();

// Le salon : { code, placesMax, joueurs, estHote } joueurs : chacun reçoit hote: true s'il est l'hôte estHote : true si c'est moi l'hôte (moi = le premier joueur de l'exemple) vueInvite (optionnel) : true pour voir la page comme un invité (pas l'hôte), pour essayer.
export function obtenirSalon(vueInvite = false) {
  const { joueurs, idHote, ...reste } = SALON_EXEMPLE;
  return {
    ...reste,
    code: CODE,
    joueurs: joueurs.map((joueur) => ({ ...joueur, hote: joueur.id === idHote })),
    estHote: !vueInvite,
  };
}
