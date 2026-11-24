// Responsabilité : dit si on montre la blague (1 chance sur 100, pendant 10 secondes).

import { useEffect, useState } from 'react';

const CHANCE = 1 / 100;
const DUREE = 10_000; // ms

// Renvoie true pendant la blague, sinon false. Tirée une seule fois, à l'ouverture.
function useBlague() {
  const [blague, setBlague] = useState(() => Math.random() < CHANCE);

  useEffect(() => {
    const minuterie = setTimeout(() => setBlague(false), DUREE);
    return () => clearTimeout(minuterie); // le panneau est parti avant la fin
  }, []);

  return blague;
}

export default useBlague;
