// Responsabilité : garde le réglage « Réduire les animations » pis l'applique à toute la page.

import { useEffect, useState } from 'react';

// Au départ, on suit le réglage de l'ordinateur du joueur.
const choixOrdinateur = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Renvoie [reduites, setReduites], comme useState.
function useAnimationsReduites() {
  const [reduites, setReduites] = useState(choixOrdinateur);

  // On l'écrit sur <html data-animations="…"> : le CSS (StyleGlobal) pis les pions le lisent là.
  useEffect(() => {
    document.documentElement.dataset.animations = reduites ? 'reduites' : 'completes';
  }, [reduites]);

  return [reduites, setReduites];
}

export default useAnimationsReduites;
