// Responsabilité : le panneau « Joueurs » de la course, dans l'ordre de jeu.

import Panneau from '@/components/commun/ui/Panneau.jsx';
import CarteEnCourse from './CarteEnCourse.jsx';
import { Joueurs } from './ListeJoueurs.styles.js';

// Affiche une carte par joueur.
// Props : joueurs, idActif (celui qui joue).
function ListeJoueurs({ joueurs, idActif }) {
  return (
    <Panneau titre="Joueurs" teinte="joueurs">
      <Joueurs aria-label="Joueurs, dans l'ordre de jeu">
        {joueurs.map((joueur) => (
          <CarteEnCourse key={joueur.id} joueur={joueur} actif={joueur.id === idActif} />
        ))}
      </Joueurs>
    </Panneau>
  );
}

export default ListeJoueurs;
