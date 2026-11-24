// Responsabilité : le salon reçu du serveur, pis les demandes qu'on lui fait.
// Utilisé dans : ConfigurationPage, FormulaireInvite, useRejoindre, useSalon

import { envoyer, ecouter } from '@/services/serveur/serveur.js';
import { creerBoite } from '@/utils/creerBoite.js';

// Le dernier salon reçu (null si aucun).
export const salonRecu = creerBoite(null);
ecouter('salon:etat', salonRecu.changer);

// Mon pseudo, gardé pour si je rejoins un autre salon.
let monPseudo = 'Invité';

// Les demandes : chacune renvoie une promesse (erreur si le serveur refuse).
export function creerSalon(pseudo) {
  monPseudo = pseudo.trim() || 'Invité';
  return envoyer('salon:creer', { pseudo: monPseudo });
}
export const rejoindreSalon = (code) => envoyer('salon:rejoindre', { code, pseudo: monPseudo });
export const changerPlaces = (placesMax) => envoyer('salon:places', { placesMax });
export const ajouterBot = () => envoyer('salon:ajouterBot', {});
export const retirerJoueur = (idJoueur) => envoyer('salon:retirer', { idJoueur });
export const lancerPartie = () => envoyer('salon:lancer', {});
