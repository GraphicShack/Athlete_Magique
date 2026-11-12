/*
 * EnTetePage.styles.js : l'apparence de EnTetePage (EnTetePage.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * EnTetePage.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Logo à gauche, lien à droite ; le lien passe dessous si la place manque.
export const Bandeau = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Le logo et ce qui l'accompagne.
export const Marque = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Les actions et le lien.
export const Droite = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.espace(4)};
`;

// Logo blanc, capitales italiques très grasses, comme la couverture du livret.
export const Logo = styled.span`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.xl};
  font-style: italic;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.couleurs.texteSurPage};
`;

// Lien blanc souligné, posé sur le fond noir de la page.
export const Lien = styled(Link)`
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;
