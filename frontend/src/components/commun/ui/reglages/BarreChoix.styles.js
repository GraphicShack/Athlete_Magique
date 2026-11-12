/*
 * BarreChoix.styles.js : l'apparence de BarreChoix (BarreChoix.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * BarreChoix.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// La barre : une pilule à contour noir qui contient les choix.
export const Segments = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  width: fit-content; /* juste la largeur de ses choix, même dans une colonne */
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  overflow: hidden;
`;

// Un choix : son bouton radio caché, et son texte.
export const Segment = styled.label`
  position: relative;
  cursor: pointer;

  & + & {
    border-left: ${({ theme }) => theme.bordures.contour};
  }

  /* Le rond du bouton radio est caché ; c'est le texte qui montre le choix. */
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

  /* Le choix coché prend la teinte du panneau. */
  input:checked + span {
    background: var(--teinte);
    font-weight: ${({ theme }) => theme.graisses.tresForte};
  }

  /* Choix atteint au clavier : contour à l'intérieur du segment. */
  input:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.couleurs.encre};
    outline-offset: -4px;
  }
`;
