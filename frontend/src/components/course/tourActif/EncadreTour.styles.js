/*
 * EncadreTour.styles.js : l'apparence de EncadreTour (EncadreTour.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 */
import styled from 'styled-components';

// Fond de la teinte du panneau très diluée ; gris clair si l'encadré est neutre.
export const Encadre = styled.div`
  padding: ${({ theme }) => theme.espace(3)};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ $neutre }) =>
    $neutre ? 'color-mix(in srgb, black 6%, white)' : 'color-mix(in srgb, var(--teinte) 25%, white)'};

  /* Le texte a toujours la place de 2 lignes, même s'il est plus court (hauteur fixe). */
  p {
    margin-bottom: 0;
    min-height: 2lh;
    font-size: ${({ theme }) => theme.texte.xs};
  }
`;

export const Titre = styled.h3`
  font-family: ${({ theme }) => theme.polices.texte};
  font-size: ${({ theme }) => theme.texte.md};
  margin-bottom: ${({ theme }) => theme.espace(2)};
`;
