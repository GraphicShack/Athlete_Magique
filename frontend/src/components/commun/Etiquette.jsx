import styled from 'styled-components';

/** Petite étiquette arrondie : « Course 1 sur 3 », « Disponible », « Compte »… */
function Etiquette({ children }) {
  return <Pilule>{children}</Pilule>;
}

const Pilule = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.espace(1)} ${({ theme }) => theme.espace(3)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
  white-space: nowrap;
`;

export default Etiquette;
