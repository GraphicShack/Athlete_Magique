/*
 * useEvenementsRecus.js : hook qui reçoit les événements de la partie.
 *
 * Une seule chose : s'abonner au journal (services/journal/journal.js) quand la page s'ouvre,
 * se désabonner quand elle se ferme, et garder les événements reçus
 * (le plus récent en premier).
 */
import { useEffect, useState } from 'react';
import { ecouterEvenements } from '@/services/journal/journal.js';

function useEvenementsRecus() {
  const [recus, setRecus] = useState([]);

  useEffect(() => {
    // ecouterEvenements renvoie la fonction qui nous désabonne : React l'appelle en quittant la page.
    return ecouterEvenements((evenement) => setRecus((avant) => [evenement, ...avant]));
  }, []);

  return recus;
}

export default useEvenementsRecus;
