// Responsabilité : une liste sans les puces pis les marges par défaut.
// Utilisé dans : EtapesPartie.styles, EtapesTour.styles, JournalEvenements.styles, LegendePiste.styles, ListeJoueurs.styles, PanneauJoueurs.styles

import styled, { css } from 'styled-components';

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
