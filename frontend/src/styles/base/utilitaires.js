/*
 * utilitaires.js : petits morceaux de style réutilisés par plusieurs composants.
 *
 * Responsabilité : éviter de recopier les mêmes lignes CSS dans plusieurs fichiers.
 * On les insère dans un composant styled :
 *   const Pastille = styled.span` ${rondCentre} width: 1.5rem; `;
 */
import { css } from 'styled-components';

// Forme ronde dont le contenu (initiales, chiffre) est centré (pastilles, jetons, avatars).
export const rondCentre = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.rayons.rond};
`;

// Cache un élément à l'écran tout en le laissant lisible par les lecteurs d'écran
// (ex. l'étiquette d'un champ quand la mise en page rend son rôle évident).
export const cacheVisuellement = css`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
