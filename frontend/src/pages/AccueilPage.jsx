import Bouton from '../components/commun/Bouton.jsx';
import CHEMINS from '../chemins.js';

function AccueilPage() {
  return (
    <>
      <h1>Accueil</h1>
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
