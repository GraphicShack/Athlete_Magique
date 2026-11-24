// Responsabilité : fait avancer les pions une case à la fois jusqu'à leur case (pour l'anim de saut).

import { useEffect, useState } from 'react';
import { DUREE_PAS } from '@/styles/animations/sautJeton.js';

// Check si le joueur a activé « Réduire les animations » (voir useAnimationsReduites.js).
const moinsDAnimations = () => document.documentElement.dataset.animations === 'reduites';

// Renvoie les joueurs comme on les montre, le saut en cours ({ id, depuis } ou null), pis enMouvement.
function usePionsAnimes(joueurs) {
  const [montres, setMontres] = useState(joueurs); // les joueurs tels que montrés la dernière fois
  const [saut, setSaut] = useState(null);

  // Un joueur qui vient d'arriver dans la partie est montré tout de suite, sur sa vraie case.
  const montre = (joueur) => montres.find(({ id }) => id === joueur.id) ?? joueur;
  const estRendu = (joueur) => montre(joueur).position === joueur.position;

  // Tant qu'un pion est pas rendu, on garde l'ancien joueur (sinon on dévoile ses points, sa chute…).
  const vus = joueurs.map((joueur) => (estRendu(joueur) ? joueur : montre(joueur)));
  // Le premier pion qui est pas encore rendu sur sa case.
  const enRoute = joueurs.find((joueur) => !estRendu(joueur));

  useEffect(() => {
    // Tous rendus : on laisse finir le dernier saut.
    if (!enRoute) {
      setMontres(joueurs);
      if (!saut) return;
      const minuterie = setTimeout(() => setSaut(null), DUREE_PAS);
      return () => clearTimeout(minuterie);
    }

    if (moinsDAnimations()) {
      setMontres(joueurs);
      return;
    }

    const { id, position: depuis } = montre(enRoute);
    const pas = depuis < enRoute.position ? 1 : -1; // -1 = il recule
    // Le 1er saut part tout de suite, les autres attendent la fin du saut d'avant.
    const minuterie = setTimeout(
      () => {
        setSaut({ id, depuis });
        setMontres(vus.map((joueur) => (joueur.id === id ? { ...joueur, position: depuis + pas } : joueur)));
      },
      saut ? DUREE_PAS : 0
    );
    return () => clearTimeout(minuterie);
  }, [joueurs, montres, saut]);

  return { joueurs: vus, saut, enMouvement: Boolean(enRoute || saut) };
}

export default usePionsAnimes;
