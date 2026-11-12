/*
 * Liste.jsx : liste sans puces ni marges, base de toutes les listes de l'interface.
 *
 * Responsabilité : retirer le style par défaut des listes, et permettre à une liste
 * de défiler dans une mise en page fixe.
 *
 * Props :
 *   $defilante : la liste prend la hauteur disponible et défile, au lieu d'allonger la page
 *   as="ul"    : pour une liste non numérotée (par défaut, c'est une liste <ol>)
 *
 * Chaque composant l'étend avec sa propre disposition :
 *   const ListeEvenements = styled(Liste)` gap: … `;
 */
import styled, { css } from 'styled-components';

const Liste = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  ${({ $defilante }) =>
    $defilante &&
    css`
      flex: 1; /* prend la place restante dans le panneau */
      min-height: 0; /* peut devenir plus petite que son contenu… */
      overflow-y: auto; /* … et alors elle défile */
    `}
`;

export default Liste;
