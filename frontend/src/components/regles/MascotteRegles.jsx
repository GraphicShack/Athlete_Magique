/*
 * MascotteRegles.jsx : l'image de la mascotte des règles.
 *
 * Responsabilité : afficher l'image à une taille qui suit l'écran, sans dépasser sa colonne.
 *
 * Props :
 *   className : permet à un parent de l'agrandir ou de la placer (styled(MascotteRegles))
 */
import imageMascotte from '@/assets/images/Mascotte.png';
import { Image } from './MascotteRegles.styles.js';

function MascotteRegles({ className }) {
  return <Image className={className} src={imageMascotte} alt="Mascotte de la page des règles" />;
}

export default MascotteRegles;
