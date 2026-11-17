/*
 * partie.js (service) : le seul endroit où les composants vont chercher l'état de la partie
 * (joueurs, piste, tour en cours, journal).
 *
 * Responsabilité : fournir l'état de la partie déjà prêt à afficher, sous la forme attendue
 * par les composants de l'écran de course.
 *
 * Aujourd'hui, l'état vient d'une course d'exemple (data/partieExemple.js) et il est renvoyé
 * tout de suite (synchrone). Plus tard, il viendra du serveur et changera pendant la partie :
 * il faudra alors changer ce fichier, et les composants devront gérer l'attente (chargement),
 * les erreurs et les mises à jour. Ils continueront quand même de passer par ce service.
 */
import PARTIE_EXEMPLE from '@/data/partieExemple.js';
import { obtenirPersonnages, imagePersonnage } from '@/services/personnages.js';

// Le personnage complet ({ id, nom, initiales, pouvoir, image }) à partir de son id.
function personnageDepuisId(id) {
  const personnage = obtenirPersonnages().find((p) => p.id === id);
  return { ...personnage, image: imagePersonnage(id) };
}

// L'état de la partie :
//   { course, rochers, idActif, joueurs: [Joueur], tour, evenements }
// Chaque joueur reçoit son personnage complet à la place de idPersonnage,
// et le tour reçoit le joueur actif, son personnage et son pouvoir.
export function obtenirPartie() {
  const { joueurs, idActif, tour, ...reste } = PARTIE_EXEMPLE;

  const joueursComplets = joueurs.map(({ idPersonnage, ...joueur }) => ({
    ...joueur,
    personnage: personnageDepuisId(idPersonnage),
  }));
  const actif = joueursComplets.find((joueur) => joueur.id === idActif);

  return {
    ...reste,
    idActif,
    joueurs: joueursComplets,
    tour: {
      ...tour,
      joueur: actif.nom,
      personnage: actif.personnage,
      pouvoir: { titre: `Pouvoir : ${actif.personnage.nom}`, description: actif.personnage.pouvoir },
    },
  };
}
