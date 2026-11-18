// Responsabilité : une petite explosion de confettis (ex. quand on choisit un perso).
// Utilisé dans : SelectionPage

import { useState } from 'react';
import { useTheme } from 'styled-components';
import { trajectoireConfetti } from '@/styles/animations/confettis.js';
import { Zone, Morceau } from './Confettis.styles.js';

// Relance une explosion chaque fois que « declencheur » change.
// Props : declencheur (quand il change, ça explose), nombre (de morceaux, 24 par défaut).
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
