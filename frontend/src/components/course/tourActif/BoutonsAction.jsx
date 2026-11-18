// Responsabilité : un bouton par action du tour ; le clic est juste renvoyé avec onAction(id).
// Utilisé dans : CasePouvoir, CaseSansPouvoir

import Bouton from '@/components/commun/ui/Bouton.jsx';
import { Actions } from './BoutonsAction.styles.js';

// Affiche les boutons (grisés si « inactif »).
function BoutonsAction({ actions = [], onAction = () => {} }) {
  // Sans action (ex. le joueur a fini), la rangée reste là, vide, pour garder sa place.
  return (
    <Actions>
      {actions.map(({ id, libelle, principal, inactif }) => (
        <Bouton
          key={id}
          variante={principal ? 'principal' : 'secondaire'}
          disabled={inactif}
          onClick={() => onAction(id)}
        >
          {libelle}
        </Bouton>
      ))}
    </Actions>
  );
}

export default BoutonsAction;
