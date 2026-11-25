// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Le cadre de toutes les pages : centré, pis au moins de la hauteur du dessin (voir StyleGlobal.js).
export const Cadre = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 82.5rem;
  min-height: var(--hauteur-ecran);
  margin-inline: auto;
  padding: ${({ theme }) => theme.espace(6)};
`;

// Coin en bas à droite du dessin, qui reste en place quand la page défile.
// --marge-x pis --marge-y : sur un écran plus large ou plus haut que le dessin, le coin reste à la même place dans le dessin.
export const CoinFlottant = styled.div`
  position: fixed;
  right: calc(var(--marge-x) + ${({ theme }) => theme.espace(4)});
  bottom: calc(var(--marge-y) + ${({ theme }) => theme.espace(4)});
  z-index: 10;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
`;
