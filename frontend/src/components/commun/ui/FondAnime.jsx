// Responsabilité : le fond animé des pages du menu.
// Utilisé dans : App
// Inspiration : CodePen « CSS Animated Loop Background Image » de Jeong Geum-dam, https://codepen.io/fkaus/pen/mdJVeOz (idée du motif qui glisse en boucle ; code refait).

import { useLocation } from 'react-router-dom';
import CHEMINS from '@/chemins.js';
import { Calque } from './FondAnime.styles.js';

// Affiche le motif qui glisse, sauf sur l'écran de course.
function FondAnime() {
  const { pathname } = useLocation(); // adresse de la page actuelle

  // Pas de fond animé sur l'écran de course (même règle que la musique, voir MusiqueMenu.jsx).
  if (pathname === CHEMINS.course) return null;

  // aria-hidden : purement décoratif, les lecteurs d'écran l'ignorent.
  return <Calque aria-hidden="true" />;
}

export default FondAnime;
