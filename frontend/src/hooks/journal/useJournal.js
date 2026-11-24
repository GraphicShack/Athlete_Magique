// Responsabilité : donne le journal prêt à afficher (connecte les événements, les noms pis les phrases).
// Utilisé dans : CoursePage

import useEvenementsRecus from '@/hooks/journal/useEvenementsRecus.js';
import useSimulationJournal from '@/hooks/journal/useSimulationJournal.aSupprimer.js';
import { obtenirPersonnages } from '@/services/personnages.js';
import { nomJoueur, nomPersonnage } from '@/utils/journal/nomsJournal.js';
import { texteEvenement } from '@/utils/journal/texteEvenement.js';

// Renvoie le journal prêt à afficher : [{ id, tour, texte }].
function useJournal(joueurs) {
  const recus = useEvenementsRecus();
  useSimulationJournal();
  const personnages = obtenirPersonnages();

  const noms = {
    nomJoueur: (id) => nomJoueur(joueurs, id),
    nomPersonnage: (id) => nomPersonnage(personnages, id),
  };

  return recus.map((evenement) => ({
    id: evenement.id,
    tour: evenement.tour,
    texte: texteEvenement(evenement, noms),
  }));
}

export default useJournal;
