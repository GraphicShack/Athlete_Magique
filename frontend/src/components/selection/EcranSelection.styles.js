// Responsabilité : définir le style de ce composant (styled-components).

import styled, { css } from 'styled-components';
import { flottement } from '@/styles/animations/flottement.js';
import CartePersonnage from '@/components/commun/jeu/CartePersonnage.jsx';

// La carte d'un perso : elle flotte de 6 px si $flotte (voir styles/animations/flottement.js), en gris si $pris par un autre.
export const CarteFlottante = styled(CartePersonnage)`
  --hauteur-flottement: -6px;
  position: relative;

  ${({ $pris }) => $pris && 'filter: grayscale(1);'}

  ${({ $flotte }) =>
    $flotte &&
    css`
      ${flottement}
      animation-duration: 2.6s;
    `}
`;

// « Choisi » ou « Pris par … », par-dessus le haut de l'image.
export const Marque = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.espace(6)};
  left: ${({ theme }) => theme.espace(6)};
`;

// La course pis l'ordre de choix.
export const Consigne = styled.p`
  margin: 0;
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

// « Votre choix : … », pis qui choisit.
export const Resume = styled.p`
  margin: 0;
`;
