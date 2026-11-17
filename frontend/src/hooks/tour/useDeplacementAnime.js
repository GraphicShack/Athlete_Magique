/*
 * useDeplacementAnime.js : hook qui fait avancer un pion case par case jusqu'à sa case d'arrivée.
 *
 * Une seule chose : donner la case à afficher pendant le déplacement, et la case qu'il vient
 * de quitter (pour le saut en arc, voir styles/animations/sautJeton.js).
 * Le pion change de case toutes les DUREE_PAS millisecondes, jusqu'à la case visée.
 *
 * Si le joueur a demandé moins d'animations, le pion va directement à sa case.
 *
 * Utilisation :
 *   const { position, depuis, enMouvement } = useDeplacementAnime(caseVisee);
 *
 * Renvoie :
 *   position    : la case où dessiner le pion maintenant
 *   depuis      : la case qu'il vient de quitter (null s'il ne bouge pas)
 *   enMouvement : true tant que le pion n'a pas fini son dernier saut
 */
import { useEffect, useState } from 'react';
import { DUREE_PAS } from '@/styles/animations/sautJeton.js';

// true si le joueur a demandé moins d'animations dans son système.
const moinsDAnimations = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useDeplacementAnime(caseVisee) {
  const [position, setPosition] = useState(caseVisee);
  const [depuis, setDepuis] = useState(null);

  useEffect(() => {
    // Arrivé : on attend la fin du dernier saut, puis le pion ne bouge plus.
    if (position === caseVisee) {
      if (depuis === null) return;
      const minuterie = setTimeout(() => setDepuis(null), DUREE_PAS);
      return () => clearTimeout(minuterie);
    }

    if (moinsDAnimations()) {
      setPosition(caseVisee);
      return;
    }

    // Pas encore arrivé : on saute sur la case suivante (tout de suite pour le premier saut,
    // puis une fois le saut précédent fini).
    const pas = position < caseVisee ? 1 : -1; // en avant (ou en arrière pour un recul)
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
