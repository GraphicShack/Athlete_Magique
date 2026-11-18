// Responsabilité : donne l'état de la partie (joueurs, piste, tour en cours).
// Utilisé dans : CoursePage

import PARTIE_EXEMPLE from '@/data/exemples/partieExemple.js';
import { TOUR_PAR_DEFAUT, POUVOIRS_PAR_ETAPE } from '@/data/exemples/deroulementTour.js';
import { obtenirPersonnages } from '@/services/personnages.js';

// Le perso complet ({ id, nom, initiales, pouvoir, image }) à partir de son id.
function personnageDepuisId(id) {
  return obtenirPersonnages().find((p) => p.id === id);
}

// Les persos qu'on peut essayer comme joueur actif (tous).
const PERSONNAGES_A_ESSAYER = obtenirPersonnages().map((p) => p.id);

// L'état de la partie : { course, rochers, idActif, joueurs: [Joueur], tour } Chaque joueur reçoit son perso complet à la place de idPersonnage, et le tour reçoit le joueur actif, son perso, son pouvoir et ses 4 étapes (voir data/exemples/deroulementTour.js).
export function obtenirPartie(idEssai) {
  const { joueurs, idActif, numeroTour, ...reste } = PARTIE_EXEMPLE;

  const joueursComplets = joueurs.map(({ idPersonnage, ...joueur }) => {
    const remplace = joueur.id === idActif && PERSONNAGES_A_ESSAYER.includes(idEssai);
    return { ...joueur, personnage: personnageDepuisId(remplace ? idEssai : idPersonnage) };
  });
  const actif = joueursComplets.find((joueur) => joueur.id === idActif);

  // Les 4 étapes du tour du perso actif : son pouvoir là où il en a un, sinon l'étape par défaut.
  const pouvoirs = POUVOIRS_PAR_ETAPE[actif.personnage.id] ?? {};
  const etapes = { ...TOUR_PAR_DEFAUT, ...pouvoirs };

  return {
    ...reste,
    idActif,
    joueurs: joueursComplets,
    tour: {
      etapes,
      numero: numeroTour,
      numeroCourse: reste.course.numero,
      idJoueur: actif.id,
      position: actif.position,
      joueur: actif.nom,
      personnage: actif.personnage,
      pouvoir: { titre: `Pouvoir : ${actif.personnage.nom}`, description: actif.personnage.pouvoir },
    },
  };
}
