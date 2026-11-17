/*
 * roulementDe.js : l'animation du dé en 3D qui roule, puis s'arrête sur sa face (voir De.jsx).
 *
 * Responsabilités :
 *   - faire culbuter le cube une fois sur lui-même, en ralentissant doucement ;
 *   - le faire finir exactement sur l'orientation qui montre la bonne face ;
 *   - (moins d'animations : la règle générale de StyleGlobal.js rend le lancer instantané).
 *
 * L'orientation finale vient de deux variables CSS posées sur le cube :
 *   --rx et --ry : rotation autour de l'axe horizontal et de l'axe vertical (en degrés).
 *
 * Inspiration : CodePen « 3D Dice with CSS » de jico (https://codepen.io/jico/pen/wvMpgog),
 * pour l'idée d'un cube CSS en 3D qui roule. Le code a été réécrit pour le projet
 * (nos couleurs, nos faces, notre animation).
 */
import { css, keyframes } from 'styled-components';

// Durée d'un lancer, en millisecondes.
export const DUREE_ROULEMENT = 2200;

// Partir d'un seul tour d'avance sur chaque axe (1 tour en X, 1 en Y), puis ralentir en douceur
// jusqu'à la face voulue : le dé culbute calmement au lieu de tourbillonner.
// Un tour complet (360°) ne change pas la face montrée : on arrive donc bien sur --rx / --ry.
const rouler = keyframes`
  from {
    transform: rotateX(calc(var(--rx) + 360deg)) rotateY(calc(var(--ry) + 360deg));
  }
  to {
    transform: rotateX(var(--rx)) rotateY(var(--ry));
  }
`;

// Le style à mettre dans le cube pour le faire rouler une fois.
// La courbe « ease-out » : rapide au début, puis un long ralentissement régulier.
export const roulement = css`
  animation: ${rouler} ${DUREE_ROULEMENT}ms cubic-bezier(0.33, 1, 0.68, 1);

  /* Le joueur a demandé moins d'animations : StyleGlobal.js raccourcit toutes les animations
     à presque rien, donc le dé montre tout de suite sa face. L'animation existe quand même,
     pour que la fin du lancer soit bien signalée (voir onArret dans De.jsx). */
`;
