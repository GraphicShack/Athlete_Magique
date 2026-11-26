// Responsabilité : la carte d'un joueur pendant la course (« Magicien · Case 12 », ses points).

import { texteNom, texteDetail, textePoints } from '@/utils/textesJoueur.js';
import CarteJoueur from './CarteJoueur.jsx';

// Props : joueur, actif (true = en évidence).
function CarteEnCourse({ joueur, actif }) {
  return (
    <CarteJoueur
      nom={texteNom(joueur)}
      detail={texteDetail(joueur)}
      points={textePoints(joueur.points)}
      couleur={joueur.couleur}
      personnage={joueur.personnage}
      actif={actif}
    />
  );
}

export default CarteEnCourse;
