/*
 * Etiquette.jsx : petite étiquette arrondie (« Course 1 sur 3 », « Choisi »…).
 *
 * Responsabilité : afficher un court texte dans une pilule blanche à contour noir.
 *
 * Props :
 *   children : le texte de l'étiquette
 */
import { Pilule } from './Etiquette.styles.js';

function Etiquette({ children }) {
  return <Pilule>{children}</Pilule>;
}

export default Etiquette;
