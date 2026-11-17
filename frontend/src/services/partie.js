/*
 * partie.js (service) : donne l'état de la partie (joueurs, piste, tour en cours).
 *
 * Une seule chose : fournir l'état de la partie déjà prêt à afficher.
 * Le dé est dans services/de.js, le journal dans services/journal/journal.js.
 *
 * Aujourd'hui, l'état vient d'une course d'exemple (data/exemples/partieExemple.js) et il est renvoyé
 * tout de suite (synchrone). Plus tard, il viendra du serveur et changera pendant la partie :
 * il faudra alors changer ce fichier, et les composants devront gérer l'attente (chargement),
 * les erreurs et les mises à jour. Ils continueront quand même de passer par ce service.
 */
import PARTIE_EXEMPLE from '@/data/exemples/partieExemple.js';
import POUVOIRS_AU_LANCER, { LANCER_SIMPLE } from '@/data/exemples/pouvoirsAuLancer.js';
import { obtenirPersonnages, imagePersonnage } from '@/services/personnages.js';

// Le personnage complet ({ id, nom, initiales, pouvoir, image }) à partir de son id.
function personnageDepuisId(id) {
  const personnage = obtenirPersonnages().find((p) => p.id === id);
  return { ...personnage, image: imagePersonnage(id) };
}

// Les personnages qu'on peut essayer comme joueur actif (tous).
const PERSONNAGES_A_ESSAYER = obtenirPersonnages().map((p) => p.id);

// L'état de la partie :
//   { course, rochers, idActif, joueurs: [Joueur], tour }
// Chaque joueur reçoit son personnage complet à la place de idPersonnage,
// et le tour reçoit le joueur actif, son personnage, ses boutons et son pouvoir
// (pouvoir : null si le personnage n'a rien à décider au lancer).
//
// idEssai (optionnel) : pour essayer l'affichage, donne ce personnage au joueur actif
// (ex. « scientifique », « flipflop », « lievre »). Ignoré si ce n'est pas un personnage.
export function obtenirPartie(idEssai) {
  const { joueurs, idActif, numeroTour, ...reste } = PARTIE_EXEMPLE;

  const joueursComplets = joueurs.map(({ idPersonnage, ...joueur }) => {
    const remplace = joueur.id === idActif && PERSONNAGES_A_ESSAYER.includes(idEssai);
    return { ...joueur, personnage: personnageDepuisId(remplace ? idEssai : idPersonnage) };
  });
  const actif = joueursComplets.find((joueur) => joueur.id === idActif);

  // Le tour d'exemple du personnage actif : avec son pouvoir s'il en a un au lancer, sinon le lancer simple.
  const aUnPouvoir = actif.personnage.id in POUVOIRS_AU_LANCER;
  const tour = aUnPouvoir ? POUVOIRS_AU_LANCER[actif.personnage.id] : LANCER_SIMPLE;

  return {
    ...reste,
    idActif,
    joueurs: joueursComplets,
    tour: {
      ...tour,
      etape: 2, // « Lancer du dé » (voir EtapesTour.jsx)
      numero: numeroTour,
      idJoueur: actif.id,
      position: actif.position,
      joueur: actif.nom,
      personnage: actif.personnage,
      pouvoir: aUnPouvoir ? { titre: `Pouvoir : ${actif.personnage.nom}`, description: actif.personnage.pouvoir } : null,
    },
  };
}
