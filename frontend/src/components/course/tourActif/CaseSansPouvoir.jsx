// Responsabilité : la case du tour quand y'a pas de pouvoir à cette étape (juste les boutons).
// Utilisé dans : ControleurDeTourActif

import EncadreTour from './EncadreTour.jsx';
import BoutonsAction from './BoutonsAction.jsx';

// Affiche le nom de l'étape pis ses boutons.
function CaseSansPouvoir({ titre, actions, onAction }) {
  return (
    <EncadreTour neutre titre={titre} texte="Ton personnage n’a pas de pouvoir à utiliser à cette étape.">
      <BoutonsAction actions={actions} onAction={onAction} />
    </EncadreTour>
  );
}

export default CaseSansPouvoir;
