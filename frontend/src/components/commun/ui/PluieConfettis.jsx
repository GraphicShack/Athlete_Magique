// Responsabilité : une pluie de confettis qui tombe en continu (page Classement).
// Utilisé dans : ClassementPage

import { useTheme } from 'styled-components';
import { trajectoirePluie } from '@/styles/animations/confettis.js';
import { Zone } from './Confettis.styles.js';
import { Goutte } from './PluieConfettis.styles.js';

// Fait tomber « nombre » confettis en boucle, chacun à sa place pis son rythme.
// Props : nombre (de confettis, 60 par défaut).
function PluieConfettis({ nombre = 60 }) {
  const { arcEnCiel } = useTheme();

  return (
    <Zone aria-hidden="true">
      {Array.from({ length: nombre }, (_, rang) => (
        <Goutte
          key={rang}
          $rond={rang % 3 === 0} // un morceau sur trois est rond, les autres rectangulaires
          style={{ background: arcEnCiel[rang % arcEnCiel.length], ...trajectoirePluie(rang) }}
        />
      ))}
    </Zone>
  );
}

export default PluieConfettis;
