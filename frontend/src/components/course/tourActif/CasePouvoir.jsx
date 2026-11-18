// Responsabilité : la case du tour quand le perso a un pouvoir à utiliser à cette étape.
// Utilisé dans : ControleurDeTourActif

import EncadreTour from './EncadreTour.jsx';
import BoutonsAction from './BoutonsAction.jsx';

// Affiche le pouvoir pis ses boutons.
function CasePouvoir({ pouvoir, actions, onAction }) {
  return (
    <EncadreTour titre={pouvoir.titre} texte={pouvoir.description}>
      <BoutonsAction actions={actions} onAction={onAction} />
    </EncadreTour>
  );
}

export default CasePouvoir;
