// Responsabilité : prépare les joueurs de la course pour l'affichage (case, couleur, jetons).

import { useTheme } from 'styled-components';
import { deplacerJoueur } from '@/utils/piste/deplacerJoueur.js';
import { jetonsDesJoueurs } from '@/utils/piste/jetons.js';

// pion = { position, depuis } du joueur actif (vient de useTourDemo).
function useJoueursCourse(joueursDepart, idActif, pion) {
  const theme = useTheme();

  // Le joueur actif sur sa case du moment, puis la couleur de chacun (la même sur sa carte pis son jeton).
  const joueurs = deplacerJoueur(joueursDepart, idActif, pion.position).map((joueur, rang) => ({
    ...joueur,
    couleur: theme.joueurs[rang],
  }));

  // Le pion qui saute en ce moment (et la case qu'il quitte), pour l'animation en arc.
  const mouvement = pion.depuis !== null ? { id: idActif, depuis: pion.depuis } : null;

  return { joueurs, jetons: jetonsDesJoueurs(joueurs, idActif, mouvement) };
}

export default useJoueursCourse;
