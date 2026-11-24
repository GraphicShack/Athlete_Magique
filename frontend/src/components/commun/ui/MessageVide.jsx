// Responsabilité : le même style pour tous les messages « y'a rien ici ».

import styled from 'styled-components';

const MessageVide = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.couleurs.gris500};
  font-size: ${({ theme }) => theme.texte.sm};
`;

export default MessageVide;
