// Responsabilité : le style de FondAnime
// Utilisé dans : FondAnime
// Inspiration : CodePen « CSS Animated Loop Background Image » de Jeong Geum-dam, https://codepen.io/fkaus/pen/mdJVeOz (idée du motif qui glisse en boucle ; code refait).

import styled from 'styled-components';
import { TAILLE_MOTIF, defilementFond } from '@/styles/animations/defilementFond.js';

// Opacité du motif : assez faible pour rester derrière les panneaux, assez forte pour bien voir les formes.
const OPACITE = 0.14;

// Les formes d'un carreau.
const FORMES = [
  { type: 'pastille', x: 0.17, y: 0.19, taille: 34, clair: true },
  { type: 'etoile', x: 0.56, y: 0.17, taille: 47, clair: false },
  { type: 'pastille', x: 0.85, y: 0.33, taille: 21, clair: false },
  { type: 'etoile', x: 0.26, y: 0.57, taille: 36, clair: false },
  { type: 'pastille', x: 0.69, y: 0.64, taille: 42, clair: true },
  { type: 'pastille', x: 0.13, y: 0.88, taille: 18, clair: true },
  { type: 'etoile', x: 0.47, y: 0.86, taille: 29, clair: true },
  { type: 'pastille', x: 0.89, y: 0.89, taille: 23, clair: false },
];

// Les sommets d'une étoile à 5 branches, centrée en (x, y) : une pointe, un creux, une pointe…
function pointsEtoile(x, y, taille) {
  const points = [];
  for (let i = 0; i < 10; i += 1) {
    const rayon = i % 2 === 0 ? taille : taille * 0.45;
    const angle = (Math.PI / 5) * i - Math.PI / 2; // la première pointe vers le haut
    points.push(`${(x + rayon * Math.cos(angle)).toFixed(1)},${(y + rayon * Math.sin(angle)).toFixed(1)}`);
  }
  return points.join(' ');
}

// Le carreau complet, sous forme d'image utilisable dans « background-image ».
function motif(blanc, gris) {
  const formes = FORMES.map(({ type, x: fractionX, y: fractionY, taille, clair }) => {
    const remplissage = clair ? blanc : gris;
    const x = Math.round(fractionX * TAILLE_MOTIF); // position en pixels dans le carreau
    const y = Math.round(fractionY * TAILLE_MOTIF);
    return type === 'pastille'
      ? `<circle cx="${x}" cy="${y}" r="${taille}" fill="${remplissage}"/>`
      : `<polygon points="${pointsEtoile(x, y, taille)}" fill="${remplissage}"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TAILLE_MOTIF}" height="${TAILLE_MOTIF}">${formes}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Cadre fixe de la taille de l'écran, derrière toutes les pages.
// Pourquoi overflow: hidden : le motif déborde exprès (inset négatif) pour la boucle ; sans ça, la page aurait un scroll horizontal.
export const Calque = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: -${TAILLE_MOTIF}px;
    background-image: ${({ theme }) => motif(theme.palette.blanc, theme.palette.gris)};
    background-size: ${TAILLE_MOTIF}px ${TAILLE_MOTIF}px;
    opacity: ${OPACITE};
    ${defilementFond}
  }
`;
