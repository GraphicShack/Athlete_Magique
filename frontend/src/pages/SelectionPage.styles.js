// Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).
// Utilisé dans : SelectionPage

import styled, { css } from 'styled-components';
import { flottement } from '@/styles/animations/flottement.js';
import CartePersonnage from '@/components/commun/jeu/CartePersonnage.jsx';

// La page : les blocs l'un sous l'autre.
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

// La carte d'un perso, qui flotte de 6 px quand $flotte est vrai (voir styles/animations/flottement.js).
export const CarteFlottante = styled(CartePersonnage)`
  --hauteur-flottement: -6px;
  position: relative;

  ${({ $flotte }) =>
    $flotte &&
    css`
      ${flottement}
      animation-duration: 2.6s;
    `}
`;

// Phrase d'aide sous le titre.
export const Consigne = styled.p`
  margin: 0;
  margin-top: ${({ theme }) => theme.espace(3)};
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
`;

// Carte blanche du bas, avec le cadre rétro.
export const Barre = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(4)} ${({ theme }) => theme.espace(5)};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  border: ${({ theme }) => theme.bordures.contour};
  box-shadow: ${({ theme }) => theme.ombres.cadre};
  border-radius: ${({ theme }) => theme.rayons.md};
`;

// « Votre perso : … »
export const Resume = styled.p`
  margin: 0;
`;

// Les deux boutons côte à côte (l'un sous l'autre s'ils manquent de place).
export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.espace(2)};
`;
