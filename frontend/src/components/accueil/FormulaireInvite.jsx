/*
 * FormulaireInvite.jsx : jouer sans compte, en choisissant seulement un pseudo.
 *
 * Responsabilité : afficher le champ du pseudo et le bouton « Jouer en invité ».
 * Provisoire : le pseudo n'est pas encore enregistré ; le bouton mène à la configuration.
 */
import ChampTexte from '@/components/commun/ui/ChampTexte.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import CHEMINS from '@/chemins.js';
import { Bloc, SousTitre, Aide } from './FormulaireInvite.styles.js';

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
