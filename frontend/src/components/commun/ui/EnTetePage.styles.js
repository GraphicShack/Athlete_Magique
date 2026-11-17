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

// Le logo dessiné (assets/images/logo.webp), sur deux lignes : on fixe sa hauteur,
// la largeur suit (width: auto) pour garder ses proportions.
// La hauteur suit la largeur de l'écran (8vw), entre 2,75rem et 4rem.
export const Logo = styled.img`
  display: block;
  height: clamp(2.75rem, 8vw, 4rem);
  width: auto;
`;

// Lien blanc souligné, posé sur le fond noir de la page.
export const Lien = styled(Link)`
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-weight: ${({ theme }) => theme.graisses.moyenne};
  text-underline-offset: 3px;
`;
