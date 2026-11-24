// Responsabilité : donne la fin de course à la page, avec le perso complet de chaque joueur.

import { useSyncExternalStore } from 'react';
import { finRecue } from '@/services/serveur/finCourse.js';
import { obtenirPersonnage } from '@/services/personnages.js';

// Renvoie { numero, nombreCourses, joueurs, ordreChoix }, ou null si aucune course est finie.
function useFinCourse() {
  const fin = useSyncExternalStore(finRecue.abonner, finRecue.lire);
  return fin && {
    ...fin,
    joueurs: fin.joueurs.map((joueur) => ({ ...joueur, personnage: obtenirPersonnage(joueur.idPersonnage) })),
  };
}

export default useFinCourse;
