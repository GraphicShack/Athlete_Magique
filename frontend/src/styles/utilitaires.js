import { css } from 'styled-components';

/*
 * Petits blocs de style partagés, à insérer dans un composant styled :
 *   const Pastille = styled.span` ${rondCentre} width: 1.5rem; `;
 */

/** Forme ronde dont le contenu (initiales, chiffre) est centré. */
export const rondCentre = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.rayons.rond};
`;
