/*
 * Interrupteur.styles.js : l'apparence de Interrupteur (Interrupteur.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Interrupteur.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// La case à cocher, redessinée : on retire son apparence (appearance: none) et on dessine un rail.
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

  /* Le bouton rond qui glisse de gauche (non) à droite (oui). */
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

  /* Activé : le rail prend la teinte du panneau et le rond glisse à droite. */
  &:checked {
    background: var(--teinte);
  }

  &:checked::before {
    translate: 1.5rem 0;
  }
`;
