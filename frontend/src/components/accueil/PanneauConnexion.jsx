// Responsabilité : regroupe les 2 façons de commencer (invité ou compte), séparées par « ou ».
// Utilisé dans : AccueilPage

import Panneau from '@/components/commun/ui/Panneau.jsx';
import FormulaireInvite from './FormulaireInvite.jsx';
import FormulaireCompte from './FormulaireCompte.jsx';
import { Separateur } from './PanneauConnexion.styles.js';

// Affiche les 2 formulaires séparés par « ou ».
function PanneauConnexion() {
  return (
    <Panneau titre="Commencer une partie" teinte="preparation" enEvidence>
      <FormulaireInvite />
      <Separateur>ou</Separateur>
      <FormulaireCompte />
    </Panneau>
  );
}

export default PanneauConnexion;
