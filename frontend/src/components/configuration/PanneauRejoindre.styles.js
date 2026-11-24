// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

export const Aide = styled.p`
  margin: 0 0 ${({ theme }) => theme.espace(4)};
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

// Le champ, puis le bouton sur toute la largeur. Le code s'écrit en gros pis espacé.
export const Formulaire = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};

  input {
    font-family: ${({ theme }) => theme.polices.titre};
    font-size: ${({ theme }) => theme.texte.lg};
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
`;

// Le message après « Rejoindre ».
export const Message = styled.p`
  margin: ${({ theme }) => theme.espace(3)} 0 0;
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
`;
