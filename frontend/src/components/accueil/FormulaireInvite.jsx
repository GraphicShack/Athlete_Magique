// Responsabilité : le champ du pseudo pis le bouton « Jouer en invité ».
// Utilisé dans : PanneauConnexion

import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import CHEMINS from '@/chemins.js';
import { Bloc, SousTitre, Aide } from './FormulaireInvite.styles.js';

// Affiche le formulaire invité (visuel seulement).
function FormulaireInvite() {
  return (
    <Bloc>
      <SousTitre>Jouer en invité</SousTitre>
      <ChampTexte etiquette="Votre pseudo" placeholder="Ex. Coureur rapide" autoComplete="nickname" />
      <Aide>Le pseudo sert pour la partie et le tableau d'honneur.</Aide>
      <Bouton to={CHEMINS.configuration}>Jouer en invité</Bouton>
    </Bloc>
  );
}

export default FormulaireInvite;
