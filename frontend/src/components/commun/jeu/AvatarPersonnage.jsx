/*
 * AvatarPersonnage.jsx : le rond qui représente un personnage (carte joueur, tour actif).
 *
 * Responsabilité : afficher les initiales du personnage (« MA », « DU »…) dans un rond.
 *
 * Props :
 *   initiales : les lettres à afficher
 *   taille    : 'md' (par défaut) ou 'lg'
 */
import { Rond } from './AvatarPersonnage.styles.js';

// Diamètre du rond pour chaque taille.
const TAILLES = { md: '2.75rem', lg: '4rem' };

function AvatarPersonnage({ initiales, taille = 'md' }) {
  return (
    // aria-hidden : décoratif, le nom du personnage est toujours écrit à côté.
    <Rond $taille={TAILLES[taille]} aria-hidden="true">
      {initiales}
    </Rond>
  );
}

export default AvatarPersonnage;
