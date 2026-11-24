// Responsabilité : fait avancer le pion une case à la fois jusqu'à sa case d'arrivée (pour l'anim de saut).

import { useEffect, useState } from 'react';
import { DUREE_PAS } from '@/styles/animations/sautJeton.js';

// Check si le joueur a activé « Réduire les animations » (voir useAnimationsReduites.js).
const moinsDAnimations = () => document.documentElement.dataset.animations === 'reduites';

// Donne la case où dessiner le pion, celle qu'il vient de quitter, pis s'il bouge encore.
function useDeplacementAnime(caseVisee) {
  const [position, setPosition] = useState(caseVisee);
  const [depuis, setDepuis] = useState(null);

  useEffect(() => {
    // Arrivé : on laisse finir le dernier saut avant de dire qu'il bouge plus.
    if (position === caseVisee) {
      if (depuis === null) return;
      const minuterie = setTimeout(() => setDepuis(null), DUREE_PAS);
      return () => clearTimeout(minuterie);
    }

    if (moinsDAnimations()) {
      setPosition(caseVisee);
      return;
    }

    const pas = position < caseVisee ? 1 : -1; // -1 = il recule
    // Le 1er saut part tout de suite (délai 0), les autres attendent la fin du saut d'avant.
    const minuterie = setTimeout(
      () => {
        setDepuis(position);
        setPosition(position + pas);
      },
      depuis === null ? 0 : DUREE_PAS
    );
    return () => clearTimeout(minuterie);
  }, [position, depuis, caseVisee]);

  return { position, depuis, enMouvement: position !== caseVisee || depuis !== null };
}

export default useDeplacementAnime;
