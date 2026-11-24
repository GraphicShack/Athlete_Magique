// Responsabilité : ce que le faux serveur répond aux demandes du salon.
// Utilisé dans : serveurSimule

import SALON_EXEMPLE from '@/data/exemples/salonExemple.aSupprimer.js';
import { genererCode } from '@/utils/salon/genererCode.js';
import { retirerJoueur, ajouterBot } from '@/utils/salon/joueursSalon.aSupprimer.js';

// Pour essayer comme invité (pas l'hôte) : ouvrir /configuration?invite.
const vueInvite = new URLSearchParams(window.location.search).has('invite');

// Le salon au départ, avec un code tiré au hasard (il change quand on recharge la page).
export const SALON_DEPART = { ...SALON_EXEMPLE, idMoi: vueInvite ? 'j2' : 'j1', code: genererCode() };

// L'hôte prend le pseudo tapé à l'accueil.
const nommerHote = (joueurs, pseudo) => joueurs.map((joueur) => (joueur.hote ? { ...joueur, nom: pseudo } : joueur));

// Pour chaque demande : le nouveau salon.
const REPONSES = {
  'salon:creer': (salon, { pseudo }) => ({ ...salon, statut: 'attente', joueurs: nommerHote(salon.joueurs, pseudo) }),
  'salon:places': (salon, { placesMax }) => ({ ...salon, placesMax }),
  'salon:ajouterBot': (salon) => ({ ...salon, joueurs: ajouterBot(salon.joueurs) }),
  'salon:retirer': (salon, { idJoueur }) => ({ ...salon, joueurs: retirerJoueur(salon.joueurs, idJoueur) }),
  'salon:lancer': (salon) => ({ ...salon, statut: 'selection' }),
  // Un seul salon existe ici, donc un autre code est refusé.
  'salon:rejoindre': (salon, { code }) => {
    if (code !== salon.code) throw new Error(`Aucune partie avec le code ${code}.`);
    return salon;
  },
};

// Renvoie le salon après cette demande.
export function repondreSalon(salon, message, donnees) {
  return REPONSES[message](salon, donnees);
}
