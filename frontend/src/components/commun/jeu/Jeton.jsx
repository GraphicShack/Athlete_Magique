// Responsabilité : le pion d'un joueur sur la piste (couché s'il est tombé, contour rouge si c'est son tour).

import { Disque, Image } from './Jeton.styles.js';

// Affiche le pion ; avec « saut », il saute depuis la case d'avant.
// Props : couleur (du joueur), initiales, image, tombe (couché), actif (contour rouge), saut ({ dx, dy } pour l'anim, ou null).
function Jeton({ couleur, initiales, image, tombe = false, actif = false, saut = null }) {
  return (
    // title : texte affiché quand on laisse la souris sur le pion.
    <Disque
      $couleur={couleur}
      $avecImage={Boolean(image)}
      $tombe={tombe}
      $actif={actif}
      $saute={saut !== null}
      // saut : d'où vient le pion ({ dx, dy } en cases), pour l'animation (voir sautJeton.js).
      style={saut ? { '--dx': saut.dx, '--dy': saut.dy } : undefined}
      title={tombe ? `${initiales} (tombé)` : initiales}
    >
      {image ? <Image src={image} alt="" /> : initiales}
    </Disque>
  );
}

export default Jeton;
