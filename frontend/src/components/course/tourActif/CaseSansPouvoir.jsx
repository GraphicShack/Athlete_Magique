/*
 * CaseSansPouvoir.jsx : la case du tour quand le personnage n'a pas de pouvoir à utiliser
 * à cette étape : le titre de l'étape et ses boutons (ex. « Lancer le dé »).
 *
 * Elle a les mêmes props que CasePouvoir : on peut mettre l'une à la place de l'autre.
 *
 * Props :
 *   titre    : le nom de l'étape, ex. « Début du tour »
 *   actions  : [{ id, libelle, principal }]
 *   onAction : appelé avec l'id de l'action choisie
 */
import EncadreTour from './EncadreTour.jsx';
import BoutonsAction from './BoutonsAction.jsx';

function CaseSansPouvoir({ titre, actions, onAction }) {
  return (
    <EncadreTour neutre titre={titre} texte="Ton personnage n’a pas de pouvoir à utiliser à cette étape.">
      <BoutonsAction actions={actions} onAction={onAction} />
    </EncadreTour>
  );
}

export default CaseSansPouvoir;
