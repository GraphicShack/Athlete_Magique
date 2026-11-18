/*
 * useSimulationJournal.js : hook qui lance la simulation du journal pendant que la page est ouverte.
 *
 * Une seule chose : démarrer la simulation à l'ouverture de la page, et l'arrêter à la fermeture.
 * Une seule simulation par page, peu importe le nombre d'abonnés au journal.
 * À retirer quand le serveur enverra les vrais événements.
 */
import { useEffect } from 'react';
import { demarrerSimulation } from '@/services/journal/simulationJournal.js';

function useSimulationJournal() {
  // demarrerSimulation renvoie la fonction qui l'arrête : React l'appelle en quittant la page.
  useEffect(() => demarrerSimulation(), []);
}

export default useSimulationJournal;
