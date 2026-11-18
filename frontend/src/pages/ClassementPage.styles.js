// Responsabilité : définir le style des blocs propres à cette page.
// Utilisé dans : ClassementPage

import styled from 'styled-components';

// Toute la page, jusqu'en bas de l'écran (flex: 1) : c'est la zone où tombe la pluie de confettis.
export const Scene = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;
