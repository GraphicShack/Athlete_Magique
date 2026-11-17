/*
 * salon.js (service) : donne la salle d'attente de la partie (code, joueurs, hôte).
 *
 * Une seule chose : fournir le salon prêt à afficher.
 * Provisoire : le salon vient d'un exemple (data/exemples/salonExemple.js). Plus tard, il viendra
 * du serveur et changera quand des joueurs arrivent ou partent ; seul ce fichier changera.
 */
import SALON_EXEMPLE from '@/data/exemples/salonExemple.js';
import { genererCode } from '@/utils/salon/genererCode.js';

// Le code du salon, tiré au hasard une seule fois (il change quand on recharge la page).
const CODE = genererCode();

// Le salon : { code, placesMax, joueurs, estHote }
//   joueurs : chacun reçoit hote: true s'il est l'hôte
//   estHote : true si c'est moi l'hôte (moi = le premier joueur de l'exemple)
//
// vueInvite (optionnel) : true pour voir la page comme un invité (pas l'hôte), pour essayer.
export function obtenirSalon(vueInvite = false) {
  const { joueurs, idHote, ...reste } = SALON_EXEMPLE;
  return {
    ...reste,
    code: CODE,
    joueurs: joueurs.map((joueur) => ({ ...joueur, hote: joueur.id === idHote })),
    estHote: !vueInvite,
  };
}
