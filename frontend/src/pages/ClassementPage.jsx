/*
 * ClassementPage.jsx : la page du classement, après les 3 courses (adresse « /classement »).
 *
 * Responsabilité : pour l'instant, un simple titre et le retour à l'accueil.
 * Le tableau des scores finaux viendra ici.
 */
import Bouton from '../components/commun/Bouton.jsx';
import CHEMINS from '../chemins.js';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';

function ClassementPage() {
  return (
    <>
      {/* mb-4 : classe Bootstrap, marge sous le titre */}
      <TitreArcEnCiel className="mb-4">Classement</TitreArcEnCiel>
      <div>
        <Bouton to={CHEMINS.accueil}>Retour à l'accueil</Bouton>
      </div>
    </>
  );
}

export default ClassementPage;
