import styled from 'styled-components';

/** Texte discret affiché quand un panneau n'a encore rien à montrer. */
const MessageVide = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.couleurs.gris500};
  font-size: ${({ theme }) => theme.texte.sm};
`;

export default MessageVide;
