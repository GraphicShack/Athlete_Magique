// Responsabilité : donne l'état de la partie (joueurs, piste, tour en cours).
// À REMPLIR : le contenu viendra du serveur (le fichier reste).

import PARTIE_EXEMPLE from '@/data/exemples/partieExemple.aSupprimer.js';
import { TOUR_PAR_DEFAUT, POUVOIRS_PAR_ETAPE } from '@/data/exemples/deroulementTour.aRemplacer.js';
import { obtenirPersonnage, obtenirPersonnages } from '@/services/personnages.js';
import { finRecue } from '@/services/serveur/finCourse.js';

// Les persos qu'on peut essayer comme joueur actif (tous).
const PERSONNAGES_A_ESSAYER = obtenirPersonnages().map((p) => p.id);

// L'état de la partie : { course, rochers, idActif, joueurs: [Joueur], tour } Chaque joueur reçoit son perso complet à la place de idPersonnage, et le tour reçoit le joueur actif, son perso, son pouvoir et ses 4 étapes (voir data/exemples/deroulementTour.aRemplacer.js).
export function obtenirPartie(idEssai) {
  const { joueurs, idActif, numeroTour, nombreCourses, rochers } = PARTIE_EXEMPLE;

  // La course après la dernière finie (après la 3e, on recommence à 1).
  const numeroCourse = ((finRecue.lire()?.numero ?? 0) % nombreCourses) + 1;

  const joueursComplets = joueurs.map(({ idPersonnage, ...joueur }) => {
    const remplace = joueur.id === idActif && PERSONNAGES_A_ESSAYER.includes(idEssai);
    return { ...joueur, personnage: obtenirPersonnage(remplace ? idEssai : idPersonnage) };
  });
  const actif = joueursComplets.find((joueur) => joueur.id === idActif);

  // Les 4 étapes du tour du perso actif : son pouvoir là où il en a un, sinon l'étape par défaut.
  const pouvoirs = POUVOIRS_PAR_ETAPE[actif.personnage.id] ?? {};
  const etapes = { ...TOUR_PAR_DEFAUT, ...pouvoirs };

  return {
    course: { numero: numeroCourse, nombreCourses },
    rochers,
    idActif,
    joueurs: joueursComplets,
    tour: {
      etapes,
      numero: numeroTour,
      numeroCourse,
      idJoueur: actif.id,
      position: actif.position,
      joueur: actif.nom,
      personnage: actif.personnage,
      pouvoir: { titre: `Pouvoir : ${actif.personnage.nom}`, description: actif.personnage.pouvoir },
    },
  };
}
