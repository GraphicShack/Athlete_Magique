// Responsabilité : place des joueurs côte à côte, avec quelque chose sous chaque carte (un dé, un bouton…).

import CarteEnCourse from './CarteEnCourse.jsx';
import { Grille, Colonne, Carte } from './CartesJoueurs.styles.js';

// Props : joueurs, idEnEvidence (optionnel), children (fonction qui reçoit un joueur pis renvoie ce qui va sous sa carte).
function CartesJoueurs({ joueurs, idEnEvidence, children }) {
  return (
    <Grille>
      {joueurs.map((joueur) => (
        <Colonne key={joueur.id}>
          <Carte>
            <CarteEnCourse joueur={joueur} actif={joueur.id === idEnEvidence} />
          </Carte>
          {children(joueur)}
        </Colonne>
      ))}
    </Grille>
  );
}

export default CartesJoueurs;
