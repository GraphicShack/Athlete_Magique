/*
 * MessageVide.jsx : texte discret affiché quand un panneau n'a encore rien à montrer
 * (ex. « Aucun événement pour l'instant. »).
 *
 * Responsabilité : donner le même style à tous les messages « vide » de l'interface.
 */
import styled from 'styled-components';

const MessageVide = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.couleurs.gris500};
  font-size: ${({ theme }) => theme.texte.sm};
`;

export default MessageVide;
