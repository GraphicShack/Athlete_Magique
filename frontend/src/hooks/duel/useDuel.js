// Responsabilité : où est rendu le duel (étape, ouvert ou fermé) pis ma réponse.

import { useState } from 'react';
import useDemande from '@/hooks/useDemande.js';
import { repondreDuel } from '@/services/serveur/partie.js';

// L'étape : la question, les dés qui roulent, pis le résultat.
function etapeDuel(duel, desArretes) {
  if (!duel.valeurs) return 'question';
  return desArretes ? 'resultat' : 'des';
}

// duel : reçu du serveur. monDuel : true si c'est moi qui décide.
function useDuel(duel, monDuel) {
  const [desArretes, setDesArretes] = useState(false);
  const [etapeFermee, setEtapeFermee] = useState(null); // l'étape où j'ai fermé la fenêtre
  const { enCours, erreur, faire } = useDemande(duel);

  const etape = etapeDuel(duel, desArretes);
  const aVoir = monDuel || etape !== 'question'; // la question est juste pour le Duelliste

  // Fermer la question = passer. Si le serveur refuse, la fenêtre revient.
  const fermer = async () => {
    setEtapeFermee(etape);
    if (etape !== 'question' || enCours) return;
    const reussi = await faire(() => repondreDuel(duel.id, false));
    if (!reussi) setEtapeFermee(null);
  };

  return {
    etape,
    ouverte: aVoir && etapeFermee !== etape,
    enCours,
    erreur,
    accepter: () => faire(() => repondreDuel(duel.id, true)),
    fermer,
    surArretDes: () => setDesArretes(true),
  };
}

export default useDuel;
