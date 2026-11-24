// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Bandeau du panneau : avatar du perso, puis « À toi de jouer » pis son nom.
export const EnTete = styled.div`
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

// Le contenu du panneau en deux colonnes d’au moins 16rem chacune ; s’il manque de place, la deuxième passe sous la première.
export const Colonnes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  align-items: start;
  gap: ${({ theme }) => theme.espace(4)} ${({ theme }) => theme.espace(5)};
`;

// Le dé pis le message, côte à côte.
// Pourquoi min-height: 3lh : même truc, le message garde la place de 3 lignes même quand il est court.
export const Resultat = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.espace(4)};
  margin-top: ${({ theme }) => theme.espace(4)};

  p {
    margin: 0;
    min-height: 3lh;
  }
`;

// La place du dé avant le premier lancer : un rond pointillé de la taille du dé (5rem, voir De.styles.js).
export const PlaceDe = styled.div`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border: 2px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 50%;
`;
