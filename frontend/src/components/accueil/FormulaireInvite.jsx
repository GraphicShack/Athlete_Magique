/*
 * FormulaireInvite.jsx : jouer sans compte, en choisissant seulement un pseudo.
 *
 * Responsabilité : afficher le champ du pseudo et le bouton « Jouer en invité ».
 * Provisoire : le pseudo n'est pas encore enregistré ; le bouton mène à la configuration.
 */
import styled from 'styled-components';
import ChampTexte from '../commun/ChampTexte.jsx';
import Bouton from '../commun/Bouton.jsx';
import CHEMINS from '../../chemins.js';

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

// Les éléments l'un sous l'autre.
const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
`;

// « Jouer en invité »
const SousTitre = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.md};
`;

// Petite phrase d'explication sous le champ.
const Aide = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xs};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

export default FormulaireInvite;
