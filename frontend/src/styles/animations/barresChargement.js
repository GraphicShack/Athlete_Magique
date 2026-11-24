// Responsabilité : l'anim des 3 barres qui ondulent pendant un chargement.
// Inspiration : CSS Loaders, « Dots vs Bars » de Temani Afif, https://css-loaders.com/dots-bars/ (tailles adaptées au projet).

import { css, keyframes } from 'styled-components';

// Les masques (un par barre) montent pis descendent l'un après l'autre.
const onduler = keyframes`
  0%, 100% { mask-position: 0 50%, 50% 50%, 100% 50%; }
  20%      { mask-position: 0 100%, 50% 50%, 100% 50%; }
  40%      { mask-position: 0 0, 50% 100%, 100% 50%; }
  60%      { mask-position: 0 50%, 50% 0, 100% 100%; }
  80%      { mask-position: 0 50%, 50% 50%, 100% 0; }
`;

// Le style à mettre dans un carré : 3 barres dessinées en fond, découpées par 3 masques troués d'un rond.
export const barresChargement = css`
  --barre: no-repeat linear-gradient(currentColor 0 0);
  --masque: no-repeat radial-gradient(circle closest-side, #0000 92%, #000);
  background:
    var(--barre) 0 50%,
    var(--barre) 50% 50%,
    var(--barre) 100% 50%;
  background-size: 20% 70%;
  mask: var(--masque), var(--masque), var(--masque);
  mask-size: 20% 150%;
  mask-position: 0 50%, 50% 50%, 100% 50%;
  animation: ${onduler} 1s infinite alternate;
`;
