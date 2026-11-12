/*
 * PluieConfettis.jsx : une pluie continue de confettis arc-en-ciel, qui tombent du haut
 * de la zone jusqu'en bas (ex. la page du classement). Pour une seule explosion, voir Confettis.jsx.
 *
 * Responsabilité : afficher les morceaux de la pluie, chacun avec sa propre trajectoire.
 *
 * Le parent doit être en « position: relative » et « overflow: hidden » : la pluie remplit
 * le parent, et ce qui dépasse en bas est coupé.
 * Les confettis passent par-dessus la page sans bloquer les clics ni décaler les éléments.
 * L'animation elle-même est dans styles/animations/confettis.js.
 *
 * Props :
 *   nombre : nombre de morceaux (60 par défaut)
 */
import { useTheme } from 'styled-components';
import { trajectoirePluie } from '@/styles/animations/confettis.js';
import { Zone } from './Confettis.styles.js';
import { Goutte } from './PluieConfettis.styles.js';

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
