/*
 * useJoueursSalon.js : hook qui garde la liste des joueurs de la salle d'attente.
 *
 * Une seule chose : retenir la liste. Les changements (retirer, ajouter un bot) sont
 * calculés par utils/salon/joueursSalon.js.
 * Provisoire : la liste change seulement dans cette page. Plus tard, le serveur
 * préviendra tout le monde.
 *
 * Utilisation :
 *   const { joueurs, retirer, ajouterBot } = useJoueursSalon(salon.joueurs);
 */
import { useState } from 'react';
import { retirerJoueur, ajouterBot as avecUnBot } from '@/utils/salon/joueursSalon.js';

function useJoueursSalon(joueursDepart) {
  const [joueurs, setJoueurs] = useState(joueursDepart);

  const retirer = (id) => setJoueurs((avant) => retirerJoueur(avant, id));
  const ajouterBot = () => setJoueurs((avant) => avecUnBot(avant));

  return { joueurs, retirer, ajouterBot };
}

export default useJoueursSalon;
