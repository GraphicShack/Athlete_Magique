/*
 * CasePiste.jsx : une case de la piste.
 *
 * Responsabilités :
 *   - se placer elle-même dans la grille selon son numéro (utils/dispositionPiste.js) ;
 *   - prendre la couleur de son type (normale, étoile, rocher, repère) ;
 *   - afficher son numéro, et les jetons qu'on lui donne en enfants.
 *
 * Props :
 *   numero   : 1 à 30
 *   type     : 'normale' (par défaut), 'etoile' ou 'rocher'
 *   children : les jetons posés sur la case
 */
import { positionCase, estRepere, indiceCouleur, coinCase } from '@/utils/dispositionPiste.js';
import { Carre, Numero, PetitNumero, Mention, Jetons } from './CasePiste.styles.js';

function CasePiste({ numero, type = 'normale', children }) {
  const { colonne, rangee } = positionCase(numero);
  const repere = estRepere(numero);
  const afficherNumero = repere || type === 'etoile'; // gros numéro ; sinon un petit dans le coin

  return (
    <Carre
      $colonne={colonne}
      $rangee={rangee}
      $type={type}
      $repere={repere}
      $indice={indiceCouleur(numero)}
      $coin={coinCase(numero)}
      aria-label={`Case ${numero}`}
    >
      {afficherNumero ? (
        <Numero>
          {type === 'etoile' && '★ '}
          {numero}
        </Numero>
      ) : (
        <PetitNumero>{numero}</PetitNumero>
      )}
      {type === 'rocher' && <Mention>Rocher</Mention>}
      {children && <Jetons>{children}</Jetons>}
    </Carre>
  );
}

export default CasePiste;
