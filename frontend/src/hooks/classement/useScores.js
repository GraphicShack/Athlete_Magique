// Responsabilité : charge les scores du filtre choisi pis garde où en est le chargement.
// Utilisé dans : ClassementPage

import { useEffect, useState } from 'react';
import { obtenirScores } from '@/services/serveur/scores.js';

// Renvoie les scores, l'état ('chargement', 'pret' ou 'erreur'), pis reessayer.
function useScores(filtre) {
  const [scores, setScores] = useState([]);
  const [etat, setEtat] = useState('chargement');
  const [essai, setEssai] = useState(0); // change quand on clique « Réessayer », pour relancer l'effet

  useEffect(() => {
    let perime = false; // true si on a changé de filtre ou de page avant la réponse : on l'ignore
    setEtat('chargement');

    obtenirScores(filtre)
      .then((recus) => {
        if (perime) return;
        setScores(recus);
        setEtat('pret');
      })
      .catch((erreur) => {
        if (perime) return;
        console.error('Scores :', erreur); // pour nous, dans la console
        setEtat('erreur');
      });

    return () => {
      perime = true;
    };
  }, [filtre, essai]);

  return { scores, etat, reessayer: () => setEssai(essai + 1) };
}

export default useScores;
