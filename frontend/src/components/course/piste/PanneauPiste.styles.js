/*
 * PanneauPiste.styles.js : l'apparence de PanneauPiste (PanneauPiste.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * PanneauPiste.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// La place réservée au plateau dans le panneau. Sur ordinateur, elle prend toute la hauteur
// libre, et « container-type: size » permet au plateau de connaître cette place (unités cqw
// et cqh, voir Piste.styles.js) pour s'y ajuster sans déborder.
export const ZonePlateau = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    flex: 1;
    min-height: 0;
    container-type: size;
  }
`;

// La légende, en petit sous le plateau. Sur un écran d'ordinateur très bas, elle est cachée
// pour laisser toute la hauteur au plateau (les cases portent déjà leurs repères : ★, rocher).
export const ZoneLegende = styled.div`
  @media (min-width: ${({ theme }) => theme.ecrans.lg}) and (max-height: 700px) {
    display: none;
  }
`;
