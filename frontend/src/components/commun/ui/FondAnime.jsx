/*
 * FondAnime.jsx : le fond animé des pages du menu. Un motif de grandes pastilles et
 * d'étoiles en gris et blanc, très discret, qui glisse lentement en diagonale.
 *
 * Responsabilités :
 *   - afficher le motif derrière toutes les pages (voir FondAnime.styles.js) ;
 *   - le cacher pendant la course, où la piste est déjà chargée visuellement.
 *
 * L'animation elle-même est dans styles/animations/defilementFond.js.
 * Pas de props : il se place une seule fois, dans App.jsx.
 */
import { useLocation } from 'react-router-dom';
import CHEMINS from '@/chemins.js';
import { Calque } from './FondAnime.styles.js';

function FondAnime() {
  const { pathname } = useLocation(); // adresse de la page actuelle

  // Pas de fond animé sur l'écran de course (même règle que la musique, voir MusiqueMenu.jsx).
  if (pathname === CHEMINS.course) return null;

  // aria-hidden : purement décoratif, les lecteurs d'écran l'ignorent.
  return <Calque aria-hidden="true" />;
}

export default FondAnime;
