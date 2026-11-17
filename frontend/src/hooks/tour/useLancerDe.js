/*
 * useLancerDe.js : hook (fonction React réutilisable) qui gère l'état d'un lancer de dé.
 *
 * Responsabilités :
 *   - retenir la valeur du dé, le nombre de lancers (pour relancer l'animation) et la valeur
 *     obtenue une fois le dé arrêté ;
 *   - lancer le dé (en demandant la valeur au service de.js) ;
 *   - retenir la valeur quand le dé a fini de rouler.
 *
 * Il ne dessine rien : le dé est affiché par De.jsx, qui le prévient quand il s'arrête.
 *
 * Utilisation :
 *   const lancer = useLancerDe(3);
 *   <De valeur={lancer.valeur} lancer={lancer.lancers} onArret={lancer.surArret} />
 *   <button onClick={lancer.relancer}>Lancer</button>
 *
 * Renvoie :
 *   valeur   : la face que le dé doit montrer
 *   lancers  : le nombre de lancers faits (0 au départ)
 *   obtenu   : la valeur une fois le dé arrêté, ou null pendant qu'il roule
 *   relancer : fonction qui lance le dé
 *   surArret : fonction à appeler quand le dé s'est arrêté (avec sa valeur)
 */
import { useState } from 'react';
import { lancerDe } from '@/services/de.js';

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
