/*
 * useJoueursCourse.js : hook qui prépare les joueurs de la course pour l'affichage.
 *
 * C'est un fichier qui connecte : il ne calcule rien lui-même, il relie
 *   - utils/piste/deplacerJoueur : le joueur actif est posé sur sa case du moment ;
 *   - le thème : chaque joueur reçoit la couleur de son pion, selon son rang ;
 *   - utils/piste/jetons : les jetons à poser sur la piste (avec le saut du pion qui avance).
 *
 * Utilisation :
 *   const { joueurs, jetons } = useJoueursCourse(partie.joueurs, idActif, tourDemo);
 *   joueurs : pour la liste des joueurs ; jetons : pour la piste
 */
import { useTheme } from 'styled-components';
import { deplacerJoueur } from '@/utils/piste/deplacerJoueur.js';
import { jetonsDesJoueurs } from '@/utils/piste/jetons.js';

/**
 *   joueursDepart : les joueurs de la partie (positions de départ)
 *   idActif       : le joueur dont c'est le tour
 *   pion          : { position, depuis } du joueur actif (voir hooks/tour/useTourDemo.js)
 */
function useJoueursCourse(joueursDepart, idActif, pion) {
  const theme = useTheme();

  // Le joueur actif sur sa case du moment, puis la couleur de chacun (la même sur sa carte et son jeton).
  const joueurs = deplacerJoueur(joueursDepart, idActif, pion.position).map((joueur, rang) => ({
    ...joueur,
    couleur: theme.joueurs[rang],
  }));

  // Le pion qui saute en ce moment (et la case qu'il quitte), pour l'animation en arc.
  const mouvement = pion.depuis !== null ? { id: idActif, depuis: pion.depuis } : null;

  return { joueurs, jetons: jetonsDesJoueurs(joueurs, idActif, mouvement) };
}

export default useJoueursCourse;
