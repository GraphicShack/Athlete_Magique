/*
 * LigneReglage.js : la mise en page partagée par tous les réglages (Interrupteur, Curseur,
 * ChoixSegmente), pour ne pas la recopier dans chacun.
 *
 * Responsabilité : placer le nom du réglage à gauche, le contrôle à droite,
 * et une fine ligne entre deux réglages.
 * Les contrôles se colorent avec la teinte du panneau qui les contient (variable CSS --teinte).
 */
import styled from 'styled-components';

// Une ligne de réglage. C'est une <label> : cliquer n'importe où sur la ligne active le contrôle.
export const Ligne = styled.label`
  display: flex;
  flex-wrap: wrap; /* sur un écran étroit, le contrôle passe sous le nom */
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(2)} ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(3)} 0;
  border-bottom: ${({ theme }) => theme.bordures.fine};
  cursor: pointer;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

// Le texte prend la place libre : un petit contrôle (interrupteur) reste à droite même sur téléphone.
export const Textes = styled.span`
  flex: 1 1 8rem;
  display: flex;
  flex-direction: column;
`;

// Nom du réglage, en gras.
export const Nom = styled.span`
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

// Petite phrase d'aide sous le nom.
export const Aide = styled.span`
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;
