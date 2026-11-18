// Responsabilité : garde l'état du dé (valeur, nb de lancers, valeur obtenue).
// Utilisé dans : useTourDemo

import { useState } from 'react';
import { lancerDe } from '@/services/de.js';

// Renvoie l'état du dé pis les fonctions relancer / surArret.
function useLancerDe(valeurDepart) {
  const [etat, setEtat] = useState({ valeur: valeurDepart, lancers: 0, obtenu: valeurDepart });

  // Nouveau lancer : la valeur vient du service ; tant que le dé roule, rien n'est encore obtenu.
  const relancer = () => {
    setEtat((avant) => ({ valeur: lancerDe(), lancers: avant.lancers + 1, obtenu: null }));
  };

  // Le dé s'est arrêté : sa valeur devient le résultat obtenu.
  const surArret = (valeur) => {
    setEtat((avant) => ({ ...avant, obtenu: valeur }));
  };

  return { ...etat, relancer, surArret };
}

export default useLancerDe;
