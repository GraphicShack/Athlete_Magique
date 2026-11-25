// Responsabilité : les points gagnés à montrer en ce moment (« +1 »), pendant un petit bout.

import { useEffect, useRef, useState } from 'react';
import { DUREE_GAIN } from '@/styles/animations/gain.js';

// Les événements après le dernier qu'on a vu.
function apres(journal, idDernier) {
  const rang = journal.findIndex(({ id }) => id === idDernier);
  return idDernier && rang === -1 ? [] : journal.slice(rang + 1);
}

// journal : du plus ancien au plus récent. enMouvement : les gains attendent que les pions soient rendus.
// Renvoie [{ id, idJoueur, points }].
function useGains(journal, enMouvement) {
  const [gains, setGains] = useState([]);
  const dernierVu = useRef(journal.at(-1)?.id); // ce qui est déjà là au début est pas montré

  useEffect(() => {
    if (enMouvement) return;
    const nouveaux = apres(journal, dernierVu.current)
      .filter(({ type }) => type === 'POINTS')
      .map(({ id, acteur, details }) => ({ id, idJoueur: acteur, points: details.points }));
    dernierVu.current = journal.at(-1)?.id;
    if (nouveaux.length === 0) return;

    setGains((avant) => [...avant, ...nouveaux]);
    setTimeout(() => setGains((avant) => avant.filter((gain) => !nouveaux.includes(gain))), DUREE_GAIN);
  }, [journal, enMouvement]);

  return gains;
}

export default useGains;
