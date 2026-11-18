/*
 * useJournal.js : hook qui donne le journal prêt à afficher.
 *
 * C'est un fichier qui connecte : il ne fait rien lui-même, il utilise
 *   - useEvenementsRecus : les événements reçus ;
 *   - useSimulationJournal : les événements d'exemple (en attendant le serveur) ;
 *   - nomsJournal        : les noms des joueurs et des personnages ;
 *   - texteEvenement     : la phrase de chaque événement (avec sa cause).
 *
 * Utilisation :
 *   const evenements = useJournal(joueurs);
 *   <JournalEvenements evenements={evenements} />
 *
 * Renvoie : [{ id, tour, texte }], le plus récent en premier.
 */
import useEvenementsRecus from '@/hooks/journal/useEvenementsRecus.js';
import useSimulationJournal from '@/hooks/journal/useSimulationJournal.js';
import { obtenirPersonnages } from '@/services/personnages.js';
import { nomJoueur, nomPersonnage } from '@/utils/journal/nomsJournal.js';
import { texteEvenement } from '@/utils/journal/texteEvenement.js';

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
