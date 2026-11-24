// Responsabilité : les 2 animations de confettis (explosion pis pluie).

import { css, keyframes } from 'styled-components';

// Les nombres 0,618, 0,382 pis 0,271 servent juste à « mélanger » : le résultat a l'air aléatoire, mais il est toujours le même pour un même rang.
const melanger = (rang, nombre) => (rang * nombre) % 1; // entre 0 et 1

// Le joueur a demandé moins d'animations : pas de confettis du tout.
const sansAnimationReduite = css`
  html[data-animations='reduites'] & {
    display: none;
  }
`;

// ---------- Explosion ----------.

// Jaillir vite jusqu'au point le plus haut, puis retomber de plus en plus vite en disparaissant.
const jaillir = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg) scale(0.6);
    animation-timing-function: cubic-bezier(0.15, 0.8, 0.3, 1);
  }
  35% {
    transform: translate(var(--dx), var(--dy)) rotate(var(--tour)) scale(1);
    animation-timing-function: cubic-bezier(0.5, 0, 0.8, 0.6);
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(var(--dx) * 1.4), calc(var(--dy) + 240px)) rotate(calc(var(--tour) * 2)) scale(1);
    opacity: 0;
  }
`;

// Le style à mettre dans un morceau qui explose.
export const explosion = css`
  animation: ${jaillir} forwards;
  ${sansAnimationReduite}
`;

// Trajectoire d'un morceau qui explose, selon son rang (0, 1, 2…).
export function trajectoireConfetti(rang, total) {
  const melange = melanger(rang, 0.618);
  const angle = ((-160 + (140 * (rang + 0.5)) / total) * Math.PI) / 180; // en radians
  const distance = 70 + melange * 70; // entre 70 et 140 px : un petit saut, puis une longue chute
  const sens = rang % 2 === 0 ? 1 : -1; // un morceau sur deux tourne dans l'autre sens

  return {
    '--dx': `${Math.round(Math.cos(angle) * distance)}px`,
    '--dy': `${Math.round(Math.sin(angle) * distance)}px`,
    '--tour': `${Math.round(sens * (200 + melange * 300))}deg`,
    animationDuration: `${(1.3 + melange * 0.6).toFixed(2)}s`, // entre 1,3 s et 1,9 s
    animationDelay: `${(rang % 4) * 30}ms`, // petits décalages : pas tous exactement ensemble
  };
}

// ---------- Pluie ----------.

// Tomber du haut de l'écran jusqu'en bas en se balançant de gauche à droite pis en tournant.
const tomber = keyframes`
  0% {
    transform: translate(0, -20px) rotate(0deg);
  }
  50% {
    transform: translate(calc(var(--derive) * -1), 50vh) rotate(calc(var(--tour) / 2));
  }
  100% {
    transform: translate(var(--derive), calc(100vh + 20px)) rotate(var(--tour));
  }
`;

// Le style à mettre dans un morceau de pluie : il tombe à vitesse régulière, sans fin.
export const pluie = css`
  animation: ${tomber} linear infinite;
  ${sansAnimationReduite}
`;

// Trajectoire d'un morceau de pluie, selon son rang (0, 1, 2…).
export function trajectoirePluie(rang) {
  const duree = 3 + melanger(rang, 0.382) * 2.5; // entre 3 et 5,5 s
  const sens = rang % 2 === 0 ? 1 : -1;

  return {
    '--x': `${(melanger(rang, 0.618) * 100).toFixed(1)}%`,
    '--derive': `${Math.round(sens * (10 + melanger(rang, 0.271) * 30))}px`, // 10 à 40 px
    '--tour': `${Math.round(sens * (360 + melanger(rang, 0.618) * 360))}deg`, // 1 à 2 tours
    animationDuration: `${duree.toFixed(2)}s`,
    animationDelay: `${(-duree * melanger(rang, 0.271)).toFixed(2)}s`,
  };
}
