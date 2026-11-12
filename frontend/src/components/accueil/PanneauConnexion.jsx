/*
 * PanneauConnexion.jsx : la carte « Commencer une partie » de l'accueil.
 *
 * Responsabilité : réunir les deux façons de commencer, séparées par « ou » :
 * jouer en invité (FormulaireInvite) ou se connecter avec un compte (FormulaireCompte).
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import FormulaireInvite from './FormulaireInvite.jsx';
import FormulaireCompte from './FormulaireCompte.jsx';
import { Separateur } from './PanneauConnexion.styles.js';

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
