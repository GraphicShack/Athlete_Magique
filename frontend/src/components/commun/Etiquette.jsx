/*
 * Etiquette.jsx : petite étiquette arrondie (« Course 1 sur 3 », « Choisi »…).
 *
 * Responsabilité : afficher un court texte dans une pilule blanche à contour noir.
 *
 * Props :
 *   children : le texte de l'étiquette
 */
import styled from 'styled-components';

function Etiquette({ children }) {
  return <Pilule>{children}</Pilule>;
}

// Pilule blanche à contour noir ; le texte ne passe jamais à la ligne.
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
