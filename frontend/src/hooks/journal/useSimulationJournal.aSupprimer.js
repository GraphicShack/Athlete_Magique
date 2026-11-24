// Responsabilité : lance la simulation du journal tant que la page est ouverte.

import { useEffect } from 'react';
import { demarrerSimulation } from '@/services/journal/simulationJournal.aSupprimer.js';

// Démarre la simulation à l'ouverture de la page, l'arrête à la fermeture.
function useSimulationJournal() {
  // demarrerSimulation renvoie la fonction qui l'arrête : React l'appelle en quittant la page.
  useEffect(() => demarrerSimulation(), []);
}

export default useSimulationJournal;
