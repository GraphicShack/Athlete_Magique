// Responsabilité : le cadre commun des cases du tour (titre, texte, boutons).

import { Encadre, Titre } from './EncadreTour.styles.js';

// Affiche le titre, le texte pis les boutons (children) ; « neutre » = fond gris.
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
