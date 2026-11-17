/*
 * CasePouvoir.jsx : la case du tour quand le personnage a un pouvoir à utiliser au lancer
 * (Magicien, Scientifique Fusé, Flip Flop).
 *
 * Responsabilité : montrer le pouvoir et ses boutons.
 * Elle a les mêmes props que CaseLancerDe : on peut mettre l'une à la place de l'autre.
 *
 * Props :
 *   pouvoir  : { titre, description }
 *   actions  : [{ id, libelle, principal }]
 *   onAction : appelé avec l'id de l'action choisie
 */
import EncadreTour from './EncadreTour.jsx';
import BoutonsAction from './BoutonsAction.jsx';

function CasePouvoir({ pouvoir, actions, onAction }) {
  return (
    <EncadreTour titre={pouvoir.titre} texte={pouvoir.description}>
      <BoutonsAction actions={actions} onAction={onAction} />
    </EncadreTour>
  );
}

export default CasePouvoir;
