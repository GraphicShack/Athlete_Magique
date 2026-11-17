/*
 * CaseLancerDe.jsx : la case du tour quand le personnage n'a rien à décider au lancer :
 * seulement le bouton pour lancer le dé.
 *
 * Responsabilité : montrer le lancer de dé simple et son bouton.
 * Elle a les mêmes props que CasePouvoir : on peut mettre l'une à la place de l'autre
 * (pouvoir n'est pas utilisé ici).
 *
 * Props :
 *   actions  : [{ id, libelle, principal }]
 *   onAction : appelé avec l'id de l'action choisie
 */
import EncadreTour from './EncadreTour.jsx';
import BoutonsAction from './BoutonsAction.jsx';

function CaseLancerDe({ actions, onAction }) {
  return (
    <EncadreTour neutre titre="Lancer de dé" texte="Ton personnage n’a pas de pouvoir à utiliser au lancer.">
      <BoutonsAction actions={actions} onAction={onAction} />
    </EncadreTour>
  );
}

export default CaseLancerDe;
