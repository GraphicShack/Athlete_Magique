// Responsabilité : donne la fin de course à la page, avec le perso complet de chaque joueur.

import useBoite from '@/hooks/useBoite.js';
import { finRecue } from '@/services/serveur/finCourse.js';
import { obtenirPersonnage } from '@/services/personnages.js';

// Renvoie { numero, nombreCourses, joueurs, ordreChoix }, ou null si aucune course est finie.
function useFinCourse() {
  const fin = useBoite(finRecue);
  return fin && {
    ...fin,
    joueurs: fin.joueurs.map((joueur) => ({ ...joueur, personnage: obtenirPersonnage(joueur.idPersonnage) })),
  };
}

export default useFinCourse;
