import Bouton from '../components/commun/Bouton.jsx';
import CHEMINS from '../chemins.js';

function ClassementPage() {
  return (
    <>
      <h1>Classement</h1>
      <div>
        <Bouton to={CHEMINS.accueil}>Retour à l'accueil</Bouton>
      </div>
    </>
  );
}

export default ClassementPage;
