/*
 * BoutonsAction.jsx : les boutons du tour en cours (relancer, garder, échanger…).
 *
 * Responsabilité : afficher un bouton par action et transmettre le clic avec onAction(id).
 * Il ne sait pas ce que fait chaque bouton : c'est la page qui décide.
 *
 * Props :
 *   actions  : [{ id, libelle, principal, inactif }] ; inactif : le bouton est grisé
 *   onAction : appelé avec l'id de l'action choisie
 */
import Bouton from '@/components/commun/ui/Bouton.jsx';
import { Actions } from './BoutonsAction.styles.js';

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
