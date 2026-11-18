// Responsabilité : garde les choix du joueur pendant son tour (étape, déplacement, fini).
// Utilisé dans : useTourDemo

import { useState } from 'react';

// Renvoie l'étape, le déplacement choisi, les cases avancées, si c'est fini, pis les fonctions pour les changer.
function useChoixTour() {
  const [etape, setEtape] = useState(1);
  const [deplacement, setDeplacement] = useState(null);
  const [avance, setAvance] = useState(0);
  const [termine, setTermine] = useState(false);

  // Passer à une étape (1, 2 ou 4).
  const passerA = (numero) => setEtape(numero);

  // Le joueur fixe son nb de cases (garder ou doubler).
  const choisirDeplacement = (cases) => setDeplacement(cases);

  // Le joueur confirme son déplacement : il avance de « cases » cases.
  const avancer = (cases) => setAvance(cases);

  // Le joueur termine son tour.
  const terminer = () => setTermine(true);

  return { etape, deplacement, avance, termine, passerA, choisirDeplacement, avancer, terminer };
}

export default useChoixTour;
