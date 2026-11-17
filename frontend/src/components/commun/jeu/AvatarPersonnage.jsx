/*
 * AvatarPersonnage.jsx : le rond qui représente un personnage (carte joueur, tour actif).
 *
 * Responsabilité : afficher l'image du personnage dans un rond, ou ses initiales
 * (« MA », « DU »…) s'il n'a pas d'image.
 *
 * Props :
 *   initiales : les lettres à afficher s'il n'y a pas d'image
 *   image     : image du personnage (optionnelle)
 *   taille    : 'sm', 'md' (par défaut) ou 'lg'
 */
import { Rond, Image } from './AvatarPersonnage.styles.js';

// Diamètre du rond pour chaque taille.
const TAILLES = { sm: '2.1rem', md: '2.75rem', lg: '4rem' };

function AvatarPersonnage({ initiales, image, taille = 'md' }) {
  return (
    // aria-hidden : décoratif, le nom du personnage est toujours écrit à côté.
    <Rond $taille={TAILLES[taille]} aria-hidden="true">
      {image ? <Image src={image} alt="" /> : initiales}
    </Rond>
  );
}

export default AvatarPersonnage;
