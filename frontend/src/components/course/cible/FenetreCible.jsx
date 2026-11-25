// Responsabilité : la fenêtre pour choisir la cible d'un pouvoir (une carte pis un bouton par joueur).

import FenetreModale from '@/components/commun/ui/FenetreModale.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import CartesJoueurs from '@/components/course/joueurs/CartesJoueurs.jsx';
import { Consigne } from './FenetreCible.styles.js';

// Props : titre, consigne, cibles (les joueurs possibles), inactif (grise les boutons), onChoisir(id), onFermer.
function FenetreCible({ titre, consigne, cibles, inactif, onChoisir, onFermer }) {
  return (
    <FenetreModale ouverte onFermer={onFermer} titre={titre} teinte="tour" largeur="56rem">
      {(fermerAvecAnim) => {
        const choisir = (id) => {
          onChoisir(id);
          fermerAvecAnim();
        };
        return (
          <>
            <Consigne>{consigne}</Consigne>
            <CartesJoueurs joueurs={cibles}>
              {({ id, nom }) => (
                <Bouton onClick={() => choisir(id)} disabled={inactif}>
                  Choisir {nom}
                </Bouton>
              )}
            </CartesJoueurs>
          </>
        );
      }}
    </FenetreModale>
  );
}

export default FenetreCible;
