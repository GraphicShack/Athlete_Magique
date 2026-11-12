/*
 * CartePersonnage.styles.js : l'apparence de CartePersonnage (CartePersonnage.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * CartePersonnage.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled, { css } from 'styled-components';

// Carte blanche à fine bordure grise.
export const Carte = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
  padding: ${({ theme }) => theme.espace(4)};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  border: ${({ theme }) => theme.bordures.fine};
  border-radius: ${({ theme }) => theme.rayons.md};
`;

// Image et nom : côte à côte (ligne) ou l'un au-dessus de l'autre (portrait).
export const EnTete = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};

  ${({ $format }) =>
    $format === 'portrait' &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
`;

// Image ronde de 4rem (ligne), ou carrée sur toute la largeur de la carte (portrait).
export const Portrait = styled.img`
  display: block;
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 50%;

  ${({ $format }) =>
    $format === 'portrait' &&
    css`
      width: 100%;
      height: auto;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.rayons.sm};
    `}
`;

export const Nom = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.md};
`;

// Texte du pouvoir, plus petit et gris.
export const Pouvoir = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;
