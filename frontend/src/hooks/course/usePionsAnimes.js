// Responsabilité : fait avancer les pions une case à la fois jusqu'à leur case (pour l'anim de saut).

import { useEffect, useState } from 'react';
import { DUREE_PAS } from '@/styles/animations/sautJeton.js';
import { moinsDAnimations } from '@/utils/moinsDAnimations.js';

// Renvoie les joueurs comme on les affiche, le saut en cours ({ id, depuis } ou null), pis enMouvement.
function usePionsAnimes(joueurs) {
  const [affiches, setAffiches] = useState(joueurs); // les joueurs tels qu'affichés la dernière fois
  const [saut, setSaut] = useState(null);

  // Un joueur qui vient d'arriver dans la partie est affiché tout de suite, sur sa vraie case.
  const joueurAffiche = (joueur) => affiches.find(({ id }) => id === joueur.id) ?? joueur;
  // Un téléporté marche pas : il est déjà rendu (voir useTeleportations.js).
  const estRendu = (joueur) => {
    const { position, teleportations } = joueurAffiche(joueur);
    return position === joueur.position || teleportations !== joueur.teleportations;
  };

  // Tant qu'un pion est pas rendu, on garde l'ancien joueur (sinon on dévoile ses points, sa chute…).
  const aAfficher = joueurs.map((joueur) => (estRendu(joueur) ? joueur : joueurAffiche(joueur)));

  // Le premier pion qui est pas encore rendu : où il est, pis où il va.
  const enRoute = joueurs.find((joueur) => !estRendu(joueur));
  const id = enRoute?.id;
  const but = enRoute?.position;
  const depuis = enRoute && joueurAffiche(enRoute).position;

  // Nouvel état reçu, ou un pion vient d'arriver : on retient ce qu'on affiche.
  useEffect(() => setAffiches(aAfficher), [joueurs, id]);

  // Fait le prochain saut.
  useEffect(() => {
    if (moinsDAnimations()) {
      setAffiches(joueurs);
      setSaut(null);
      return;
    }
    if (!enRoute && !saut) return;

    const faireUnSaut = () => {
      // Tous rendus : le dernier saut est fini.
      if (!enRoute) {
        setSaut(null);
        return;
      }
      const pas = depuis < but ? 1 : -1; // -1 = il recule
      setSaut({ id, depuis });
      setAffiches((avant) => avant.map((joueur) => (joueur.id === id ? { ...joueur, position: depuis + pas } : joueur)));
    };

    // Le 1er saut part tout de suite, les autres attendent la fin du saut d'avant.
    const minuterie = setTimeout(faireUnSaut, saut ? DUREE_PAS : 0);
    return () => clearTimeout(minuterie);
  }, [id, but, depuis, saut]);

  return { joueurs: aAfficher, saut, enMouvement: Boolean(enRoute || saut) };
}

export default usePionsAnimes;
