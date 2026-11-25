// Responsabilité : prépare les joueurs de la course pour l'affichage (perso, case, couleur, jetons).

import { useTheme } from 'styled-components';
import useTeleportations from '@/hooks/course/useTeleportations.js';
import usePionsAnimes from '@/hooks/course/usePionsAnimes.js';
import { obtenirPersonnage } from '@/services/personnages.js';
import { jetonsDesJoueurs } from '@/utils/piste/jetons.js';

// Renvoie les joueurs, leurs jetons, pis enMouvement (true pendant qu'un pion avance ou se téléporte).
function useJoueursCourse(joueursRecus, idActif) {
  const theme = useTheme();
  const teleportations = useTeleportations(joueursRecus);
  const pions = usePionsAnimes(teleportations.joueurs);

  const joueurs = pions.joueurs.map((joueur) => ({
    ...joueur,
    personnage: obtenirPersonnage(joueur.idPersonnage),
    couleur: theme.joueurs[joueur.numero - 1],
  }));

  return {
    joueurs,
    jetons: jetonsDesJoueurs(joueurs, idActif, pions.saut, teleportations.fondus),
    enMouvement: pions.enMouvement || teleportations.enFondu,
  };
}

export default useJoueursCourse;
