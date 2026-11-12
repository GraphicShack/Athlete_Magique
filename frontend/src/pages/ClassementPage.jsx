/*
 * ClassementPage.jsx : la page du classement, après les 3 courses (adresse « /classement »).
 *
 * Responsabilité : pour l'instant, un titre, une pluie de confettis sur toute la page,
 * et le retour à l'accueil. Le tableau des scores finaux viendra ici.
 */
import Bouton from '@/components/commun/ui/Bouton.jsx';
import PluieConfettis from '@/components/commun/ui/PluieConfettis.jsx';
import CHEMINS from '@/chemins.js';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { Scene } from './ClassementPage.styles.js';

function ClassementPage() {
  return (
    <Scene>
      {/* mb-4 : classe Bootstrap, marge sous le titre */}
      <TitreArcEnCiel className="mb-4">Classement</TitreArcEnCiel>
      <div>
        <Bouton to={CHEMINS.accueil}>Retour à l'accueil</Bouton>
      </div>

      {/* Aperçu : une pluie de confettis en continu. Plus tard, elle célébrera le gagnant. */}
      <PluieConfettis nombre={70} />
    </Scene>
  );
}

export default ClassementPage;
