/*
 * useChoixTour.js : hook qui retient les choix du joueur pendant son tour.
 *
 * Une seule chose : garder en mémoire
 *   deplacement : le nombre de cases choisi (null tant qu'il n'a pas gardé ou doublé) ;
 *   fini        : true quand il a avancé ou échangé sa place ;
 *   messageFin  : un message de fin particulier (ex. échange du Flip Flop), sinon null.
 */
import { useState } from 'react';

function useChoixTour() {
  const [deplacement, setDeplacement] = useState(null);
  const [fini, setFini] = useState(false);
  const [messageFin, setMessageFin] = useState(null);

  // Le joueur fixe son nombre de cases (garder ou doubler).
  const choisirDeplacement = (cases) => setDeplacement(cases);

  // Le joueur termine son tour, avec un message de fin s'il y en a un.
  const terminer = (message = null) => {
    setMessageFin(message);
    setFini(true);
  };

  return { deplacement, fini, messageFin, choisirDeplacement, terminer };
}

export default useChoixTour;
