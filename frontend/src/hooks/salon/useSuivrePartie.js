// Responsabilité : amène tout le monde à la bonne page quand le statut du salon change.

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSalon from '@/hooks/salon/useSalon.js';
import { pageDuStatut } from '@/utils/salon/pageDuStatut.js';

// Change de page seulement au moment où le statut change (sinon on pourrait plus revenir au salon).
function useSuivrePartie() {
  const statut = useSalon()?.statut;
  const naviguer = useNavigate();
  const statutAvant = useRef(statut);

  useEffect(() => {
    const vientDeChanger = statutAvant.current && statutAvant.current !== statut;
    statutAvant.current = statut;
    const page = pageDuStatut(statut);
    if (vientDeChanger && page) naviguer(page, { viewTransition: true });
  }, [statut, naviguer]);
}

export default useSuivrePartie;
