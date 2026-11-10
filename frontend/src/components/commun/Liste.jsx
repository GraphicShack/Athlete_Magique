import styled, { css } from 'styled-components';

/**
 * Liste sans puces ni marges, base de toutes les listes de l'interface.
 * Pour une liste à puces <ul>, utiliser as="ul".
 * $defilante : dans une mise en page fixe, la liste prend la hauteur disponible
 *              et défile au lieu d'allonger la page.
 *
 * Chaque composant l'étend avec sa propre disposition :
 *   const ListeEvenements = styled(Liste)` gap: … `;
 */
const Liste = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  ${({ $defilante }) =>
    $defilante &&
    css`
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    `}
`;

export default Liste;
