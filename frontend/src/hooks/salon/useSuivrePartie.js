// Responsabilité : amène le joueur à la page qui va avec le statut du salon.

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSalon from '@/hooks/salon/useSalon.js';
import { pageDuStatut } from '@/utils/salon/pageDuStatut.js';

// Une seule règle : si le statut a une page pis que j'y suis pas, j'y vais.
function useSuivrePartie() {
  const page = pageDuStatut(useSalon()?.statut);
  const { pathname } = useLocation();
  const naviguer = useNavigate();

  useEffect(() => {
    // replace : le bouton Retour du navigateur ramène pas à une page dépassée.
    if (page && page !== pathname) naviguer(page, { replace: true, viewTransition: true });
  }, [page, pathname, naviguer]);
}

export default useSuivrePartie;
