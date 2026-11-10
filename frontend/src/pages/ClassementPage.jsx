import Bouton from '../components/commun/Bouton.jsx';
import CHEMINS from '../chemins.js';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';

function ClassementPage() {
  return (
    <>
      <TitreArcEnCiel className="mb-4">Classement</TitreArcEnCiel>
      <div>
        <Bouton to={CHEMINS.accueil}>Retour à l'accueil</Bouton>
      </div>
    </>
  );
}

export default ClassementPage;
