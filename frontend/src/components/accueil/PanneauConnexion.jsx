/*
 * PanneauConnexion.jsx : la carte « Commencer une partie » de l'accueil.
 *
 * Responsabilité : réunir les deux façons de commencer, séparées par « ou » :
 * jouer en invité (FormulaireInvite) ou se connecter avec un compte (FormulaireCompte).
 */
import styled from 'styled-components';
import Panneau from '../commun/Panneau.jsx';
import FormulaireInvite from './FormulaireInvite.jsx';
import FormulaireCompte from './FormulaireCompte.jsx';

function PanneauConnexion() {
  return (
    <Panneau titre="Commencer une partie" teinte="preparation" enEvidence>
      <FormulaireInvite />
      <Separateur>ou</Separateur>
      <FormulaireCompte />
    </Panneau>
  );
}

// Trait horizontal avec le mot « ou » au milieu.
const Separateur = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  margin: ${({ theme }) => theme.espace(5)} 0;
  color: ${({ theme }) => theme.couleurs.gris700};
  font-size: ${({ theme }) => theme.texte.sm};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: ${({ theme }) => theme.bordures.fine};
  }
`;

export default PanneauConnexion;
