// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : Interrupteur

import styled from 'styled-components';

// La case à cocher, redessinée : on retire son apparence (appearance: none) pis on dessine un rail.
export const Bascule = styled.input`
  appearance: none;
  position: relative;
  flex-shrink: 0;
  width: 3.25rem;
  height: 1.75rem;
  margin: 0;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.gris100};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition};

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: ${({ theme }) => theme.rayons.rond};
    background: ${({ theme }) => theme.couleurs.encre};
    transition: translate ${({ theme }) => theme.transition};
  }

  &:checked {
    background: var(--teinte);
  }

  &:checked::before {
    translate: 1.5rem 0;
  }
`;
