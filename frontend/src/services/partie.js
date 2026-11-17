/*
 * partie.js (service) : le seul endroit où les composants vont chercher l'état de la partie
 * (joueurs, piste, tour en cours, journal).
 *
 * Responsabilités :
 *   - fournir l'état de la partie déjà prêt à afficher, sous la forme attendue par les
 *     composants de l'écran de course ;
 *   - lancer le dé (lancerDe).
 *
 * Aujourd'hui, l'état vient d'une course d'exemple (data/partieExemple.js) et il est renvoyé
 * tout de suite (synchrone). Plus tard, il viendra du serveur et changera pendant la partie :
 * il faudra alors changer ce fichier, et les composants devront gérer l'attente (chargement),
 * les erreurs et les mises à jour. Ils continueront quand même de passer par ce service.
 */
import PARTIE_EXEMPLE from '@/data/partieExemple.js';
import POUVOIRS_AU_LANCER, { LANCER_SIMPLE } from '@/data/pouvoirsAuLancer.js';
import { obtenirPersonnages, imagePersonnage } from '@/services/personnages.js';

// Le personnage complet ({ id, nom, initiales, pouvoir, image }) à partir de son id.
function personnageDepuisId(id) {
  const personnage = obtenirPersonnages().find((p) => p.id === id);
  return { ...personnage, image: imagePersonnage(id) };
}

// Les personnages qu'on peut essayer comme joueur actif (tous).
const PERSONNAGES_A_ESSAYER = obtenirPersonnages().map((p) => p.id);

// L'état de la partie :
//   { course, rochers, idActif, joueurs: [Joueur], tour, evenements }
// Chaque joueur reçoit son personnage complet à la place de idPersonnage,
// et le tour reçoit le joueur actif, son personnage, ses boutons et son pouvoir
// (pouvoir : null si le personnage n'a rien à décider au lancer).
//
// idEssai (optionnel) : pour essayer l'affichage, donne ce personnage au joueur actif
// (ex. « scientifique », « flipflop », « lievre »). Ignoré si ce n'est pas un personnage.
export function obtenirPartie(idEssai) {
  const { joueurs, idActif, ...reste } = PARTIE_EXEMPLE;

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
      joueur: actif.nom,
      personnage: actif.personnage,
      pouvoir: aUnPouvoir ? { titre: `Pouvoir : ${actif.personnage.nom}`, description: actif.personnage.pouvoir } : null,
    },
  };
}

// Lance le dé : renvoie une valeur de 1 à 6.
// Provisoire : tirage au hasard ici, pour essayer l'animation. Plus tard, c'est le serveur
// (le moteur de jeu) qui décidera du résultat, et ce service ira le lui demander.
export function lancerDe() {
  return 1 + Math.floor(Math.random() * 6);
}
