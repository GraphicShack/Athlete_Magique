// Responsabilité : une case de la piste (normale, étoile ou rocher) avec ses pions.

import { positionCase, estRepere, indiceCouleur } from '@/utils/piste/dispositionPiste.js';
import imageRocher from '@/assets/images/rocher.png';
import { Carre, Numero, PetitNumero, Rocher, Jetons } from './CasePiste.styles.js';

// Affiche la case à sa place dans la grille, avec ses jetons (children).
// Props : numero, type ('normale', 'etoile' ou 'rocher'), numeroVisible (réglage des paramètres), children.
function CasePiste({ numero, type = 'normale', numeroVisible = true, children }) {
  const { colonne, rangee } = positionCase(numero);
  const repere = estRepere(numero);
  const grosNumero = repere || type === 'etoile'; // sinon, un petit dans le coin

  return (
    <Carre
      $colonne={colonne}
      $rangee={rangee}
      $type={type}
      $repere={repere}
      $indice={indiceCouleur(numero)}
      aria-label={type === 'rocher' ? `Case ${numero}, rocher` : `Case ${numero}`}
    >
      {grosNumero && (
        <Numero>
          {type === 'etoile' && '★ '}
          {numeroVisible && numero}
        </Numero>
      )}
      {!grosNumero && numeroVisible && <PetitNumero>{numero}</PetitNumero>}
      {type === 'rocher' && <Rocher src={imageRocher} alt="" />}
      {children && <Jetons>{children}</Jetons>}
    </Carre>
  );
}

export default CasePiste;
