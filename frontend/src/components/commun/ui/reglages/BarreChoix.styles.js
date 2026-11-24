// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// La barre : une pilule à contour noir qui contient les choix.
export const Segments = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  width: fit-content;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  overflow: hidden;
`;

// Un choix : son bouton radio caché, pis son texte.
export const Segment = styled.label`
  position: relative;
  cursor: pointer;

  & + & {
    border-left: ${({ theme }) => theme.bordures.contour};
  }

  input {
    position: absolute;
    opacity: 0;
  }

  span {
    display: block;
    padding: ${({ theme }) => theme.espace(1.5)} ${({ theme }) => theme.espace(3)};
    background: ${({ theme }) => theme.couleurs.surface};
    font-size: ${({ theme }) => theme.texte.sm};
    transition: background ${({ theme }) => theme.transition};
  }

  input:checked + span {
    background: var(--teinte);
    font-weight: ${({ theme }) => theme.graisses.tresForte};
  }

  &:has(input:disabled) {
    cursor: not-allowed;
  }
  input:disabled + span {
    color: ${({ theme }) => theme.couleurs.gris500};
    background: ${({ theme }) => theme.couleurs.gris100};
    text-decoration: line-through;
  }

  input:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.couleurs.encre};
    outline-offset: -4px;
  }
`;
