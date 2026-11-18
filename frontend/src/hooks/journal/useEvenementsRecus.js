// Responsabilité : s'abonne au journal pis garde les événements reçus.
// Utilisé dans : useJournal

import { useEffect, useState } from 'react';
import { ecouterEvenements } from '@/services/journal/journal.js';

// Renvoie les événements reçus, le plus récent en premier.
function useEvenementsRecus() {
  const [recus, setRecus] = useState([]);

  useEffect(() => {
    // ecouterEvenements renvoie la fonction qui nous désabonne : React l'appelle en quittant la page.
    return ecouterEvenements((evenement) => setRecus((avant) => [evenement, ...avant]));
  }, []);

  return recus;
}

export default useEvenementsRecus;
