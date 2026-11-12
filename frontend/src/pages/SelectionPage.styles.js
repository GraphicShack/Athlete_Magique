/*
 * SelectionPage.styles.js : l'apparence de la page de sélection du personnage (SelectionPage.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).
 * SelectionPage.jsx, lui, s'occupe seulement de ce qui est affiché et dans quel ordre.
 * Chaque fichier a ainsi une seule raison de changer.
 */
import styled, { css } from 'styled-components';
import { flottement } from '@/styles/animations/flottement.js';
import CartePersonnage from '@/components/commun/jeu/CartePersonnage.jsx';

// La page : les blocs l'un sous l'autre.
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

// La carte d'un personnage, qui flotte de 6 px quand $flotte est vrai (voir styles/animations/flottement.js).
// On complète le style de CartePersonnage sans la modifier : sur la page des règles, elle ne bouge pas.
// (Pas d'enveloppe autour de la carte : le carrousel doit pouvoir lui donner toute la hauteur.)
export const CarteFlottante = styled(CartePersonnage)`
  --hauteur-flottement: -6px;
  position: relative; /* repère des confettis, qui partent du centre de la carte choisie */

  ${({ $flotte }) =>
    $flotte &&
    css`
      ${flottement}
      animation-duration: 2.6s; /* après flottement, sinon elle serait remise à zéro */
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

// « Votre personnage : … »
export const Resume = styled.p`
  margin: 0;
`;

// Les deux boutons côte à côte (l'un sous l'autre s'ils manquent de place).
export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.espace(2)};
`;
