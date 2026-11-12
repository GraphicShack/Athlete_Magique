/*
 * Piste.styles.js : l'apparence de Piste (Piste.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Piste.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { COLONNES, RANGEES } from '@/utils/dispositionPiste.js';

// La bordure blanche est tracée à 6 px du bord ; les cases commencent à 14 px,
// et les cases de coin reprennent l'arrondi du plateau moins cet écart (--coin-piste).
const BORDURE_DEBUT = 6;
const BORDURE_EPAISSEUR = 2;
const MARGE_INTERIEURE = 14;

// Le plateau rétrécit avec l'écran au lieu de déborder : les textes et les jetons
// sont dimensionnés en « cqw » (pourcentage de la largeur du plateau).
export const Plateau = styled.div`
  /* L'arrondi du plateau diminue sur les petits écrans pour rester proportionnel aux cases. */
  --rayon-piste: clamp(1rem, 3.2vw, ${({ theme }) => theme.rayons.piste});
  --coin-piste: max(calc(var(--rayon-piste) - ${MARGE_INTERIEURE}px), 2px);
  container-type: inline-size;
  display: grid;
  /* minmax(0, 1fr) : toutes les colonnes ont exactement la même largeur,
     même si un contenu (texte « Départ », jetons) voudrait les élargir. */
  grid-template-columns: repeat(${COLONNES}, minmax(0, 1fr));
  grid-template-rows: repeat(${RANGEES}, auto);
  gap: clamp(2px, 0.4vw, 4px);
  padding: ${MARGE_INTERIEURE}px;
  background: ${({ theme }) => theme.piste.fond};
  border-radius: var(--rayon-piste);
  box-shadow: inset 0 0 0 ${BORDURE_DEBUT}px ${({ theme }) => theme.piste.fond},
    inset 0 0 0 ${BORDURE_DEBUT + BORDURE_EPAISSEUR}px ${({ theme }) => theme.piste.contour};
`;

// Case Départ, sur 3 colonnes en haut à gauche.
export const Depart = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.piste.depart};
  color: ${({ theme }) => theme.piste.departTexte};
  border-radius: var(--coin-piste) ${({ theme }) => theme.rayons.sm}
    ${({ theme }) => theme.rayons.sm} ${({ theme }) => theme.rayons.sm};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.55rem, 2.8cqw, 2.2rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  font-style: italic;
  text-transform: uppercase;
`;

// Les jetons au départ, en bas de la case Départ.
export const Jetons = styled.div`
  position: absolute;
  bottom: 4px;
  display: flex;
  gap: 2px;
`;

// Le podium (1er et 2e), à gauche de la bannière.
export const Podium = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8%;
  padding: 6%;
`;

// Une marche du podium : sa place et le jeton arrivé.
export const Marche = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  max-height: 3rem;
  padding: 0 8%;
  font-size: clamp(0.5rem, 1.4cqw, 1rem);
  background: ${({ theme }) => theme.piste.etoile};
  border: ${({ theme }) => theme.bordures.lisere};
  border-radius: ${({ theme }) => theme.rayons.md};
  font-family: ${({ theme }) => theme.polices.titre};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
`;

// Le centre du plateau, avec le nom du jeu.
export const Banniere = styled.div`
  grid-column: 3 / span 13;
  grid-row: 2 / span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4%;
  border: ${({ theme }) => theme.bordures.lisere};
  border-radius: ${({ theme }) => theme.rayons.md};
`;

export const Titre = styled.span`
  color: ${({ theme }) => theme.piste.contour};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.8rem, 5cqw, 3.5rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  letter-spacing: 0.02em;
`;

// Damier noir et blanc, comme une ligne d'arrivée.
export const Arrivee = styled.div`
  grid-column: 1;
  grid-row: ${RANGEES};
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.rayons.sm} ${({ theme }) => theme.rayons.sm}
    ${({ theme }) => theme.rayons.sm} var(--coin-piste);
  background: repeating-conic-gradient(
      ${({ theme }) => theme.piste.arrivee} 0% 25%,
      ${({ theme }) => theme.piste.arriveeDamier} 0% 50%
    )
    0 0 / 50% 50%;
`;
