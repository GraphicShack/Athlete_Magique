/*
 * EnTetePage.jsx : bandeau en haut des pages, avec le logo à gauche et un lien à droite.
 *
 * Responsabilité : donner le même en-tête à toutes les pages ; chaque page choisit seulement
 * son lien et ce qu'elle ajoute à côté du logo.
 *
 * Props :
 *   lien     : { libelle, to }, ex. « Retour à l'accueil », « Quitter la partie »
 *   actions  : éléments libres affichés à droite, avant le lien (optionnel)
 *   children : éléments affichés à côté du logo, ex. « Course 1 sur 3 » (optionnel)
 */
import { Bandeau, Marque, Droite, Logo, Lien } from './EnTetePage.styles.js';

function EnTetePage({ lien, actions, children }) {
  return (
    <Bandeau>
      <Marque>
        <Logo>Athlète Magique</Logo>
        {children}
      </Marque>
      <Droite>
        {actions}
        {/* viewTransition : le rideau de couleur passe pendant le changement de page. */}
        {lien && (
          <Lien to={lien.to} viewTransition>
            {lien.libelle}
          </Lien>
        )}
      </Droite>
    </Bandeau>
  );
}

export default EnTetePage;
