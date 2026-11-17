/*
 * EncadreTour.jsx : l'encadré du bas du tour en cours, avec un titre, un court texte et les boutons.
 *
 * Responsabilité : donner la même forme aux « cases » du tour (CasePouvoir, CaseSansPouvoir),
 * pour qu'elles se ressemblent et qu'on puisse les échanger sans rien changer autour.
 *
 * Props :
 *   titre    : ex. « Pouvoir : Magicien »
 *   texte    : explication courte
 *   neutre   : true pour un fond gris (pas de pouvoir), sinon fond de la teinte du panneau
 *   children : les boutons
 */
import { Encadre, Titre } from './EncadreTour.styles.js';

function EncadreTour({ titre, texte, neutre = false, children }) {
  return (
    <Encadre $neutre={neutre}>
      <Titre>{titre}</Titre>
      <p>{texte}</p>
      {children}
    </Encadre>
  );
}

export default EncadreTour;
