// Responsabilité : l'image du perso dans un rond (ou ses initiales si y'a pas d'image).

import { Rond, Image } from './AvatarPersonnage.styles.js';

// Diamètre du rond pour chaque taille.
const TAILLES = { sm: '2.1rem', md: '2.75rem', lg: '4rem' };

// Affiche l'image dans un rond de la taille demandée (sm, md, lg).
// Props : initiales (si y'a pas d'image), image, taille ('sm' | 'md' | 'lg').
function AvatarPersonnage({ initiales, image, taille = 'md' }) {
  return (
    // aria-hidden : décoratif, le nom du perso est toujours écrit à côté.
    <Rond $taille={TAILLES[taille]} aria-hidden="true">
      {image ? <Image src={image} alt="" /> : initiales}
    </Rond>
  );
}

export default AvatarPersonnage;
