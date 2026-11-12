/*
 * Confettis.jsx : une petite explosion de confettis arc-en-ciel, pour récompenser le joueur
 * (ex. quand il choisit son personnage). Pour une pluie continue, voir PluieConfettis.jsx.
 *
 * Responsabilités :
 *   - lancer une explosion chaque fois que « declencheur » change de valeur ;
 *   - retirer les confettis de la page quand ils ont tous fini de tomber.
 *
 * Le parent doit être en « position: relative » : l'explosion part de son centre.
 * Les confettis passent par-dessus la page sans bloquer les clics ni décaler les éléments.
 * L'animation elle-même est dans styles/animations/confettis.js.
 *
 * Props :
 *   declencheur : une valeur quelconque ; chaque nouvelle valeur relance l'explosion
 *                 (null, undefined ou false : pas de confettis)
 *   nombre      : nombre de morceaux (24 par défaut)
 */
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { trajectoireConfetti } from '@/styles/animations/confettis.js';
import { Zone, Morceau } from './Confettis.styles.js';

function Confettis({ declencheur, nombre = 24 }) {
  if (declencheur === null || declencheur === undefined || declencheur === false) return null;

  // key : quand le déclencheur change, React recrée l'explosion, ce qui relance l'animation.
  return <Explosion key={String(declencheur)} nombre={nombre} />;
}

// Une seule explosion : les morceaux, jusqu'à ce qu'ils aient tous fini de tomber.
function Explosion({ nombre }) {
  const { arcEnCiel } = useTheme();
  const [enVol, setEnVol] = useState(nombre); // morceaux pas encore retombés

  // Tous retombés : on retire l'explosion de la page.
  if (enVol === 0) return null;

  return (
    // onAnimationEnd : appelé chaque fois qu'un morceau termine son animation.
    <Zone aria-hidden="true" onAnimationEnd={() => setEnVol((reste) => reste - 1)}>
      {Array.from({ length: nombre }, (_, rang) => (
        <Morceau
          key={rang}
          $rond={rang % 3 === 0} // un morceau sur trois est rond, les autres rectangulaires
          style={{ background: arcEnCiel[rang % arcEnCiel.length], ...trajectoireConfetti(rang, nombre) }}
        />
      ))}
    </Zone>
  );
}

export default Confettis;
