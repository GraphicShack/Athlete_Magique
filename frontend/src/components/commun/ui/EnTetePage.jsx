/*
 * EnTetePage.jsx : bandeau en haut des pages, avec le logo à gauche et un lien à droite.
 *
 * Responsabilité : donner le même en-tête à toutes les pages ; chaque page choisit seulement
 * son lien et ce qu'elle ajoute à côté du logo.
 *
 * Props :
 *   lien     : { libelle, to }, ex. « Retour à l'accueil », « Quitter la partie »
 *   logo     : false pour ne pas afficher le logo (ex. l'accueil, qui l'affiche en grand) ; true par défaut
 *   actions  : éléments libres affichés à droite, avant le lien (optionnel)
 *   children : éléments affichés à côté du logo, ex. « Course 1 sur 3 » (optionnel)
 */
import imageLogo from '@/assets/images/logo.webp';
import { Bandeau, Marque, Droite, Logo, Lien } from './EnTetePage.styles.js';

function EnTetePage({ lien, actions, logo = true, children }) {
  return (
    <Bandeau>
      <Marque>
        {/* alt : le nom du jeu, lu par les lecteurs d'écran à la place de l'image. */}
        {logo && <Logo src={imageLogo} alt="Athlète Magique" />}
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
