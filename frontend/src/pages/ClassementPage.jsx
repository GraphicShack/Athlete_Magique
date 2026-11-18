// Responsabilité : la page Classement (pour l'instant : un titre pis une pluie de confettis).
// Utilisé dans : routes

import Bouton from '@/components/commun/ui/Bouton.jsx';
import PluieConfettis from '@/components/commun/ui/PluieConfettis.jsx';
import CHEMINS from '@/chemins.js';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { Scene } from './ClassementPage.styles.js';

// Affiche le titre, le retour à l'accueil pis la pluie de confettis.
function ClassementPage() {
  return (
    <Scene>
      <TitreArcEnCiel className="mb-4">Classement</TitreArcEnCiel>
      <div>
        <Bouton to={CHEMINS.accueil}>Retour à l'accueil</Bouton>
      </div>

      <PluieConfettis nombre={70} />
    </Scene>
  );
}

export default ClassementPage;
