// Responsabilité : choisit un rideau au hasard à chaque changement de page.

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RIDEAUX } from '@/styles/animations/rideaux/rideaux.js';

// Écrit un rideau au hasard sur <html data-rideau="…">, jamais le même 2 fois de suite.
function choisirRideau() {
  const page = document.documentElement;
  const possibles = RIDEAUX.filter((nom) => nom !== page.dataset.rideau);
  page.dataset.rideau = possibles[Math.floor(Math.random() * possibles.length)];
}

// useLayoutEffect (pis pas useEffect) : il passe juste avant que le rideau commence, donc le choix compte pour celui-là.
function useRideauAuHasard() {
  const { pathname } = useLocation();
  useLayoutEffect(choisirRideau, [pathname]);
}

export default useRideauAuHasard;
