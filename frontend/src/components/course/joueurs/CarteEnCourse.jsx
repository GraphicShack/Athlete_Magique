// Responsabilité : la carte d'un joueur pendant la course (« Magicien · Case 12 », ses points).

import { texteNom, texteDetail, textePoints } from '@/utils/textesJoueur.js';
import Gains from '@/components/commun/jeu/Gains.jsx';
import CarteJoueur from './CarteJoueur.jsx';

// Props : joueur, actif (true = en évidence), gains (les siens, optionnel).
function CarteEnCourse({ joueur, actif, gains = [] }) {
  return (
    <CarteJoueur
      nom={texteNom(joueur)}
      detail={texteDetail(joueur)}
      points={textePoints(joueur.points)}
      couleur={joueur.couleur}
      personnage={joueur.personnage}
      actif={actif}
    >
      {gains.length > 0 && <Gains gains={gains} />}
    </CarteJoueur>
  );
}

export default CarteEnCourse;
