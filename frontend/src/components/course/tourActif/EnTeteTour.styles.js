// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Avatar du perso, puis le petit texte pis son nom.
export const Bandeau = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(4)};
`;

export const SurTitre = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;

export const NomPersonnage = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
`;
