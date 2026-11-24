// Responsabilité : un bouton par action du tour ; le clic est juste renvoyé avec onAction(bouton).

import Bouton from '@/components/commun/ui/Bouton.jsx';
import { Actions } from './BoutonsAction.styles.js';

// Affiche les boutons (grisés si « inactif »).
function BoutonsAction({ actions = [], onAction = () => {} }) {
  // Sans action (ex. le joueur a fini), la rangée reste là, vide, pour garder sa place.
  return (
    <Actions>
      {actions.map((action) => (
        <Bouton
          key={action.id}
          variante={action.principal ? 'principal' : 'secondaire'}
          disabled={action.inactif}
          onClick={() => onAction(action)}
        >
          {action.libelle}
        </Bouton>
      ))}
    </Actions>
  );
}

export default BoutonsAction;
