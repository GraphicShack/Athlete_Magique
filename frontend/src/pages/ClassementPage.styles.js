/*
 * ClassementPage.styles.js : l'apparence de la page du classement (ClassementPage.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style des blocs propres à cette page.
 * ClassementPage.jsx, lui, s'occupe seulement de ce qui est affiché et dans quel ordre.
 */
import styled from 'styled-components';

// Toute la page, jusqu'en bas de l'écran (flex: 1) : c'est la zone où tombe la pluie de confettis.
// position: relative : sert de repère au calque des confettis (voir PluieConfettis.jsx).
// overflow: hidden : les confettis qui sortent de la page sont coupés, sans barre de défilement.
export const Scene = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;
