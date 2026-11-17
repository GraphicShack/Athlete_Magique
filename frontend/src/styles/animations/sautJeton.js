/*
 * sautJeton.js : le saut en arc d'un pion, de la case précédente à sa nouvelle case.
 *
 * Une seule chose : définir le saut et sa durée.
 *
 * Comment ça marche : le pion est déjà dessiné sur sa nouvelle case. L'animation le fait
 * partir de la case précédente (décalé de --dx colonnes et --dy rangées), monter en arc,
 * puis atterrir sur sa case. --dx et --dy sont donnés par le pion (voir Jeton.jsx).
 *
 * Distances : le plateau est un « conteneur » (voir Piste.styles.js), donc 1cqw = 1 % de
 * sa largeur. Une colonne fait environ 12,2cqw et une rangée environ 11,8cqw.
 *
 * On utilise « translate » (et pas « transform ») : « transform » sert déjà à coucher un pion tombé.
 * Si le joueur a demandé moins d'animations, la règle globale (StyleGlobal.js) coupe le saut.
 */
import { css, keyframes } from 'styled-components';

// Temps d'un saut d'une case à l'autre, en millisecondes (utilisé aussi par le hook).
export const DUREE_PAS = 300;

// Décalage pour une fraction « f » du chemin qui reste (1 = case précédente, 0 = arrivé),
// et hauteur de l'arc « h » à ce moment.
const decalage = (f, h) =>
  `calc(var(--dx) * ${12.2 * f}cqw) calc(var(--dy) * ${11.8 * f}cqw - ${h}cqw)`;

// L'arc : on avance tout droit vers la case, et on monte puis redescend (hauteur max : 4cqw).
const sauter = keyframes`
  0%   { translate: ${decalage(1, 0)}; }
  25%  { translate: ${decalage(0.75, 3)}; }
  50%  { translate: ${decalage(0.5, 4)}; }
  75%  { translate: ${decalage(0.25, 3)}; }
  100% { translate: 0 0; }
`;

// Le style à mettre dans le pion qui saute.
export const sautJeton = css`
  position: relative;
  z-index: 1; /* au-dessus des cases voisines pendant le saut */
  animation: ${sauter} ${DUREE_PAS}ms linear;
`;
