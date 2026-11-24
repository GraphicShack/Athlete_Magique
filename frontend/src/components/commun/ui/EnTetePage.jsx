// Responsabilité : l'en-tête commun des pages (logo + un lien ou des actions à droite).
// Utilisé dans : AccueilPage, ClassementPage, ConfigurationPage, EnTeteCourse, FinCoursePage, ReglesPage, SelectionPage

import imageLogo from '@/assets/images/logo.webp';
import { Bandeau, Marque, Droite, Logo, Lien } from './EnTetePage.styles.js';

// Affiche le logo à gauche pis le lien ou les actions à droite.
// Props : lien ({ libelle, to } à droite), actions (contenu à droite à la place du lien), logo (false = pas de logo), children.
function EnTetePage({ lien, actions, logo = true, children }) {
  return (
    <Bandeau>
      <Marque>
        {logo && <Logo src={imageLogo} alt="Athlète Magique" />}
        {children}
      </Marque>
      <Droite>
        {actions}
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
