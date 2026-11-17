/*
 * Jeton.jsx : le pion d'un personnage (sur la piste, dans la légende…) : un disque avec son image,
 * entouré de la couleur du joueur (ou ses initiales s'il n'y a pas d'image).
 *
 * Responsabilité : montrer l'état du pion : couché s'il est tombé, entouré de rouge
 * si c'est le pion du joueur actif.
 *
 * Props :
 *   couleur   : couleur du joueur (contour du pion)
 *   initiales : ex. « MA » (affichées s'il n'y a pas d'image, et lues au survol)
 *   image     : image du personnage (optionnelle)
 *   tombe     : true si le personnage est tombé
 *   actif     : true si c'est le pion du joueur dont c'est le tour
 */
import { Disque, Image } from './Jeton.styles.js';

function Jeton({ couleur, initiales, image, tombe = false, actif = false }) {
  return (
    // title : texte affiché quand on laisse la souris sur le pion.
    <Disque
      $couleur={couleur}
      $avecImage={Boolean(image)}
      $tombe={tombe}
      $actif={actif}
      title={tombe ? `${initiales} (tombé)` : initiales}
    >
      {/* alt vide : l'image est décorative, les initiales sont dans « title ». */}
      {image ? <Image src={image} alt="" /> : initiales}
    </Disque>
  );
}

export default Jeton;
