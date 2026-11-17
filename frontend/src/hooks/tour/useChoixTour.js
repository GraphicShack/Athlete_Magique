/*
 * useChoixTour.js : hook qui retient les choix du joueur pendant son tour.
 *
 * Une seule chose : garder en mémoire
 *   etape       : l'étape choisie (1 au départ, 2 après « Commencer », 4 après le déplacement) ;
 *   deplacement : le nombre de cases choisi (null tant qu'il n'a pas gardé ou doublé) ;
 *   termine     : true quand il a cliqué « Fin du tour ».
 */
import { useState } from 'react';

function useChoixTour() {
  const [etape, setEtape] = useState(1);
  const [deplacement, setDeplacement] = useState(null);
  const [termine, setTermine] = useState(false);

  // Passer à une étape (1, 2 ou 4).
  const passerA = (numero) => setEtape(numero);

  // Le joueur fixe son nombre de cases (garder ou doubler).
  const choisirDeplacement = (cases) => setDeplacement(cases);

  // Le joueur termine son tour.
  const terminer = () => setTermine(true);

  return { etape, deplacement, termine, passerA, choisirDeplacement, terminer };
}

export default useChoixTour;
