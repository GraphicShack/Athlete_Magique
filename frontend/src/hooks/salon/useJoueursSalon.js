// Responsabilité : garde la liste des joueurs du salon (retirer, ajouter un bot).
// Utilisé dans : ConfigurationPage

import { useState } from 'react';
import { retirerJoueur, ajouterBot as avecUnBot } from '@/utils/salon/joueursSalon.js';

// Renvoie les joueurs, retirer(id) pis ajouterBot().
function useJoueursSalon(joueursDepart) {
  const [joueurs, setJoueurs] = useState(joueursDepart);

  // Retire le joueur qui a cet id.
  const retirer = (id) => setJoueurs((avant) => retirerJoueur(avant, id));
  // Ajoute un bot à la fin.
  const ajouterBot = () => setJoueurs((avant) => avecUnBot(avant));

  return { joueurs, retirer, ajouterBot };
}

export default useJoueursSalon;
