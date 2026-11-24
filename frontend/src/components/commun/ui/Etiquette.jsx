// Responsabilité : un petit texte dans une pilule blanche.

import { Pilule } from './Etiquette.styles.js';

// Affiche le texte dans une pilule.
// Props : children (le texte).
function Etiquette({ children }) {
  return <Pilule>{children}</Pilule>;
}

export default Etiquette;
