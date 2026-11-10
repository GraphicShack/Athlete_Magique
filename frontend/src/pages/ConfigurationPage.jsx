import Bouton from '../components/commun/Bouton.jsx';
import CHEMINS from '../chemins.js';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';

function ConfigurationPage() {
  return (
    <>
      <TitreArcEnCiel className="mb-4">Configuration</TitreArcEnCiel>
      <div>
        <Bouton to={CHEMINS.selection}>Choisir les personnages</Bouton>
      </div>
    </>
  );
}

export default ConfigurationPage;
