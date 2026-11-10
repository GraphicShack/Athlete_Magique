import Bouton from '../components/commun/Bouton.jsx';
import CHEMINS from '../chemins.js';

function ConfigurationPage() {
  return (
    <>
      <h1>Configuration</h1>
      <div>
        <Bouton to={CHEMINS.course}>Lancer la course</Bouton>
      </div>
    </>
  );
}

export default ConfigurationPage;
