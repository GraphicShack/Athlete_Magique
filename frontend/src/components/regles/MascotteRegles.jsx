// Responsabilité : l'image de la mascotte des règles.
// Utilisé dans : AccesRegles.styles, ReglesPage

import imageMascotte from '@/assets/images/Mascotte.png';
import { Image } from './MascotteRegles.styles.js';

// Affiche l'image de la mascotte.
function MascotteRegles({ className }) {
  return <Image className={className} src={imageMascotte} alt="Mascotte de la page des règles" />;
}

export default MascotteRegles;
