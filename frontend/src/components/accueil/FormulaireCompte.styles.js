// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Les éléments l'un sous l'autre.
export const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(2)};
`;

// Le courriel pis le mot de passe : côte à côte sur ordi, l'un sous l'autre sur cell.
export const Champs = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(2)};

  @media ${({ theme }) => theme.medias.ordi} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

// Bouton qui ressemble à un lien (pas encore de page de création de compte).
export const LienCreer = styled.button`
  align-self: center;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.couleurs.encre};
  font-size: ${({ theme }) => theme.texte.sm};
  text-decoration: underline;
  text-underline-offset: 0.1875rem;
`;
