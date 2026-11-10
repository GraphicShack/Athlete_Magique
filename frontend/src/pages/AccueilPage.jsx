import Bouton from '../components/commun/Bouton.jsx';
import CHEMINS from '../chemins.js';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';

function AccueilPage() {
  return (
    <>
      <TitreArcEnCiel className="mb-4">Accueil</TitreArcEnCiel>
      <div className="d-flex flex-wrap gap-2">
        <Bouton to={CHEMINS.configuration}>Commencer une partie</Bouton>
        <Bouton to={CHEMINS.regles} variante="secondaire">
          Règles du jeu
        </Bouton>
      </div>
    </>
  );
}

export default AccueilPage;
