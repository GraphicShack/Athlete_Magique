// Responsabilité : amène tout le monde à la sélection quand la partie est lancée.

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CHEMINS from '@/chemins.js';

// Change de page seulement au moment où le statut passe de 'attente' à 'selection' (sinon on pourrait plus revenir au salon).
function useSuivrePartie(statut) {
  const naviguer = useNavigate();
  const statutAvant = useRef(statut);

  useEffect(() => {
    const vientDeLancer = statutAvant.current === 'attente' && statut === 'selection';
    statutAvant.current = statut;
    if (vientDeLancer) naviguer(CHEMINS.selection, { viewTransition: true });
  }, [statut, naviguer]);
}

export default useSuivrePartie;
