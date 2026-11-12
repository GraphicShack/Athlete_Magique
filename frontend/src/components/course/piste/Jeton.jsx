/*
 * Jeton.jsx : le pion d'un personnage sur la piste, un disque à sa couleur avec ses initiales.
 *
 * Responsabilité : montrer l'état du pion : couché s'il est tombé, entouré de rouge
 * si c'est le pion du joueur actif.
 *
 * Props :
 *   couleur   : couleur du joueur
 *   initiales : ex. « MA »
 *   tombe     : true si le personnage est tombé
 *   actif     : true si c'est le pion du joueur dont c'est le tour
 */
import { Disque } from './Jeton.styles.js';

function Jeton({ couleur, initiales, tombe = false, actif = false }) {
  return (
    // title : texte affiché quand on laisse la souris sur le pion.
    <Disque $couleur={couleur} $tombe={tombe} $actif={actif} title={tombe ? `${initiales} (tombé)` : initiales}>
      {initiales}
    </Disque>
  );
}

export default Jeton;
